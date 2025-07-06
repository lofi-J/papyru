import { Note } from '@tauri-types/Note';
import { EditorHeaderFavorite } from './editor-header-favorite';

type EditorHeaderProps = { note: Note };

export const EditorHeader = ({ note }: EditorHeaderProps) => {
  return (
    <div data-selectable="false" className="f-r items-center w-full">
      <span className="text-caption-b text-gray-500">{note.title}</span>
      <EditorHeaderFavorite note={note} />
    </div>
  );
};
