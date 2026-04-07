const fs = require('fs');
const path = require('path');

const pillars = [
  {
    id: 'procure-to-pay',
    label: 'Procure to Pay',
    subs: [
      { id: 'vendor-management', label: 'Vendor Management' },
      { id: 'purchase-orders', label: 'Purchase Orders' },
      { id: 'warehouse-receiving', label: 'Warehouse Receiving' },
      { id: 'invoicing-operations', label: 'Invoicing Operations' }
    ]
  },
  {
    id: 'order-to-cash',
    label: 'Order to Cash',
    subs: [
      { id: 'customer-order-management', label: 'Customer Order Mgt' },
      { id: 'order-fulfillment', label: 'Order Fulfillment' },
      { id: 'payment-collection', label: 'Payment Collection' }
    ]
  },
  {
    id: 'inventory-logistics',
    label: 'Inventory & Reverse Logistics',
    subs: [
      { id: 'warehouse-operations', label: 'Warehouse Operations' },
      { id: 'inventory-allocation', label: 'Inventory Allocation' },
      { id: 'returns-management', label: 'Returns Management' }
    ]
  },
  {
    id: 'catalog-cx',
    label: 'Catalog & Customer Experience',
    subs: [
      { id: 'pim', label: 'Product Information Mgt (PIM)' },
      { id: 'pricing-promotions', label: 'Pricing & Promotions' }
    ]
  },
  {
    id: 'finance',
    label: 'Finance',
    subs: [
      { id: 'financial-reporting', label: 'Financial Reporting' },
      { id: 'account-reconciliation', label: 'Account Reconciliation' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    subs: [
      { id: 'bi-data-warehousing', label: 'BI & Data Warehousing' },
      { id: 'kpi-dashboards', label: 'KPIs & Dashboards' }
    ]
  },
  {
    id: 'crm-customer-service',
    label: 'CRM & Customer Service',
    subs: [
      { id: 'customer-helpdesk', label: 'Customer Helpdesk' },
      { id: 'loyalty-programs', label: 'Loyalty Programs' }
    ]
  }
];

const nodes = [];
const edges = [];

const MAIN_X = 200;
const SUB_X = 600;
let currentY = 0;

for (let i = 0; i < pillars.length; i++) {
  const p = pillars[i];
  
  const subsCount = p.subs.length;
  // Calculate center Y for the main node based on its children's span
  const startY = currentY;
  const mainY = startY + ((subsCount - 1) * 35);
  
  nodes.push({
    id: p.id,
    data: { label: p.label },
    position: { x: MAIN_X, y: mainY }
  });
  
  // Link to next major pillar if not the last one
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
  
  currentY = startY + (subsCount * 70) + 60; // add gap to next pillar
}

const mapData = {
  id: 'ecommerce',
  name: 'E-Commerce Framework',
  nodes,
  edges
};

const mapPath = path.join(__dirname, 'content', 'maps', 'ecommerce.json');
fs.writeFileSync(mapPath, JSON.stringify(mapData, null, 2));
console.log('Successfully generated ecommerce.json');
