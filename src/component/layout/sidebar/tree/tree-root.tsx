import { ROUTES } from '@/shared/constance/routes';
import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { useTreeState } from './hooks/useTreeState';
import { TreeControlPannel } from './tree-control-pannel';
import { TreeNodeComponent } from './tree-node';
import { TreeNode } from './types/tree';

export const TreeRoot = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const isNewFilePage = pathname === ROUTES.NEW_FILE;
  const currentNewFileTitle = searchParams.get('title') || 'New file';

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

  // 키보드 탐색을 위함
  const buildFlatNodeList = (nodes: TreeNode[]): string[] => {
    const flatList: string[] = [];

    const traverse = (nodeList: TreeNode[]) => {
      nodeList.forEach(node => {
        const nodeId = `${node.type}-${node.id}`;
        flatList.push(nodeId);

        // 노드가 확장되어 있으면 자식 노드도 포함
        if (
          node.type === 'folder' &&
          treeState.expandedNodes.has(nodeId) &&
          node.children
        ) {
          traverse(node.children);
        }
      });
    };

    traverse(nodes);
    return flatList;
  };

  // 노드 또는 확장 상태가 변경될 때 플랫 노드 리스트 업데이트
  useEffect(() => {
    if (nodes) {
      const flatNodeList = buildFlatNodeList(nodes);
      treeState.updateFlatNodeList(flatNodeList);
    }
  }, [nodes, treeState.expandedNodes, treeState.updateFlatNodeList]);

  // 트리에 대한 전역 키보드 이벤트 핸들러
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 트리가 포커스되어 있을 때만 이벤트 처리
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
      <div className="text-caption-b px-2 py-1 text-red-500">
        Error Occured...
      </div>
    );
  }

  if ((!nodes || nodes.length === 0) && isNewFilePage) {
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
        onNavigateToParent={treeState.navigateToParent}
        onClearSelection={treeState.clearSelection}
        renderChildren={(childNodes: TreeNode[]) =>
          childNodes.map(childNode => renderNode(childNode, depth + 1))
        }
      />
    );
  };

  return (
    <div
      ref={treeRef}
      role="tree"
      className="f-c items-start justify-start w-full gap-1"
    >
      <TreeControlPannel 
        onExpandAll={treeState.expandAll}
        onCollapseAll={treeState.collapseAll}
      />
      {nodes?.map(node => renderNode(node, 0))}
      {isNewFilePage && (
        <div className="f-r gap-2 items-center text-body-2 w-full text-left ghost-button-selected">
          <span className="truncate">{currentNewFileTitle}</span>
        </div>
      )}
    </div>
  );
};
