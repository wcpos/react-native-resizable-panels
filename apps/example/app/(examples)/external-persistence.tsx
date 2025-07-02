import { Text } from 'react-native';
import { Panel, PanelGroup } from 'react-native-resizable-panels';

import { ExamplePage } from '@/components/ExamplePage';
import { ResizeHandle } from '@/components/ResizeHandle';
import { colors, styles } from '@/styles/common';

const description =
  'External persistence is useful when you want to persist the panel state across sessions.';

const code = `<PanelGroup autoSaveId="example" direction="horizontal">
   <Panel>left</Panel>
   <ResizeHandle />
   <Panel>middle</Panel>
   <ResizeHandle />
   <Panel>right</Panel>
 </PanelGroup>`;

export default function ExternalPersistenceScreen() {
  return (
    <ExamplePage description={description} code={code}>
      <PanelGroup autoSaveId="example" style={styles.PanelGroup} direction="horizontal">
        <Panel style={styles.PanelRow} collapsible={true} minSize={10}>
          <Text style={{ ...styles.Centered, color: colors.default }}>left</Text>
        </Panel>
        <ResizeHandle />
        <Panel style={styles.PanelRow} minSize={10}>
          <Text style={{ ...styles.Centered, color: colors.default }}>middle</Text>
        </Panel>
        <ResizeHandle />
        <Panel style={styles.PanelRow} collapsible={true} minSize={10}>
          <Text style={{ ...styles.Centered, color: colors.default }}>right</Text>
        </Panel>
      </PanelGroup>
    </ExamplePage>
  );
}
