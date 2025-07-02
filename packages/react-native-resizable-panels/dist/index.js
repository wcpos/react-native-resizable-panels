'use client'
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DATA_ATTRIBUTES: () => DATA_ATTRIBUTES,
  Panel: () => Panel,
  PanelGroup: () => PanelGroup,
  PanelResizeHandle: () => PanelResizeHandle,
  assert: () => assert,
  getIntersectingRectangle: () => getIntersectingRectangle,
  getPanelElement: () => getPanelElement,
  getPanelElementsForGroup: () => getPanelElementsForGroup,
  getPanelGroupElement: () => getPanelGroupElement,
  getResizeHandleElement: () => getResizeHandleElement,
  getResizeHandleElementIndex: () => getResizeHandleElementIndex,
  getResizeHandleElementsForGroup: () => getResizeHandleElementsForGroup,
  getResizeHandlePanelIds: () => getResizeHandlePanelIds,
  intersects: () => intersects,
  setNonce: () => setNonce,
  usePanelGroupContext: () => usePanelGroupContext
});
module.exports = __toCommonJS(index_exports);

// src/Panel.tsx
var import_react3 = require("react");
var import_react_native_reanimated = __toESM(require("react-native-reanimated"));

// src/hooks/useUniqueId.ts
var import_react = require("react");
var idCounter = 0;
function useUniqueId(providedId) {
  const idFromHook = (0, import_react.useId)();
  const stableIdRef = (0, import_react.useRef)(null);
  if (stableIdRef.current === null) {
    stableIdRef.current = providedId || idFromHook || `panel-${idCounter++}`;
  }
  return providedId || stableIdRef.current;
}

// src/PanelGroupContext.ts
var import_react2 = require("react");
var PanelGroupContext = (0, import_react2.createContext)(null);

// src/Panel.tsx
function Panel({
  ref,
  children,
  collapsedSize,
  collapsible,
  defaultSize,
  id: idFromProps,
  maxSize,
  minSize,
  onCollapse,
  onExpand,
  onResize,
  order,
  style: styleFromProps,
  ...viewProps
}) {
  const context = (0, import_react3.useContext)(PanelGroupContext);
  if (context === null) {
    throw new Error(`<Panel> must be rendered inside a <PanelGroup>`);
  }
  const {
    collapsePanel,
    expandPanel,
    getPanelSize,
    isPanelCollapsed,
    reevaluatePanelConstraints,
    registerPanel,
    unregisterPanel,
    resizePanel: resizePanel2,
    layoutShared,
    panelIdsShared,
    dragState
  } = context;
  const panelId = useUniqueId(idFromProps);
  const panelDataRef = (0, import_react3.useRef)({
    callbacks: {
      onCollapse,
      onExpand,
      onResize
    },
    constraints: {
      collapsedSize,
      collapsible,
      defaultSize,
      maxSize,
      minSize
    },
    id: panelId,
    idIsFromProps: idFromProps !== void 0,
    order
  });
  const devWarningsRef = (0, import_react3.useRef)({
    didLogMissingDefaultSizeWarning: false
  });
  if (process.env.NODE_ENV === "development") {
    if (!devWarningsRef.current.didLogMissingDefaultSizeWarning) {
      if (defaultSize == null) {
        devWarningsRef.current.didLogMissingDefaultSizeWarning = true;
        console.warn(
          `WARNING: Panel defaultSize prop recommended to avoid layout shift after server rendering`
        );
      }
    }
  }
  (0, import_react3.useLayoutEffect)(() => {
    const { callbacks, constraints } = panelDataRef.current;
    const prevConstraints = { ...constraints };
    panelDataRef.current.id = panelId;
    panelDataRef.current.idIsFromProps = idFromProps !== void 0;
    panelDataRef.current.order = order;
    callbacks.onCollapse = onCollapse;
    callbacks.onExpand = onExpand;
    callbacks.onResize = onResize;
    constraints.collapsedSize = collapsedSize;
    constraints.collapsible = collapsible;
    constraints.defaultSize = defaultSize;
    constraints.maxSize = maxSize;
    constraints.minSize = minSize;
    if (prevConstraints.collapsedSize !== constraints.collapsedSize || prevConstraints.collapsible !== constraints.collapsible || prevConstraints.maxSize !== constraints.maxSize || prevConstraints.minSize !== constraints.minSize) {
      reevaluatePanelConstraints(panelDataRef.current, prevConstraints);
    }
  });
  (0, import_react3.useLayoutEffect)(() => {
    const panelData = panelDataRef.current;
    registerPanel(panelData);
    return () => {
      unregisterPanel(panelData);
    };
  }, [order, panelId, registerPanel, unregisterPanel]);
  (0, import_react3.useImperativeHandle)(
    ref,
    () => ({
      collapse: () => {
        collapsePanel(panelDataRef.current);
      },
      expand: (minSize2) => {
        expandPanel(panelDataRef.current, minSize2);
      },
      getId() {
        return panelId;
      },
      getSize() {
        return getPanelSize(panelDataRef.current);
      },
      isCollapsed() {
        return isPanelCollapsed(panelDataRef.current);
      },
      isExpanded() {
        return !isPanelCollapsed(panelDataRef.current);
      },
      resize: (size) => {
        resizePanel2(panelDataRef.current, size);
      }
    }),
    [collapsePanel, expandPanel, getPanelSize, isPanelCollapsed, panelId, resizePanel2]
  );
  const animatedStyle = (0, import_react_native_reanimated.useAnimatedStyle)(() => {
    const layout = layoutShared.value;
    const panelIds = panelIdsShared.value;
    const currentDragState = dragState.value;
    const panelIndex = panelIds.indexOf(panelId);
    const size = panelIndex > -1 ? layout[panelIndex] : void 0;
    let flexGrowValue;
    const precision = 3;
    if (size == null) {
      if (defaultSize != null) {
        flexGrowValue = Number(defaultSize.toPrecision(precision));
      } else {
        flexGrowValue = 1;
      }
    } else if (panelIds.length === 1) {
      flexGrowValue = 1;
    } else {
      flexGrowValue = Number(size.toPrecision(precision));
    }
    return {
      flexBasis: 0,
      flexGrow: flexGrowValue,
      flexShrink: 1,
      overflow: "hidden",
      pointerEvents: currentDragState !== null ? "none" : "auto"
    };
  }, [panelId, defaultSize]);
  return <import_react_native_reanimated.default.View {...viewProps} style={[animatedStyle, styleFromProps]}>
      {children}
    </import_react_native_reanimated.default.View>;
}

