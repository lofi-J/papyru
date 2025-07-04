import NewFileIcon from '@/assets/icon/new-file.svg?react';
import { useNavigate } from 'react-router';

export const CreateFileButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/note/new-file');
  };

  return (
    <button
      className="flex items-center justify-center gap-1 px-2 py-1 ghost-button my-2"
      onClick={handleClick}
    >
      <NewFileIcon className="w-4 h-4" />
      <span className="text-caption-b font-sans">Create a new</span>
    </button>
  );
};
