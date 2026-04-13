"use client";

export function Legend() {
  return (
    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md border border-node-border p-4 rounded-xl shadow-lg z-10 animate-in fade-in slide-in-from-top-4 duration-500">
      <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-3">Roadmap Legend</h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-level-basic-bg border-2 border-level-basic-border" />
          <span className="text-sm font-bold text-level-basic-border">Core Process</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-level-advanced-bg border-2 border-level-advanced-border" />
          <span className="text-sm font-bold text-level-advanced-border">Advanced Variant</span>
        </div>
        <div className="flex items-center gap-3 border-t border-node-border/50 pt-2 mt-1">
          <div className="w-4 h-4 rounded-full bg-primary" />
          <span className="text-sm font-medium italic">Completed</span>
        </div>
      </div>
    </div>
  );
}
