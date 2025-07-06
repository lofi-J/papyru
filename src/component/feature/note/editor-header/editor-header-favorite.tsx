import StartIcon from '@/assets/icon/star.svg?react';
import { Note } from '@tauri-types/Note';
import { clsx } from 'clsx';
import { useNoteManager } from '../hooks/use-note-manager';

export const EditorHeaderFavorite = ({ note }: { note: Note }) => {
  const { toggleFavorite } = useNoteManager();

  const handleToggleFavorite = () => {
    toggleFavorite.mutation(Number(note.id), {
      onError: () => {
        // TODO 에러 발생 시 toast
      },
    });
  };

  return (
    <button
      className="f-r items-center p-1 rounded hover:bg-gray-100 transition-colors"
      onClick={handleToggleFavorite}
      disabled={toggleFavorite.isPending}
    >
      <StartIcon
        className={clsx(
          'w-4 h-4 transition-colors',
          note.is_favorite ? 'fill-yellow-500' : 'fill-gray-400',
          toggleFavorite.isPending && 'opacity-50'
        )}
      />
    </button>
  );
};
