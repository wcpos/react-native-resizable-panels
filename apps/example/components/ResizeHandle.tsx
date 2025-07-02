import { View } from 'react-native';
import { PanelResizeHandle, usePanelGroupContext } from 'react-native-resizable-panels';

import { Icon } from './Icon';

export function ResizeHandle() {
  const { direction } = usePanelGroupContext();

  return (
    <View style={{ position: 'relative' }}>
      <PanelResizeHandle
        style={{
          width: direction === 'horizontal' ? 10 : '100%',
          height: direction === 'vertical' ? 10 : '100%',
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none', // Allow touches to pass through to the handle
        }}
      >
        <View
          style={{
            transform: [{ rotate: direction === 'vertical' ? '90deg' : '0deg' }],
          }}
        >
          <Icon fill="#555555" type="drag" width={10} height={10} />
        </View>
      </View>
    </View>
  );
}
