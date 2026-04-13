"use client";

import * as React from "react";
import { Search as SearchIcon, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function Search() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const searchRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close on escapce or outside click
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Simple search logic - in a real app this would fetch from an API route or pre-generated index
  React.useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchDomains = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.slice(0, 10));
      } catch (e) {
        console.error(`Search error:`, e);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchDomains, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (domain: string, node: string) => {
    router.push(`/domain/${domain}?node=${node}`);
    setIsOpen(false);
    setQuery("");
  };

  if (!mounted) {
    return (
      <div className="relative flex-1 max-w-sm h-10 bg-primary/5 border border-node-border/50 rounded-xl animate-pulse" />
    );
  }

  return (
    <div className="relative flex-1 max-w-sm" ref={searchRef}>
      <div 
        className="flex items-center gap-2 px-3 py-2 bg-node-bg border border-node-border/50 rounded-xl cursor-text hover:border-primary/50 transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        <SearchIcon className="h-4 w-4 opacity-50 text-primary" />
        <span className="text-sm opacity-50 flex-grow">Search nodes...</span>
        <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 font-mono text-[10px] font-medium opacity-50 border border-node-border rounded bg-muted">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-node-bg border border-node-border rounded-2xl shadow-2xl z-[9999] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 min-w-[300px]">
          <div className="p-4 border-b border-node-border/50 flex items-center gap-2">
            {isLoading ? (
              <Loader2 className="h-4 w-4 text-primary animate-spin" />
            ) : (
              <SearchIcon className="h-4 w-4 text-primary" />
            )}
            <input 
              autoFocus
              className="bg-transparent border-none outline-none w-full text-sm"
              placeholder="Start typing to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button onClick={() => setQuery("")} className="p-1 hover:bg-primary/10 rounded-full">
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
          
          <div className="max-h-80 overflow-y-auto p-2">
            {results && results.length > 0 ? (
              results.map((res, i) => (
                <button
                  key={i}
                  className="w-full text-left p-3 rounded-xl hover:bg-primary/5 flex flex-col gap-1 transition-colors"
                  onClick={() => handleSelect(res.domain, res.id)}
                >
                  <span className="font-bold text-sm tracking-tight">{res.label}</span>
                  <span className="text-[10px] opacity-40 uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {res.domainName}
                  </span>
                </button>
              ))
            ) : query.length >= 2 ? (
              <div className="p-12 text-center flex flex-col items-center gap-2 opacity-30">
                <SearchIcon className="h-8 w-8" />
                <span className="text-xs">No results found for "{query}"</span>
              </div>
            ) : (
              <div className="p-12 text-center opacity-30 text-xs italic">
                Type at least 2 characters to search...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
