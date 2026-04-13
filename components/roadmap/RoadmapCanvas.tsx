'use client';

import { useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  NodeTypes,
  addEdge,
  Connection
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from './CustomNode';
import SubNode from './SubNode';
import { useProgress } from '@/hooks/useProgress';

export default function RoadmapCanvas({ domainId, initialNodes, initialEdges }: { domainId: string, initialNodes: Node[], initialEdges: Edge[] }) {
  const router = useRouter();
  const { completedNodes } = useProgress(domainId);
  const nodeTypes: NodeTypes = useMemo(() => ({ custom: CustomNode, sub: SubNode }), []);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Enhance nodes with completed state dynamically
  useEffect(() => {
    setNodes((nds) => 
      nds?.map((n) => ({
        ...n,
        type: n.data?.type === 'sub' ? 'sub' : 'custom',
        data: {
          ...n.data,
          completed: completedNodes.includes(n.id)
        }
      }))
    );
  }, [completedNodes, setNodes]);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    router.push(`?node=${node.id}`, { scroll: false });
  }, [router]);

  return (
    <div className="w-full border border-node-border rounded-xl shadow-sm bg-background" style={{ height: '2300px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        defaultViewport={{ x: 50, y: 50, zoom: 1.3 }}
        className="bg-background/50 pointer-events-auto"
      >
        <Background color="#ccc" gap={16} />
      </ReactFlow>
    </div>
  );
}
