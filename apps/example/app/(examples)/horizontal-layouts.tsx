import { ExamplePage } from '@/components/ExamplePage';
import { colors, styles } from '@/styles/common';
import { Text } from 'react-native';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-native-resizable-panels';

const description =
  'Horizontal layouts are defined by setting the "direction" prop to "horizontal".';

const code = `<PanelGroup direction="horizontal">
  <Panel defaultSize={30} minSize={20}>
    <Text>left</Text>
  </Panel>
  <PanelResizeHandle />
  <Panel minSize={30}>
    <Text>middle</Text>
  </Panel>
  <PanelResizeHandle />
  <Panel defaultSize={30} minSize={20}>
    <Text>right</Text>
  </Panel>
</PanelGroup>`;

export default function HorizontalLayoutsScreen() {
  return (
    <ExamplePage description={description} code={code}>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={20}>
          <Text style={{ ...styles.Centered, color: colors.default }}>left</Text>
        </Panel>
        <PanelResizeHandle style={styles.ResizeHandle} />
        <Panel minSize={30}>
          <Text style={{ ...styles.Centered, color: colors.default }}>middle</Text>
        </Panel>
        <PanelResizeHandle style={styles.ResizeHandle} />
        <Panel defaultSize={30} minSize={20}>
          <Text style={{ ...styles.Centered, color: colors.default }}>right</Text>
        </Panel>
      </PanelGroup>
    </ExamplePage>
  );
}
