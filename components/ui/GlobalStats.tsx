"use client";

import * as React from "react";
import { SkillsModal } from "./SkillsModal";

export function GlobalStats({ totalNodes }: { totalNodes: number }) {
  const [completedCount, setCompletedCount] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    // Collect all completed nodes from localStorage for all keys that start with "roadmap-progress-"
    const updateStats = () => {
      const keys = getProgressKeys();
      const allCompletedNodes = new Set<string>();
      
      keys.forEach(key => {
        try {
          const data = JSON.parse(localStorage.getItem(key) || "[]");
          if (Array.isArray(data)) {
            data.forEach(nodeId => allCompletedNodes.add(nodeId));
          }
        } catch (e) {}
      });
      
      setCompletedCount(allCompletedNodes.size);
      setIsLoaded(true);
    };

    updateStats();
    // Listen for changes from this window and other tabs
    window.addEventListener("storage", updateStats);
    window.addEventListener("roadmap-progress-update", updateStats);
    window.addEventListener("ba-progress-update", updateStats);
    return () => {
      window.removeEventListener("storage", updateStats);
      window.removeEventListener("roadmap-progress-update", updateStats);
      window.removeEventListener("ba-progress-update", updateStats);
    };
  }, []);

  const getProgressKeys = () => {
    return Object.keys(localStorage).filter(key => 
      key.startsWith("ba-roadmap-")
    );
  };

  const percentage = Math.min(100, Math.round((completedCount / totalNodes) * 100));

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="mb-16 p-8 bg-primary/5 border border-primary/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 animate-in fade-in zoom-in duration-700 cursor-pointer hover:scale-[1.01] hover:bg-primary/[0.07] transition-all group active:scale-[0.99]"
      >
        <div className="text-left">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-1 group-hover:translate-x-1 transition-transform">Global Achievement</h3>
          <p className="text-3xl font-black tracking-tighter">Your Learning Journey</p>
        </div>
        
        <div className="flex-1 w-full max-w-md">
          <div className="flex items-center justify-between mb-3 text-sm font-bold">
            <span className="opacity-60">{completedCount} of {totalNodes} Skills Mastered</span>
            <span className="text-primary">{percentage}% Complete</span>
          </div>
          <div className="h-4 w-full bg-primary/10 rounded-full overflow-hidden p-1 border border-primary/5">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(134,163,137,0.5)]"
              style={{ width: isLoaded ? `${percentage}%` : '0%' }}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="bg-background border border-node-border rounded-2xl p-4 min-w-[100px] text-center shadow-sm group-hover:border-primary/40 transition-colors">
            <span className="block text-2xl font-black text-primary">{percentage}%</span>
            <span className="text-[10px] uppercase font-bold opacity-40">Overall</span>
          </div>
          <div className="bg-background border border-node-border rounded-2xl p-4 min-w-[100px] text-center shadow-sm group-hover:border-primary/40 transition-colors">
            <span className="block text-2xl font-black text-primary">{completedCount}</span>
            <span className="text-[10px] uppercase font-bold opacity-40">Skills</span>
          </div>
        </div>
      </div>

      <SkillsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
