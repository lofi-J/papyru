import Editor from '@/feature/note/editor';
import EditorMain from '@/feature/note/editor-main';
import { NOTE_QUERY_KEY } from '@/feature/note/hooks/use-note-manager';
import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { Note } from '@tauri-types/Note';
import { useParams } from 'react-router';

export default function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useQuery<Note>({
    queryKey: [NOTE_QUERY_KEY.NOTE_DETAIL, id],
    queryFn: () => invoke('get_note_by_id_command', { noteId: parseInt(id!) }),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-00">Error loading note: {error.message}</div>
    );
  }

  if (!data) {
    return <div className="p-4">Note not found</div>;
  }

  return (
    <EditorMain>
      <Editor.Header note={data} />
    </EditorMain>
  );
}