// src/PanelGroup.tsx
var import_react4 = require("react");
var import_react_native = require("react-native");
var import_react_native_reanimated2 = require("react-native-reanimated");

// src/utils/assert.ts
function assert(expectedCondition, message) {
  if (!expectedCondition) {
    console.error(message);
    throw Error(message);
  }
}

// src/constants.ts
var DATA_ATTRIBUTES = {
  group: "data-panel-group",
  groupDirection: "data-panel-group-direction",
  groupId: "data-panel-group-id",
  panel: "data-panel",
  panelCollapsible: "data-panel-collapsible",
  panelId: "data-panel-id",
  panelSize: "data-panel-size",
  resizeHandle: "data-resize-handle",
  resizeHandleActive: "data-resize-handle-active",
  resizeHandleEnabled: "data-panel-resize-handle-enabled",
  resizeHandleId: "data-panel-resize-handle-id",
  resizeHandleState: "data-resize-handle-state"
};
var PRECISION = 10;

// src/utils/numbers/fuzzyCompareNumbers.ts
function fuzzyCompareNumbers(actual, expected, fractionDigits = PRECISION) {
  if (actual.toFixed(fractionDigits) === expected.toFixed(fractionDigits)) {
    return 0;
  } else {
    return actual > expected ? 1 : -1;
  }
}
function fuzzyNumbersEqual(actual, expected, fractionDigits = PRECISION) {
  return fuzzyCompareNumbers(actual, expected, fractionDigits) === 0;
}

// src/utils/numbers/fuzzyNumbersEqual.ts
function fuzzyNumbersEqual2(actual, expected, fractionDigits) {
  return fuzzyCompareNumbers(actual, expected, fractionDigits) === 0;
}

// src/utils/numbers/fuzzyLayoutsEqual.ts
function fuzzyLayoutsEqual(actual, expected, fractionDigits) {
  if (actual.length !== expected.length) {
    return false;
  }
  for (let index = 0; index < actual.length; index++) {
    const actualSize = actual[index];
    const expectedSize = expected[index];
    if (!fuzzyNumbersEqual2(actualSize, expectedSize, fractionDigits)) {
      return false;
    }
  }
  return true;
}

// src/utils/resizePanel.ts
function resizePanel({
  panelConstraints: panelConstraintsArray,
  panelIndex,
  size
}) {
  const panelConstraints = panelConstraintsArray[panelIndex];
  assert(panelConstraints != null, `Panel constraints not found for index ${panelIndex}`);
  let { collapsedSize = 0, collapsible, maxSize = 100, minSize = 0 } = panelConstraints;
  if (fuzzyCompareNumbers(size, minSize) < 0) {
    if (collapsible) {
      const halfwayPoint = (collapsedSize + minSize) / 2;
      if (fuzzyCompareNumbers(size, halfwayPoint) < 0) {
        size = collapsedSize;
      } else {
        size = minSize;
      }
    } else {
      size = minSize;
    }
  }
  size = Math.min(maxSize, size);
  size = parseFloat(size.toFixed(PRECISION));
  return size;
}

