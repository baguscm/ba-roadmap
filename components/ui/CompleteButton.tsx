'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';

interface CompleteButtonProps {
  domainId: string;
  nodeId: string;
}

export function CompleteButton({ domainId, nodeId }: CompleteButtonProps) {
  const storageKey = `ba-roadmap-${domainId}`;
  const [completedNodes, setCompletedNodes] = useLocalStorage<string[]>(storageKey, []);

  const isCompleted = completedNodes.includes(nodeId);

  const toggle = () => {
    const next = isCompleted
      ? completedNodes.filter(id => id !== nodeId)
      : [...completedNodes, nodeId];
    
    setCompletedNodes(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event("roadmap-progress-update"));
  };

  return (
    <button
      onClick={toggle}
      className={`px-4 py-2 text-sm font-semibold rounded-md border transition-colors ${isCompleted ? 'bg-node-completed text-primary-foreground border-node-completed hover:opacity-90' : 'bg-background text-foreground border-node-border hover:bg-node-bg'}`}
    >
      {isCompleted ? 'Completed \u2713' : 'Mark Complete'}
    </button>
  );
}
