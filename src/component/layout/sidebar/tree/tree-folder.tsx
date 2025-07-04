import ChevronRightIcon from '@/assets/icon/chevron-right.svg?react';
import FolderIcon from '@/assets/icon/folder.svg?react';
import clsx from 'clsx';
import { useTreeNode } from './hooks/useTreeNode';
import { TreeNode } from './types/tree';

interface TreeFolderProps {
  node: TreeNode;
  depth: number;
  isExpanded: boolean;
  onToggle: (nodeId: string) => void;
  onSelect: (nodeId: string) => void;
  isSelected: boolean;
  isFocused: boolean;
  onFocus: (nodeId: string) => void;
  onNavigateUp: () => void;
  onNavigateDown: () => void;
  renderChildren?: (childNodes: TreeNode[]) => JSX.Element[];
}

export const TreeFolder = ({
  node,
  depth,
  isExpanded,
  onToggle,
  onSelect,
  isSelected,
  isFocused,
  onFocus,
  onNavigateUp,
  onNavigateDown,
  renderChildren,
}: TreeFolderProps) => {
  const { nodeId, hasChildren, displayName } = useTreeNode(node);

  const handleToggle = () => {
    onToggle(nodeId);
  };

  const handleFocus = () => {
    onFocus(nodeId);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleToggle();
        break;
      case 'ArrowRight':
        if (!isExpanded && hasChildren) {
          event.preventDefault();
          handleToggle();
        }
        break;
      case 'ArrowLeft':
        if (isExpanded) {
          event.preventDefault();
          handleToggle();
        }
        break;
    }
  };

  return (
    <div className="w-full">
      <button
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        data-node-id={nodeId}
        className={clsx(
          'f-r gap-1 items-center text-body-2 w-full text-left ghost-button',
          (isSelected || isFocused) && 'ghost-button-selected'
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleToggle}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        tabIndex={isFocused ? 0 : -1}
      >
        {hasChildren && (
          <span className="w-4 h-4 flex items-center justify-center">
            <ChevronRightIcon
              className={clsx(
                'w-3 h-3 transition-transform duration-200',
                isExpanded ? 'rotate-90' : ''
              )}
            />
          </span>
        )}
        {!hasChildren && <span className="w-4 h-4" />}
        <FolderIcon className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{displayName}</span>
      </button>

      {isExpanded && hasChildren && (
        <div role="group">
          {renderChildren ? renderChildren(node.children || []) : null}
        </div>
      )}
    </div>
  );
};
