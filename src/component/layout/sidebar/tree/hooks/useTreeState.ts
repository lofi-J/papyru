import { useCallback, useRef, useState } from 'react';
import { TreeActions, TreeState } from '../types/tree';

export const useTreeState = (
  initialExpandedNodes: string[] = []
): TreeState &
  TreeActions & {
    updateFlatNodeList: (nodes: string[]) => void;
    clearSelection: () => void;
    navigateToParent: () => void;
  } => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    () => new Set(initialExpandedNodes)
  );
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [focusedNode, setFocusedNode] = useState<string | null>(null);
  const flatNodeListRef = useRef<string[]>([]);

  const toggleNode = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  const selectNode = useCallback((nodeId: string) => {
    setSelectedNode(nodeId);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const expandNode = useCallback((nodeId: string) => {
    setExpandedNodes(prev => new Set(prev).add(nodeId));
  }, []);

  const collapseNode = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      newSet.delete(nodeId);
      return newSet;
    });
  }, []);

  const expandAll = useCallback(() => {
    if (flatNodeListRef.current.length === 0) return;
    
    const allFolderNodes = flatNodeListRef.current.filter(nodeId => 
      nodeId.startsWith('folder-')
    );
    
    setExpandedNodes(new Set(allFolderNodes));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set());
  }, []);

  const focusNode = useCallback((nodeId: string) => {
    setFocusedNode(nodeId);
  }, []);

  const navigateUp = useCallback(() => {
    if (!focusedNode || flatNodeListRef.current.length === 0) return;

    const currentIndex = flatNodeListRef.current.indexOf(focusedNode);
    if (currentIndex > 0) {
      const prevNodeId = flatNodeListRef.current[currentIndex - 1];
      setFocusedNode(prevNodeId);

      // Focus the actual DOM element
      const element = document.querySelector(
        `[data-node-id="${prevNodeId}"]`
      ) as HTMLElement;
      if (element) {
        element.focus();
      }
    }
  }, [focusedNode]);

  const navigateDown = useCallback(() => {
    if (!focusedNode || flatNodeListRef.current.length === 0) return;

    const currentIndex = flatNodeListRef.current.indexOf(focusedNode);
    if (currentIndex < flatNodeListRef.current.length - 1) {
      const nextNodeId = flatNodeListRef.current[currentIndex + 1];
      setFocusedNode(nextNodeId);

      // Focus the actual DOM element
      const element = document.querySelector(
        `[data-node-id="${nextNodeId}"]`
      ) as HTMLElement;
      if (element) {
        element.focus();
      }
    }
  }, [focusedNode]);

  const navigateToParent = useCallback(() => {
    if (!focusedNode) return;

    // 플랫 노드 리스트에서 부모 폴더 찾기
    const currentIndex = flatNodeListRef.current.indexOf(focusedNode);
    if (currentIndex <= 0) return;

    // 더 얕은 깊이의 가장 가까운 폴더 찾기
    for (let i = currentIndex - 1; i >= 0; i--) {
      const nodeId = flatNodeListRef.current[i];
      if (nodeId.startsWith('folder-')) {
        setFocusedNode(nodeId);

        // Focus the actual DOM element
        const element = document.querySelector(
          `[data-node-id="${nodeId}"]`
        ) as HTMLElement;
        if (element) {
          element.focus();
        }
        break;
      }
    }
  }, [focusedNode]);

  // 플랫 노드 리스트 업데이트 (TreeRoot에서 호출)
  const updateFlatNodeList = useCallback((nodes: string[]) => {
    flatNodeListRef.current = nodes;
  }, []);

  return {
    expandedNodes,
    selectedNode,
    focusedNode,
    toggleNode,
    selectNode,
    clearSelection,
    expandNode,
    collapseNode,
    expandAll,
    collapseAll,
    focusNode,
    navigateUp,
    navigateDown,
    navigateToParent,
    updateFlatNodeList,
  };
};
