import { useState, useEffect } from 'react';

export function useProgress(domainId: string) {
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadStorage = () => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(`ba-roadmap-${domainId}`);
    if (stored) {
      setCompletedNodes(JSON.parse(stored));
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    loadStorage();
    window.addEventListener('roadmap-progress-update', loadStorage);
    return () => window.removeEventListener('roadmap-progress-update', loadStorage);
  }, [domainId]);

  const toggleNode = (nodeId: string) => {
    const next = completedNodes.includes(nodeId) ? completedNodes.filter(id => id !== nodeId) : [...completedNodes, nodeId];
    setCompletedNodes(next);
    localStorage.setItem(`ba-roadmap-${domainId}`, JSON.stringify(next));
    
    // Defer the dispatch so we don't trigger state updates in other components while this one is rendering/updating synchronously
    setTimeout(() => {
        window.dispatchEvent(new Event('roadmap-progress-update'));
    }, 0);
  };

  return { completedNodes, toggleNode, isLoaded };
}
