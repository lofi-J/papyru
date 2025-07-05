import CollapseIcon from '@/assets/icon/collapse.svg?react';
import ExpandIcon from '@/assets/icon/expand.svg?react';
import NewFileIcon from '@/assets/icon/new-file.svg?react';
import NewFolderIcon from '@/assets/icon/new-folder.svg?react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface TreeControlPannelProps {
  onExpandAll?: () => void;
  onCollapseAll?: () => void;
  onNewFolder: () => void;
}

export const TreeControlPannel = ({
  onExpandAll,
  onCollapseAll,
  onNewFolder,
}: TreeControlPannelProps) => {
  const navigate = useNavigate();
  const [isCollapse, setIsCollapse] = useState(false);

  const handleToggle = () => {
    if (isCollapse) {
      onExpandAll?.();
    } else {
      onCollapseAll?.();
    }
    setIsCollapse(!isCollapse);
  };

  const newFile = () => {
    navigate('/note/new-file');
  };

  const newFolder = () => {
    onNewFolder?.();
  };

  return (
    <div className="f-r gap-2 items-center justify-center w-full my-3">
      {/* 파일 생성 아이콘 */}
      <button className="ghost-button p-1" onClick={newFile}>
        <NewFileIcon className="w-5 h-5 stroke-2" />
      </button>

      {/* 폴더 생성 아이콘 */}
      <button className="ghost-button p-1" onClick={newFolder}>
        <NewFolderIcon className="w-5 h-5 stroke-2" />
      </button>

      {/* 접기/펼치기 아이콘 */}
      <button className="ghost-button p-1" onClick={handleToggle}>
        {isCollapse ? (
          <ExpandIcon className="w-5 h-5 stroke-2" />
        ) : (
          <CollapseIcon className="w-5 h-5 stroke-2" />
        )}
      </button>
    </div>
  );
};
