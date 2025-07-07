import StartIcon from '@/assets/icon/star.svg?react';
import { Note } from '@tauri-types/Note';
import { clsx } from 'clsx';
import { toast } from 'sonner';
import { useNoteManager } from '../hooks/use-note-manager';

export const EditorHeaderFavorite = ({ note }: { note: Note }) => {
  const { toggleFavorite } = useNoteManager();

  const handleToggleFavorite = () => {
    toggleFavorite.mutation(Number(note.id), {
      onError: () => {
        toast.error('Failed to toggle favorite status');
      },
    });
  };

  return (
    <button
      className="f-r-center p-1"
      onClick={handleToggleFavorite}
      disabled={toggleFavorite.isPending}
    >
      <StartIcon
        className={clsx(
          'w-5 h-5',
          note.is_favorite ? 'fill-yellow-500 stroke-0' : 'fill-transparent'
        )}
      />
    </button>
  );
};
