import { Text } from 'react-native';
import { Panel, PanelGroup } from 'react-native-resizable-panels';

import { ExamplePage } from '@/components/ExamplePage';
import { ResizeHandle } from '@/components/ResizeHandle';
import { colors, styles } from '@/styles/common';

const description =
  'Horizontal layouts are defined by setting the "direction" prop to "horizontal".';

const code = `<PanelGroup direction="horizontal">
  <Panel defaultSize={30} minSize={20}>
    <Text>left</Text>
  </Panel>
  <ResizeHandle />
  <Panel minSize={30}>
    <Text>middle</Text>
  </Panel>
  <ResizeHandle />
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
        <ResizeHandle />
        <Panel minSize={30}>
          <Text style={{ ...styles.Centered, color: colors.default }}>middle</Text>
        </Panel>
        <ResizeHandle />
        <Panel defaultSize={30} minSize={20}>
          <Text style={{ ...styles.Centered, color: colors.default }}>right</Text>
        </Panel>
      </PanelGroup>
    </ExamplePage>
  );
}
