import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export const links = [
  { href: '/horizontal-layouts', name: 'Horizontal layouts' },
  { href: '/vertical-layouts', name: 'Vertical layouts' },
  { href: '/nested-groups', name: 'Nested groups' },
  { href: '/persistent-layouts', name: 'Persistent layouts' },
  { href: '/overflow-content', name: 'Overflow content' },
  { href: '/collapsible-panels', name: 'Collapsible panels' },
  { href: '/conditional-panels', name: 'Conditional panels' },
  { href: '/external-persistence', name: 'External persistence' },
  { href: '/imperative-panel-api', name: 'Imperative Panel API' },
  { href: '/imperative-panelgroup-api', name: 'Imperative PanelGroup API' },
];

export default function IndexScreen() {
  return (
    <FlatList
      data={links}
      keyExtractor={(item) => item.href}
      renderItem={({ item }) => (
        <Link href={item.href as any} asChild>
          <Pressable style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.chevron}>{'>'}</Text>
          </Pressable>
        </Link>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1e1e1e',
  },
  itemText: {
    fontSize: 16,
    color: '#ffffff',
  },
  separator: {
    height: 1,
    backgroundColor: '#333333',
  },
  chevron: {
    fontSize: 18,
    color: '#aaaaaa',
  },
});