// src/utils/adjustLayoutByDelta.ts
function adjustLayoutByDelta({
  delta,
  initialLayout,
  panelConstraints: panelConstraintsArray,
  pivotIndices,
  prevLayout,
  trigger
}) {
  if (fuzzyNumbersEqual2(delta, 0)) {
    return initialLayout;
  }
  const nextLayout = [...initialLayout];
  const [firstPivotIndex, secondPivotIndex] = pivotIndices;
  assert(firstPivotIndex != null, "Invalid first pivot index");
  assert(secondPivotIndex != null, "Invalid second pivot index");
  let deltaApplied = 0;
  {
    if (trigger === "keyboard") {
      {
        const index = delta < 0 ? secondPivotIndex : firstPivotIndex;
        const panelConstraints = panelConstraintsArray[index];
        assert(panelConstraints, `Panel constraints not found for index ${index}`);
        const { collapsedSize = 0, collapsible, minSize = 0 } = panelConstraints;
        if (collapsible) {
          const prevSize = initialLayout[index];
          assert(prevSize != null, `Previous layout not found for panel index ${index}`);
          if (fuzzyNumbersEqual2(prevSize, collapsedSize)) {
            const localDelta = minSize - prevSize;
            if (fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0) {
              delta = delta < 0 ? 0 - localDelta : localDelta;
            }
          }
        }
      }
      {
        const index = delta < 0 ? firstPivotIndex : secondPivotIndex;
        const panelConstraints = panelConstraintsArray[index];
        assert(panelConstraints, `No panel constraints found for index ${index}`);
        const { collapsedSize = 0, collapsible, minSize = 0 } = panelConstraints;
        if (collapsible) {
          const prevSize = initialLayout[index];
          assert(prevSize != null, `Previous layout not found for panel index ${index}`);
          if (fuzzyNumbersEqual2(prevSize, minSize)) {
            const localDelta = prevSize - collapsedSize;
            if (fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0) {
              delta = delta < 0 ? 0 - localDelta : localDelta;
            }
          }
        }
      }
    }
  }
  {
    const increment = delta < 0 ? 1 : -1;
    let index = delta < 0 ? secondPivotIndex : firstPivotIndex;
    let maxAvailableDelta = 0;
    while (true) {
      const prevSize = initialLayout[index];
      assert(prevSize != null, `Previous layout not found for panel index ${index}`);
      const maxSafeSize = resizePanel({
        panelConstraints: panelConstraintsArray,
        panelIndex: index,
        size: 100
      });
      const delta2 = maxSafeSize - prevSize;
      maxAvailableDelta += delta2;
      index += increment;
      if (index < 0 || index >= panelConstraintsArray.length) {
        break;
      }
    }
    const minAbsDelta = Math.min(Math.abs(delta), Math.abs(maxAvailableDelta));
    delta = delta < 0 ? 0 - minAbsDelta : minAbsDelta;
  }
  {
    const pivotIndex = delta < 0 ? firstPivotIndex : secondPivotIndex;
    let index = pivotIndex;
    while (index >= 0 && index < panelConstraintsArray.length) {
      const deltaRemaining = Math.abs(delta) - Math.abs(deltaApplied);
      const prevSize = initialLayout[index];
      assert(prevSize != null, `Previous layout not found for panel index ${index}`);
      const unsafeSize = prevSize - deltaRemaining;
      const safeSize = resizePanel({
        panelConstraints: panelConstraintsArray,
        panelIndex: index,
        size: unsafeSize
      });
      if (!fuzzyNumbersEqual2(prevSize, safeSize)) {
        deltaApplied += prevSize - safeSize;
        nextLayout[index] = safeSize;
        if (deltaApplied.toPrecision(3).localeCompare(Math.abs(delta).toPrecision(3), void 0, {
          numeric: true
        }) >= 0) {
          break;
        }
      }
      if (delta < 0) {
        index--;
      } else {
        index++;
      }
    }
  }
  if (fuzzyLayoutsEqual(prevLayout, nextLayout)) {
    return prevLayout;
  }
  {
    const pivotIndex = delta < 0 ? secondPivotIndex : firstPivotIndex;
    const prevSize = initialLayout[pivotIndex];
    assert(prevSize != null, `Previous layout not found for panel index ${pivotIndex}`);
    const unsafeSize = prevSize + deltaApplied;
    const safeSize = resizePanel({
      panelConstraints: panelConstraintsArray,
      panelIndex: pivotIndex,
      size: unsafeSize
    });
    nextLayout[pivotIndex] = safeSize;
    if (!fuzzyNumbersEqual2(safeSize, unsafeSize)) {
      let deltaRemaining = unsafeSize - safeSize;
      const pivotIndex2 = delta < 0 ? secondPivotIndex : firstPivotIndex;
      let index = pivotIndex2;
      while (index >= 0 && index < panelConstraintsArray.length) {
        const prevSize2 = nextLayout[index];
        assert(prevSize2 != null, `Previous layout not found for panel index ${index}`);
        const unsafeSize2 = prevSize2 + deltaRemaining;
        const safeSize2 = resizePanel({
          panelConstraints: panelConstraintsArray,
          panelIndex: index,
          size: unsafeSize2
        });
        if (!fuzzyNumbersEqual2(prevSize2, safeSize2)) {
          deltaRemaining -= safeSize2 - prevSize2;
          nextLayout[index] = safeSize2;
        }
        if (fuzzyNumbersEqual2(deltaRemaining, 0)) {
          break;
        }
        if (delta > 0) {
          index--;
        } else {
          index++;
        }
      }
    }
  }
  const totalSize = nextLayout.reduce((total, size) => size + total, 0);
  if (!fuzzyNumbersEqual2(totalSize, 100)) {
    return prevLayout;
  }
  return nextLayout;
}

