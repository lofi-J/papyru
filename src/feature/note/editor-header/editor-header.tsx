import { Badge } from '@/component/badge';
import { Note } from '@tauri-types/Note';
import { EditorHeaderFavorite } from './editor-header-favorite';

type EditorHeaderProps = { note: Note };

export const EditorHeader = ({ note }: EditorHeaderProps) => {
  return (
    <div
      data-selectable="false"
      className="f-r items-center justify-between w-full"
    >
      <Badge variant="secondary" className="max-w-[150px] truncate">
        {note.title}
      </Badge>
      <EditorHeaderFavorite note={note} />
    </div>
  );
};
