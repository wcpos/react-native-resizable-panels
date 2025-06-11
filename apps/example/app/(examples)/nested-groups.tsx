import { ExamplePage } from '@/components/ExamplePage';
import { colors, styles } from '@/styles/common';
import { Text } from 'react-native';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-native-resizable-panels';

const description =
  'This example shows nested groups. Click near the intersection of two groups to resize in multiple directions at once.';

const code = `<PanelGroup direction="horizontal">
  <Panel>
    left
  </Panel>
  <PanelResizeHandle />
  <Panel>
    <PanelGroup direction="vertical">
      <Panel>
        top
      </Panel>
      <PanelResizeHandle />
      <Panel>
        <PanelGroup direction="horizontal">
          <Panel>
            left
          </Panel>
          <PanelResizeHandle />
          <Panel>
            right
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  </Panel>
  <PanelResizeHandle />
  <Panel>
    right
  </Panel>
</PanelGroup>`;

export default function NestedGroupsScreen() {
  return (
    <ExamplePage description={description} code={code}>
      <PanelGroup style={styles.PanelGroup} direction="horizontal">
        <Panel style={styles.PanelRow} defaultSize={20} minSize={10}>
          <Text style={{ ...styles.Centered, color: colors.default }}>left</Text>
        </Panel>
        <PanelResizeHandle style={styles.ResizeHandle} />
        <Panel style={styles.PanelRow} minSize={35}>
          <PanelGroup style={styles.PanelGroup} direction="vertical">
            <Panel style={styles.PanelColumn} defaultSize={35} minSize={10}>
              <Text style={{ ...styles.Centered, color: colors.default }}>top</Text>
            </Panel>
            <PanelResizeHandle style={styles.ResizeHandle} />
            <Panel style={styles.PanelColumn} minSize={10}>
              <PanelGroup style={styles.PanelGroup} direction="horizontal">
                <Panel style={styles.PanelRow} minSize={10}>
                  <Text style={{ ...styles.Centered, color: colors.default }}>left</Text>
                </Panel>
                <PanelResizeHandle style={styles.ResizeHandle} />
                <Panel style={styles.PanelRow} minSize={10}>
                  <Text style={{ ...styles.Centered, color: colors.default }}>right</Text>
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle style={styles.ResizeHandle} />
        <Panel style={styles.PanelRow} defaultSize={20} minSize={10}>
          <Text style={{ ...styles.Centered, color: colors.default }}>right</Text>
        </Panel>
      </PanelGroup>
    </ExamplePage>
  );
}