// src/utils/arrays.ts
function areEqual(arrayA, arrayB) {
  if (arrayA.length !== arrayB.length) {
    return false;
  }
  for (let index = 0; index < arrayA.length; index++) {
    if (arrayA[index] !== arrayB[index]) {
      return false;
    }
  }
  return true;
}

// src/utils/calculateUnsafeDefaultLayout.ts
function calculateUnsafeDefaultLayout({
  panelDataArray
}) {
  const layout = Array(panelDataArray.length);
  const panelConstraintsArray = panelDataArray.map((panelData) => panelData.constraints);
  let numPanelsWithSizes = 0;
  let remainingSize = 100;
  for (let index = 0; index < panelDataArray.length; index++) {
    const panelConstraints = panelConstraintsArray[index];
    assert(panelConstraints, `Panel constraints not found for index ${index}`);
    const { defaultSize } = panelConstraints;
    if (defaultSize != null) {
      numPanelsWithSizes++;
      layout[index] = defaultSize;
      remainingSize -= defaultSize;
    }
  }
  const numRemainingPanels = panelDataArray.length - numPanelsWithSizes;
  const sizePerRemainingPanel = numRemainingPanels > 0 ? remainingSize / numRemainingPanels : 0;
  for (let index = 0; index < panelDataArray.length; index++) {
    const panelConstraints = panelConstraintsArray[index];
    assert(panelConstraints, `Panel constraints not found for index ${index}`);
    const { defaultSize } = panelConstraints;
    if (defaultSize != null) {
      continue;
    }
    layout[index] = sizePerRemainingPanel;
  }
  return layout;
}

// src/utils/callPanelCallbacks.ts
function callPanelCallbacks(panelsArray, layout, panelIdToLastNotifiedSizeMap) {
  layout.forEach((size, index) => {
    const panelData = panelsArray[index];
    assert(panelData, `Panel data not found for index ${index}`);
    const { callbacks, constraints, id: panelId } = panelData;
    const { collapsedSize = 0, collapsible } = constraints;
    const lastNotifiedSize = panelIdToLastNotifiedSizeMap[panelId];
    if (lastNotifiedSize == null || size !== lastNotifiedSize) {
      panelIdToLastNotifiedSizeMap[panelId] = size;
      const { onCollapse, onExpand, onResize } = callbacks;
      if (onResize) {
        onResize(size, lastNotifiedSize);
      }
      if (collapsible && (onCollapse || onExpand)) {
        if (onExpand && (lastNotifiedSize == null || fuzzyNumbersEqual(lastNotifiedSize, collapsedSize)) && !fuzzyNumbersEqual(size, collapsedSize)) {
          onExpand();
        }
        if (onCollapse && (lastNotifiedSize == null || !fuzzyNumbersEqual(lastNotifiedSize, collapsedSize)) && fuzzyNumbersEqual(size, collapsedSize)) {
          onCollapse();
        }
      }
    }
  });
}

// src/utils/compareLayouts.ts
function compareLayouts(a, b) {
  if (a.length !== b.length) {
    return false;
  } else {
    for (let index = 0; index < a.length; index++) {
      if (a[index] != b[index]) {
        return false;
      }
    }
  }
  return true;
}

// src/utils/validatePanelGroupLayout.ts
function validatePanelGroupLayout({
  layout: prevLayout,
  panelConstraints
}) {
  const nextLayout = [...prevLayout];
  const nextLayoutTotalSize = nextLayout.reduce((accumulated, current) => accumulated + current, 0);
  if (nextLayout.length !== panelConstraints.length) {
    throw Error(
      `Invalid ${panelConstraints.length} panel layout: ${nextLayout.map((size) => `${size}%`).join(", ")}`
    );
  } else if (!fuzzyNumbersEqual2(nextLayoutTotalSize, 100) && nextLayout.length > 0) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `WARNING: Invalid layout total size: ${nextLayout.map((size) => `${size}%`).join(", ")}. Layout normalization will be applied.`
      );
    }
    for (let index = 0; index < panelConstraints.length; index++) {
      const unsafeSize = nextLayout[index];
      assert(unsafeSize != null, `No layout data found for index ${index}`);
      const safeSize = 100 / nextLayoutTotalSize * unsafeSize;
      nextLayout[index] = safeSize;
    }
  }
  let remainingSize = 0;
  for (let index = 0; index < panelConstraints.length; index++) {
    const unsafeSize = nextLayout[index];
    assert(unsafeSize != null, `No layout data found for index ${index}`);
    const safeSize = resizePanel({
      panelConstraints,
      panelIndex: index,
      size: unsafeSize
    });
    if (unsafeSize != safeSize) {
      remainingSize += unsafeSize - safeSize;
      nextLayout[index] = safeSize;
    }
  }
  if (!fuzzyNumbersEqual2(remainingSize, 0)) {
    for (let index = 0; index < panelConstraints.length; index++) {
      const prevSize = nextLayout[index];
      assert(prevSize != null, `No layout data found for index ${index}`);
      const unsafeSize = prevSize + remainingSize;
      const safeSize = resizePanel({
        panelConstraints,
        panelIndex: index,
        size: unsafeSize
      });
      if (prevSize !== safeSize) {
        remainingSize -= safeSize - prevSize;
        nextLayout[index] = safeSize;
        if (fuzzyNumbersEqual2(remainingSize, 0)) {
          break;
        }
      }
    }
  }
  return nextLayout;
}

