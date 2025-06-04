import React, {
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import {
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { PanelConstraints, PanelData } from './Panel';
import { DragState, PanelGroupContext, TPanelGroupContext } from './PanelGroupContext';
import { Direction } from './types';
import { adjustLayoutByDelta } from './utils/adjustLayoutByDelta';
import { areEqual } from './utils/arrays';
import { calculateUnsafeDefaultLayout } from './utils/calculateUnsafeDefaultLayout';
import { callPanelCallbacks } from './utils/callPanelCallbacks';
import { compareLayouts } from './utils/compareLayouts';
import { validatePanelGroupLayout } from './utils/validatePanelGroupLayout';

export type ImperativePanelGroupHandle = {
  getId: () => string;
  getLayout: () => number[];
  setLayout: (layout: number[]) => void;
};

export type PanelGroupOnLayout = (layout: number[]) => void;

export interface PanelGroupStorage {
  getItem(name: string): string | null;
  setItem(name: string, value: string): void;
}

export interface PanelGroupProps extends Omit<ViewProps, 'onLayout'> {
  autoSaveId?: string | null;
  direction: Direction;
  onLayout?: (layout: number[]) => void;
  style?: StyleProp<ViewStyle>;
}

export function PanelGroup(
  {
    autoSaveId = null,
    children,
    direction,
    onLayout = () => {},
    style,
    ...viewProps
  }: PanelGroupProps,
  forwardedRef: React.ForwardedRef<ImperativePanelGroupHandle>
) {
  const groupId = useRef<string>(`panel-group-${Math.random().toString(36).slice(2)}`).current;
  const panelGroupRef = useRef<View | null>(null);

  const [dragState, setDragState] = useState<DragState | null>(null);
  const [layout, setLayout] = useState<number[]>([]);

  const panelIdToLastNotifiedSizeMapRef = useRef<Record<string, number>>({});
  const panelSizeBeforeCollapseRef = useRef<Map<string, number>>(new Map());
  const prevDeltaRef = useRef<number>(0);

  const committedValuesRef = useRef<{
    autoSaveId: string | null;
    direction: Direction;
    dragState: DragState | null;
    onLayout: ((layout: number[]) => void) | null;
  }>({
    autoSaveId,
    direction,
    dragState,
    onLayout,
  });

  const eagerValuesRef = useRef<{
    layout: number[];
    panelDataArray: PanelData[];
    panelDataArrayChanged: boolean;
  }>({
    layout,
    panelDataArray: [],
    panelDataArrayChanged: false,
  });

  // Imperative handle for parent components
  useImperativeHandle(
    forwardedRef,
    () => ({
      getId: () => groupId,
      getLayout: () => eagerValuesRef.current.layout,
      setLayout: (unsafeLayout: number[]) => {
        const { onLayout } = committedValuesRef.current;
        const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;

        const safeLayout = validatePanelGroupLayout({
          layout: unsafeLayout,
          panelConstraints: panelDataArray.map((pd) => pd.constraints),
        });

        if (!areEqual(prevLayout, safeLayout)) {
          setLayout(safeLayout);
          eagerValuesRef.current.layout = safeLayout;
          if (onLayout) onLayout(safeLayout);
          callPanelCallbacks(panelDataArray, safeLayout, panelIdToLastNotifiedSizeMapRef.current);
        }
      },
    }),
    []
  );

  // Keep refs up to date
  useLayoutEffect(() => {
    committedValuesRef.current = {
      autoSaveId,
      direction,
      dragState,
      onLayout,
    };
  }, [autoSaveId, direction, dragState, onLayout]);

  // Re-compute layout whenever panels register/unregister
  useLayoutEffect(() => {
    if (eagerValuesRef.current.panelDataArrayChanged) {
      eagerValuesRef.current.panelDataArrayChanged = false;
      const { onLayout } = committedValuesRef.current;
      const { panelDataArray, layout: prevLayout } = eagerValuesRef.current;

      const unsafeLayout = calculateUnsafeDefaultLayout({ panelDataArray });
      const nextLayout = validatePanelGroupLayout({
        layout: unsafeLayout,
        panelConstraints: panelDataArray.map((pd) => pd.constraints),
      });

      if (!areEqual(prevLayout, nextLayout)) {
        setLayout(nextLayout);
        eagerValuesRef.current.layout = nextLayout;
        if (onLayout) onLayout(nextLayout);
        callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
      }
    }
  }, []);

  // Register / unregister
  const registerPanel = useCallback((panelData: PanelData) => {
    const arr = eagerValuesRef.current.panelDataArray;
    arr.push(panelData);
    arr.sort((a, b) => {
      const oa = a.order,
        ob = b.order;
      if (oa == null && ob == null) return 0;
      if (oa == null) return -1;
      if (ob == null) return 1;
      return oa - ob;
    });
    eagerValuesRef.current.panelDataArrayChanged = true;
  }, []);

  const unregisterPanel = useCallback((panelData: PanelData) => {
    const arr = eagerValuesRef.current.panelDataArray;
    const idx = arr.findIndex((pd) => pd === panelData || pd.id === panelData.id);
    if (idx >= 0) {
      arr.splice(idx, 1);
      delete panelIdToLastNotifiedSizeMapRef.current[panelData.id];
      eagerValuesRef.current.panelDataArrayChanged = true;
    }
  }, []);

  const collapsePanel = useCallback((panelData: PanelData) => {
    const { onLayout } = committedValuesRef.current;
    const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;

    if (panelData.constraints.collapsible) {
      const constraintsArr = panelDataArray.map((pd) => pd.constraints);
      const {
        collapsedSize = 0,
        panelSize,
        pivotIndices,
      } = panelDataHelper(panelDataArray, panelData, prevLayout);
      if (panelSize == null) {
        throw new Error(`Panel size not found for ${panelData.id}`);
      }
      if (panelSize !== collapsedSize) {
        panelSizeBeforeCollapseRef.current.set(panelData.id, panelSize);
        const isLast = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
        const delta = isLast ? panelSize - collapsedSize : collapsedSize - panelSize;

        const nextLayout = adjustLayoutByDelta({
          delta,
          initialLayout: prevLayout,
          panelConstraints: constraintsArr,
          pivotIndices,
          prevLayout,
          trigger: 'imperative-api',
        });

        if (!compareLayouts(prevLayout, nextLayout)) {
          setLayout(nextLayout);
          eagerValuesRef.current.layout = nextLayout;
          if (onLayout) onLayout(nextLayout);
          callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
        }
      }
    }
  }, []);

  const expandPanel = useCallback((panelData: PanelData, minSizeOverride?: number) => {
    const { onLayout } = committedValuesRef.current;
    const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;

    if (panelData.constraints.collapsible) {
      const constraintsArr = panelDataArray.map((pd) => pd.constraints);
      const {
        collapsedSize = 0,
        panelSize = 0,
        minSize: minSizeFromProps = 0,
        pivotIndices,
      } = panelDataHelper(panelDataArray, panelData, prevLayout);

      const minSize = minSizeOverride ?? minSizeFromProps;
      if (panelSize === collapsedSize) {
        const prevPanelSize = panelSizeBeforeCollapseRef.current.get(panelData.id);
        const baseSize =
          prevPanelSize != null && prevPanelSize >= minSize ? prevPanelSize : minSize;
        const isLast = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
        const delta = isLast ? panelSize - baseSize : baseSize - panelSize;

        const nextLayout = adjustLayoutByDelta({
          delta,
          initialLayout: prevLayout,
          panelConstraints: constraintsArr,
          pivotIndices,
          prevLayout,
          trigger: 'imperative-api',
        });

        if (!compareLayouts(prevLayout, nextLayout)) {
          setLayout(nextLayout);
          eagerValuesRef.current.layout = nextLayout;
          if (onLayout) onLayout(nextLayout);
          callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
        }
      }
    }
  }, []);

  const resizePanel = useCallback((panelData: PanelData, unsafePanelSize: number) => {
    const { onLayout } = committedValuesRef.current;
    const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;

    const constraintsArr = panelDataArray.map((pd) => pd.constraints);
    const { panelSize, pivotIndices } = panelDataHelper(panelDataArray, panelData, prevLayout);

    if (panelSize == null) {
      throw new Error(`Panel size not found for ${panelData.id}`);
    }

    const isLast = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
    const delta = isLast ? panelSize - unsafePanelSize : unsafePanelSize - panelSize;

    const nextLayout = adjustLayoutByDelta({
      delta,
      initialLayout: prevLayout,
      panelConstraints: constraintsArr,
      pivotIndices,
      prevLayout,
      trigger: 'mouse-or-touch',
    });

    if (!compareLayouts(prevLayout, nextLayout)) {
      setLayout(nextLayout);
      eagerValuesRef.current.layout = nextLayout;
      if (onLayout) onLayout(nextLayout);
      callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
    }
  }, []);

  const reevaluatePanelConstraints = useCallback(
    (panelData: PanelData, prevConstraints: PanelConstraints) => {
      const { layout, panelDataArray } = eagerValuesRef.current;

      const { collapsedSize: prevCollapsed = 0, collapsible: prevCollapsible } = prevConstraints;
      const {
        collapsedSize: nextCollapsed = 0,
        collapsible: nextCollapsible,
        maxSize: nextMax = 100,
        minSize: nextMin = 0,
      } = panelData.constraints;

      const { panelSize: prevPanelSize } = panelDataHelper(panelDataArray, panelData, layout);
      if (prevPanelSize == null) return;

      if (prevCollapsible && nextCollapsible && prevPanelSize === prevCollapsed) {
        if (prevCollapsed !== nextCollapsed) {
          resizePanel(panelData, nextCollapsed);
        }
      } else if (prevPanelSize < nextMin) {
        resizePanel(panelData, nextMin);
      } else if (prevPanelSize > nextMax) {
        resizePanel(panelData, nextMax);
      }
    },
    [resizePanel]
  );

  // Start / stop dragging: measure container and store initial state
  const startDragging = useCallback(
    (
      dragHandleId: string,
      pivotIndices: [number, number],
      event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
    ) => {
      if (!panelGroupRef.current) return;
      panelGroupRef.current.measure((x, y, width, height) => {
        const isHorizontal = committedValuesRef.current.direction === 'horizontal';
        setDragState({
          dragHandleId,
          initialLayout: eagerValuesRef.current.layout,
          pivotIndices,
          containerSizePx: isHorizontal ? width : height,
        });
      });
    },
    []
  );

  const stopDragging = useCallback(() => {
    setDragState(null);
  }, []);

  // registerResizeHandle will return a function that PanGestureHandler calls on change
  const registerResizeHandle = useCallback(
    (dragHandleId: string) => {
      return (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
        'worklet';
        const { translationX, translationY } = event;
        const { direction, onLayout } = committedValuesRef.current;
        const { initialLayout, pivotIndices, containerSizePx } = dragState!;
        const axisDelta = direction === 'horizontal' ? translationX : translationY;
        const deltaPercent = (axisDelta / containerSizePx) * 100;

        const constraintsArr = eagerValuesRef.current.panelDataArray.map((pd) => pd.constraints);
        const nextLayout = adjustLayoutByDelta({
          delta: deltaPercent,
          initialLayout: initialLayout!,
          panelConstraints: constraintsArr,
          pivotIndices,
          prevLayout: initialLayout!,
          trigger: 'mouse-or-touch',
        });

        if (!compareLayouts(initialLayout!, nextLayout)) {
          runOnJS(setLayout)(nextLayout);
          eagerValuesRef.current.layout = nextLayout;
          if (onLayout) runOnJS(onLayout)(nextLayout);
          callPanelCallbacks(
            eagerValuesRef.current.panelDataArray,
            nextLayout,
            panelIdToLastNotifiedSizeMapRef.current
          );
        }
      };
    },
    [dragState]
  );

  // Context value
  const contextValue: TPanelGroupContext = useMemo(
    () => ({
      collapsePanel,
      direction,
      dragState,
      expandPanel,
      getPanelSize: (pd) => {
        const { layout: arr, panelDataArray } = eagerValuesRef.current;
        const idx = panelDataArray.findIndex((p) => p === pd || p.id === pd.id);
        return arr[idx];
      },
      getPanelStyle: (pd, defaultSize): StyleProp<ViewStyle> => {
        const { layout: arr, panelDataArray } = eagerValuesRef.current;
        const index = panelDataArray.findIndex((p) => p === pd || p.id === pd.id);
        const sizePct = arr[index];
        return {
          flexBasis: `${sizePct}%`,
          flexGrow: 0,
          flexShrink: 0,
        };
      },
      groupId,
      isPanelCollapsed: (pd) => {
        const { layout: arr, panelDataArray } = eagerValuesRef.current;
        const idx = panelDataArray.findIndex((p) => p === pd || p.id === pd.id);
        const { collapsedSize = 0, collapsible } = pd.constraints;
        const panelSize = arr[idx];
        return collapsible === true && panelSize === collapsedSize;
      },
      isPanelExpanded: (pd) => {
        const { layout: arr, panelDataArray } = eagerValuesRef.current;
        const idx = panelDataArray.findIndex((p) => p === pd || p.id === pd.id);
        const { collapsible, collapsedSize = 0 } = pd.constraints;
        const panelSize = arr[idx];
        return !collapsible || panelSize > collapsedSize;
      },
      reevaluatePanelConstraints,
      registerPanel,
      registerResizeHandle,
      resizePanel,
      startDragging,
      stopDragging,
      unregisterPanel,
    }),
    [
      collapsePanel,
      direction,
      expandPanel,
      reevaluatePanelConstraints,
      registerPanel,
      registerResizeHandle,
      resizePanel,
      startDragging,
      stopDragging,
      unregisterPanel,
    ]
  );

  const containerStyle: StyleProp<ViewStyle> = [
    { flex: 1, flexDirection: direction === 'horizontal' ? 'row' : 'column' },
    style,
  ];

  return (
    <PanelGroupContext.Provider value={contextValue}>
      <View ref={panelGroupRef} style={containerStyle} {...viewProps}>
        {children}
      </View>
    </PanelGroupContext.Provider>
  );
}

function findPanelDataIndex(panelDataArray: PanelData[], panelData: PanelData) {
  return panelDataArray.findIndex(
    (prevPanelData) => prevPanelData === panelData || prevPanelData.id === panelData.id
  );
}

function panelDataHelper(panelDataArray: PanelData[], panelData: PanelData, layout: number[]) {
  const panelIndex = findPanelDataIndex(panelDataArray, panelData);

  const isLastPanel = panelIndex === panelDataArray.length - 1;
  const pivotIndices = isLastPanel ? [panelIndex - 1, panelIndex] : [panelIndex, panelIndex + 1];

  const panelSize = layout[panelIndex];

  return {
    ...panelData.constraints,
    panelSize,
    pivotIndices,
  };
}
