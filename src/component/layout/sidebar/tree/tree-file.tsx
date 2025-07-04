import FileIcon from '@/assets/icon/file.svg?react';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router';
import { useTreeNode } from './hooks/useTreeNode';
import { TreeNode } from './types/tree';

interface TreeFileProps {
  node: TreeNode;
  depth: number;
  onSelect: (nodeId: string) => void;
  isSelected: boolean;
  isFocused: boolean;
  onFocus: (nodeId: string) => void;
  onNavigateUp: () => void;
  onNavigateDown: () => void;
  onClearSelection: () => void;
}

export const TreeFile = ({
  node,
  depth,
  onSelect,
  isSelected,
  isFocused,
  onFocus,
  onNavigateUp,
  onNavigateDown,
  onClearSelection,
}: TreeFileProps) => {
  const { nodeId, displayName, navigationPath } = useTreeNode(node);
  const navigate = useNavigate();

  const handleSelect = () => {
    onSelect(nodeId);
    // Navigate to the file if it has a navigation path
    if (navigationPath) {
      navigate(navigationPath);
      // Clear selection after navigation
      setTimeout(() => {
        onClearSelection();
      }, 100);
    }
  };

  const handleFocus = () => {
    onFocus(nodeId);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleSelect();
        break;
    }
  };

  const content = (
    <div
      role="treeitem"
      aria-selected={isSelected}
      data-node-id={nodeId}
      className={clsx(
        'f-r gap-2 items-center text-body-2 w-full text-left ghost-button',
        (isSelected || isFocused) && 'ghost-button-selected'
      )}
      style={{ paddingLeft: `${depth * 16 + 24}px` }}
      onClick={handleSelect}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      tabIndex={isFocused ? 0 : -1}
    >
      <FileIcon className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">{displayName}</span>
    </div>
  );

  if (navigationPath) {
    return (
      <Link to={navigationPath} className="block w-full">
        {content}
      </Link>
    );
  }

  return content;
};