// src/PanelGroup.tsx
function PanelGroup({
  ref,
  autoSaveId = null,
  children,
  direction,
  onLayout = () => {
  },
  style,
  ...viewProps
}) {
  const groupId = (0, import_react4.useRef)(`panel-group-${Math.random().toString(36).slice(2)}`).current;
  const panelGroupRef = (0, import_react4.useRef)(null);
  const dragStateSV = (0, import_react_native_reanimated2.useSharedValue)(null);
  const layoutShared = (0, import_react_native_reanimated2.useSharedValue)([]);
  const panelIdsShared = (0, import_react_native_reanimated2.useSharedValue)([]);
  const [panelDataArray, setPanelDataArray] = (0, import_react4.useState)([]);
  const panelIdToLastNotifiedSizeMapRef = (0, import_react4.useRef)({});
  const panelSizeBeforeCollapseRef = (0, import_react4.useRef)(/* @__PURE__ */ new Map());
  const handleCountRef = (0, import_react4.useRef)(0);
  const handleToPivotsRef = (0, import_react4.useRef)({});
  const committedValuesRef = (0, import_react4.useRef)({
    autoSaveId,
    direction,
    onLayout
  });
  (0, import_react4.useLayoutEffect)(() => {
    committedValuesRef.current = {
      autoSaveId,
      direction,
      onLayout
    };
  }, [autoSaveId, direction, onLayout]);
  const setLayout = (0, import_react4.useCallback)(
    (nextLayout) => {
      const { onLayout: onLayout2 } = committedValuesRef.current;
      layoutShared.value = nextLayout;
      onLayout2(nextLayout);
      callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
    },
    [layoutShared, panelDataArray]
  );
  (0, import_react4.useLayoutEffect)(() => {
    const unsafeLayout = calculateUnsafeDefaultLayout({ panelDataArray });
    const nextLayout = validatePanelGroupLayout({
      layout: unsafeLayout,
      panelConstraints: panelDataArray.map((pd) => pd.constraints)
    });
    if (!areEqual(layoutShared.value, nextLayout)) {
      setLayout(nextLayout);
    }
    panelIdsShared.value = panelDataArray.map((pd) => pd.id);
  }, [panelDataArray, layoutShared, panelIdsShared, setLayout]);
  const registerPanel = (0, import_react4.useCallback)((panelData) => {
    setPanelDataArray((currentPanelDataArray) => {
      const newArray = [...currentPanelDataArray, panelData];
      newArray.sort((a, b) => {
        const oa = a.order, ob = b.order;
        if (oa == null && ob == null) return 0;
        if (oa == null) return -1;
        if (ob == null) return 1;
        return oa - ob;
      });
      return newArray;
    });
  }, []);
  const unregisterPanel = (0, import_react4.useCallback)((panelData) => {
    setPanelDataArray((currentPanelDataArray) => {
      const idx = currentPanelDataArray.findIndex((pd) => pd.id === panelData.id);
      if (idx >= 0) {
        delete panelIdToLastNotifiedSizeMapRef.current[panelData.id];
        const newArray = [...currentPanelDataArray];
        newArray.splice(idx, 1);
        return newArray;
      }
      return currentPanelDataArray;
    });
  }, []);
  (0, import_react4.useImperativeHandle)(
    ref,
    () => ({
      getId: () => groupId,
      getLayout: () => layoutShared.value,
      setLayout: (unsafeLayout) => {
        const prevLayout = layoutShared.value;
        const safeLayout = validatePanelGroupLayout({
          layout: unsafeLayout,
          panelConstraints: panelDataArray.map((pd) => pd.constraints)
        });
        if (!areEqual(prevLayout, safeLayout)) {
          setLayout(safeLayout);
        }
      }
    }),
    [layoutShared, panelDataArray, setLayout]
  );
  const registerHandle = (0, import_react4.useCallback)((handleId) => {
    const leftIndex = handleCountRef.current;
    const rightIndex = leftIndex + 1;
    handleToPivotsRef.current[handleId] = [leftIndex, rightIndex];
    handleCountRef.current += 1;
    return [leftIndex, rightIndex];
  }, []);
  const collapsePanel = (0, import_react4.useCallback)(
    (panelData) => {
      const prevLayout = layoutShared.value;
      if (panelData.constraints.collapsible) {
        const constraintsArr = panelDataArray.map((pd) => pd.constraints);
        const {
          collapsedSize = 0,
          panelSize,
          pivotIndices
        } = panelDataHelper(panelDataArray, panelData, prevLayout);
        if (panelSize != null && panelSize !== collapsedSize) {
          panelSizeBeforeCollapseRef.current.set(panelData.id, panelSize);
          const isLast = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
          const delta = isLast ? panelSize - collapsedSize : collapsedSize - panelSize;
          const nextLayout = adjustLayoutByDelta({
            delta,
            initialLayout: prevLayout,
            panelConstraints: constraintsArr,
            pivotIndices,
            prevLayout,
            trigger: "imperative-api"
          });
          if (!compareLayouts(prevLayout, nextLayout)) {
            setLayout(nextLayout);
          }
        }
      }
    },
    [layoutShared, panelDataArray, setLayout]
  );
  const expandPanel = (0, import_react4.useCallback)(
    (panelData, minSizeOverride) => {
      const prevLayout = layoutShared.value;
      if (panelData.constraints.collapsible) {
        const constraintsArr = panelDataArray.map((pd) => pd.constraints);
        const {
          collapsedSize = 0,
          panelSize = 0,
          minSize: minSizeFromProps = 0,
          pivotIndices
        } = panelDataHelper(panelDataArray, panelData, prevLayout);
        const minSize = minSizeOverride ?? minSizeFromProps;
        if (panelSize === collapsedSize) {
          const prevPanelSize = panelSizeBeforeCollapseRef.current.get(panelData.id);
          const baseSize = prevPanelSize != null && prevPanelSize >= minSize ? prevPanelSize : minSize;
          const isLast = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
          const delta = isLast ? panelSize - baseSize : baseSize - panelSize;
          const nextLayout = adjustLayoutByDelta({
            delta,
            initialLayout: prevLayout,
            panelConstraints: constraintsArr,
            pivotIndices,
            prevLayout,
            trigger: "imperative-api"
          });
          if (!compareLayouts(prevLayout, nextLayout)) {
            setLayout(nextLayout);
          }
        }
      }
    },
    [layoutShared, panelDataArray, setLayout]
  );
  const resizePanel2 = (0, import_react4.useCallback)(
    (panelData, unsafePanelSize) => {
      const prevLayout = layoutShared.value;
      const constraintsArr = panelDataArray.map((pd) => pd.constraints);
      const { panelSize, pivotIndices } = panelDataHelper(panelDataArray, panelData, prevLayout);
      if (panelSize != null) {
        const isLast = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
        const delta = isLast ? panelSize - unsafePanelSize : unsafePanelSize - panelSize;
        const nextLayout = adjustLayoutByDelta({
          delta,
          initialLayout: prevLayout,
          panelConstraints: constraintsArr,
          pivotIndices,
          prevLayout,
          trigger: "mouse-or-touch"
        });
        if (!compareLayouts(prevLayout, nextLayout)) {
          setLayout(nextLayout);
        }
      }
    },
    [layoutShared, panelDataArray, setLayout]
  );
  const getPanelSize = (0, import_react4.useCallback)(
    (panelData) => {
      const { panelSize } = panelDataHelper(panelDataArray, panelData, layoutShared.value);
      assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
      return panelSize;
    },
    [layoutShared, panelDataArray]
  );
  const isPanelCollapsed = (0, import_react4.useCallback)(
    (panelData) => {
      const {
        collapsedSize = 0,
        collapsible,
        panelSize
      } = panelDataHelper(panelDataArray, panelData, layoutShared.value);
      assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
      return collapsible === true && fuzzyNumbersEqual2(panelSize, collapsedSize);
    },
    [layoutShared, panelDataArray]
  );
  const isPanelExpanded = (0, import_react4.useCallback)(
    (panelData) => {
      const {
        collapsedSize = 0,
        collapsible,
        panelSize
      } = panelDataHelper(panelDataArray, panelData, layoutShared.value);
      assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
      return !collapsible || fuzzyCompareNumbers(panelSize, collapsedSize) > 0;
    },
    [layoutShared, panelDataArray]
  );
  const reevaluatePanelConstraints = (0, import_react4.useCallback)(
    (panelData, prevConstraints) => {
      const layout = layoutShared.value;
      const { collapsedSize: prevCollapsed = 0, collapsible: prevCollapsible } = prevConstraints;
      const {
        collapsedSize: nextCollapsed = 0,
        collapsible: nextCollapsible,
        maxSize: nextMax = 100,
        minSize: nextMin = 0
      } = panelData.constraints;
      const { panelSize: prevPanelSize } = panelDataHelper(panelDataArray, panelData, layout);
      if (prevPanelSize == null) return;
      if (prevCollapsible && nextCollapsible && prevPanelSize === prevCollapsed) {
        if (prevCollapsed !== nextCollapsed) {
          resizePanel2(panelData, nextCollapsed);
        }
      } else if (prevPanelSize < nextMin) {
        resizePanel2(panelData, nextMin);
      } else if (prevPanelSize > nextMax) {
        resizePanel2(panelData, nextMax);
      }
    },
    [layoutShared, panelDataArray, resizePanel2]
  );
  const startDragging = (0, import_react4.useCallback)(
    (dragHandleId) => {
      if (!panelGroupRef.current) return;
      const pivotIndices = handleToPivotsRef.current[dragHandleId];
      if (!pivotIndices) {
        console.warn(`Handle "${dragHandleId}" not found`);
        return;
      }
      panelGroupRef.current.measure((x, y, width, height) => {
        const isHorizontal = committedValuesRef.current.direction === "horizontal";
        dragStateSV.value = {
          dragHandleId,
          initialLayout: layoutShared.value,
          pivotIndices,
          containerSizePx: isHorizontal ? width : height
        };
      });
    },
    [dragStateSV, layoutShared]
  );
  const stopDragging = (0, import_react4.useCallback)(() => {
    dragStateSV.value = null;
  }, [dragStateSV]);
  const updateLayout = (0, import_react4.useCallback)(
    (dragHandleId, event) => {
      const { value: dragState } = dragStateSV;
      if (!dragState || dragState.dragHandleId !== dragHandleId) {
        return;
      }
      const { direction: direction2 } = committedValuesRef.current;
      const { initialLayout, pivotIndices, containerSizePx } = dragState;
      const isHorizontal = direction2 === "horizontal";
      const delta = isHorizontal ? event.translationX : event.translationY;
      if (containerSizePx === 0) {
        return;
      }
      const deltaPercentage = delta / containerSizePx * 100;
      const panelConstraints = panelDataArray.map((pd) => pd.constraints);
      const nextLayout = adjustLayoutByDelta({
        delta: deltaPercentage,
        initialLayout,
        panelConstraints,
        pivotIndices,
        prevLayout: layoutShared.value,
        trigger: "mouse-or-touch"
      });
      if (!compareLayouts(layoutShared.value, nextLayout)) {
        setLayout(nextLayout);
      }
    },
    [layoutShared, panelDataArray, setLayout]
  );
  const getPanelIndex = (0, import_react4.useCallback)(
    (panelData) => {
      return panelDataArray.findIndex((pd) => pd.id === panelData.id);
    },
    [panelDataArray]
  );
  const contextValue = (0, import_react4.useMemo)(
    () => ({
      collapsePanel,
      direction,
      dragState: dragStateSV,
      expandPanel,
      getPanelSize,
      getPanelIndex,
      groupId,
      isPanelCollapsed,
      isPanelExpanded,
      reevaluatePanelConstraints,
      registerPanel,
      registerHandle,
      updateLayout,
      resizePanel: resizePanel2,
      startDragging,
      stopDragging,
      unregisterPanel,
      layoutShared,
      panelIdsShared
    }),
    [
      collapsePanel,
      direction,
      dragStateSV,
      expandPanel,
      getPanelSize,
      getPanelIndex,
      groupId,
      isPanelCollapsed,
      isPanelExpanded,
      reevaluatePanelConstraints,
      registerPanel,
      registerHandle,
      updateLayout,
      resizePanel2,
      startDragging,
      stopDragging,
      unregisterPanel,
      layoutShared,
      panelIdsShared
    ]
  );
  const containerStyle = [
    { flex: 1, flexDirection: direction === "horizontal" ? "row" : "column" },
    style
  ];
  return <PanelGroupContext.Provider value={contextValue}>
      <import_react_native.View ref={panelGroupRef} style={containerStyle} {...viewProps}>
        {children}
      </import_react_native.View>
    </PanelGroupContext.Provider>;
}
function findPanelDataIndex(panelDataArray, panelData) {
  return panelDataArray.findIndex((p) => p.id === panelData.id);
}
function panelDataHelper(panelDataArray, panelData, layout) {
  const panelIndex = findPanelDataIndex(panelDataArray, panelData);
  const isLastPanel = panelIndex === panelDataArray.length - 1;
  const pivotIndices = isLastPanel ? [panelIndex - 1, panelIndex] : [panelIndex, panelIndex + 1];
  const panelSize = layout[panelIndex];
  return {
    ...panelData.constraints,
    panelSize,
    pivotIndices
  };
}

