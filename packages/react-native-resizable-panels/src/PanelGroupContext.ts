import { createContext } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { PanelConstraints, PanelData } from './Panel';

export type DragState = {
  dragHandleId: string;
  initialLayout: number[];
  pivotIndices: [number, number];
  containerSizePx: number;
};

export type TPanelGroupContext = {
  collapsePanel: (panelData: PanelData) => void;
  direction: 'horizontal' | 'vertical';
  dragState: DragState | null;
  expandPanel: (panelData: PanelData, minSizeOverride?: number) => void;
  getPanelSize: (panelData: PanelData) => number;
  getPanelStyle: (panelData: PanelData, defaultSize: number | undefined) => StyleProp<ViewStyle>;
  groupId: string;
  isPanelCollapsed: (panelData: PanelData) => boolean;
  isPanelExpanded: (panelData: PanelData) => boolean;
  reevaluatePanelConstraints: (panelData: PanelData, prevConstraints: PanelConstraints) => void;
  registerPanel: (panelData: PanelData) => void;
  registerResizeHandle: (
    dragHandleId: string
  ) => (gesture: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void;
  resizePanel: (panelData: PanelData, size: number) => void;
  startDragging: (
    dragHandleId: string,
    pivotIndices: [number, number],
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => void;
  stopDragging: () => void;
  unregisterPanel: (panelData: PanelData) => void;
};
export const PanelGroupContext = createContext<TPanelGroupContext | null>(null);

PanelGroupContext.displayName = 'PanelGroupContext';
