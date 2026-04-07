import { Handle, Position, NodeProps } from 'reactflow';

export default function CustomNode({ data }: NodeProps) {
  const isCompleted = data.completed;
  
  return (
    <div className={`px-4 py-2 shadow-md rounded-lg bg-node-bg border-2 flex items-center gap-3 transition-colors ${isCompleted ? 'border-node-completed text-node-completed' : 'border-node-border text-foreground'}`}>
      <div className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-node-completed' : 'bg-gray-300'}`} />
      <div className="font-semibold text-sm">
        {data.label}
      </div>
      
      <Handle type="target" position={Position.Top} className="w-2 h-2 rounded-full !bg-gray-400" id="top" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 rounded-full !bg-gray-400" id="bottom" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 rounded-full !bg-gray-400" id="right" />
    </div>
  );
}

