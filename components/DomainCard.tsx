"use client";

import { useProgress } from "@/hooks/useProgress";
import { ReactNode } from "react";

interface DomainCardProps {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  totalNodes: number;
}

export function DomainCard({ id, name, description, icon, totalNodes }: DomainCardProps) {
  const { completedNodes, isLoaded } = useProgress(id);
  
  const percentage = isLoaded ? Math.min(100, Math.round((completedNodes.length / totalNodes) * 100)) : 0;

  return (
    <div className="group relative">
      <a 
        href={`/domain/${id}`} 
        className="block p-8 bg-node-bg border border-node-border rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 h-full flex flex-col"
      >
        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          {icon}
        </div>
        
        <h2 className="text-2xl font-bold mb-3 tracking-tight">{name}</h2>
        <p className="text-foreground/70 mb-8 leading-relaxed flex-grow">
          {description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-node-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-60">Completion</span>
            <span className="text-sm font-bold text-primary">{percentage}%</span>
          </div>
          <div className="w-full bg-foreground/5 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-1000 ease-out rounded-full" 
              style={{ width: isLoaded ? `${percentage}%` : '0%' }}
            />
          </div>
        </div>
      </a>
    </div>
  );
}
