import FileIcon from '@/assets/icon/file.svg?react';
import { useSearchParams } from 'react-router';

export const TreeNewFileUI = ({ depth }: { depth: number }) => {
  const [searchParams] = useSearchParams();
  const currentNewFileTitle = searchParams.get('title') || 'New file';

  return (
    <div
      className="f-r gap-2 items-center text-body-2 w-full text-left ghost-button-selected"
      style={{ paddingLeft: `${depth * 16 + 24 + 4}px` }}
    >
      <FileIcon className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">{currentNewFileTitle}</span>
    </div>
  );
};
