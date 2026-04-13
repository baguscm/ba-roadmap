import RoadmapCanvas from '@/components/roadmap/RoadmapCanvas';
import { CompleteButton } from '@/components/ui/CompleteButton';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { DeliverableChecklist } from '@/components/ui/DeliverableChecklist';
import React from 'react';

const mdxComponents = {
  DeliverableChecklist,
};

async function getGuideContent(id: string) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'guides', `${id}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const contentWithoutFrontmatter = fileContent.replace(/---\n[\s\S]*?\n---/, '');
    return contentWithoutFrontmatter;
  } catch {
    return null;
  }
}

async function getDomainMap(domainId: string) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'maps', `${domainId}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return { nodes: [], edges: [] };
  }
}

export default async function DomainPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const nodeId = resolvedSearchParams.node as string;
  const mapData = await getDomainMap(resolvedParams.id);
  let mdxContent = null;
  
  if (nodeId) {
    mdxContent = await getGuideContent(nodeId);
  }

  return (
    <main className="flex min-h-screen items-start justify-center p-12 bg-background relative">
      <div className={`w-full transition-all duration-300 ${nodeId ? 'w-2/3 pr-8' : 'max-w-7xl'}`}>
        <Link href="/" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-6">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Domains
        </Link>
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-2 capitalize">
          {resolvedParams.id} Domain Roadmap
        </h1>
        <p className="text-foreground mb-8 opacity-80">
          Explore the interconnected processes. Click on nodes to view detailed BA deliverables.
        </p>
        <RoadmapCanvas domainId={resolvedParams.id} initialNodes={mapData.nodes} initialEdges={mapData.edges} />
      </div>

      {nodeId && (
        <div key={nodeId} className="w-1/3 max-h-[calc(100vh-3rem)] overflow-y-auto border-l border-node-border pl-8 pt-12 pb-12 sticky top-12 fade-in hide-scrollbar">
          <div className="flex justify-between items-center mb-6 pr-4">
             <h2 className="text-2xl font-bold">Guide</h2>
             <div className="flex items-center gap-2">
               <CompleteButton domainId={resolvedParams.id} nodeId={nodeId} />
               <Link href={`/domain/${resolvedParams.id}`} className="p-2 hover:bg-node-bg border border-node-border rounded-md text-foreground transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </Link>
             </div>
          </div>
          <div className="prose max-w-none prose-headings:text-primary prose-headings:font-black prose-headings:tracking-tight prose-p:text-foreground prose-p:leading-relaxed prose-li:text-foreground prose-li:my-2 prose-strong:text-foreground prose-blockquote:border-primary">
            {mdxContent ? <MDXRemote source={mdxContent} components={mdxComponents} /> : <p className="opacity-50">Document not found for this node.</p>}
          </div>
        </div>
      )}
    </main>
  );
}
