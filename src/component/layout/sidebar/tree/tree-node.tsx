import { useTreeNode } from './hooks/useTreeNode';
import { TreeFile } from './tree-file';
import { TreeFolder } from './tree-folder';
import { TreeNode } from './types/tree';

interface TreeNodeComponentProps {
  node: TreeNode;
  depth: number;
  isExpanded: boolean;
  onToggle: (nodeId: string) => void;
  onSelect: (nodeId: string) => void;
  isSelected: boolean;
  isFocused: boolean;
  onFocus: (nodeId: string) => void;
  onNavigateToParent: () => void;
  onClearSelection: () => void;
  renderChildren?: (childNodes: TreeNode[]) => JSX.Element[];
}

export const TreeNodeComponent = ({
  node,
  depth,
  isExpanded,
  onToggle,
  onSelect,
  isSelected,
  isFocused,
  onFocus,
  onNavigateToParent,
  onClearSelection,
  renderChildren,
}: TreeNodeComponentProps) => {
  const { isFolder, isNote } = useTreeNode(node);

  if (isFolder) {
    return (
      <TreeFolder
        node={node}
        depth={depth}
        isExpanded={isExpanded}
        onToggle={onToggle}
        isSelected={isSelected}
        isFocused={isFocused}
        onFocus={onFocus}
        renderChildren={renderChildren}
      />
    );
  }

  if (isNote) {
    return (
      <TreeFile
        node={node}
        depth={depth}
        onSelect={onSelect}
        isSelected={isSelected}
        isFocused={isFocused}
        onFocus={onFocus}
        onNavigateToParent={onNavigateToParent}
        onClearSelection={onClearSelection}
      />
    );
  }

  return null;
};
