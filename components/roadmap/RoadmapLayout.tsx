"use client";

import { useState, ReactNode, useMemo, useEffect, useRef } from "react";
import RoadmapCanvas from "@/components/roadmap/RoadmapCanvas";
import { Node, Edge } from "reactflow";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface RoadmapLayoutProps {
  domainId: string;
  initialNodes: Node[];
  initialEdges: Edge[];
  nodeId: string | null;
  mdxContent: ReactNode;
  header: ReactNode;
  showLegend?: boolean;
}

export function RoadmapLayout({ domainId, initialNodes, initialEdges, nodeId, mdxContent, header, showLegend = false }: RoadmapLayoutProps) {
  const [viewMode, setViewMode] = useState<"canvas" | "list">("canvas");
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle auto-scroll on mobile
  useEffect(() => {
    if (nodeId && contentRef.current && typeof window !== 'undefined' && window.innerWidth < 1024) {
      const offset = 100; // Small offset for breathing room
      const elementTop = contentRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
    }
  }, [nodeId]);

  return (
    <div className="flex flex-col lg:flex-row w-full gap-8">
      {/* Main Content Area */}
      <div className={`w-full transition-all duration-300 ${nodeId ? 'lg:w-2/3' : 'max-w-7xl mx-auto'}`}>
        {header}
        
        {/* Toggle View */}
        <div className="flex mb-6 bg-node-bg border border-node-border rounded-xl p-1 w-fit">
          <button 
            onClick={() => setViewMode("canvas")}
            className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${viewMode === "canvas" ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/50 hover:text-foreground"}`}
          >
            Canvas View
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${viewMode === "list" ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/50 hover:text-foreground"}`}
          >
            List View
          </button>
        </div>

        {viewMode === "canvas" ? (
          <div className="w-full">
             <RoadmapCanvas domainId={domainId} initialNodes={initialNodes} initialEdges={initialEdges} showLegend={showLegend} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {initialNodes.filter(n => !n.id.includes('hidden')).map(node => (
              <button 
                key={node.id} 
                onClick={() => router.push(`?node=${node.id}`, { scroll: false })}
                className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${nodeId === node.id ? "border-primary bg-primary/5 shadow-md scale-[1.02]" : "border-node-border hover:border-primary/50 bg-background"}`}
              >
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${node.data.level === 'advanced' ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
                <span className="font-bold flex-1">{node.data.label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-20"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Guide Content Sidebar / Mobile Section */}
      <div ref={contentRef} className={`w-full lg:w-1/3 transition-all duration-500 ${nodeId ? 'opacity-100' : 'opacity-0'}`}>
        {nodeId && (
          <div className="p-1 px-4 lg:p-0 min-h-[500px]">
            {mdxContent}
          </div>
        )}
      </div>
    </div>
  );
}