// src/PanelResizeHandle.tsx
var import_react5 = require("react");
var import_react_native2 = require("react-native");
var import_react_native_gesture_handler = require("react-native-gesture-handler");
var import_react_native_reanimated3 = require("react-native-reanimated");
function PanelResizeHandle({
  style,
  disabled = false,
  onDragging,
  ...viewProps
}) {
  const context = (0, import_react5.useContext)(PanelGroupContext);
  if (context === null) {
    throw new Error("<PanelResizeHandle> must be rendered inside a <PanelGroup>");
  }
  const { direction, startDragging, updateLayout, stopDragging, registerHandle } = context;
  const handleIdRef = (0, import_react5.useRef)(`resize-handle-${Math.random().toString(36).slice(2)}`);
  (0, import_react5.useEffect)(() => {
    registerHandle(handleIdRef.current);
  }, [registerHandle]);
  const panGesture = import_react_native_gesture_handler.Gesture.Pan().onBegin(() => {
    "worklet";
    if (disabled) return;
    if (onDragging) {
      (0, import_react_native_reanimated3.runOnJS)(onDragging)(true);
    }
    (0, import_react_native_reanimated3.runOnJS)(startDragging)(handleIdRef.current);
  }).onUpdate((e) => {
    "worklet";
    if (disabled) return;
    (0, import_react_native_reanimated3.runOnJS)(updateLayout)(handleIdRef.current, e);
  }).onEnd(() => {
    "worklet";
    if (disabled) return;
    if (onDragging) {
      (0, import_react_native_reanimated3.runOnJS)(onDragging)(false);
    }
    (0, import_react_native_reanimated3.runOnJS)(stopDragging)();
  });
  const defaultHandleStyle = direction === "horizontal" ? { width: 10, alignSelf: "stretch" } : { height: 10, alignSelf: "stretch" };
  return <import_react_native_gesture_handler.GestureDetector gesture={panGesture}>
      <import_react_native2.View style={[defaultHandleStyle, style]} {...viewProps} />
    </import_react_native_gesture_handler.GestureDetector>;
}

