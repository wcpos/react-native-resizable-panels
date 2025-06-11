import { Slot } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

export default function ExampleLayout() {
  return (
    <ScrollView style={{ padding: 16 }}>
      <Slot />
    </ScrollView>
  );
}
