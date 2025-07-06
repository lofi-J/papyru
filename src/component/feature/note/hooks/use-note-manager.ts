import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { MutationResult } from '@tauri-types/MutationResult';
import { ToggleFavoriteResult } from '@tauri-types/ToggleFavoriteResult';

export const NOTE_QUERY_KEY = {
  NOTE_DETAIL: 'note-detail',
  FILE_TREE: 'file-tree',
};

export const useNoteManager = () => {
  const queryClient = useQueryClient();

  // 즐겨찾기 토글 뮤테이션
  const { mutate: toggleFavoriteMutation, isPending } = useMutation({
    mutationFn: async (
      noteId: number
    ): Promise<MutationResult<ToggleFavoriteResult>> => {
      return await invoke('toggle_favorite_command', { noteId });
    },
    onSuccess: result => {
      if (result.success) {
        // 노트 목록과 트리 구조 모두 무효화하여 UI 업데이트
        queryClient.invalidateQueries({
          queryKey: [NOTE_QUERY_KEY.NOTE_DETAIL],
        });
        queryClient.invalidateQueries({
          queryKey: [NOTE_QUERY_KEY.FILE_TREE],
        });

        console.log('즐겨찾기 토글 성공:', result.message);
      } else {
        console.error('즐겨찾기 토글 실패:', result.error);
      }
    },
    onError: error => {
      console.error('즐겨찾기 토글 에러:', error);
    },
  });

  const toggleFavorite = {
    mutation: toggleFavoriteMutation,
    isPending,
  };

  return { toggleFavorite };
};
