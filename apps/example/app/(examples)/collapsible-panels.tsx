import { useReducer } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Panel, PanelGroup, assert } from 'react-native-resizable-panels';

import {
  TUTORIAL_CODE_CSS,
  TUTORIAL_CODE_HTML,
  TUTORIAL_CODE_JAVASCRIPT,
  TUTORIAL_CODE_README,
} from '@/code';
import { Code } from '@/components/Code';
import { ExamplePage } from '@/components/ExamplePage';
import { Icon } from '@/components/Icon';
import { ResizeHandle } from '@/components/ResizeHandle';
import { colors, styles } from '@/styles/common';

function Description() {
  return (
    <View>
      <Text>Collapsible panels are useful when you want to hide content until it is needed.</Text>
    </View>
  );
}

const code = `<PanelGroup direction="horizontal">
  <SideTabBar />
  <Panel collapsible={true} collapsedSize={35} minSize={10}>
    <SourceBrowser />
  </Panel>
  <ResizeHandle />
  <Panel>
    <SourceViewer />
  </Panel>
</PanelGroup>`;

type File = {
  code: string;
  language: string;
  fileName: string;
  path: string[];
};

const FILE_PATHS: [path: string, code: string][] = [
  ['source/index.html', TUTORIAL_CODE_HTML],
  ['source/README.md', TUTORIAL_CODE_README],
  ['source/styles.css', TUTORIAL_CODE_CSS],
  ['source/TicTacToe.ts', TUTORIAL_CODE_JAVASCRIPT],
];

const FILES: File[] = FILE_PATHS.map(([path, code]) => {
  const pathArray = path.split('/');
  const fileName = pathArray.pop()!;

  return {
    code,
    fileName,
    language: inferLanguageFromFileName(fileName),
    path: pathArray,
  };
});

type CloseAction = { type: 'close'; file: File };
type OpenAction = { type: 'open'; file: File };
type ToggleCollapsedAction = { type: 'toggleCollapsed'; collapsed: boolean };

export type FilesAction = CloseAction | OpenAction | ToggleCollapsedAction;

type FilesState = {
  currentFileIndex: number;
  fileListCollapsed: boolean;
  openFiles: File[];
};

const FIRST_FILE = FILES[0];
assert(FIRST_FILE, 'No file found');

const initialState: FilesState = {
  currentFileIndex: 0,
  fileListCollapsed: false,
  openFiles: [FIRST_FILE],
};

function reducer(state: FilesState, action: FilesAction): FilesState {
  switch (action.type) {
    case 'close': {
      const { file } = action;
      const { currentFileIndex, openFiles } = state;

      const fileIndex = openFiles.findIndex(({ fileName }) => fileName === file.fileName);
      if (fileIndex === -1) {
        // File not open; this shouldn't happen.
        return state;
      }

      const newOpenFiles = openFiles.concat();
      newOpenFiles.splice(fileIndex, 1);

      let newCurrentFileIndex = currentFileIndex;
      if (newCurrentFileIndex >= newOpenFiles.length) {
        newCurrentFileIndex = newOpenFiles.length - 1;
      }

      return {
        ...state,
        currentFileIndex: newCurrentFileIndex,
        openFiles: newOpenFiles,
      };
    }
    case 'open': {
      const { file } = action;
      const { openFiles } = state;
      const fileIndex = openFiles.findIndex(({ fileName }) => fileName === file.fileName);
      if (fileIndex >= 0) {
        return {
          ...state,
          currentFileIndex: fileIndex,
        };
      } else {
        const newOpenFiles = [...openFiles, file];

        return {
          ...state,
          currentFileIndex: openFiles.length,
          openFiles: newOpenFiles,
        };
      }
    }
    case 'toggleCollapsed': {
      return { ...state, fileListCollapsed: action.collapsed };
    }
    default: {
      throw `Unknown action type: ${(action as any).type}`;
    }
  }
}

export default function CollapsiblePanelsScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { currentFileIndex, fileListCollapsed, openFiles } = state;

  const currentFile = openFiles[currentFileIndex] ?? null;

  const closeFile = (file: File) => {
    dispatch({ type: 'close', file });
  };

  const openFile = (file: File) => {
    dispatch({ type: 'open', file });
  };

  const onCollapse = () => {
    dispatch({ type: 'toggleCollapsed', collapsed: false });
  };

  const onExpand = () => {
    dispatch({ type: 'toggleCollapsed', collapsed: true });
  };

  return (
    <ExamplePage description={<Description />} code={code}>
      <PanelGroup style={styles.IDE} direction="horizontal">
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
          <View style={styles.FileList}>
            <View style={styles.DirectoryEntry}>
              <Icon style={styles.SourceIcon} type="chevron-down" />
              <Text style={[styles.DirectoryName, { color: colors.default }]}>source</Text>
            </View>

            {FILES.map((file) => (
              <Pressable
                style={styles.FileEntry}
                data-current={currentFile === file || undefined}
                key={file.fileName}
                onClick={(event) => openFile(file)}
                title={file.fileName}
              >
                <Icon style={styles.FileIcon} type={file.language as any} />
                <Text style={[styles.FileName, { color: colors.default }]}>{file.fileName}</Text>
              </Pressable>
            ))}
          </View>
        </Panel>
        <ResizeHandle />
        <Panel style={styles.PanelColumn} minSize={50}>
          {currentFile && (
            <Code code={currentFile.code.trim()} language={currentFile.language} showLineNumbers />
          )}
        </Panel>
      </PanelGroup>
    </ExamplePage>
  );
}

function inferLanguageFromFileName(fileName: string) {
  const extension = fileName.split('.').pop();

  switch (extension) {
    case 'css':
      return 'css';
    case 'htm':
    case 'html':
      return 'html';
    case 'js':
      return 'javascript';
    case 'jsx':
      return 'jsx';
    case 'md':
      return 'markdown';
    case 'tsx':
      return 'tsx';
    case 'ts':
      return 'typescript';
    default:
      throw Error(`Unsupported extension "${extension}"`);
  }
}
