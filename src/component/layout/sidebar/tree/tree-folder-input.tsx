import ChevronRightIcon from '@/assets/icon/chevron-right.svg?react';
import FolderIcon from '@/assets/icon/folder.svg?react';
import { useEffect, useRef, useState } from 'react';

interface TreeFolderInputProps {
  onConfirm: (folderName: string) => void;
  onCancel: () => void;
  depth?: number;
}

export const TreeFolderInput = ({ 
  onConfirm, 
  onCancel, 
  depth = 0 
}: TreeFolderInputProps) => {
  const [folderName, setFolderName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (folderName.trim()) {
          onConfirm(folderName.trim());
        }
        break;
      case 'Escape':
        event.preventDefault();
        onCancel();
        break;
    }
  };

  const handleBlur = () => {
    if (folderName.trim()) {
      onConfirm(folderName.trim());
    } else {
      onCancel();
    }
  };

  return (
    <div 
      className="f-r gap-1 items-center text-body-2 w-full text-left ghost-button-selected"
      style={{ paddingLeft: `${depth * 16 + 8}px` }}
    >
      <div className="w-4 h-4 flex items-center justify-center">
        <ChevronRightIcon className="w-3 h-3 flex-shrink-0" />
      </div>
      <FolderIcon className="w-4 h-4 flex-shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="w-full text-left truncate bg-transparent outline-none"
        placeholder="폴더 이름 입력"
        autoFocus
      />
    </div>
  );
};