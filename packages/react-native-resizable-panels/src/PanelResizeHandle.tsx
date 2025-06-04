import React, { useContext, useRef } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { PanelGroupContext } from './PanelGroupContext';

export type PanelResizeHandleOnDragging = (isDragging: boolean) => void;

export type PanelResizeHandleProps = {
  /**
   * An optional style to apply to the handle View.
   * By default, we give it a thin touchable bar that spans the full cross‐axis.
   */
  style?: StyleProp<ViewStyle>;

  /** If true, the handle is disabled (no gestures). */
  disabled?: boolean;

  /**
   * The two panel indices that this handle sits between.
   * E.g. if this handle is between panels 1 and 2, pass [1, 2].
   */
  pivotIndices: [number, number];

  /**
   * A callback that is called when the handle is dragged.
   */
  onDragging?: PanelResizeHandleOnDragging;
};

/**
 * A draggable handle between two panels. Uses React Native Gesture Handler
 * with GestureDetector + Gesture.Pan().
 */
export function PanelResizeHandle({
  style,
  disabled = false,
  pivotIndices,
  onDragging,
  ...viewProps
}: PanelResizeHandleProps) {
  const context = useContext(PanelGroupContext);
  if (context === null) {
    throw new Error('<PanelResizeHandle> must be rendered inside a <PanelGroup>');
  }

  const { direction, startDragging, registerResizeHandle, stopDragging } = context;

  // Give each handle a stable unique ID, so the parent can track them separately.
  const handleIdRef = useRef<string>(`resize-handle-${Math.random().toString(36).slice(2)}`);

  // Create a Pan gesture. onBegin triggers startDragging,
  // onUpdate runs the resize handler, onEnd calls stopDragging.
  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      if (disabled) return;
      onDragging?.(true);
      startDragging(handleIdRef.current, pivotIndices, e);
    })
    .onChange((e) => {
      if (disabled) return;
      const resizeHandler = registerResizeHandle(handleIdRef.current);
      resizeHandler(e);
    })
    .onEnd(() => {
      if (disabled) return;
      onDragging?.(false);
      stopDragging();
    });

  /**
   * The visual/clickable area:
   * • If direction is 'horizontal', we make a thin vertical bar wide enough for touches.
   * • If direction is 'vertical', we make a thin horizontal bar tall enough for touches.
   * You can override via style={…}.
   */
  const defaultHandleStyle: ViewStyle =
    direction === 'horizontal'
      ? { width: 10, alignSelf: 'stretch' }
      : { height: 10, alignSelf: 'stretch' };

  return (
    <GestureDetector gesture={panGesture}>
      <View style={[defaultHandleStyle, style]} />
    </GestureDetector>
  );
}
