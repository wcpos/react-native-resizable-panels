import { colors, styles } from '@/styles/common';
import { Text, View } from 'react-native';
import { Code } from './Code';

export function ExamplePage({
  children,
  description,
  code,
}: {
  children: React.ReactNode;
  description: React.ReactNode;
  code: string;
}) {
  return (
    <View style={{ gap: 16 }}>
      {typeof description === 'string' ? (
        <Text style={{ color: colors.default, fontSize: 16 }}>{description}</Text>
      ) : (
        description
      )}
      <View style={styles.PanelGroupWrapper}>{children}</View>
      <Code>{code}</Code>
    </View>
  );
}
