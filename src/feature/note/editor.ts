import { Note } from '@tauri-types/Note';
import { FC } from 'react';
import { EditorHeader } from './editor-header/editor-header';
import EditorMain from './editor-main';

type EditorComponent = typeof EditorMain & {
  Header: FC<{ note: Note }>;
};

// Note 페이지에 추가 기능이 필요할 경우 이곳을 점차 확장
const Editor: EditorComponent = Object.assign(EditorMain, {
  Header: EditorHeader,
});

export default Editor;
