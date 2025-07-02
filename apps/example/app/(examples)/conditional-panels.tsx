import React, { useState } from 'react';
import { Text } from 'react-native';
import { Panel, PanelGroup } from 'react-native-resizable-panels';

import { Button } from '@/components/Button';
import { ExamplePage } from '@/components/ExamplePage';
import { ResizeHandle } from '@/components/ResizeHandle';
import { colors, styles } from '@/styles/common';

const description =
  'Panels can be conditionally rendered. The `order` ensures they are (re)added in the correct order.';

const code = `<PanelGroup autoSaveId="conditional" direction="horizontal">
  {showLeftPanel && (
    <>
      <Panel id="left" minSize={10} order={1}>
        <View>left</View>
      </Panel>
      <ResizeHandle />
    </>
  )}
  <Panel id="center" minSize={10} order={2}>
    <View>middle</View>
  </Panel>
  {showRightPanel && (
    <>
      <ResizeHandle />
      <Panel id="right" minSize={10} order={3}>
        <View>right</View>
      </Panel>
    </>
  )}
</PanelGroup>`;

export default function ConditionalPanelsScreen() {
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);

  return (
    <ExamplePage description={description} code={code}>
      <Button onPress={() => setShowLeftPanel(!showLeftPanel)} title="Toggle Left Panel" />
      <Button onPress={() => setShowRightPanel(!showRightPanel)} title="Toggle Right Panel" />
      <PanelGroup autoSaveId="conditional" style={styles.PanelGroup} direction="horizontal">
        {showLeftPanel && (
          <>
            <Panel style={styles.Panel} id="left" minSize={10} order={1}>
              <Text style={{ ...styles.Centered, color: colors.default }}>left</Text>
            </Panel>
            <ResizeHandle />
          </>
        )}
        <Panel style={styles.Panel} id="center" minSize={10} order={2}>
          <Text style={{ ...styles.Centered, color: colors.default }}>middle</Text>
        </Panel>
        {showRightPanel && (
          <>
            <ResizeHandle />
            <Panel style={styles.Panel} id="right" minSize={10} order={3}>
              <Text style={{ ...styles.Centered, color: colors.default }}>right</Text>
            </Panel>
          </>
        )}
      </PanelGroup>
    </ExamplePage>
  );
}
