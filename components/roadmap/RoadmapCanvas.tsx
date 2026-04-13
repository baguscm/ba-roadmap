'use client';

import { useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactFlow, {
  Background,
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
import { Legend } from './Legend';

export default function RoadmapCanvas({ domainId, initialNodes, initialEdges, showLegend = false }: { domainId: string, initialNodes: Node[], initialEdges: Edge[], showLegend?: boolean }) {
  const router = useRouter();
  const { completedNodes } = useProgress(domainId);
  const nodeTypes: NodeTypes = useMemo(() => ({ custom: CustomNode, sub: SubNode }), []);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Calculate dynamic content height
  const contentHeight = useMemo(() => {
    if (!initialNodes || initialNodes.length === 0) return 600;
    const maxY = Math.max(...initialNodes.map(n => n.position.y));
    return Math.max(maxY + 400, 600); // Increased padding to allow more vertical room for zooming
  }, [initialNodes]);

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

  // Responsive fitView options
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const responsiveFitViewOptions = useMemo(() => ({
    padding: isMobile ? 0.25 : 0.1,
    minZoom: isMobile ? 0.35 : 0.9,
    maxZoom: 1.1,
    includeHiddenNodes: false
  }), [isMobile]);

  return (
    <div className="w-full border border-node-border rounded-xl shadow-sm bg-background overflow-hidden" style={{ height: `${contentHeight}px` }}>
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
        className="bg-background/50 pointer-events-auto"
        fitView
        fitViewOptions={responsiveFitViewOptions}
        minZoom={0.2}
        maxZoom={1.5}
      >
        <Background color="#ccc" gap={16} />
        {showLegend && <Legend />}
      </ReactFlow>
    </div>
  );
}
