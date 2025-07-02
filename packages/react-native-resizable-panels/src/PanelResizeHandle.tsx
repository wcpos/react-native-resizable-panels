import React, { useContext, useEffect, useRef } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

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
  onDragging,
  ...viewProps
}: PanelResizeHandleProps) {
  const context = useContext(PanelGroupContext);
  if (context === null) {
    throw new Error('<PanelResizeHandle> must be rendered inside a <PanelGroup>');
  }

  const { direction, startDragging, updateLayout, stopDragging, registerHandle } = context;

  // Give each handle a stable unique ID, so the parent can track them separately.
  const handleIdRef = useRef<string>(`resize-handle-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    registerHandle(handleIdRef.current);
    // no cleanup needed—if the handle unmounts, the group will eventually drop its map entry
    // (or you could add an unregisterHandle if you want).
  }, [registerHandle]);

  // Create a Pan gesture. onBegin triggers startDragging,
  // onUpdate runs the resize handler, onEnd calls stopDragging.
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      'worklet';
      if (disabled) return;
      if (onDragging) {
        runOnJS(onDragging)(true);
      }
      runOnJS(startDragging)(handleIdRef.current);
    })
    .onUpdate((e: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      'worklet';
      if (disabled) return;
      runOnJS(updateLayout)(handleIdRef.current, e);
    })
    .onEnd(() => {
      'worklet';
      if (disabled) return;
      if (onDragging) {
        runOnJS(onDragging)(false);
      }
      runOnJS(stopDragging)();
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
      <View style={[defaultHandleStyle, style]} {...viewProps} />
    </GestureDetector>
  );
}
