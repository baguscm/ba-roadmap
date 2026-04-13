import { GlobalStats } from "@/components/ui/GlobalStats";
import { DomainCard } from "@/components/DomainCard";

export default function Home() {
  const domains = [
    {
      id: "ecommerce",
      name: "E-Commerce",
      description: "Master supply chain, order-to-cash, inventory, and payment gateways.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
      totalNodes: 25
    },
    {
      id: "hr-payroll",
      name: "HR & Payroll",
      description: "Master employee lifecycles, talent management, and complex payroll systems.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      totalNodes: 15
    },
    {
      id: "fintech",
      name: "FinTech",
      description: "Master core ledgers, payments, digital onboarding, and risk management.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>,
      totalNodes: 15
    },
    {
      id: "supply-chain",
      name: "Supply Chain",
      description: "Master WMS, TMS, demand planning, and global logistics networks.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3m1 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0m13-3V6l-3-4H12v12h9m-5 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0"/></svg>,
      totalNodes: 9
    },
    {
      id: "energy",
      name: "Energy",
      description: "Master grid operations, renewables integration, and utility billing.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
      totalNodes: 6
    },
    {
      id: "mining",
      name: "Mining",
      description: "Master exploration planning, extraction safety, and yield tracking.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l-4 8 4 8 4-8-4-8z"/><path d="M22 12l-4-8-4 8 4 8 4-8z"/><path d="M2 12l4-8 4 8-4 8-4-8z"/></svg>,
      totalNodes: 6
    },
    {
      id: "healthcare",
      name: "Healthcare",
      description: "Master patient onboarding, EMR management, and medical billing cycles.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
      totalNodes: 6
    }
  ];

  const totalPossibleNodes = domains.reduce((acc, d) => acc + d.totalNodes, 0);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-background pt-16">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left h-full">
          {domains.map((domain) => (
            <DomainCard 
              key={domain.id}
              {...domain}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
