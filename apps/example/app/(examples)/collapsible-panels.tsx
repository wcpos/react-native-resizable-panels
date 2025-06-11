import { Code } from '@/components/Code';
import { ExamplePage } from '@/components/ExamplePage';
import { styles } from '@/styles/common';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-native-resizable-panels';

const description =
  'Collapsible panels are useful when you want to hide content until it is needed.';

const code = `

`;

export default function CollapsiblePanelsScreen() {
  return (
    <ExamplePage description={description} code={code}>
      <PanelGroup className={styles.IDE} direction="horizontal">
        <Panel
          style={styles.PanelColumn}
          collapsedSize={5}
          collapsible={true}
          defaultSize={15}
          maxSize={20}
          minSize={15}
          onCollapse={onCollapse}
          onExpand={onExpand}
        >
          <div className={styles.FileList}>
            <div className={styles.DirectoryEntry}>
              <Icon className={styles.SourceIcon} type="chevron-down" />
              <div className={styles.DirectoryName}>source</div>
            </div>

            {FILES.map((file) => (
              <div
                className={styles.FileEntry}
                data-current={currentFile === file || undefined}
                key={file.fileName}
                onClick={(event) => openFile(file)}
                title={file.fileName}
              >
                <Icon className={styles.FileIcon} type={file.language as any} />
                <div className={styles.FileName}>{file.fileName}</div>
              </div>
            ))}
          </div>
        </Panel>
        <PanelResizeHandle
          className={fileListCollapsed ? styles.ResizeHandleCollapsed : styles.ResizeHandle}
        />
        <Panel className={sharedStyles.PanelColumn} minSize={50}>
          {currentFile && (
            <Code
              className={sharedStyles.Overflow}
              code={currentFile.code.trim()}
              language={currentFile.language}
              showLineNumbers
            />
          )}
        </Panel>
      </PanelGroup>
    </ExamplePage>
  );
}
