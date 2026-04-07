'use client';

import { useProgress } from '@/hooks/useProgress';

export default function CompleteButton({ domainId, nodeId }: { domainId: string, nodeId: string }) {
  const { completedNodes, toggleNode, isLoaded } = useProgress(domainId);

  if (!isLoaded) return null;

  const isCompleted = completedNodes.includes(nodeId);

  return (
    <button
      onClick={() => toggleNode(nodeId)}
      className={`px-4 py-2 text-sm font-semibold rounded-md border transition-colors ${isCompleted ? 'bg-node-completed text-primary-foreground border-node-completed hover:opacity-90' : 'bg-background text-foreground border-node-border hover:bg-node-bg'}`}
    >
      {isCompleted ? 'Completed \u2713' : 'Mark Complete'}
    </button>
  );
}
