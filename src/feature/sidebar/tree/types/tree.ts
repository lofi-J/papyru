import { TreeNode as TauriTreeNode } from '@tauri-types/TreeNode';

export type TreeNode = TauriTreeNode;

export type TreeNodeType = 'folder' | 'note';

export type TreeNodeProps = {
  node: TreeNode;
  depth?: number;
  isExpanded?: boolean;
  onToggle?: (nodeId: string) => void;
};

export type TreeState = {
  expandedNodes: Set<string>;
  selectedNode: string | null;
  focusedNode: string | null;
};

export type TreeActions = {
  toggleNode: (nodeId: string) => void;
  selectNode: (nodeId: string) => void;
  clearSelection: () => void;
  clearFocus: () => void;
  expandNode: (nodeId: string) => void;
  collapseNode: (nodeId: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  focusNode: (nodeId: string) => void;
  navigateUp: () => void;
  navigateDown: () => void;
  navigateToParent: () => void;
  updateFlatNodeList: (nodes: string[]) => void;
};
