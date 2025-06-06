// utils/computePanelFlexBoxStyle.ts
import type { ViewStyle } from 'react-native';
import type { PanelData } from '../Panel';
import type { DragState } from '../PanelGroupContext';

export function computePanelFlexBoxStyle(args: {
  defaultSize: number | undefined;
  layout: number[];
  dragState: DragState | null;
  panelData: PanelData[];
  panelIndex: number;
  /** How many significant digits to keep when converting number→string. */
  precision?: number;
}): ViewStyle {
  const { defaultSize, layout, dragState, panelData, panelIndex, precision = 3 } = args;

  // “size” will be undefined on the very first render (before layout is computed).
  const size = layout[panelIndex];

  let flexGrowValue: number;

  if (size == null) {
    // (1) Initial render → fall back to defaultSize (if provided), or just “1”
    if (defaultSize != null) {
      // Use defaultSize (e.g. 25 → “25”), but as a number, not a string.
      // We’ll let React Native turn that into an actual flexGrow: 25.
      flexGrowValue = Number(defaultSize.toPrecision(precision));
    } else {
      // If the user didn’t pass a defaultSize, each panel will just get “1”,
      // so that multiple panels share space equally.
      flexGrowValue = 1;
    }
  } else if (panelData.length === 1) {
    // (2) Special case: if there’s only one panel, it always takes up 100% of space,
    // so “flexGrow=1” is effectively “fill all space.”
    flexGrowValue = 1;
  } else {
    // (3) Normal case: use the percentage from layout[panelIndex] (0–100).
    // If layout[panelIndex] is “25”, flexGrow=25 means “25 parts of the total flex.”
    flexGrowValue = Number(size.toPrecision(precision));
  }

  return {
    flexBasis: 0,
    flexGrow: flexGrowValue,
    flexShrink: 1,

    // Prevent child content from overflowing its panel
    overflow: 'hidden',

    // Disable pointer events inside this panel while dragging (so that e.g. touches
    // on nested elements don’t interfere mid-drag).
    pointerEvents: dragState !== null ? 'none' : 'auto',
  };
}
