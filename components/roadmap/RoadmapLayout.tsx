"use client";

import { useState, ReactNode } from "react";
import RoadmapCanvas from "@/components/roadmap/RoadmapCanvas";
import { Node, Edge } from "reactflow";

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

  return (
    <div className="flex flex-col lg:flex-row w-full gap-8">
      {/* Main Content Area */}
      <div className={`w-full transition-all duration-300 ${nodeId ? 'lg:w-2/3' : 'max-w-7xl mx-auto'}`}>
        {header}
        
        {/* Mobile View Toggle */}
        <div className="flex lg:hidden mb-6 bg-node-bg border border-node-border rounded-lg p-1 w-fit">
          <button 
            onClick={() => setViewMode("canvas")}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${viewMode === "canvas" ? "bg-primary text-primary-foreground shadow-sm" : "opacity-50"}`}
          >
            Canvas View
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${viewMode === "list" ? "bg-primary text-primary-foreground shadow-sm" : "opacity-50"}`}
          >
            List View
          </button>
        </div>

        {viewMode === "canvas" ? (
          <div className="w-full">
             <RoadmapCanvas domainId={domainId} initialNodes={initialNodes} initialEdges={initialEdges} showLegend={showLegend} />
          </div>
        ) : (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {initialNodes.filter(n => n.data?.type !== 'sub').map(node => (
              <div key={node.id} className="p-6 bg-node-bg border border-node-border rounded-xl">
                <h3 className="text-xl font-bold mb-2">{node.data?.label}</h3>
                <div className="flex gap-2 flex-wrap">
                  {initialEdges.filter(e => e.source === node.id).map(edge => {
                    const targetNode = initialNodes.find(n => n.id === edge.target);
                    if (targetNode?.data?.type === 'sub') {
                       return (
                         <button 
                           key={targetNode.id}
                           onClick={() => window.location.search = `?node=${targetNode.id}`}
                           className="px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-full text-xs font-medium hover:bg-primary/10 transition-colors"
                         >
                           {targetNode.data.label}
                         </button>
                       );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Guide Sidebar / Bottom Drawer */}
      {nodeId && (
        <div className="w-full lg:w-1/3 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:border-l border-node-border lg:pl-8 pt-4 lg:pt-12 pb-12 lg:sticky lg:top-12 fade-in hide-scrollbar border-t lg:border-t-0 mt-8 lg:mt-0">
          {mdxContent}
        </div>
      )}
    </div>
  );
}
