import { Note } from '@tauri-types/Note';
import { EditorHeaderFavorite } from './editor-header-favorite';

type EditorHeaderProps = { note: Note };

export const EditorHeader = ({ note }: EditorHeaderProps) => {
  return (
    <div
      data-selectable="false"
      className="f-r items-center justify-between w-full"
    >
      <span className="text-small-b text-gray-500 max-w-[100px] truncate">
        {note.title}
      </span>
      <EditorHeaderFavorite note={note} />
    </div>
  );
};
