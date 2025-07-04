import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { useTreeState } from './hooks/useTreeState';
import { TreeNodeComponent } from './tree-node';
import { TreeNode } from './types/tree';
import { useEffect, useRef } from 'react';

export const TreeRoot = () => {
  const {
    data: nodes,
    isLoading,
    error,
  } = useQuery<TreeNode[]>({
    queryKey: ['file-tree'],
    queryFn: () => invoke('get_file_tree_command'),
  });

  const treeState = useTreeState();
  const treeRef = useRef<HTMLDivElement>(null);

  // Initialize focus to first node when nodes are loaded
  useEffect(() => {
    if (nodes && nodes.length > 0 && !treeState.focusedNode) {
      const firstNodeId = `${nodes[0].type}-${nodes[0].id}`;
      treeState.focusNode(firstNodeId);
      
      // Also focus the DOM element
      setTimeout(() => {
        const element = document.querySelector(`[data-node-id="${firstNodeId}"]`) as HTMLElement;
        if (element) {
          element.focus();
        }
      }, 100);
    }
  }, [nodes, treeState.focusedNode, treeState.focusNode]);

  // Build flat node list for keyboard navigation
  const buildFlatNodeList = (nodes: TreeNode[]): string[] => {
    const flatList: string[] = [];
    
    const traverse = (nodeList: TreeNode[]) => {
      nodeList.forEach(node => {
        const nodeId = `${node.type}-${node.id}`;
        flatList.push(nodeId);
        
        // Include children if node is expanded
        if (node.type === 'folder' && treeState.expandedNodes.has(nodeId) && node.children) {
          traverse(node.children);
        }
      });
    };
    
    traverse(nodes);
    return flatList;
  };

  // Update flat node list when nodes or expanded state changes
  useEffect(() => {
    if (nodes) {
      const flatNodeList = buildFlatNodeList(nodes);
      treeState.updateFlatNodeList(flatNodeList);
    }
  }, [nodes, treeState.expandedNodes, treeState.updateFlatNodeList]);

  // Global keyboard event handler for the tree
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle events when tree is focused
      if (!treeRef.current?.contains(document.activeElement)) {
        return;
      }

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          treeState.navigateUp();
          break;
        case 'ArrowDown':
          event.preventDefault();
          treeState.navigateDown();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [treeState.navigateUp, treeState.navigateDown]);

  if (isLoading) {
    return <div className="text-body-2 px-2 py-1">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-body-2 px-2 py-1 text-red-500">
        Error loading tree
      </div>
    );
  }

  if (!nodes || nodes.length === 0) {
    return <div className="text-body-2 px-2 py-1">No files found</div>;
  }

  const getNodeState = (node: TreeNode) => {
    const nodeId = `${node.type}-${node.id}`;
    return {
      isExpanded: treeState.expandedNodes.has(nodeId),
      isSelected: treeState.selectedNode === nodeId,
      isFocused: treeState.focusedNode === nodeId,
    };
  };

  const renderNode = (node: TreeNode, depth: number): JSX.Element => {
    const { isExpanded, isSelected, isFocused } = getNodeState(node);

    return (
      <TreeNodeComponent
        key={`${node.type}-${node.id}`}
        node={node}
        depth={depth}
        isExpanded={isExpanded}
        onToggle={treeState.toggleNode}
        onSelect={treeState.selectNode}
        isSelected={isSelected}
        isFocused={isFocused}
        onFocus={treeState.focusNode}
        onNavigateUp={treeState.navigateUp}
        onNavigateDown={treeState.navigateDown}
        renderChildren={(childNodes: TreeNode[]) =>
          childNodes.map(childNode => renderNode(childNode, depth + 1))
        }
      />
    );
  };

  return (
    <div ref={treeRef} role="tree" className="f-c items-start justify-start w-full">
      {nodes.map(node => renderNode(node, 0))}
    </div>
  );
};
