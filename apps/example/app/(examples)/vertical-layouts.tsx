import { Text } from 'react-native';
import { Panel, PanelGroup } from 'react-native-resizable-panels';

import { ExamplePage } from '@/components/ExamplePage';
import { ResizeHandle } from '@/components/ResizeHandle';
import { colors, styles } from '@/styles/common';

const description = 'Vertical layouts are defined by setting the "direction" prop to "vertical".';

const code = `<PanelGroup direction="vertical">
  <Panel defaultSize={50} maxSize={75} minSize={10}>
    <Text>top</Text>
  </Panel>
  <ResizeHandle />
  <Panel maxSize={75} minSize={10}>
    <Text>bottom</Text>
  </Panel>
</PanelGroup>`;

export default function VerticalLayoutsScreen() {
  return (
    <ExamplePage description={description} code={code}>
      <PanelGroup style={styles.PanelGroup} direction="vertical">
        <Panel style={styles.PanelColumn} defaultSize={50} maxSize={75} minSize={10}>
          <Text style={{ ...styles.Centered, color: colors.default }}>top</Text>
        </Panel>
        <ResizeHandle />
        <Panel style={styles.PanelColumn} maxSize={75} minSize={10}>
          <Text style={{ ...styles.Centered, color: colors.default }}>bottom</Text>
        </Panel>
      </PanelGroup>
    </ExamplePage>
  );
}
