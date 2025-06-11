import { Button } from '@/components/Button';
import { ExamplePage } from '@/components/ExamplePage';
import { colors, styles } from '@/styles/common';
import { useRef, useState } from 'react';
import { Text, View } from 'react-native';

import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-native-resizable-panels';

type Sizes = {
  left: number;
  middle: number;
  right: number;
};

function Description() {
  const apiMethods = [
    {
      signature: 'collapse(): void',
      description: 'Collapse the panel to its minimum size',
    },
    {
      signature: 'expand(minSize?: number): void',
      description:
        'Expand the panel to its previous size (or the min size if there is no previous size)',
    },
    { signature: 'getId(): string', description: "Panel's id" },
    {
      signature: 'getSize(): number',
      description: "Panel's current size in (in both percentage and pixel units)",
    },
    {
      signature: 'isCollapsed(): boolean',
      description: 'Panel is currently collapsed',
    },
    {
      signature: 'isExpanded(): boolean',
      description: 'Panel is currently expanded',
    },
    {
      signature: 'resize(size: number): void',
      description: 'Resize the panel to the specified size (either percentage or pixel units)',
    },
  ];

  return (
    <View>
      <Text style={{ color: colors.default, fontSize: 16 }}>
        Sometimes panels need to resize or collapse/expand in response to user actions. For example,
        double-clicking on a resize bar in VS Code resizes the panel to a size that fits all file
        names. This type of interaction can be implemented using the imperative API.
      </Text>
      <Text style={{ marginTop: 10, marginBottom: 5, color: colors.default, fontSize: 16 }}>
        Panel provides the following imperative API methods:
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
   ImperativePanelHandle,
   Panel,
   PanelGroup,
   PanelResizeHandle,
 } from "react-resizable-panels";
 
 const ref = useRef<ImperativePanelHandle>(null);
 
 const collapsePanel = () => {
   const panel = ref.current;
   if (panel) {
     panel.collapse();
   }
 };
 
 <PanelGroup direction="horizontal">
   <Panel collapsible ref={ref}>
     <Text>left</Text>
   </Panel>
   <PanelResizeHandle />
   <Panel>
     <Text>right</Text>
   </Panel>
 </PanelGroup>`;

export default function ImperativePanelApiScreen() {
  const [sizes, setSizes] = useState<Sizes>({
    left: 20,
    middle: 60,
    right: 20,
  });

  const onResize = (partialSizes: Partial<Sizes>) => {
    setSizes((prevSizes: Sizes) => ({
      ...prevSizes,
      ...partialSizes,
    }));
  };

  const leftPanelRef = useRef<ImperativePanelHandle>(null);
  const middlePanelRef = useRef<ImperativePanelHandle>(null);
  const rightPanelRef = useRef<ImperativePanelHandle>(null);

  return (
    <ExamplePage description={<Description />} code={code}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button onPress={() => leftPanelRef.current?.resize(30)} title="Resize Left Panel" />
        <Button onPress={() => middlePanelRef.current?.resize(60)} title="Resize Middle Panel" />
        <Button onPress={() => rightPanelRef.current?.resize(20)} title="Resize Right Panel" />
      </View>
      <PanelGroup
        autoSaveId="ImperativePanelApi"
        style={styles.PanelGroup}
        direction="horizontal"
        id="imperative-Panel-api"
      >
        <Panel
          style={styles.PanelRow}
          collapsible
          defaultSize={20}
          id="left"
          maxSize={30}
          minSize={10}
          onResize={(left) => onResize({ left })}
          order={1}
          ref={leftPanelRef}
        >
          <Text style={{ ...styles.Centered, color: colors.default }}>
            left: {Math.round(sizes.left)}
          </Text>
        </Panel>
        <PanelResizeHandle style={styles.ResizeHandle} />
        <Panel
          style={styles.PanelRow}
          collapsible={true}
          id="middle"
          maxSize={100}
          minSize={10}
          onResize={(middle) => onResize({ middle })}
          order={2}
          ref={middlePanelRef}
        >
          <Text style={{ ...styles.Centered, color: colors.default }}>
            middle: {Math.round(sizes.middle)}
          </Text>
        </Panel>
        <PanelResizeHandle style={styles.ResizeHandle} />
        <Panel
          style={styles.PanelRow}
          collapsible
          defaultSize={20}
          id="right"
          maxSize={100}
          minSize={10}
          onResize={(right) => onResize({ right })}
          order={3}
          ref={rightPanelRef}
        >
          <Text style={{ ...styles.Centered, color: colors.default }}>
            right: {Math.round(sizes.right)}
          </Text>
        </Panel>
      </PanelGroup>
    </ExamplePage>
  );
}
