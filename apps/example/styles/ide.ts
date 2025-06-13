import { StyleSheet } from 'react-native';

export const ide = StyleSheet.create({
  resizeHandle: {
    width: 4, // 0.25rem converted to pixels
    backgroundColor: 'var(--color-button-background)',
  },
  resizeHandleCollapsed: {
    width: 4,
    backgroundColor: 'var(--color-button-background-hover)',
  },
  resizeHandleActive: {
    backgroundColor: 'var(--color-brand)',
  },
  resizeHandleTouch: {
    width: 16, // 1rem converted to pixels
  },
  ide: {
    backgroundColor: 'var(--color-panel-background)',
    borderRadius: 8, // 0.5rem converted to pixels
  },
  toolbar: {
    width: 48, // 3rem converted to pixels
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'var(--color-button-background)',
    paddingTop: 8, // 0.5rem converted to pixels
  },
  toolbarIcon: {
    flex: 0,
    width: 48,
    height: 40, // 2.5rem converted to pixels
    paddingHorizontal: 12, // 0.75rem converted to pixels
    color: 'var(--color-dim)',
  },
  toolbarIconActive: {
    flex: 0,
    width: 48,
    height: 40,
    paddingHorizontal: 12,
    color: 'var(--color-default)',
    borderLeftWidth: 2,
    borderLeftColor: 'var(--color-default)',
  },
  fileList: {
    flex: 1,
    fontSize: 16, // 1rem converted to pixels
    fontFamily: 'monospace',
  },
  sourceIcon: {
    // Empty style preserved
  },
  directoryEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16, // 1ch converted to pixels
    gap: 16,
    height: 24, // 1.5em converted to pixels
  },
  fileEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 48, // 3ch converted to pixels
    gap: 16,
    height: 24,
  },
  fileEntryActive: {
    backgroundColor: 'var(--color-button-background)',
  },
  fileIcon: {
    flex: 0,
    width: 48, // 3ch converted to pixels
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-brand)',
    fontWeight: 'bold',
    fontSize: 12, // 0.75em converted to pixels
  },
  sourceTabs: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: 'var(--color-button-background)',
  },
  sourceTab: {
    flex: 0,
    padding: 8, // 0.5rem converted to pixels
    paddingHorizontal: 16, // 1ch converted to pixels
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'var(--color-panel-background)',
    borderRightWidth: 1,
    borderRightColor: 'var(--color-background-default)',
  },
  sourceTabActive: {
    backgroundColor: 'var(--color-background-code)',
  },
  closeButton: {
    padding: 4, // 0.25em converted to pixels
    borderRadius: 4, // 0.25em converted to pixels
  },
  closeButtonActive: {
    backgroundColor: 'var(--color-button-background)',
  },
  closeIcon: {
    height: 12, // 0.75rem converted to pixels
    width: 12,
    color: 'var(--color-default)',
  },
});
