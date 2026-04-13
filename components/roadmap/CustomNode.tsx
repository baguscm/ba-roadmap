import { Handle, Position, NodeProps } from 'reactflow';

export default function CustomNode({ data }: NodeProps) {
  const isCompleted = data.completed;
  const level = data.level || 'basic';
  
  const levelStyles = {
    basic: 'bg-level-basic-bg border-level-basic-border',
    advanced: 'bg-level-advanced-bg border-level-advanced-border'
  };

  const styleClass = levelStyles[level as keyof typeof levelStyles] || levelStyles.basic;

  return (
    <div className={`px-4 py-2 shadow-md rounded-lg border-2 flex items-center gap-3 transition-all duration-300 ${styleClass} ${isCompleted ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
      <div className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-primary animate-pulse' : 'bg-foreground/20'}`} />
      <div className="font-semibold text-sm">
        {data.label}
      </div>
      
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-foreground/30 border-none" id="top" />
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-foreground/30 border-none" id="bottom" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-foreground/30 border-none" id="right" />
    </div>
  );
}

