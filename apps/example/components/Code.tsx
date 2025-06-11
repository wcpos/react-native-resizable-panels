import { StyleSheet } from 'react-native';
import CodeHighlighter from 'react-native-code-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export function Code({
  children,
  language = 'jsx',
  showLineNumbers = true,
}: {
  children: string;
  language?: string;
  showLineNumbers?: boolean;
}) {
  return (
    <CodeHighlighter
      scrollViewProps={{
        contentContainerStyle: styles.codeContainer,
      }}
      textStyle={styles.text}
      language={language}
      showLineNumbers={showLineNumbers}
      hljsStyle={atomOneDarkReasonable}
    >
      {children}
    </CodeHighlighter>
  );
}

const styles = StyleSheet.create({
  codeContainer: {
    padding: 16,
    minWidth: '100%',
  },
  text: {
    fontSize: 16,
  },
});
