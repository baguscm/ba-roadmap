import { Handle, Position, NodeProps } from 'reactflow';

export default function SubNode({ data }: NodeProps) {
  const isCompleted = data.completed;
  
  return (
    <div className={`px-4 py-1.5 shadow-sm rounded-r-2xl rounded-l-md border-y border-r border-l-[6px] flex items-center gap-2 transition-colors ${
      isCompleted 
        ? 'border-l-node-completed border-y-subnode-border border-r-subnode-border bg-subnode-bg text-node-completed opacity-75' 
        : 'border-subnode-border bg-subnode-bg text-subnode-text hover:border-l-primary'
    }`}>
      {/* Visual indicator dot if needed, perhaps we can remove it or keep it */}
      <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-node-completed' : 'bg-primary/40'}`} />
      <div className="font-medium text-xs whitespace-nowrap">
        {data.label}
      </div>
      
      <Handle type="target" position={Position.Left} className="w-1.5 h-1.5 rounded-full !bg-subnode-border border-none -ml-1" />
      <Handle type="source" position={Position.Right} className="w-1.5 h-1.5 rounded-full !bg-subnode-border border-none -mr-1" />
    </div>
  );
}
