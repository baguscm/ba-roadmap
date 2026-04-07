const fs = require('fs');
const path = require('path');

function generateMap(mapId, mapName, pillars) {
  const nodes = [];
  const edges = [];

  const MAIN_X = 200;
  const SUB_X = 600;
  let currentY = 0;

  for (let i = 0; i < pillars.length; i++) {
    const p = pillars[i];
    
    const subsCount = p.subs.length;
    const startY = currentY;
    const mainY = startY + ((Math.max(subsCount, 1) - 1) * 35);
    
    nodes.push({
      id: p.id,
      data: { label: p.label },
      position: { x: MAIN_X, y: mainY }
    });
    
    if (i < pillars.length - 1) {
        edges.push({
            id: `e-${p.id}-${pillars[i+1].id}`,
            source: p.id,
            target: pillars[i+1].id,
            sourceHandle: 'bottom',
            animated: true
        });
    }

    for (let j = 0; j < subsCount; j++) {
      const sub = p.subs[j];
      const subY = startY + (j * 70);
      
      nodes.push({
        id: sub.id,
        data: { label: sub.label, type: 'sub' },
        position: { x: SUB_X, y: subY }
      });
      
      edges.push({
        id: `e-${p.id}-${sub.id}`,
        source: p.id,
        target: sub.id,
        sourceHandle: 'right'
      });
    }
    
    currentY = startY + (Math.max(subsCount, 1) * 70) + 60;
  }

  const mapData = {
    id: mapId,
    name: mapName,
    nodes,
    edges
  };

  const mapPath = path.join(__dirname, 'content', 'maps', `${mapId}.json`);
  fs.writeFileSync(mapPath, JSON.stringify(mapData, null, 2));
  console.log(`Successfully generated ${mapId}.json`);
}

const fintechPillars = [
  {
    id: 'customer-onboarding',
    label: 'Customer Onboarding',
    subs: [
      { id: 'kyc-kyb', label: 'KYC/KYB & Identity Verification' },
      { id: 'risk-assessment', label: 'Risk Assessment & Profiling' }
    ]
  },
  {
    id: 'core-ledger',
    label: 'Core Ledger & Accounts',
    subs: [
      { id: 'account-management', label: 'Account Management' },
      { id: 'transaction-processing', label: 'Transaction Processing' }
    ]
  },
  {
    id: 'payment-processing',
    label: 'Payment Processing',
    subs: [
      { id: 'payment-gateways', label: 'Payment Gateways' },
      { id: 'clearing-settlement', label: 'Clearing & Settlement' }
    ]
  },
  {
    id: 'credit-lending',
    label: 'Credit & Lending',
    subs: [
      { id: 'loan-origination', label: 'Loan Origination' },
      { id: 'credit-scoring', label: 'Credit Scoring' }
    ]
  },
  {
    id: 'compliance-risk',
    label: 'Compliance & Risk',
    subs: [
      { id: 'aml-monitoring', label: 'AML Monitoring' },
      { id: 'regulatory-reporting', label: 'Regulatory Reporting' }
    ]
  }
];

const hrPillars = [
  {
    id: 'talent-acquisition',
    label: 'Talent Acquisition',
    subs: [
      { id: 'recruitment', label: 'Recruitment' },
      { id: 'candidate-onboarding', label: 'Candidate Onboarding' }
    ]
  },
  {
    id: 'core-hr',
    label: 'Core HR',
    subs: [
      { id: 'employee-data', label: 'Employee Data Management' },
      { id: 'benefits-admin', label: 'Benefits Administration' }
    ]
  },
  {
    id: 'time-attendance',
    label: 'Time & Attendance',
    subs: [
      { id: 'time-tracking', label: 'Time Tracking' },
      { id: 'leave-management', label: 'Absence & Leave Management' }
    ]
  },
  {
    id: 'payroll-operations',
    label: 'Payroll Operations',
    subs: [
      { id: 'gross-to-net', label: 'Gross-to-Net Calculations' },
      { id: 'taxes-deductions', label: 'Statutory Taxes & Deductions' }
    ]
  },
  {
    id: 'talent-management',
    label: 'Talent Management',
    subs: [
      { id: 'performance-management', label: 'Performance Management' },
      { id: 'offboarding', label: 'Offboarding & Exit Processes' }
    ]
  }
];

generateMap('fintech', 'FinTech Base Framework', fintechPillars);
generateMap('hr-payroll', 'HR & Payroll Framework', hrPillars);
