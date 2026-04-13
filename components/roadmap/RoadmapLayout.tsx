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
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {initialNodes.filter(n => !n.id.includes('hidden') && !n.data?.hidden).map(node => {
              const isSub = node.data.type === 'sub';
              return (
                <button 
                  key={node.id} 
                  onClick={() => router.push(`?node=${node.id}`, { scroll: false })}
                  className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all group ${
                    nodeId === node.id 
                      ? "border-primary bg-primary/5 shadow-md scale-[1.01]" 
                      : "border-node-border hover:border-primary/50 bg-background"
                  } ${isSub ? "ml-10 py-3 mb-1" : "mt-4"}`}
                >
                  <div className={`flex-shrink-0 flex items-center justify-center ${isSub ? "w-5 h-5" : "w-6 h-6"}`}>
                    {isSub ? (
                      <div className="flex items-center">
                        <div className="w-4 h-px bg-node-border mr-2" /> {/* Horizontal connector */}
                        <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors" />
                      </div>
                    ) : (
                      <div className={`w-3.5 h-3.5 rounded-full ring-4 ring-primary/5 ${node.data.level === 'advanced' ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
                    )}
                  </div>
                  <span className={`flex-1 ${isSub ? "text-sm font-medium text-foreground/80" : "font-extrabold text-lg"}`}>
                    {node.data.label}
                  </span>
                  {!isSub && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-20 group-hover:opacity-100 transition-opacity text-primary"><path d="m9 18 6-6-6-6"/></svg>
                  )}
                </button>
              );
            })}
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
