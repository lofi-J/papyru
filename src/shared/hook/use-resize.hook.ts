import { useCallback, useEffect, useRef } from 'react';

interface UseResizeProps {
  minWidth: number;
  maxWidth: number;
  setWidth: (width: number) => void;
  currentWidth: number;
}

export const useResize = ({
  minWidth,
  maxWidth,
  setWidth,
  currentWidth,
}: UseResizeProps) => {
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(currentWidth);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!resizeHandleRef.current) return;

      isDragging.current = true;
      startX.current = e.clientX;
      startWidth.current = currentWidth;

      document.body.style.cursor = 'col-resize';

      e.preventDefault();
    },
    [currentWidth]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - startX.current;
      console.log(`deltaX: ${deltaX}`);
      const newWidth = startWidth.current + deltaX;

      // 최소/최대 너비 제한
      const clampedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);

      setWidth(clampedWidth);
    },
    [minWidth, maxWidth, setWidth]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;

    isDragging.current = false;

    // 스타일 복원
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  }, []);

  useEffect(() => {
    const handleElement = resizeHandleRef.current;
    if (!handleElement) return;

    // 핸들에 mousedown 이벤트 등록
    handleElement.addEventListener('mousedown', handleMouseDown);

    // document에 mousemove, mouseup 이벤트 등록 (핸들 영역을 벗어나도 동작)
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      handleElement.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // 정리 시 스타일 복원
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return {
    resizeHandleRef,
  };
};