// src/hooks/usePanelGroupContext.ts
var import_react6 = require("react");
function usePanelGroupContext() {
  const context = (0, import_react6.useContext)(PanelGroupContext);
  return {
    direction: context?.direction,
    groupId: context?.groupId
  };
}

// src/utils/csp.ts
var nonce;
function setNonce(value) {
  nonce = value;
}

// src/utils/dom/getPanelElement.ts
function getPanelElement(id, scope = document) {
  const element = scope.querySelector(`[data-panel-id="${id}"]`);
  if (element) {
    return element;
  }
  return null;
}

// src/utils/dom/getPanelElementsForGroup.ts
function getPanelElementsForGroup(groupId, scope = document) {
  return Array.from(scope.querySelectorAll(`[data-panel][data-panel-group-id="${groupId}"]`));
}

// src/utils/dom/isHTMLElement.ts
function isHTMLElement(target) {
  if (target instanceof HTMLElement) {
    return true;
  }
  return typeof target === "object" && target !== null && "tagName" in target && "getAttribute" in target;
}

// src/utils/dom/getPanelGroupElement.ts
function getPanelGroupElement(id, rootElement = document) {
  if (isHTMLElement(rootElement) && rootElement.dataset.panelGroupId == id) {
    return rootElement;
  }
  const element = rootElement.querySelector(`[data-panel-group][data-panel-group-id="${id}"]`);
  if (element) {
    return element;
  }
  return null;
}

