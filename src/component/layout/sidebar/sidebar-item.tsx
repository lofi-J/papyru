import ChevronRightIcon from '@/assets/icon/chevron-right.svg?react';
import FileIcon from '@/assets/icon/file.svg?react';
import FolderIcon from '@/assets/icon/folder.svg?react';
import { TreeNode } from '@tauri-types/TreeNode';
import { useState } from 'react';
import { Link } from 'react-router';

type NodeProp = { node: TreeNode };

export const SidebarConditional = ({ node }: NodeProp) => {
  return (
    <>
      {node.type === 'folder' && <SidebarFolderItem node={node} />}
      {node.type === 'note' && <SidebarFileItem node={node} />}
    </>
  );
};

export const SidebarFolderItem = ({ node }: NodeProp) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="ghost-button w-full">
      <button
        className="f-r gap-1 items-center px-1 text-body-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronRightIcon className="w-4 h-4" />
        ) : (
          <ChevronRightIcon className="w-4 h-4" />
        )}
        <FolderIcon className="w-4 h-4" />
        <SidebarText node={node} />
      </button>
      {isOpen &&
        node.children?.map(node_ => (
          <SidebarConditional key={node_.type + node_.id} node={node_} />
        ))}
    </div>
  );
};

export const SidebarFileItem = ({ node }: NodeProp) => {
  return (
    <div className="ghost-button w-full">
      <Link className="f-r gap-2 items-center px-1 text-body-2 ml-5" to={'/'}>
        <FileIcon className="w-4 h-4" />
        <SidebarText node={node} />
      </Link>
    </div>
  );
};

export const SidebarText = ({ node }: NodeProp) => {
  return <span>{node.type === 'folder' ? node.name : node.title}</span>;
};
