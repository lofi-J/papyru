import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { Note } from '@tauri-types/Note';
import { useParams } from 'react-router';

export default function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useQuery<Note>({
    queryKey: ['note', id],
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {data.title || 'Untitled Note'}
      </h1>
      <div className="text-gray-600 mb-4">
        <p>ID: {data.id.toString()}</p>
        <p>Created: {new Date(data.created_at).toLocaleDateString()}</p>
        <p>Modified: {new Date(data.updated_at).toLocaleDateString()}</p>
      </div>
      <div className="prose max-w-none">{data.body || 'No content'}</div>
    </div>
  );
}