// src/utils/dom/getResizeHandleElement.ts
function getResizeHandleElement(id, scope = document) {
  const element = scope.querySelector(`[${DATA_ATTRIBUTES.resizeHandleId}="${id}"]`);
  if (element) {
    return element;
  }
  return null;
}

// src/utils/dom/getResizeHandleElementsForGroup.ts
function getResizeHandleElementsForGroup(groupId, scope = document) {
  return Array.from(
    scope.querySelectorAll(`[${DATA_ATTRIBUTES.resizeHandleId}][data-panel-group-id="${groupId}"]`)
  );
}

// src/utils/dom/getResizeHandleElementIndex.ts
function getResizeHandleElementIndex(groupId, id, scope = document) {
  const handles = getResizeHandleElementsForGroup(groupId, scope);
  const index = handles.findIndex(
    (handle) => handle.getAttribute(DATA_ATTRIBUTES.resizeHandleId) === id
  );
  return index ?? null;
}

// src/utils/dom/getResizeHandlePanelIds.ts
function getResizeHandlePanelIds(groupId, handleId, panelsArray, scope = document) {
  const handle = getResizeHandleElement(handleId, scope);
  const handles = getResizeHandleElementsForGroup(groupId, scope);
  const index = handle ? handles.indexOf(handle) : -1;
  const idBefore = panelsArray[index]?.id ?? null;
  const idAfter = panelsArray[index + 1]?.id ?? null;
  return [idBefore, idAfter];
}

// src/utils/rects/intersects.ts
function intersects(rectOne, rectTwo, strict) {
  if (strict) {
    return rectOne.x < rectTwo.x + rectTwo.width && rectOne.x + rectOne.width > rectTwo.x && rectOne.y < rectTwo.y + rectTwo.height && rectOne.y + rectOne.height > rectTwo.y;
  } else {
    return rectOne.x <= rectTwo.x + rectTwo.width && rectOne.x + rectOne.width >= rectTwo.x && rectOne.y <= rectTwo.y + rectTwo.height && rectOne.y + rectOne.height >= rectTwo.y;
  }
}

// src/utils/rects/getIntersectingRectangle.ts
function getIntersectingRectangle(rectOne, rectTwo, strict) {
  if (!intersects(rectOne, rectTwo, strict)) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  }
  return {
    x: Math.max(rectOne.x, rectTwo.x),
    y: Math.max(rectOne.y, rectTwo.y),
    width: Math.min(rectOne.x + rectOne.width, rectTwo.x + rectTwo.width) - Math.max(rectOne.x, rectTwo.x),
    height: Math.min(rectOne.y + rectOne.height, rectTwo.y + rectTwo.height) - Math.max(rectOne.y, rectTwo.y)
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DATA_ATTRIBUTES,
  Panel,
  PanelGroup,
  PanelResizeHandle,
  assert,
  getIntersectingRectangle,
  getPanelElement,
  getPanelElementsForGroup,
  getPanelGroupElement,
  getResizeHandleElement,
  getResizeHandleElementIndex,
  getResizeHandleElementsForGroup,
  getResizeHandlePanelIds,
  intersects,
  setNonce,
  usePanelGroupContext
});
