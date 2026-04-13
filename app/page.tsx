"use client";

import { useState, useEffect } from "react";
import { GlobalStats } from "@/components/ui/GlobalStats";
import { DomainCard } from "@/components/DomainCard";

type DomainGroup = "basic" | "advanced" | "professional";

export default function Home() {
  const [activeTab, setActiveTab] = useState<DomainGroup>("basic");
  const [isLoaded, setIsLoaded] = useState(false);

  // Restore tab from localStorage on mount
  useEffect(() => {
    const savedTab = localStorage.getItem("ba-roadmap-active-tab") as DomainGroup;
    
    // We use a small delay or a microtask to move the state update out of 
    // the synchronous effect body, satisfying strict lint rules and 
    // preventing cascading render warnings.
    const timer = setTimeout(() => {
      if (savedTab && ["basic", "advanced", "professional"].includes(savedTab)) {
        setActiveTab(savedTab);
      }
      setIsLoaded(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save tab to localStorage when it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ba-roadmap-active-tab", activeTab);
    }
  }, [activeTab, isLoaded]);

  const domains = [
    // BASIC
    {
      id: "o2c-basic",
      name: "Order to Cash (Basic)",
      group: "basic",
      description: "Master the fundamental customer-to-payment lifecycle.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.56-7.43H5.12"/></svg>,
      totalNodes: 5
    },
    {
      id: "p2p-basic",
      name: "Procure to Pay (Basic)",
      group: "basic",
      description: "Master the fundamental vendor-to-payment lifecycle.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
      totalNodes: 5
    },
    // ADVANCED
    {
      id: "o2c-b2b",
      name: "O2C B2B Advanced",
      group: "advanced",
      description: "Complex B2B flows including EDI, credit limits, and volume contracts.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      totalNodes: 8
    },
    {
      id: "o2c-b2c",
      name: "O2C B2C Advanced",
      group: "advanced",
      description: "High-volume retail flows with payment gateways and last-mile delivery.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/></svg>,
      totalNodes: 8
    },
    {
      id: "p2p-import",
      name: "P2P with Import",
      group: "advanced",
      description: "Global procurement focusing on customs, L/C, and international logistics.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"/><path d="m5 10 7-7 7 7"/><path d="m19 14-7 7-7-7"/></svg>,
      totalNodes: 8
    },
    {
      id: "p2p-assets",
      name: "P2P with Assets",
      group: "advanced",
      description: "Procurement tied to fixed asset capitalization and maintenance.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="m3.34 19 9.39-9.39a2.12 2.12 0 0 1 3-3l1.15-1.15a.5.5 0 0 1 .71 0l1.15 1.15a2.12 2.12 0 0 1-3 3l-1.15 1.15a2.12 2.12 0 0 1-3 3l-1.15 1.15a.5.5 0 0 1-.71 0L3.34 19Z"/></svg>,
      totalNodes: 8
    },
    {
      id: "plan-to-produce",
      name: "Plan to Produce",
      group: "advanced",
      description: "MRP, production scheduling, and shop floor execution frameworks.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
      totalNodes: 5
    },
    {
      id: "hr-recruit",
      name: "Recruit to Onboard",
      group: "advanced",
      description: "End-to-end talent acquisition and employee integration process.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="16" x2="22" y1="11" y2="11"/></svg>,
      totalNodes: 5
    },
    // PROFESSIONAL
    {
      id: "ecommerce",
      name: "E-Commerce",
      group: "professional",
      description: "Master supply chain, order-to-cash, inventory, and payment gateways.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
      totalNodes: 25
    },
    {
      id: "hr-payroll",
      name: "HR & Payroll",
      group: "professional",
      description: "Master employee lifecycles, talent management, and complex payroll systems.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      totalNodes: 15
    },
    {
      id: "fintech",
      name: "FinTech",
      group: "professional",
      description: "Master core ledgers, payments, digital onboarding, and risk management.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>,
      totalNodes: 15
    },
    {
      id: "supply-chain",
      name: "Supply Chain",
      group: "professional",
      description: "Master WMS, TMS, demand planning, and global logistics networks.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3m1 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0m13-3V6l-3-4H12v12h9m-5 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0"/></svg>,
      totalNodes: 9
    },
    {
      id: "energy",
      name: "Energy",
      group: "professional",
      description: "Master grid operations, renewables integration, and utility billing.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
      totalNodes: 6
    },
    {
      id: "mining",
      name: "Mining",
      group: "professional",
      description: "Master exploration planning, extraction safety, and yield tracking.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l-4 8 4 8 4-8-4-8z"/><path d="M22 12l-4-8-4 8 4 8 4-8z"/><path d="M2 12l4-8 4 8-4 8-4-8z"/></svg>,
      totalNodes: 6
    },
    {
      id: "healthcare",
      name: "Healthcare",
      group: "professional",
      description: "Master patient onboarding, EMR management, and medical billing cycles.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
      totalNodes: 6
    }
  ];

  const filteredDomains = domains.filter(d => d.group === activeTab);
  const totalPossibleNodes = domains.reduce((acc, d) => acc + d.totalNodes, 0);

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24 bg-background pt-16">
      <div className="max-w-6xl w-full text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase animate-in fade-in slide-in-from-bottom-2 duration-500">
          Professional Learning Path
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 drop-shadow-sm">
          BA Roadmap
        </h1>
        <p className="text-xl md:text-2xl text-foreground mb-16 opacity-70 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000">
          Industry-specific process frameworks and expert deliverables to accelerate your career as a Business Analyst.
        </p>

        <GlobalStats totalNodes={totalPossibleNodes} />
        
        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 p-1.5 bg-node-bg border border-node-border rounded-2xl shadow-sm max-w-fit mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
          {(["basic", "advanced", "professional"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                activeTab === tab 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
                  : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left h-full animate-in fade-in slide-in-from-bottom-10 duration-1000">
          {filteredDomains.map((domain) => (
            <DomainCard 
              key={domain.id}
              {...domain}
            />
          ))}
          {filteredDomains.length === 0 && (
            <div className="col-span-full py-20 text-center opacity-30 italic">
              Coming soon...
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
