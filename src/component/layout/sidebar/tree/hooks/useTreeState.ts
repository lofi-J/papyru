import { useState, useCallback, useRef } from 'react';
import { TreeState, TreeActions, TreeNode } from '../types/tree';

export const useTreeState = (initialExpandedNodes: string[] = []): TreeState & TreeActions & { updateFlatNodeList: (nodes: string[]) => void } => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(initialExpandedNodes)
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
    // This would need to be implemented based on all available nodes
    // For now, it's a placeholder
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set());
  }, []);

  const focusNode = useCallback((nodeId: string) => {
    setFocusedNode(nodeId);
  }, []);

  const navigateUp = useCallback(() => {
    console.log('Navigate up called, focusedNode:', focusedNode, 'flatList:', flatNodeListRef.current);
    if (!focusedNode || flatNodeListRef.current.length === 0) return;
    
    const currentIndex = flatNodeListRef.current.indexOf(focusedNode);
    console.log('Current index:', currentIndex);
    if (currentIndex > 0) {
      const prevNodeId = flatNodeListRef.current[currentIndex - 1];
      console.log('Moving to:', prevNodeId);
      setFocusedNode(prevNodeId);
      
      // Focus the actual DOM element
      const element = document.querySelector(`[data-node-id="${prevNodeId}"]`) as HTMLElement;
      if (element) {
        element.focus();
      }
    }
  }, [focusedNode]);

  const navigateDown = useCallback(() => {
    console.log('Navigate down called, focusedNode:', focusedNode, 'flatList:', flatNodeListRef.current);
    if (!focusedNode || flatNodeListRef.current.length === 0) return;
    
    const currentIndex = flatNodeListRef.current.indexOf(focusedNode);
    console.log('Current index:', currentIndex);
    if (currentIndex < flatNodeListRef.current.length - 1) {
      const nextNodeId = flatNodeListRef.current[currentIndex + 1];
      console.log('Moving to:', nextNodeId);
      setFocusedNode(nextNodeId);
      
      // Focus the actual DOM element
      const element = document.querySelector(`[data-node-id="${nextNodeId}"]`) as HTMLElement;
      if (element) {
        element.focus();
      }
    }
  }, [focusedNode]);

  // Function to update the flat node list (to be called from TreeRoot)
  const updateFlatNodeList = useCallback((nodes: string[]) => {
    flatNodeListRef.current = nodes;
  }, []);

  return {
    expandedNodes,
    selectedNode,
    focusedNode,
    toggleNode,
    selectNode,
    expandNode,
    collapseNode,
    expandAll,
    collapseAll,
    focusNode,
    navigateUp,
    navigateDown,
    updateFlatNodeList,
  };
};