const fs = require('fs');
const path = require('path');

const subnodes = [
  // E-Commerce
  { id: 'vendor-management', domain: 'ecommerce', title: 'Vendor Management', content: 'Focuses on the lifecycle of supplier relationships, from selection and onboarding to performance monitoring and contract compliance.' },
  { id: 'purchase-orders', domain: 'ecommerce', title: 'Purchase Orders', content: 'The formal documentation and system record of a commitment to buy products or services at specified prices and terms.' },
  { id: 'warehouse-receiving', domain: 'ecommerce', title: 'Warehouse Receiving', content: 'The process of physically accepting, inspecting, and documenting incoming goods into the inventory management system.' },
  { id: 'invoicing-operations', domain: 'ecommerce', title: 'Invoicing Operations', content: 'Managing the receipt, validation, and matching of vendor invoices against purchase orders and receipts (3-way match).' },
  { id: 'customer-order-management', domain: 'ecommerce', title: 'Customer Order Mgt', content: 'Orchestrating the lifecycle of a customer order, from capture and validation to modification and status tracking.' },
  { id: 'order-fulfillment', domain: 'ecommerce', title: 'Order Fulfillment', content: 'The end-to-end process of picking, packing, and shipping customer orders accurately and on time.' },
  { id: 'payment-collection', domain: 'ecommerce', title: 'Payment Collection', content: 'Managing payment gateways, reconciliation of funds, and handling failed transactions or refunds.' },
  { id: 'warehouse-operations', domain: 'ecommerce', title: 'Warehouse Operations', content: 'Daily management of physical storage, bin locations, replenishment, and internal stock movements.' },
  { id: 'inventory-allocation', domain: 'ecommerce', title: 'Inventory Allocation', content: 'Logic for reserving stock for specific orders, channels, or regions to optimize availability.' },
  { id: 'returns-management', domain: 'ecommerce', title: 'Returns Management', content: 'Reverse logistics process for accepting, inspecting, and restocking or disposing of returned items.' },
  { id: 'pim', domain: 'ecommerce', title: 'Product Information Mgt (PIM)', content: 'Centralized management of product data, attributes, media, and taxonomies across multiple sales channels.' },
  { id: 'pricing-promotions', domain: 'ecommerce', title: 'Pricing & Promotions', content: 'Configuration of base prices, tiered discounts, coupon codes, and marketing campaign rules.' },
  { id: 'financial-reporting', domain: 'ecommerce', title: 'Financial Reporting', content: 'Generation of balance sheets, P&L statements, and tax reports based on transaction data.' },
  { id: 'account-reconciliation', domain: 'ecommerce', title: 'Account Reconciliation', content: 'Ensuring that internal system balances match external bank and gateway statements.' },
  { id: 'bi-data-warehousing', domain: 'ecommerce', title: 'BI & Data Warehousing', content: 'Consolidation of disparate data sources into a central repository for complex querying and trend analysis.' },
  { id: 'kpi-dashboards', domain: 'ecommerce', title: 'KPIs & Dashboards', content: 'Visual representation of critical metrics like GMV, AOV, and Conversion Rate for executive decision-making.' },
  { id: 'customer-helpdesk', domain: 'ecommerce', title: 'Customer Helpdesk', content: 'Management of customer inquiries, tickets, and support workflows across chat, email, and phone.' },
  { id: 'loyalty-programs', domain: 'ecommerce', title: 'Loyalty Programs', content: 'Design and execution of points-based or tiered reward systems to drive customer retention.' },

  // FinTech
  { id: 'kyc-kyb', domain: 'fintech', title: 'KYC/KYB & Identity Verification', content: 'Verifying the identity of individuals (Know Your Customer) and businesses (Know Your Business) to prevent fraud and money laundering.' },
  { id: 'risk-assessment', domain: 'fintech', title: 'Risk Assessment & Profiling', content: 'Evaluating customer creditworthiness and risk levels based on various data points and historical behavior.' },
  { id: 'account-management', domain: 'fintech', title: 'Account Management', content: 'Lifecycle management of customer accounts, including status changes, profile updates, and closing processes.' },
  { id: 'transaction-processing', domain: 'fintech', title: 'Transaction Processing', content: 'Real-time execution, validation, and recording of financial movements within the ledger system.' },
  { id: 'payment-gateways', domain: 'fintech', title: 'Payment Gateways', content: 'Interfaces that authorize and process credit card or direct bank payments for e-commerce and retail.' },
  { id: 'clearing-settlement', domain: 'fintech', title: 'Clearing & Settlement', content: 'The back-end process of reconciling payment records and moving the physical funds between institutions.' },
  { id: 'loan-origination', domain: 'fintech', title: 'Loan Origination', content: 'The process of applying for, underwriting, and funding a new loan product.' },
  { id: 'credit-scoring', domain: 'fintech', title: 'Credit Scoring', content: 'Mathematical models used to determine the likelihood of a borrower repaying a debt.' },
  { id: 'aml-monitoring', domain: 'fintech', title: 'AML Monitoring', content: 'Continuous surveillance of transactions for patterns indicative of money laundering or terrorist financing.' },
  { id: 'regulatory-reporting', domain: 'fintech', title: 'Regulatory Reporting', content: 'Automated generation of compliance filings (SARs, CTRs) for government agencies.' },

  // HR & Payroll
  { id: 'recruitment', domain: 'hr-payroll', title: 'Recruitment', content: 'Sourcing, interviewing, and selecting candidates for open positions within the organization.' },
  { id: 'candidate-onboarding', domain: 'hr-payroll', title: 'Candidate Onboarding', content: 'The transition of a candidate to an employee, involving paperwork, provisioning, and orientation.' },
  { id: 'employee-data', domain: 'hr-payroll', title: 'Employee Data Management', content: 'Maintenance of the central system of record for all employee personal and professional information.' },
  { id: 'benefits-admin', domain: 'hr-payroll', title: 'Benefits Administration', content: 'Managing employee enrollments and eligibility for health, retirement, and wellness programs.' },
  { id: 'time-tracking', domain: 'hr-payroll', title: 'Time Tracking', content: 'Recording and approving working hours for payroll and project accounting purposes.' },
  { id: 'leave-management', domain: 'hr-payroll', title: 'Absence & Leave Management', content: 'Handling requests and approvals for vacation, sick time, and other types of leave.' },
  { id: 'gross-to-net', domain: 'hr-payroll', title: 'Gross-to-Net Calculations', content: 'The mathematical transformation of base pay and overtime into final net pay after taxes and deductions.' },
  { id: 'taxes-deductions', domain: 'hr-payroll', title: 'Statutory Taxes & Deductions', content: 'Applying federal, state, and local tax laws, along with voluntary withholdings like 401k contributions.' },
  { id: 'performance-management', domain: 'hr-payroll', title: 'Performance Management', content: 'Setting goals, conducting evaluations, and facilitating feedback to drive employee development.' },
  { id: 'offboarding', domain: 'hr-payroll', title: 'Offboarding & Exit Processes', content: 'The formal process of an employee leaving the company, including asset recovery and final payout.' }
];

