import { useMemo } from 'react';
import { TreeNode } from '../types/tree';

export const useTreeNode = (node: TreeNode) => {
  const nodeId = useMemo(() => `${node.type}-${node.id}`, [node.type, node.id]);

  const isFolder = node.type === 'folder';
  const isNote = node.type === 'note';

  const hasChildren = isFolder && node.children && node.children.length > 0;

  const displayName = useMemo(() => {
    return isFolder ? node.name : node.title;
  }, [isFolder, node]);

  const navigationPath = useMemo(() => {
    if (isNote) {
      return `/note/${node.id}`;
    }
    return null;
  }, [isNote, node.id]);

  return {
    nodeId,
    isFolder,
    isNote,
    hasChildren,
    displayName,
    navigationPath,
  };
};
