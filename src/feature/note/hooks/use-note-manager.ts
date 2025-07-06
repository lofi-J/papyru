import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { MutationResult } from '@tauri-types/MutationResult';
import { ToggleFavoriteResult } from '@tauri-types/ToggleFavoriteResult';

export const NOTE_QUERY_KEY = {
  NOTE_DETAIL: 'note-detail', // 노트 상세 조회 쿼리키
  FILE_TREE: 'file-tree', // 파일 트리 조회 쿼리키
};

// Editor 페이지에서 사용하는 노트 관리 훅
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
        // 노트 목록과 트리 구조 모두 쿼리기 무효화 --> UI 업데이트
        queryClient.invalidateQueries({
          queryKey: [NOTE_QUERY_KEY.NOTE_DETAIL],
        });
        queryClient.invalidateQueries({
          queryKey: [NOTE_QUERY_KEY.FILE_TREE],
        });
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
