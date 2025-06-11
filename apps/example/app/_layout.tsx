import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export default function RootLayout() {
  // const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DarkTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Examples' }} />
          <Stack.Screen name="horizontal-layouts" options={{ title: 'Horizontal layouts' }} />
          <Stack.Screen name="vertical-layouts" options={{ title: 'Vertical layouts' }} />
          <Stack.Screen name="nested-groups" options={{ title: 'Nested groups' }} />
          <Stack.Screen name="persistent-layouts" options={{ title: 'Persistent layouts' }} />
          <Stack.Screen name="overflow-content" options={{ title: 'Overflow content' }} />
          <Stack.Screen name="collapsible-panels" options={{ title: 'Collapsible panels' }} />
          <Stack.Screen name="conditional-panels" options={{ title: 'Conditional panels' }} />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
