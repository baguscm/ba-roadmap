"use client";

import * as React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { useLocalStorage } from '@/hooks/useLocalStorage';


export function DeliverableChecklist({ id, items: rawItems }: { id: string, items: string | string[] }) {
  const items = React.useMemo(() => {
    if (typeof rawItems === "string") return rawItems.split("|").map(i => i.trim());
    return rawItems || [];
  }, [rawItems]);

  const storageKey = `deliverables-${id}`;
  const [completedItems, setCompletedItems] = useLocalStorage<string[]>(storageKey, []);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleItem = (item: string) => {
    const next = completedItems.includes(item)
      ? completedItems.filter(i => i !== item)
      : [...completedItems, item];
    
    setCompletedItems(next);
    window.dispatchEvent(new Event("roadmap-progress-update"));
    window.dispatchEvent(new Event("ba-progress-update"));
  };

  if (!isLoaded) return <div className="animate-pulse h-32 bg-primary/5 rounded-2xl" />;

  return (
    <div className="my-8 p-6 bg-primary/5 border border-primary/10 rounded-2xl not-prose text-foreground">
      <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 opacity-90">Required BA Deliverables</h3>
      <div className="space-y-3">
        {items?.map((item, idx) => {
          const isDone = completedItems.includes(item);
          return (
            <button
              key={idx}
              onClick={() => toggleItem(item)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left border ${
                isDone 
                  ? "bg-primary/20 border-primary/40 text-foreground" 
                  : "bg-background border-node-border hover:border-primary/40 text-foreground"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
              ) : (
                <Circle className="h-5 w-5 shrink-0 text-foreground/20" />
              )}
              <span className={`text-sm font-medium ${isDone ? "line-through opacity-80" : ""}`}>
                {item}
              </span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-primary/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-tighter opacity-70">
        <span>{completedItems.length} of {items?.length || 0} completed</span>
        <span>{items?.length ? Math.round((completedItems.length / items.length) * 100) : 0}%</span>
      </div>
    </div>
  );
}
