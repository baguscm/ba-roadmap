"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Search } from "./Search";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-node-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold group-hover:rotate-12 transition-transform duration-300">
            BA
          </div>
          <span className="font-bold text-xl tracking-tight hidden md:block">Roadmap</span>
        </Link>
        
        <div className="flex items-center gap-4 flex-1 justify-end max-w-xl">
          <React.Suspense fallback={<div className="h-10 w-full max-w-sm bg-primary/5 rounded-xl animate-pulse" />}>
            <Search />
          </React.Suspense>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
