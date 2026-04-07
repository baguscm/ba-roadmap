import { DomainCard } from "@/components/DomainCard";

export default function Home() {
  const domains = [
    {
      id: "ecommerce",
      name: "E-Commerce",
      description: "Master order-to-cash, inventory, and payment gateways.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
      totalNodes: 25
    },
    {
      id: "hr-payroll",
      name: "HR & Payroll",
      description: "Master employee lifecycles and complex payrolls.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      totalNodes: 15
    },
    {
      id: "fintech",
      name: "FinTech",
      description: "Master ledgers, payments, and risk management.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>,
      totalNodes: 15
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-background">
      <div className="max-w-6xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary mb-8 animate-fade-in drop-shadow-sm">
          Business Analyst Road Map
        </h1>
        <p className="text-xl md:text-2xl text-foreground mb-16 opacity-80 max-w-2xl mx-auto leading-relaxed">
          Interactive learning paths to master domain-specific terminology, processes, and deliverables.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
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
