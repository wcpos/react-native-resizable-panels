import { Slot, Stack, usePathname } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

import { links } from '../index';

export default function ExampleLayout() {
  const pathname = usePathname();

  return (
    <>
      <Stack.Screen options={{ title: links.find((link) => link.href === pathname)?.name }} />
      <ScrollView style={{ padding: 16 }}>
        <Slot />
      </ScrollView>
    </>
  );
}
