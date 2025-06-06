import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-native-resizable-panels';

export default function IndexScreen() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanelGroup autoSaveId="vert" direction="vertical">
        <Panel>
          <PanelGroup autoSaveId="horz" direction="horizontal">
            <Panel defaultSize={25}>
              <View style={{ backgroundColor: 'red', height: '100%', width: '100%' }}>
                <Text>Red</Text>
              </View>
            </Panel>
            <PanelResizeHandle />
            <Panel>
              <View style={{ backgroundColor: 'blue', height: '100%', width: '100%' }}>
                <Text>Blue</Text>
              </View>
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={25}>
              <View style={{ backgroundColor: 'green', height: '100%', width: '100%' }}>
                <Text>Green</Text>
              </View>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={25}>
          <View style={{ backgroundColor: 'yellow', height: '100%', width: '100%' }}>
            <Text>Yellow</Text>
          </View>
        </Panel>
      </PanelGroup>
    </GestureHandlerRootView>
  );
}
