import { Button } from '@/components/Button';
import { ExamplePage } from '@/components/ExamplePage';
import { colors, styles } from '@/styles/common';
import { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import type { ImperativePanelGroupHandle } from 'react-native-resizable-panels';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-native-resizable-panels';

function Description() {
  const apiMethods = [
    {
      signature: 'getId(): string',
      description: 'Panel group id',
    },
    {
      signature: 'getLayout(): number[]',
      description: 'Current size of panels (in both percentage and pixel units)',
    },
    {
      signature: 'setLayout(number[]): void',
      description: 'Resize all panels (using either percentage or pixel units)',
    },
  ];
  return (
    <View>
      <Text style={{ marginBottom: 5, color: colors.default, fontSize: 16 }}>
        PanelGroup provides the following imperative API methods:
      </Text>
      <View style={{ paddingLeft: 10 }}>
        {apiMethods.map(({ signature, description }) => (
          <View key={signature} style={{ marginBottom: 5 }}>
            <Text style={{ color: colors.default, fontSize: 16 }}>
              <Text style={{ color: '#8d7de4', fontFamily: 'monospace' }}>{signature}</Text>:{' '}
              {description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const code = `import {
   ImperativePanelGroupHandle,
   Panel,
   PanelGroup,
   PanelResizeHandle,
 } from "react-resizable-panels";
 
 const ref = useRef<ImperativePanelGroupHandle>(null);
 
 const resetLayout = () => {
   const panelGroup = ref.current;
   if (panelGroup) {
     // Reset each Panel to 50% of the group's width
     panelGroup.setLayout([50, 50]);
   }
 };
 
 <PanelGroup direction="horizontal" ref={ref}>
   <Panel>left</Panel>
   <PanelResizeHandle />
   <Panel>right</Panel>
 </PanelGroup>`;

export default function ImperativePanelGroupApiScreen() {
  const [sizes, setSizes] = useState<number[]>([]);

  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);

  const onLayout = (sizes: number[]) => {
    setSizes(sizes);
  };

  const resetLayout = () => {
    const panelGroup = panelGroupRef.current;
    if (panelGroup) {
      panelGroup.setLayout([50, 50]);
    }
  };

  const left = sizes[0];
  const right = sizes[1];

  return (
    <ExamplePage description={<Description />} code={code}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button onPress={resetLayout} title="Reset Layout" />
      </View>
      <PanelGroup
        style={styles.PanelGroup}
        direction="horizontal"
        id="imperative-PanelGroup-api"
        onLayout={onLayout}
        ref={panelGroupRef}
      >
        <Panel style={styles.PanelRow} minSize={10}>
          <Text style={{ ...styles.Centered, color: colors.default }}>
            left: {left ? Math.round(left) : '-'}
          </Text>
        </Panel>
        <PanelResizeHandle style={styles.ResizeHandle} />
        <Panel style={styles.PanelRow} minSize={10}>
          <Text style={{ ...styles.Centered, color: colors.default }}>
            right: {right ? Math.round(right) : '-'}
          </Text>
        </Panel>
      </PanelGroup>
    </ExamplePage>
  );
}
