import { Text } from 'react-native';
import { Panel, PanelGroup } from 'react-native-resizable-panels';

import { ExamplePage } from '@/components/ExamplePage';
import { ResizeHandle } from '@/components/ResizeHandle';
import { colors, styles } from '@/styles/common';

const description =
  'Layouts are automatically saved when an `autoSaveId` prop is provided. Try this by editing the layout below and then reloading the page.';

const code = `<PanelGroup autoSaveId="persistence" direction="horizontal">
  <Panel>
    <Text>left</Text>
  </Panel>
  <ResizeHandle />
  <Panel>
    <Text>right</Text>
  </Panel>
</PanelGroup>`;

export default function PersistentLayoutsScreen() {
  return (
    <ExamplePage description={description} code={code}>
      <PanelGroup autoSaveId="persistence" direction="horizontal" style={styles.PanelGroup}>
        <Panel style={styles.PanelColumn} minSize={10}>
          <Text style={{ ...styles.Centered, color: colors.default }}>left</Text>
        </Panel>
        <ResizeHandle />
        <Panel style={styles.PanelRow} minSize={10}>
          <Text style={{ ...styles.Centered, color: colors.default }}>middle</Text>
        </Panel>
        <ResizeHandle />
        <Panel style={styles.PanelColumn} minSize={10}>
          <Text style={{ ...styles.Centered, color: colors.default }}>right</Text>
        </Panel>
      </PanelGroup>
    </ExamplePage>
  );
}
