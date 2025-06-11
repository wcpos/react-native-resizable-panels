import { StyleSheet } from 'react-native';

export const colors = {
  panelBackground: '#1e1e1e',
  scrollThumb: '#555555',
  buttonBackground: '#444444',
  buttonBackgroundHover: '#555555',
  default: '#ffffff',
  warningBackground: '#2c2a22',
};

// Assuming a base font size of 16px for rem/em conversions
const baseSize = 16;
const chSize = 8; // Approximate size of 'ch' unit

export const styles = StyleSheet.create({
  PanelGroupWrapper: {
    height: 20 * baseSize,
    gap: 16,
  },
  PanelGroupWrapperShort: {
    height: 10 * baseSize,
  },
  PanelGroupWrapperTall: {
    height: 30 * baseSize,
  },
  PanelGroup: {
    flex: 1,
  },
  Panel: {
    display: 'flex',
  },
  PanelColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  PanelRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  Centered: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panelBackground,
    borderRadius: 0.5 * baseSize,
    overflow: 'hidden',
    fontSize: 1 * baseSize,
    padding: 0.5 * baseSize,
  },
  ResizeHandle: {},
  Overflow: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    padding: 1 * baseSize,
  },
  Button: {
    backgroundColor: colors.buttonBackground,
    color: colors.default,
    borderWidth: 0,
    borderRadius: 0.5 * baseSize,
    paddingVertical: 0.25 * baseSize,
    paddingHorizontal: 0.5 * baseSize,
  },
  ButtonHover: {
    backgroundColor: colors.buttonBackgroundHover,
  },
  ButtonDisabled: {
    backgroundColor: colors.buttonBackground,
    color: colors.default,
    borderWidth: 0,
    borderRadius: 0.5 * baseSize,
    paddingVertical: 0.25 * baseSize,
    paddingHorizontal: 0.5 * baseSize,
    opacity: 0.5,
  },
  Buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1 * chSize,
    marginBottom: 1 * baseSize,
  },
  Capitalize: {
    textTransform: 'capitalize',
  },
  WarningBlock: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 1 * chSize,
    backgroundColor: colors.warningBackground,
    padding: 0.5 * baseSize,
    borderRadius: 0.5 * baseSize,
  },
  WarningIcon: {
    flexBasis: 2 * baseSize,
    width: 2 * baseSize,
    height: 2 * baseSize,
  },
  InlineCode: {
    marginRight: 1.5 * chSize,
  },
});