const template = (node) => `---
title: ${node.title}
domain: ${node.domain}
---

# ${node.title}

${node.content}

## Node Knowledge: Key Concepts
1. **Core Process:** Understanding the end-to-end flow of ${node.title}.
2. **Data Integrity:** Ensuring accurate record-keeping and system updates.
3. **Internal Controls:** Implementing checks and balances to prevent errors or fraud.
4. **User Experience:** Designing intuitive interfaces for stakeholders involved in this node.

---

## Key BA Activities (BABOK® Alignment)

*   **Process Modeling:** Documenting the step-by-step actions required to execute this node effectively.
*   **Business Rules Analysis:** Defining the logic and constraints that govern behavior in this domain area.
*   **Elicitation & Collaboration:** Working with SMEs to understand the nuances of the ${node.domain} domain.

## Typical Deliverables

*   **Process Flows (BPMN):** Detailed swimlane diagrams showing ownership of each step.
*   **Functional Specifications:** Documentation of system behavior and edge cases.
*   **User Stories:** Agile requirements focusing on the needs of specific users.

---

## 💡 Expert BA Review & Adjustments

> [!TIP]
> **From the Desk of a Lead Business Analyst**
> When working on ${node.title}, always look for manual bottlenecks. Many processes in ${node.domain} are still surprisingly paper-based or rely on messy spreadsheets. Automation isn't just about speed; it's about reducing the high cost of human error in complex domains.

---

## Enterprise Software Implementation Reference

*   **SAP / Oracle:** Large ERP suites that typically handle these processes at scale.
*   **Specialized SaaS:** Niche tools (like ${node.domain === 'ecommerce' ? 'Shopify/Magento' : node.domain === 'fintech' ? 'Stripe/Mambu' : 'Workday/Gusto'}) that provide modern, API-first alternatives.
`;

const guidesDir = path.join(__dirname, 'content', 'guides');

if (!fs.existsSync(guidesDir)) {
  fs.mkdirSync(guidesDir, { recursive: true });
}

subnodes.forEach(node => {
  const filePath = path.join(guidesDir, `${node.id}.mdx`);
  fs.writeFileSync(filePath, template(node));
  console.log(`Generated ${node.id}.mdx`);
});
