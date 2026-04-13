"use client";

import * as React from "react";
import { X, Award, Search, Ghost, BookOpen } from "lucide-react";

interface SkillItem {
  name: string;
  nodeLabel: string;
  domainName: string;
}

interface DomainGroup {
  name: string;
  nodes: {
    label: string;
    skills: string[];
  }[];
}

export function SkillsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [learnedSkills, setLearnedSkills] = React.useState<DomainGroup[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    if (!isOpen) return;

    // Mapping of node IDs to their metadata (extracted from the session audit)
    // This is used to reconstruct the context from localStorage keys
    const nodeMetadata: Record<string, { label: string; domain: string; domainName: string }> = {
      // FinTech
      "fintech-onboarding": { label: "Customer Onboarding", domain: "fintech", domainName: "FinTech" },
      "fintech-kyc": { label: "KYC / KYB", domain: "fintech", domainName: "FinTech" },
      "fintech-risk": { label: "Risk Assessment", domain: "fintech", domainName: "FinTech" },
      "fintech-ledger": { label: "Core Ledger", domain: "fintech", domainName: "FinTech" },
      "fintech-accounts": { label: "Account Management", domain: "fintech", domainName: "FinTech" },
      "fintech-tx": { label: "Transaction Processing", domain: "fintech", domainName: "FinTech" },
      "fintech-payments": { label: "Payment Processing", domain: "fintech", domainName: "FinTech" },
      "fintech-gateways": { label: "Payment Gateways", domain: "fintech", domainName: "FinTech" },
      "fintech-settlement": { label: "Clearing & Settlement", domain: "fintech", domainName: "FinTech" },
      "fintech-loans": { label: "Loan Origination", domain: "fintech", domainName: "FinTech" },
      "fintech-credit": { label: "Credit Scoring", domain: "fintech", domainName: "FinTech" },
      "fintech-aml": { label: "AML Monitoring", domain: "fintech", domainName: "FinTech" },
      "fintech-reg": { label: "Regulatory Reporting", domain: "fintech", domainName: "FinTech" },
      // E-Commerce
      "ecommerce-vendor-mgt": { label: "Vendor Management", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-purchase-orders": { label: "Purchase Orders", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-wh-receiving": { label: "Warehouse Receiving", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-invoicing": { label: "Invoicing Operations", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-customer-order-mgt": { label: "Customer Order Mgt", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-fulfillment": { label: "Order Fulfillment", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-payment-collection": { label: "Payment Collection", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-wh-ops": { label: "Warehouse Operations", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-inventory-allocation": { label: "Inventory Allocation", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-returns-mgt": { label: "Returns Management", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-pim": { label: "PIM", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-pricing": { label: "Pricing & Promotions", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-fin-reporting": { label: "Financial Reporting", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-account-reconc": { label: "Account Reconciliation", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-bi-dw": { label: "BI & Data Warehousing", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-kpi-dashboards": { label: "KPIs & Dashboards", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-helpdesk": { label: "Customer Helpdesk", domain: "ecommerce", domainName: "E-Commerce" },
      "ecommerce-loyalty": { label: "Loyalty Programs", domain: "ecommerce", domainName: "E-Commerce" },
      // HR
      "hr-recruitment": { label: "Recruitment", domain: "hr-payroll", domainName: "HR & Payroll" },
      "hr-onboarding": { label: "Onboarding", domain: "hr-payroll", domainName: "HR & Payroll" },
      "hr-employee-data": { label: "Employee Data", domain: "hr-payroll", domainName: "HR & Payroll" },
      "hr-benefits": { label: "Benefits Admin", domain: "hr-payroll", domainName: "HR & Payroll" },
      "hr-time": { label: "Time Tracking", domain: "hr-payroll", domainName: "HR & Payroll" },
      "hr-leave": { label: "Leave Management", domain: "hr-payroll", domainName: "HR & Payroll" },
      "hr-gross-to-net": { label: "Gross-to-Net", domain: "hr-payroll", domainName: "HR & Payroll" },
      "hr-taxes": { label: "Taxes & Deductions", domain: "hr-payroll", domainName: "HR & Payroll" },
      "hr-performance": { label: "Performance Management", domain: "hr-payroll", domainName: "HR & Payroll" },
      "hr-offboarding": { label: "Offboarding", domain: "hr-payroll", domainName: "HR & Payroll" },
      // Supply Chain
      "sc-inbound-logistics": { label: "Inbound Logistics", domain: "supply-chain", domainName: "Supply Chain" },
      "sc-procurement-planning": { label: "Procurement Planning", domain: "supply-chain", domainName: "Supply Chain" },
      "sc-supplier-performance": { label: "Supplier Performance", domain: "supply-chain", domainName: "Supply Chain" },
      "sc-warehouse-mgt": { label: "Warehouse Mgt (WMS)", domain: "supply-chain", domainName: "Supply Chain" },
      "sc-inventory-opt": { label: "Inventory Optimization", domain: "supply-chain", domainName: "Supply Chain" },
      "sc-picking-packing": { label: "Picking & Packing", domain: "supply-chain", domainName: "Supply Chain" },
      "sc-outbound-logistics": { label: "Outbound & Distribution", domain: "supply-chain", domainName: "Supply Chain" },
      "sc-tms-mgt": { label: "TMS & Carrier Mgt", domain: "supply-chain", domainName: "Supply Chain" },
      "sc-last-mile": { label: "Last Mile Tracking", domain: "supply-chain", domainName: "Supply Chain" },
      // Energy
      "energy-generation": { label: "Energy Generation", domain: "energy", domainName: "Energy" },
      "energy-renewables": { label: "Renewables Integration", domain: "energy", domainName: "Energy" },
      "energy-grid-ops": { label: "Smart Grid Operations", domain: "energy", domainName: "Energy" },
      "energy-maintenance": { label: "Asset Maintenance", domain: "energy", domainName: "Energy" },
      "energy-billing": { label: "Customer Billing", domain: "energy", domainName: "Energy" },
      "energy-demand-response": { label: "Demand Response", domain: "energy", domainName: "Energy" },
      // Healthcare
      "hc-onboarding": { label: "Patient Intake", domain: "healthcare", domainName: "Healthcare" },
      "hc-insurance-verif": { label: "Insurance Verification", domain: "healthcare", domainName: "Healthcare" },
      "hc-emr-mgt": { label: "EMR / EHR Records", domain: "healthcare", domainName: "Healthcare" },
      "hc-hipaa-compliance": { label: "HIPAA & Privacy", domain: "healthcare", domainName: "Healthcare" },
      "hc-medical-billing": { label: "Medical Billing & Claims", domain: "healthcare", domainName: "Healthcare" },
      "hc-rcm": { label: "Revenue Cycle Mgt", domain: "healthcare", domainName: "Healthcare" },
      // Mining
      "mining-exploration": { label: "Exploration & Planning", domain: "mining", domainName: "Mining" },
      "mining-geospatial": { label: "Geospatial Data Mgt", domain: "mining", domainName: "Mining" },
      "mining-extraction-ops": { label: "Extraction Operations", domain: "mining", domainName: "Mining" },
      "mining-safety": { label: "HSSE & Safety", domain: "mining", domainName: "Mining" },
      "mining-logistics": { label: "Logistics & Ore Shipping", domain: "mining", domainName: "Mining" },
      "mining-tonnage": { label: "Tonnage & Yield Tracking", domain: "mining", domainName: "Mining" },
    };

    const domainGroups: Record<string, DomainGroup> = {};

    Object.keys(localStorage).forEach(key => {
      if (key.startsWith("deliverables-")) {
        const nodeId = key.replace("deliverables-", "");
        const metadata = nodeMetadata[nodeId];
        
        if (metadata) {
          try {
            const skills = JSON.parse(localStorage.getItem(key) || "[]");
            if (Array.isArray(skills) && skills.length > 0) {
              if (!domainGroups[metadata.domain]) {
                domainGroups[metadata.domain] = {
                  name: metadata.domainName,
                  nodes: []
                };
              }

              domainGroups[metadata.domain].nodes.push({
                label: metadata.label,
                skills: skills
              });
            }
          } catch (e) {}
        }
      }
    });

    setLearnedSkills(Object.values(domainGroups));
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredGroups = learnedSkills.map(group => ({
    ...group,
    nodes: group.nodes.map(node => ({
      ...node,
      skills: node.skills.filter(skill => 
        skill.toLowerCase().includes(searchQuery.toLowerCase()) || 
        node.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(node => node.skills.length > 0)
  })).filter(group => group.nodes.length > 0);

  const totalLearned = learnedSkills.reduce((acc, g) => 
    acc + g.nodes.reduce((a, n) => a + n.skills.length, 0), 0
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="w-full max-w-4xl max-h-[85vh] bg-background border border-primary/20 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 border-b border-primary/10 flex items-center justify-between bg-primary/5">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Award className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-black tracking-tighter">Your Mastered Skills</h2>
            </div>
            <p className="text-sm opacity-60 font-medium">You have mastered {totalLearned} industry-standard BA deliverables.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-background border border-primary/10 rounded-2xl hover:bg-primary/5 transition-colors group"
          >
            <X className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Search */}
        {learnedSkills.length > 0 && (
          <div className="px-8 py-4 border-b border-primary/10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 opacity-30" />
              <input 
                type="text" 
                placeholder="Search your skills portfolio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-primary/5 border border-primary/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {learnedSkills.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30 select-none py-20">
              <Ghost className="h-32 w-32 stroke-[1]" />
              <div>
                <h3 className="text-4xl font-black tracking-tighter mb-2">It's so lonely here...</h3>
                <p className="text-xl font-medium max-w-sm mx-auto">Go learn something and build your professional portfolio!</p>
              </div>
              <button 
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-105 transition-transform"
              >
                <BookOpen className="h-5 w-5" />
                Start Learning
              </button>
            </div>
          ) : filteredGroups.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30 py-20">
              <Search className="h-16 w-16" />
              <p className="text-xl font-bold">No skills matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-12 pb-8">
              {filteredGroups.map((group) => (
                <div key={group.name} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary whitespace-nowrap">{group.name} Achievements</h4>
                    <div className="h-[1px] w-full bg-primary/10" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {group.nodes.map((node) => (
                      <div key={node.label} className="p-6 bg-primary/5 border border-primary/10 rounded-[2rem] space-y-4">
                        <div className="flex items-center justify-between">
                          <h5 className="font-black tracking-tight text-lg">{node.label}</h5>
                          <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase">{node.skills.length} Mastery</span>
                        </div>
                        <ul className="space-y-3">
                          {node.skills.map((skill, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-3 group">
                              <div className="h-5 w-5 bg-primary rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_10px_rgba(134,163,137,0.3)]">
                                <span className="text-[10px] text-primary-foreground font-black">✓</span>
                              </div>
                              <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity leading-snug">
                                {skill}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-primary/5 border-t border-primary/10 flex items-center justify-center">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Business Analyst Roadmap Portfolio v2.0</p>
        </div>
      </div>
    </div>
  );
}
