# react-native-resizable-panels

React Native components for resizable panel groups/layouts, using `react-native-reanimated` and `react-native-gesture-handler`.

This library is a port of the popular `react-resizable-panels` for web, and aims to provide the same powerful and flexible API for native applications.

Supported input methods include touch gestures.

---

This project is a direct translation of the great `react-resizable-panels` library by [Brian Vaughn](https://github.com/bvaughn). All credit for the API design and implementation goes to him. If you find this library useful, please consider supporting the [original project](https://github.com/bvaughn/react-resizable-panels).

---

## Installation

```bash
# yarn
yarn add react-native-resizable-panels react-native-reanimated react-native-gesture-handler

# npm
npm install react-native-resizable-panels react-native-reanimated react-native-gesture-handler
```

You also need to ensure `react-native-reanimated` and `react-native-gesture-handler` are set up correctly. Please follow their respective installation instructions.

## Example App

You can find a comprehensive example app in the `apps/example` directory of this repository.

## API

### `PanelGroup`

| prop       | type                       | description                                                      |
| ---------- | -------------------------- | ---------------------------------------------------------------- |
| autoSaveId | ?string                    | Unique id used to auto-save group arrangement via `AsyncStorage` |
| children   | ReactNode                  | Arbitrary React element(s)                                       |
| direction  | "horizontal" \| "vertical" | Group orientation                                                |
| id         | ?string                    | Group id; falls back to `useId` when not provided                |
| onLayout   | ?(sizes: number[]) => void | Called when group layout changes                                 |
| style      | ?ViewStyle                 | Style to attach to root element                                  |

`PanelGroup` components also expose an imperative API for manual resizing:

| method                  | description                                                      |
| ----------------------- | ---------------------------------------------------------------- |
| `getId(): string`       | Gets the panel group's ID.                                       |
| `getLayout(): number[]` | Gets the panel group's current _layout_ (\[0 - 100, ...\]).      |
| `setLayout(number[])`   | Resize panel group to the specified _layout_ (\[0 - 100, ...\]). |

### `Panel`

| prop          | type                    | description                                                                         |
| ------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| children      | ReactNode               | Arbitrary React element(s)                                                          |
| collapsedSize | ?number=0               | Panel should collapse to this size                                                  |
| collapsible   | ?boolean=false          | Panel should collapse when resized beyond its `minSize`                             |
| defaultSize   | ?number                 | Initial size of panel (numeric value between 0-100)                                 |
| id            | ?string                 | Panel id (unique within group); falls back to `useId` when not provided             |
| maxSize       | ?number = 100           | Maximum allowable size of panel (numeric value between 0-100)                       |
| minSize       | ?number = 10            | Minimum allowable size of panel (numeric value between 0-100)                       |
| onCollapse    | ?() => void             | Called when panel is collapsed                                                      |
| onExpand      | ?() => void             | Called when panel is expanded                                                       |
| onResize      | ?(size: number) => void | Called when panel is resized; size parameter is a numeric value between 0-100.      |
| order         | ?number                 | Order of panel within group; required for groups with conditionally rendered panels |
| style         | ?ViewStyle              | Style to attach to root element                                                     |

`Panel` components also expose an imperative API for manual resizing:

| method                   | description                                                                    |
| ------------------------ | ------------------------------------------------------------------------------ |
| `collapse()`             | If panel is collapsible, collapse it fully.                                    |
| `expand()`               | If panel is currently _collapsed_, expand it to its most recent size.          |
| `getId(): string`        | Gets the ID of the panel.                                                      |
| `getSize(): number`      | Gets the current size of the panel as a percentage (0 - 100).                  |
| `isCollapsed(): boolean` | Returns true if the panel is currently _collapsed_ (size === `collapsedSize`). |
| `isExpanded(): boolean`  | Returns true if the panel is currently _not collapsed_ (`!isCollapsed()`).     |
| `resize(size: number)`   | Resize panel to the specified _percentage_ (0 - 100).                          |

### `PanelResizeHandle`

| prop       | type                           | description                                           |
| ---------- | ------------------------------ | ----------------------------------------------------- |
| children   | ?ReactNode                     | Custom drag UI; can be any arbitrary React element(s) |
| disabled   | ?boolean                       | Disable drag handle                                   |
| id         | ?string                        | Resize handle id (unique within group)                |
| onDragging | ?(isDragging: boolean) => void | Called when group layout changes                      |
| style      | ?ViewStyle                     | Style to attach to root element                       |

## FAQ

### Can panel sizes be specified in pixels?

No. Pixel-based constraints added significant complexity to the initialization and validation logic and so they are not supported.

### How can I fix layout/sizing problems with conditionally rendered panels?

The `Panel` API doesn't _require_ `id` and `order` props because they aren't necessary for static layouts. When panels are conditionally rendered though, it's best to supply these values.

```tsx
import { Panel, PanelGroup, PanelResizeHandle } from 'react-native-resizable-panels';

<PanelGroup direction="horizontal">
  {renderSideBar && (
    <>
      <Panel id="sidebar" minSize={25} order={1}>
        <Sidebar />
      </Panel>
      <PanelResizeHandle />
    </>
  )}
  <Panel minSize={25} order={2}>
    <Main />
  </Panel>
</PanelGroup>;
```

### Why don't I see any resize UI?

This likely means that you haven't applied any styling to the resize handles. By default, a resize handle is just an empty `View`. To add styling, use the `style` prop:

```tsx
import { PanelResizeHandle } from 'react-native-resizable-panels';
import { StyleSheet } from 'react-native';

<PanelResizeHandle style={styles.resizeHandle} />;

const styles = StyleSheet.create({
  resizeHandle: {
    width: 4,
    backgroundColor: '#888888',
  },
});
```

### Can panel sizes be persistent?

Yes. Panel groups with an `autoSaveId` prop will automatically save and restore their layouts on mount using `AsyncStorage`.
