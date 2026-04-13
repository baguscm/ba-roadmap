/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const guidesDir = path.join(__dirname, 'content', 'guides');

const ecommerceSubnodes = [
  {
    id: 'vendor-management',
    title: 'Vendor Management',
    domain: 'ecommerce',
    apqc: 'Aligned with the "Procure Materials and Services" (APQC 4.0) category, Vendor Management focuses on the lifecycle of supplier relationships.',
    lifecycle: [
      'Identification & Selection: Sourcing vendors that meet quality and cost standards.',
      'Onboarding: Registering vendors in the ERP and setting up EDI/API connections.',
      'Performance Monitoring: Using scorecards to track OTIF (On-Time In-Full) metrics.',
      'Contract Renewal/Termination: Managing the legal and operational end-of-life for supplier relations.'
    ],
    babok: [
      'Strategy Analysis: Defining the sourcing strategy (Single vs Multi-vendor).',
      'Requirements Analysis: Defining the technical interface requirements for vendor portals.',
      'Solution Evaluation: Assessing vendor portal performance against business KPIs.'
    ],
    deliverables: [
      'Vendor Scorecard Template',
      'Master Service Agreement (MSA) Requirements Document',
      'API Integration Specification for Vendor Data'
    ],
    tip: 'Your biggest risk in Vendor Management is "Ghost Vendors." As a BA, ensure there are strict validation rules in the onboarding flow to prevent duplicate entries and fraudulent bank details.',
    software: [
      'SAP Ariba: The industry standard for upstream sourcing and contract management.',
      'Oracle NetSuite: Excellent for mid-market vendor record management and automated PO generation.'
    ]
  },
  {
    id: 'purchase-orders',
    title: 'Purchase Orders',
    domain: 'ecommerce',
    apqc: 'Falls under "Manage Purchase Orders" in the APQC framework, serving as the legal commitment to purchase.',
    lifecycle: [
      'PO Requisition: Internal request for stock replenishment.',
      'Approval Workflow: Escalating based on dollar value thresholds.',
      'PO Dispatch: Electronic transmission to the vendor via EDI, Email, or Portal.',
      'Status Tracking: Monitoring from "Acknowledged" to "Partially Received" to "Closed".'
    ],
    babok: [
      'Business Rules Analysis: Defining approval hierarchies and tax application rules.',
      'Data Modelling: Ensuring PO line items map correctly to SKU and Ledger codes.',
      'Process Analysis: Identifying bottlenecks in the internal approval chain.'
    ],
    deliverables: [
      'PO Approval Matrix (RACI)',
      'Mapping Document (ERP to Vendor Format)',
      'Exception Handling Process Flow'
    ],
    tip: 'BAs often forget about "Blanket POs." Ensure your system can handle long-term contracts where one PO is drawn down by multiple shipments over a year.',
    software: [
      'Microsoft Dynamics 365: Strong procurement module with native Power Automate for approvals.',
      'Coupa: Modern spend management platform focusing on the user experience of PO creation.'
    ]
  },
  {
      id: 'warehouse-receiving',
      title: 'Warehouse Receiving',
      domain: 'ecommerce',
      apqc: 'Part of "Receive, Inspect, and Store Goods" within the Supply Chain framework.',
      lifecycle: [
        'Dock Appointment Scheduling: Planning the arrival of carrier trucks.',
        'Unloading & Inspection: Checking physical count against the Packing Slip and PO.',
        'Goods Receipt (GR) Posting: Updating the inventory in the WMS/ERP.',
        'Put-away: Moving items to their designated storage bins/zones.'
      ],
      babok: [
        'Observation: Conducting a Gemba Walk to see how dock workers use mobile scanners.',
        'Non-Functional Requirements: Defining the ruggedness and battery life of mobile hardware.',
        'Process Modeling: Mapping the "Blind Receipt" vs "Directed Receipt" workflows.'
      ],
      deliverables: [
        'Warehouse Layout (Bin Map) Requirements',
        'Mobile App UI Wireframes for Put-away',
        'Standard Operating Procedure (SOP) for Damaged Goods'
      ],
      tip: 'The "ASN" (Advanced Shipping Notice) is your best friend. As a BA, push for your vendors to send ASNs via EDI; it reduces receiving time by 80% because it allows for pre-checking.',
      software: [
        'Manhattan Active WM: A cloud-native leader for complex receiving and cross-docking.',
        'Blue Yonder WMS: Heavyweight solution for high-volume automotive and retail receiving.'
      ]
  },
  {
      id: 'invoicing-operations',
      title: 'Invoicing Operations',
      domain: 'ecommerce',
      apqc: 'Falls under the "Process Accounts Payable" APQC category, closing the P2P loop.',
      lifecycle: [
        'Invoice Capture: OCR (Optical Character Recognition) or Electronic Invoicing.',
        'Three-Way Match: Automatically comparing the PO, the Receipt, and the Invoice.',
        'Dispute Resolution: Flagging price or quantity variances for buyer review.',
        'Payment Authorization: Final sign-off for the cash outflow via Treasury.'
      ],
      babok: [
        'Financial Analysis: Understanding the impact of early payment discounts.',
        'Interface Analysis: Mapping the OCR data fields to the ERP voucher record.',
        'Root Cause Analysis: Investigating why certain vendors consistently trigger mismatches.'
      ],
      deliverables: [
        'Variance Threshold Rule Document',
        'OCR Data Mapping Matrix',
        'AP Automation Business Case'
      ],
      tip: 'Automate the "Three-Way Match" immediately. If you are a BA in this space, your goal should be "Touchless Invoicing"—where 90% of invoices are paid without a human ever looking at them.',
      software: [
        'Bill.com: The standard for mid-market AP automation and digitized workflows.',
        'Tipalti: A global payables platform that excels in complex multi-entity and international payments.'
      ]
  },
  {
      id: 'customer-order-management',
      title: 'Customer Order Mgt',
      domain: 'ecommerce',
      apqc: 'The core of "Execute Customer Orders" (APQC 5.0). It covers the transition from browsing to commitment.',
      lifecycle: [
        'Order Capture: Synchronizing the website basket with the back-end OMS.',
        'Credit/Fraud Check: Triggering risk scores (e.g., via Signifyd or Kount).',
        'Inventory Commitment: Hard-allocating stock so it can\'t be sold twice.',
        'Order Orchestration: Routing the order to the nearest or cheapest warehouse.'
      ],
      babok: [
        'Use Cases: Defining the "Cancel Order," "Split Order," and "Edit Address" scenarios.',
        'State Modelling: Defining the complex lifecycle (New -> Pending -> Shipped -> Returns).',
        'Stakeholder Collaboration: Balancing Marketing\'s needs (discounts) with Ops (shipping limits).'
      ],
      deliverables: [
        'Order Status State Transition Diagram',
        'Fraud Rule Matrix',
        'Order Split Logic Requirements'
      ],
      tip: 'The "Pending Payment" state is where orders go to die. Ensure you have automated triggers to notify a customer if their credit card is declined, allowing them to fix it without losing their cart.',
      software: [
        'Salesforce Order Management: Tightly integrated with Commerce Cloud for a unified CX.',
        'Fluent Commerce: A distributed OMS that specializes in complex, multi-site order routing.'
      ]
  },
  {
      id: 'order-fulfillment',
      title: 'Order Fulfillment',
      domain: 'ecommerce',
      apqc: 'The physical execution of the order promise, falling under "Deliver Products to Customers."',
      lifecycle: [
        'Wave Planning: Grouping orders for efficient picking.',
        'Picking: Multi-order, Batch, or Zone picking strategies.',
        'Packing: Optimizing box size and reducing "air" to save on shipping costs.',
        'Manifesting: Generating carrier labels (UPS, FedEx, DHL).'
      ],
      babok: [
        'Process Analysis: Using Spaghetti Diagrams to track worker movement in the warehouse.',
        'Non-Functional Requirements: System uptime during peak holiday seasons (e.g., Black Friday).',
        'Metrics & KPIs: Defining "Click-to-Ship" targets.'
      ],
      deliverables: [
        'Packing Slip & Shipping Label Templates',
        'Fulfillment KPI Dashboard Spec',
        'Carrier Integration Data Map'
      ],
      tip: 'Air is expensive. As a BA, implement logic that suggests the correct box size at the packing station based on item dimensions. Shipping empty space is a major profit killer in e-commerce.',
      software: [
        'ShipStation: The go-to for small-to-mid e-commerce businesses needing easy carrier labels.',
        'ShipHero: A unified WMS/OMS focused specifically on high-growth e-commerce fulfillment.'
      ]
  },
  {
      id: 'payment-collection',
      title: 'Payment Collection',
      domain: 'ecommerce',
      apqc: 'Managing the "Order to Cash" finale, specifically "Process Customer Payments."',
      lifecycle: [
        'Authorization: Reserving funds at the time of order placement.',
        'Capture: Actually withdrawing the funds once the item has shipped.',
        'Settlement: The payment gateway moving the funds into the merchant\'s bank account.',
        'Refund/Chargeback: Handling the reversal of transactions.'
      ],
      babok: [
        'Risk Analysis: Assessing the impact of PCI-DSS compliance and data security.',
        'Sequence Diagrams: Mapping the millisecond communication between Gateway, Processor, and Bank.',
        'Financial Analysis: Tracking "Interchange Fees" and gateway basis points.'
      ],
      deliverables: [
        'Payment Flow Sequence Diagram',
        'Gateway Error-Code Mapping Document',
        'Reconciliation Business Rules'
      ],
      tip: 'Don\'t "Capture" until you ship. Legally and operationally, it\'s best practice in e-commerce to only authorize funds at checkout and only execute the capture once the warehouse confirms the box is on the truck.',
      software: [
        'Stripe: The gold standard for developer-first payment APIs and global scaling.',
        'Adyen: A unified platform for massive enterprises handling cross-channel payments.'
      ]
  },
  {
      id: 'warehouse-operations',
      title: 'Warehouse Operations',
      domain: 'ecommerce',
      apqc: 'Relates to "Manage Logistics and Warehousing," focusing on internal storage efficiency.',
      lifecycle: [
        'Inventory Slotting: Placing popular items closer to packing stations.',
        'Replenishment: Moving stock from "Overstock" bins to "Active Picking" bins.',
        'Cycle Counting: Regular audits of stock to avoid a massive end-of-year shutdown.',
        'Transfer Orders: Moving stock between warehouses in a multi-node network.'
      ],
      babok: [
        'Organization Modelling: Defining warehouse supervisor vs. warehouse picker roles.',
        'Decision Analysis: Choosing between manual picking vs. automated SOR (Sortation) systems.',
        'Interface Analysis: Mapping WMS data into the ERP for financial ledger updates.'
      ],
      deliverables: [
        'Bin/Zone Mapping Document',
        'Replenishment Trigger Rules Matrix',
        'WH Picking Productivity Dashboard Spec'
      ],
      tip: 'Slotting is dynamic. As a BA, ensure your system uses sales velocity data to suggest bin moves. What was a top seller in July (swimwear) shouldn\'t be in the prime picking zone in December.',
      software: [
        'HighJump (Korber): A highly flexible WMS known for its ability to scale with complex warehouse needs.',
        'Oracle NetSuite WMS: A built-in solution for NetSuite users that provides real-time mobile inventory control.'
      ]
  },
  {
      id: 'inventory-allocation',
      title: 'Inventory Allocation',
      domain: 'ecommerce',
      apqc: 'Part of "Plan and Manage Inventory," specifically focusing on the logic of stock reservation.',
      lifecycle: [
        'Global Inventory Visibility: Knowing exactly what is on hand across all nodes.',
        'Safety Stock Buffer: Reserving items to prevent over-selling (e.g. reserving 5% of stock).',
        'Channel Allocation: Specific stock for Amazon vs. Shopify vs. Retail.',
        'Pre-order Management: Allocating inventory that hasn\'t even arrived yet.'
      ],
      babok: [
        'Business Rules Analysis: Defining the "Who gets it first?" priority (e.g. VIP customers vs standard).',
        'Data Dictionary: Defining "On-Hand," "Available," and "Pledged" quantities.',
        'Decision Modelling: Mapping the logic of "Safety Stock" calculation.'
      ],
      deliverables: [
        'Inventory Scarcity Rule Set',
        'Multi-Channel Allocation Matrix',
        'Safety Stock Algorithm Spec'
      ],
      tip: 'Avoid "Overselling" at all costs. Over-selling 10 units on eBay might get your store banned. As a BA, always implement a "Safety Buffer"—even if you have 10 items, only tell the marketplace you have 8.',
      software: [
        'Manhattan Omni-Channel: Specialized in global inventory visibility and complex allocation.',
        'Brightpearl: A retail OS that handles multi-channel inventory and allocation for mid-size brands.'
      ]
  },
  {
      id: 'returns-management',
      title: 'Returns Management',
      domain: 'ecommerce',
      apqc: 'Aligned with "Manage Product Returns," often known as Reverse Logistics.',
      lifecycle: [
        'RMA Request: The customer initiating a return via a self-service portal.',
        'Logistics: Generating a return shipping label.',
        'Disposition: Deciding if the item is "Restockable," "Repairable," or "Damaged/Discarded".',
        'Refund/Store Credit: Closing the loop with the customer once the item is inspected.'
      ],
      babok: [
        'Sequence Diagrams: Tracing the credit note through the ledger.',
        'Process Modeling: Mapping the "Return to Store" vs "Return to Warehouse" flows.',
        'Survey/Questionnaire: Eliciting the top reasons for returns to drive product improvement.'
      ],
      deliverables: [
        'Return Disposition Workflow',
        'RMA Data Model Spec',
        'Credit Note Integration Map'
      ],
      tip: 'The "Happy Return" is an opportunity. Use the BA process to design a "Loop" where customers are offered an "Exchange for Store Credit + 10%" instead of a flat refund to keep the revenue in the business.',
      software: [
        'Loop Returns: A modern platform focused on turning returns into exchanges.',
        'Returnly: Specializes in providing instant credit before the item even reaches the warehouse.'
      ]
  },
  {
      id: 'pim',
      title: 'Product Information Mgt (PIM)',
      domain: 'ecommerce',
      apqc: 'Falls under "Manage Product Data" in the APQC framework.',
      lifecycle: [
        'Onboarding: Importing raw data from manufacturers or spreadsheets.',
        'Enrichment: Adding SEO titles, descriptions, and high-res imagery.',
        'Localization: Translating content for different regional stores.',
        'Syndication: Pushing the finished data to Shopify, Amazon, and Print Catalogs.'
      ],
      babok: [
        'Data Modelling: Designing the Attributes (Color, Size, Material) and Taxonomies.',
        'Glossary: Defining clear naming conventions to keep the catalog clean.',
        'Stakeholder Collaboration: Bringing Branding, SEO, and Merchandising teams together.'
      ],
      deliverables: [
        'Product Attribute Dictionary',
        'Category Hierarchy (Taxonomy) Map',
        'Image Naming Convention Document'
      ],
      tip: 'Taxonomy is your SEO foundation. As a BA, ensure your categories aren\'t too deep. A customer should be able to find any product in 3 clicks or less; the PIM structure must reflect that.',
      software: [
        'Akeneo: The leading open-source PIM for high-growth e-commerce.',
        'Salsify: A massive platform that combines PIM with complex syndication to global retailers.'
      ]
  },
  {
      id: 'pricing-promotions',
      title: 'Pricing & Promotions',
      domain: 'ecommerce',
      apqc: 'A key part of "Manage Marketing and Sales," focusing on price execution.',
      lifecycle: [
        'Price Book Management: Setting base prices for different global regions.',
        'Promotion Engine: Configuring "Buy One Get One" or "Flash Sale" logic.',
        'Coupon Management: Generating and limited-tracking of discount codes.',
        'Discount Stacking Rules: Ensuring a customer can\'t use 5 different codes on one item.'
      ],
      babok: [
        'Business Rules Analysis: Defining "Stacking" and "Exclusion" rules.',
        'Decision Modelling: Determining the final price after tax, shipping, and discounts.',
        'Risk Analysis: Assessing the "Profitability Floor" to prevent accidental 100% discounts.'
      ],
      deliverables: [
        'Promotion Logic Matrix',
        'Stacked Discount Rule Set',
        'Coupon Management API Spec'
      ],
      tip: 'Stacking is the profit killer. As a BA, always design your promotion engine with a "Master Exclusive" flag, so that a 50% clearance item can skip the "10% Welcome" coupon.',
      software: [
        'Pricefx: A native CPQ/Pricing software for complex enterprise margin management.',
        'Vendavo: Focuses on B2B pricing optimization and profitable growth.'
      ]
  },
  {
      id: 'financial-reporting',
      title: 'Financial Reporting',
      domain: 'ecommerce',
      apqc: 'Aligned with "Manage Financial Resources" (APQC 9.0).',
      lifecycle: [
        'Journal Entry Generation: Automatic creation of debits and credits for every sale.',
        'Sales Tax Reporting: Calculating nexus and filing with entities like Avalara.',
        'P&L Breakdown: Viewing revenue minus COGS (Cost of Goods Sold).',
        'Audit Trail: Tracking every modification to a financial transaction.'
      ],
      babok: [
        'Data Analysis: Tracking Cost of Goods Sold performance.',
        'Business Rules Analysis: Defining "Revenue Recognition" (When is it a sale? At order or at ship?).',
        'Regulatory Analysis: Ensuring compliance with IFRS or GAAP standards.'
      ],
      deliverables: [
        'Chart of Accounts (CoA) Mapping',
        'Revenue Recognition Rule Set',
        'Tax Liability Integration Map'
      ],
      tip: 'Nexus is a moving target. As a BA, don\'t try to build tax logic yourself. Implement an integration to Avalara or TaxJar to handle the varying state-by-state laws automatically.',
      software: [
        'NetSuite Financials: The world-leading cloud ERP for e-commerce financial controls.',
        'SAP S/4HANA (FICO): The corporate gold standard for complex global accounting.'
      ]
  },
  {
      id: 'account-reconciliation',
      title: 'Account Reconciliation',
      domain: 'ecommerce',
      apqc: 'A process within "Manage Financial Resources," closing the book on the day\'s sales.',
      lifecycle: [
        'Statement Retrieval: Pulling bank and gateway (Stripe/PayPal) reports.',
        'Matching Logic: Linking the bank deposit to the internal Sales Order.',
        'Variance Management: Detecting why the bank has $95 but the order was $100 (Fees).',
        'Adjusting Entries: Booking gateway fees into the correct expense ledger.'
      ],
      babok: [
        'Interface Analysis: Mapping statement fields into the ERP reconciliation module.',
        'Process Modelling: Automating the daily high-volume matching logic.',
        'Stakeholder Collaboration: Working with Treasury and Accounts Receivable.'
      ],
      deliverables: [
        'Auto-Match Rule Document',
        'Bank Feed Field Mapping',
        'Variance Threshold SOP'
      ],
      tip: 'Gateway fees are the hidden variance. As a BA, ensure your system captures "Gross proceeds" and "Gateway Fee" separately at the point of reconciliation, otherwise your net margin will always be wrong.',
      software: [
        'BlackLine: Specializes in automating the entire close and reconciliation process.',
        'Trintech: Enterprise solution for high-volume financial transaction matching.'
      ]
  },
  {
      id: 'bi-data-warehousing',
      title: 'BI & Data Warehousing',
      domain: 'ecommerce',
      apqc: 'Falls under "Manage Knowledge and Information" (APQC 12.0).',
      lifecycle: [
        'Extraction: Pulling data from ERP, WMS, and Website.',
        'Transformation: Cleaning and normalizing dates, names, and currencies.',
        'Loading: Moving data into a centralized Star or Snowflake schema.',
        'Querying: Using SQL or BI tools to build complex models.'
      ],
      babok: [
        'Data Modelling: Designing dimensions (Date, SKU, Region) and measures (Revenue, Count).',
        'Business Capability Analysis: Understanding what decisions the data will drive.',
        'Risk Analysis: Managing data security and "Personally Identifiable Information" (PII).'
      ],
      deliverables: [
        'Entity Relationship Diagram (ERD)',
        'Data Dictionary for the Warehouse',
        'ETL Mapping Specification'
      ],
      tip: 'The "Single Version of the Truth." As a BA, your most important job is defining the "Source of Truth" for Revenue. Is it the ERP or the Google Analytics? If you don\'t define this, your numbers will never match.',
      software: [
        'Snowflake: The leading cloud data platform for modern e-commerce data stacks.',
        'Google BigQuery: Heavily integrated with Google Analytics for powerful commerce insights.'
      ]
  },
  {
      id: 'kpi-dashboards',
      title: 'KPIs & Dashboards',
      domain: 'ecommerce',
      apqc: 'A key component of "Manage Performance and Continuous Improvement."',
      lifecycle: [
        'Metric Definition: Defining GMV (Gross Merchandise Value) vs. Net Sales.',
        'Visualization Design: Choosing between Bar charts (trends) or Gauges (targets).',
        'User Profiling: Designing for an Executive (High Level) vs. a Warehouse Manager (Operational).',
        'Reporting Cycles: Daily, Weekly, and Monthly automated pushes.'
      ],
      babok: [
        'Prototyping: Building low-fidelity wireframes of the dashboard layout.',
        'Surveys: Asking managers which 5 numbers they look at every morning.',
        'Concept Modelling: Defining the relationships between different metrics.'
      ],
      deliverables: [
        'Dashboard Wireframes/Mockups',
        'KPI Definition Matrix',
        'Drill-down Capability Spec'
      ],
      tip: 'Avoid "Dashboard Exhaustion." Don\'t give an executive 50 metrics. Your job as a BA is to curate the board down to the "Magic three" that truly drive growth: Conversion, Margin, and Retention.',
      software: [
        'Tableau: A robust, data-first visualization tool for massive enterprises.',
        'Power BI: Tightly integrated with the Microsoft stack for seamless e-commerce reporting.'
      ]
  },
  {
      id: 'customer-helpdesk',
      title: 'Customer Helpdesk',
      domain: 'ecommerce',
      apqc: 'Aligned with "Manage Customer Service" (APQC 5.4).',
      lifecycle: [
        'Ticket Creation: Capture from email, chat, phone, or DM.',
        'Routing: Assigning to the specialist agent (e.g. "Returns" vs "Technical Issue").',
        'Resolution: Documenting the fix and closing the loop with the customer.',
        'Satisfaction Survey (CSAT): Measuring the quality of the interaction.'
      ],
      babok: [
        'Process Modeling: Mapping the "Escalation to Manager" workflow.',
        'Non-Functional Requirements: Defining response times (SLAs) for different tiers.',
        'Requirements Management: Handling feature requests that come through support tickets.'
      ],
      deliverables: [
        'Support Ticket Status Workflow',
        'SLA Definiton Document',
        'Auto-Response Template Requirements'
      ],
      tip: 'Macro power! As a BA, focus on designing "Macros" (pre-written responses). If 60% of your tickets are "Where is my order?", you should automate a response that pulls live tracking data from the WMS.',
      software: [
        'Zendesk: The ubiquitous leader for unified omnichannel customer support.',
        'Gorgias: An e-commerce specialist helpdesk that integrates directly into Shopify admin.'
      ]
  },
  {
      id: 'loyalty-programs',
      title: 'Loyalty Programs',
      domain: 'ecommerce',
      apqc: 'Part of "Develop and Manage Marketing Programs."',
      lifecycle: [
        'Enrolment: Opting in via a checkout checkbox or dedicated landing page.',
        'Accrual: Collecting points based on spend or social actions (Shares, follows).',
        'Redemption: Using points for discounts, free shipping, or early access.',
        'Churn Management: Identifying "At Risk" members before they leave the program.'
      ],
      babok: [
        'Business Case: Calculating the ROI of a loyalty program vs cost of giving points.',
        'Business Rules Analysis: Designing the points expiration and fraud rules.',
        'Decision Analysis: Choosing between "Tiers" (Bronze/Gold) or "Points-only" models.'
      ],
      deliverables: [
        'Loyalty Benefit Tier Matrix',
        'Points Burn/Earn Algorithm Spec',
        'Loyalty UX Wireframes'
      ],
      tip: 'Tiered exclusivity is better than points. As a BA, recommend "Early access to new drops" for Gold members over just giving 5% off. High-value customers crave status over small discounts.',
      software: [
        'LoyaltyLion: A data-driven loyalty platform built for high-growth commerce.',
        'Yotpo Loyalty: Tightly integrated with reviews and SMS marketing for a full retention suite.'
      ]
  }
];

const fintechSubnodes = [
  {
    id: 'kyc-kyb',
    title: 'KYC/KYB & Identity Verification',
    domain: 'fintech',
    apqc: 'Directly linked to "Manage Risk and Compliance" and "Customer Onboarding" within financial services frameworks.',
    lifecycle: [
      'Data Collection: Capturing government-issued IDs and liveness biometrics.',
      'Document Authentication: Validating security features on IDs via automated OCR/AI.',
      'Database Screening: Checking against PEP (Politically Exposed Persons) and Sanctions lists.',
      'Adverse Media Check: Searching for news or public records indicating financial risk.'
    ],
    babok: [
      'Non-Functional Requirements: Defining the maximum latency for a "Pass/Fail" decision (e.g. < 30 seconds).',
      'Interface Analysis: Mapping data fields between the mobile front-end and the KYC provider API.',
      'Risk Analysis: Assessing the impact of "False Positives" on customer conversion.'
    ],
    deliverables: [
      'KYC Decision Flow Chart',
      'PII Data Privacy Mapping',
      'Identity Verification UI Wireframes'
    ],
    tip: 'BAs must design for "Liveness." Static photos are easily faked. Ensure your requirements for the identity flow include active liveness checks (e.g. "turn your head" or "blink") to prevent spoofing attacks.',
    software: [
      'Onfido: A market leader in AI-based identity verification and biometric liveness checks.',
      'Jumio: Comprehensive identity platform for high-security financial and gaming onboarding.'
    ]
  },
  {
    id: 'risk-assessment',
    title: 'Risk Assessment & Profiling',
    domain: 'fintech',
    apqc: 'A subset of "Evaluate and Manage Risk" (APQC 11.0), tailored for financial exposures.',
    lifecycle: [
      'Data Enrichment: Pulling bureau scores (FICO/TransUnion) and bank transaction history.',
      'Scoring Engine: Applying weighted business rules to determine a risk score.',
      'Risk Classification: Categorizing the user as Low, Medium, or High risk.',
      'Ongoing Monitoring: Re-evaluating the risk profile based on changing customer behavior.'
    ],
    babok: [
      'Decision Modelling: Creating DMN (Decision Model and Notation) for credit approval logic.',
      'Business Rules Analysis: Documenting the "Knock-out" criteria (e.g. debt-to-income > 40%).',
      'Data Analysis: Identifying correlations between initial risk and actual default rates.'
    ],
    deliverables: [
      'Decision Table (Risk Matrix)',
      'Credit Score Integration Spec',
      'Risk Threshold Rule Set'
    ],
    tip: 'Beware the "Black Box." If your risk engine uses AI, as a BA you must document "Explainability" requirements. If a customer is rejected, you are legally required (in many regions) to explain exactly why.',
    software: [
      'Alloy: An identity and risk decisioning engine that simplifies complex compliance orchestrations.',
      'Socure: Uses predictive analytics and machine learning for highly accurate digital identity risk scoring.'
    ]
  },
  {
    id: 'account-management',
    title: 'Account Management',
    domain: 'fintech',
    apqc: 'Relates to "Perform Financial Transactions" and "Manage Customer Service."',
    lifecycle: [
      'Account Provisioning: Defining the default ledger state upon approval.',
      'Maintenance: Changes to limits, profile details, or linked bank accounts.',
      'State Transitions: Account being placed on "Legal Hold" or "Administrative Lock".',
      'Closure: Handling final interest accruals and fund disbursement before closing.'
    ],
    babok: [
      'State Modelling: Defining the exhaustive list of account statuses and their transitions.',
      'Organization Modelling: Security profiling for "Admin Only" account modifications.',
      'Process Modeling: Mapping the flow for re-opening a previously closed account.'
    ],
    deliverables: [
      'Account State Transition Diagram',
      'Support Agent Admin UI wireframes',
      'Audit Logging Requirements'
    ],
    tip: 'Immutable logging is key. As a BA, ensure that EVERY change to an account (especially balance-impacting or limit-changing) is logged with a "Who/What/When" that cannot be edited by developers.',
    software: [
      'Mambu: A cloud-native core banking platform designed for composable financial services.',
      'Thought Machine: Built on the "Vault" engine, allowing for smart contracts to define account behavior.'
    ]
  },
  {
    id: 'transaction-processing',
    title: 'Transaction Processing',
    domain: 'fintech',
    apqc: 'The core of "Execute Financial Transactions" in the Banking category.',
    lifecycle: [
      'Validation: Checking if the account has sufficient funds and is in an "Active" state.',
      'Hold Placement: Reserving funds (e.g. for a pending ATM withdrawal).',
      'Ledger Posting: The atomic update of debits and credits.',
      'Statement Generation: Converting raw ledger items into human-readable history.'
    ],
    babok: [
      'Non-Functional Requirements: Defining throughput (transactions per second - TPS).',
      'Process Analysis: Identifying potential race conditions in high-volume environments.',
      'Data Modelling: Defining the "Transaction Log" schema for maximum performance.'
    ],
    deliverables: [
      'Ledger Posting Logical Diagram',
      'Throughput & Latency Spec',
      'Idempotency Key Specification'
    ],
    tip: 'Idempotency is non-negotiable. As a BA, ensure your API requirements include a "Unique Request ID" to prevent a customer from accidentally being charged twice if they click the button twice.',
    software: [
      'FIS Modern Banking Platform: A hyper-scalable core for global Tier 1 banks.',
      'Marqeta: An API-driven card issuing platform that excels in complex transaction logic.'
    ]
  },
  {
    id: 'payment-gateways',
    title: 'Payment Gateways',
    domain: 'fintech',
    apqc: 'Covers the "Execute Customer Payments" lifecycle segment.',
    lifecycle: [
      'Authentication: 3D Secure and PSD2-compliant multi-factor checks.',
      'Authorization: Reaching out to the issuing bank for a "Yes/No" on funds.',
      'Capture: The signal to finalize the money movement.',
      'Notification: Real-time webhooks to update the merchant and customer.'
    ],
    babok: [
      'Sequence Diagrams: Documenting the async flow between front-end, gateway, and ledger.',
      'Risk Analysis: Evaluating the "Chargeback Ratio" and fraud levels.',
      'Interface Analysis: Mapping raw JSON responses (e.g. ISO 8583) to user-friendly messages.'
    ],
    deliverables: [
      'Payment Webhook Data Map',
      'Checkout UI/UX Requirements',
      'Fallback/Retry Strategy'
    ],
    tip: 'Don\'t ignore the "Retry" logic. As a BA, define how many times a system should attempt a "Soft Decline" (e.g. "Network error") versus a "Hard Decline" (e.g. "Stolen Card").',
    software: [
      'Stripe Payments: The industry leader for internet business infrastructure.',
      'Adyen: Global payment hardware and software for complex multi-channel scaling.'
    ]
  },
  {
    id: 'clearing-settlement',
    title: 'Clearing & Settlement',
    domain: 'fintech',
    apqc: 'Falls under the "Manage Cash and Treasury Systems" and "Bank Reconciliation" segments.',
    lifecycle: [
      'Clearing: The institutions exchanging transaction information to verify the net position.',
      'Netting: Calculating the final lump sum to be moved between banks at end-of-day.',
      'Settlement: The actual delivery of central bank funds to finalize the transfer.',
      'Reconcile: Matching the daily bank statement to the internal clearing logs.'
    ],
    babok: [
      'Process Modeling: Mapping the T+2 (or T+0) settlement timelines.',
      'Data Analysis: Tracking liquidity levels to ensure settlement obligations are met.',
      'Root Cause Analysis: Investigating "Rejects" and "Returns" in Batch processing.'
    ],
    deliverables: [
      'Settlement Reconciliation SOP',
      'Batch File (ACH/NACHA) Mapping',
      'Liquidity Monitoring Dashboard Spec'
    ],
    tip: 'Settlement is a timing game. As a BA, your most critical job is defining the "Cut-off Times." If an ACH is sent after 5 PM, does it arrive tomorrow or in two days? This logic drives your customer service promise.',
    software: [
      'Volante: A specialized platform for high-speed payment clearing and ISO 20022 messaging.',
      'FedNow: The US Federal Reserve\'s instant settlement infrastructure.'
    ]
  },
  {
    id: 'loan-origination',
    title: 'Loan Origination',
    domain: 'fintech',
    apqc: 'Directly maps to the "Manage Lending" category in the BFS APQC framework.',
    lifecycle: [
      'Pre-Qualification: Rapid check of credit and basic eligibility.',
      'Underwriting: Deep dive into financial evidence and employment.',
      'Disclosure: Generating and digitally signing the "Truth in Lending" agreements.',
      'Funding: Wiring the loan proceeds to the borrower\'s account.'
    ],
    babok: [
      'Process Modeling: Mapping the handoff between "Auto-Decision" and "Manual Underwriter review."',
      'Document Analysis: Reviewing regulatory templates for loan contracts.',
      'Non-Functional Requirements: Defining security and "WORM" storage for signed contracts.'
    ],
    deliverables: [
      'Loan Lifecycle Diagram',
      'Underwriting Queue UI Mockups',
      'Disclosure Trigger Rule Set'
    ],
    tip: 'Design for "Speed to Offer." Customers will take a slightly more expensive loan if they get an "Approved" message in 2 minutes instead of 2 days. As a BA, streamline every field to drive towards an instant offer.',
    software: [
      'Encompass: The enterprise standard for mortgage and retail loan origination.',
      'Blend: Focuses on the modern, white-label borrower experience for multi-product lending.'
    ]
  },
  {
    id: 'credit-scoring',
    title: 'Credit Scoring',
    domain: 'fintech',
    apqc: 'A core part of "Evaluate and Manage Credit Risk."',
    lifecycle: [
      'Bureau Pull: Retrieving historical data from Experian, Equifax, or TransUnion.',
      'Feature Engineering: Calculating ratios like "Utilization Rate" or "Payment History."',
      'Model Execution: Running the proprietary or third-party algorithm.',
      'Decision Output: Returning the score and the top "Reason Codes" for the level.'
    ],
    babok: [
      'Business Rules Analysis: Documenting the "Weighted" value of different scoring factors.',
      'Data Profiling: Ensuring the quality and accuracy of the incoming credit feeds.',
      'Acceptance/Evaluation Criteria: Defining the "Minimum Score" for different products.'
    ],
    deliverables: [
      'Credit Score Weighting Matrix',
      'Bureau Data Mapping Spec',
      'Adverse Action Notice Template'
    ],
    tip: 'Financial Inclusion is a business driver. As a BA, recommend "Alternative Data" (e.g. utility bills, rent payments) for scoring customers who are "Credit Invisible" to standard bureaus.',
    software: [
      'FICO (Fair Isaac): The global standard for credit scoring models.',
      'Experian Boost: A modern data enhancement service for credit scoring.'
    ]
  },
  {
    id: 'aml-monitoring',
    title: 'AML Monitoring',
    domain: 'fintech',
    apqc: 'Falls under "Ensure Financial Compliance" and "Enterprise Risk Management."',
    lifecycle: [
      'Rule Execution: Running "Structuring" and "Velocity" checks on every transaction.',
      'Alert Generation: Flagging behavior that deviates from the customer\'s known "Normal."',
      'Case Triage: A human analyst reviewing the alert and collecting evidence.',
      'SAR Filing: Formally reporting suspicious behavior to the proper authorities.'
    ],
    babok: [
      'Root Cause Analysis: Investigating the sources of "False Positive" noise.',
      'Prototyping: Designing Case Management dashboards for compliance officers.',
      'Data Modelling: Designing the "Entity Resolution" (Linking different accounts to one person).'
    ],
    deliverables: [
      'AML Alert Rule Set',
      'Case Management Workflow',
      'Compliance KPI Dashboard'
    ],
    tip: 'Rules should be dynamic. As a BA, don\'t just design "Fixed Thresholds" (e.g. > $10,000). Design "Relative Thresholds" (e.g. > 300% of average monthly volume) to catch more sophisticated laundering.',
    software: [
      'NICE Actimize: The comprehensive standard for anti-money laundering and fraud.',
      'Verafin: A modern, cloud-based platform focusing on behavior-based monitoring.'
    ]
  },
  {
    id: 'regulatory-reporting',
    title: 'Regulatory Reporting',
    domain: 'fintech',
    apqc: 'Specifically within the "External Financial Reporting" APQC category.',
    lifecycle: [
      'Data Consolidation: Pulling transaction and customer data from the core.',
      'Mapping: Translating internal codes into the "Official" government schema.',
      'Validation: Pre-filing checks to ensure no missing fields or bad formats.',
      'Submission: Encrypted transfer to the regulator (e.g. GoAML or FinCEN systems).'
    ],
    babok: [
      'Document Analysis: Reviewing the hundreds of pages of regulator filing manuals.',
      'Requirement Management: Keeping track of differing state-by-state or country-by-country forms.',
      'Data Lineage: Being able to "Trace Back" a reported number to its source transaction.'
    ],
    deliverables: [
      'Regulator Field Mapping Matrix',
      'Filing Schedule Calendar',
      'Data Traceability Documentation'
    ],
    tip: 'Data Lineage is your shield. If a regulator audits you, as a BA you must be able to prove exactly how a reported "Total volume" was calculated. Document the SQL or logic used for every filing.',
    software: [
      'AxiomSL: Global leader in regulatory reporting and risk management technology.',
      'Wolters Kluwer (OneSumX): Specialized solution for financial services regulatory compliance.'
    ]
  }
];

const hrSubnodes = [
  {
    id: 'recruitment',
    title: 'Recruitment',
    domain: 'hr-payroll',
    apqc: 'aligned with "Manage Talent Acquisition" (APQC 7.2) within the HCM framework.',
    lifecycle: [
      'Demand Planning: Budgeting and head-count approvals.',
      'Sourcing: Posting to LinkedIn, Indeed, and Niche boards.',
      'Candidate Assessment: Screening, automated testing, and interviews.',
      'Offer Management: Negotiating terms and generating the employment contract.'
    ],
    babok: [
      'Process Analysis: Mapping the candidate funnel and identifying "Drop-off" stages.',
      'Stakeholder Collaboration: Balancing Hiring Manager speed vs HR Compliance standards.',
      'Non-Functional Requirements: Defining the volume handled during "Hiring Sprints."'
    ],
    deliverables: [
      'Recruitment Lifecycle Map',
      'Interview Scorecard Template',
      'Standard Offer Letter Requirements'
    ],
    tip: 'Source of Hire is your ROI. As a BA, ensure your ATS is configured to track the "Source" (e.g. LinkedIn vs Employee Referral). High-quality referrals are 10x more valuable than cold applications.',
    software: [
      'Greenhouse: A recruitment platform focused on collaborative, structured hiring.',
      'Lever: Known for its CRM-style candidate tracking and relationship management.'
    ]
  },
  {
    id: 'candidate-onboarding',
    title: 'Candidate Onboarding',
    domain: 'hr-payroll',
    apqc: 'The bridge between external acquisition and internal management, part of "Manage Talent Acquisition."',
    lifecycle: [
      'Self-Service Portal: The candidate uploading banking and identity docs.',
      'Verification: Background checks and legal eligibility (I-9/Right to Work).',
      'Provisioning: Notifying IT to create email accounts and order hardware.',
      'Integration: Pushing the final "Hire" record into the Core HR system and Payroll.'
    ],
    babok: [
      'Interface Analysis: Mapping the API handoff from ATS to HRIS.',
      'Data Modelling: Defining the "Future Employee" record state.',
      'User Journey Mapping: Ensuring the "Day One" experience is positive and frictionless.'
    ],
    deliverables: [
      'Onboarding Automation Workflow',
      'IT Provisioning Integration Spec',
      'New Hire Document Checklist'
    ],
    tip: '"Day One" starts at "Acceptance." As a BA, design the system to trigger IT hardware ordering the MOMENT the offer is signed. Nothing ruins an onboarding more than a new hire sitting with no laptop on Monday.',
    software: [
      'Workday Onboarding: Native module within the Workday suite for a unified experience.',
      'Sapling (Kallidus): A dedicated onboarding specialist platform for high-growth tech firms.'
    ]
  },
  {
    id: 'employee-data',
    title: 'Employee Data Management',
    domain: 'hr-payroll',
    apqc: 'The core of "Manage Employee Information" (APQC 7.4).',
    lifecycle: [
      'Record Creation: Inheriting data from onboarding.',
      'Self-Service Updates: Employees changing addresses or emergency contacts.',
      'Life Events: Births, Marriages, or name changes handled via the portal.',
      'Historical Tracking: Maintaining the "Effective Date" of every single record change.'
    ],
    babok: [
      'Data Dictionary: Defining the "Global Employee Record" schema.',
      'Business Rules Analysis: Defining "Self-service" vs "Admin-only" editable fields.',
      'Risk Analysis: Managing PII and sensitive data access (RBAC).'
    ],
    deliverables: [
      'Employee Master Data Dictionary',
      'Role-Based Access Control (RBAC) Matrix',
      'Self-Service UI Wireframes'
    ],
    tip: 'Global consistency is hard. As a BA, if you are designing for a multinational, ensure the system can handle different address formats, character sets (e.g., Cyrillic), and local ID numbers without breaking.',
    software: [
      'Workday HCM: The undisputed cloud leader for unified, global employee data mastery.',
      'Oracle HCM Cloud: Powerful, scalable platform for massive enterprise employee management.'
    ]
  },
  {
    id: 'benefits-admin',
    title: 'Benefits Administration',
    domain: 'hr-payroll',
    apqc: 'Relates to "Manage Total Rewards" and "Employee Benefit Programs."',
    lifecycle: [
      'Plan Design: Configuring health, dental, and retirement options in the system.',
      'Eligibility: Logic defining which employees get which benefits (e.g., Full-time only).',
      'Open Enrolment: The annual window where employees select their coverage.',
      'Carrier Feeds: Sending enrollment data to insurance providers (EDI 834).'
    ],
    babok: [
      'Business Rules Analysis: Documenting complex eligibility and cost-sharing models.',
      'Interface Analysis: Mapping the EDI (Electronic Data Interchange) files to carriers.',
      'Vendor Assessment: Evaluating the usability of the benefits enrollment portal.'
    ],
    deliverables: [
      'Benefit Eligibility Matrix',
      'Carrier Data Feed Specification',
      'Employee Enrollment Guide Req.'
    ],
    tip: 'EDI is where it breaks. As a BA, be incredibly precise with your EDI 834 file formats. A single mismatched character in a health insurance feed can result in an employee being denied coverage at a hospital.',
    software: [
      'Benefitfocus: A specialized platform for large-scale employee benefit management.',
      'PlanSource: Cloud-based solution focusing on the automation of benefits enrollment.'
    ]
  },
  {
    id: 'time-tracking',
    title: 'Time Tracking',
    domain: 'hr-payroll',
    apqc: 'Linked to "Manage Time and Attendance" and "Payroll Management."',
    lifecycle: [
      'Time Capture: Punching in via Mobile, Web, or Physical Clocks.',
      'Time Evaluation: Applying rules for Overtime (OT), Shift Premiums, and Rounding.',
      'Approval: Manager review and formal "Approving" of the timecard.',
      'Export: Pushing the evaluated "Payable Time" into the Payroll engine.'
    ],
    babok: [
      'Process Modeling: Mapping the complex "California Overtime" laws into logic.',
      'Non-Functional Requirements: Mobile app battery usage for field workers.',
      'Data Analysis: Tracking "Absenteeism" and "Labor Leakage" through punch data.'
    ],
    deliverables: [
      'Time Evaluation Rule Set',
      'Manager Approval Workflow',
      'Punch Error Code Matrix'
    ],
    tip: '"Rounding" is a liability. As a BA, ensure your "Rounding Rules" follow local labor laws. If you always round in the company\'s favor, you are inviting a Class Action lawsuit.',
    software: [
      'UKG (Kronos): The industry standard for complex labor and union time tracking.',
      'Workday Time Tracking: Native module with deep integration to Absence and Payroll.'
    ]
  },
  {
    id: 'leave-management',
    title: 'Absence & Leave Management',
    domain: 'hr-payroll',
    apqc: 'A component of "Manage Employee Information" and "Time and Attendance."',
    lifecycle: [
      'Entitlement Accrual: Calculating monthly PTO based on tenure and plan.',
      'Request & Approval: Self-service requests and manager sign-off.',
      'Balance Visibility: Showing the employee exactly what they have "Reserved" vs "Available."',
      'Compliance Tracking: Tracking FMLA, Sick Leave, and Statutory leaves for legal audits.'
    ],
    babok: [
      'Business Case: Analyzing the cost of "Unused PTO" liability on the company balance sheet.',
      'Business Rules Analysis: Defining "Carry-over" and "Forfeiture" rules (Use-it-or-lose-it).',
      'Regulatory Analysis: Ensuring the system handles state-specific Paid Sick Leave laws.'
    ],
    deliverables: [
      'Leave Accrual Algorithm Spec',
      'Absence Workflow Diagram',
      'Statutory Compliance Matrix'
    ],
    tip: 'Design for "Blackouts." As a BA, ensure the merch and marketing teams can set "Blackout dates" (e.g. Black Friday) where the system won\'t even allow a manager to approve vacation requests.',
    software: [
      'AbsenceSoft: Specialist platform dedicated to FMLA and complex leave compliance.',
      'Ceridian Dayforce: HCM where leave balances are natively linked to real-time payroll.'
    ]
  },
  {
    id: 'gross-to-net',
    title: 'Gross-to-Net Calculations',
    domain: 'hr-payroll',
    apqc: 'The core engine of "Process Payroll" (APQC 9.3).',
    lifecycle: [
      'Gross Accumulation: Summing Base Pay + Overtime + Commissions.',
      'Pre-Tax Deductions: Subtracting 401k, Health, and FSA contributions.',
      'Taxing: Applying Federal, State, and Local withholding algorithms.',
      'Net Payment: Final amount disbursed via Direct Deposit or Check.'
    ],
    babok: [
      'Mathematical Modeling: Validating the "Tax on Tax" calculations for gross-up payments.',
      'Acceptance Criteria: Defining the 0.00% variance threshold for parallel runs.',
      'Financial Analysis: Ensuring the total payroll disbursement matches the treasury bank pull.'
    ],
    deliverables: [
      'Earning & Deduction Mapping',
      'Parallel Run Variance Report Template',
      'Gross-up Calculation Formula Doc.'
    ],
    tip: 'The "Parallel Run" is the project. As a BA, you shouldn\'t go live until the new system\'s net pay matches the old system\'s for 99.9% of employees. Document every penny of variance.',
    software: [
      'ADP Enterprise Payroll: The global giant for high-complexity payroll processing.',
      'Workday Payroll: Known for "Full Visibility" into the calc engine during the processing window.'
    ]
  },
  {
    id: 'taxes-deductions',
    title: 'Statutory Taxes & Deductions',
    domain: 'hr-payroll',
    apqc: 'Aligned with "Manage Payroll Taxes" and "Garnishments Management."',
    lifecycle: [
      'Jurisdiction Sourcing: Determining tax entity based on employee home/work address.',
      'Garnishment Processing: Legally required withholdings (e.g. Child Support, IRS Levies).',
      'Withholding Form Management: Capturing digital W-4s and state alternates.',
      'Tax Filing: Generating the final quarterly and annual reports for the government.'
    ],
    babok: [
      'Regulatory Analysis: Staying current with annual changes in social security caps.',
      'Interface Analysis: Mapping child support records from the state portal to the payroll system.',
      'Decision Analysis: Determining "State of Record" for remote/hybrid employees.'
    ],
    deliverables: [
      'Tax Jurisdiction Map',
      'Garnishment Logic Rule Set',
      'Statutory Reporting Requirements'
    ],
    tip: 'Garnishments take priority. As a BA, you must ensure the system follows the strict "Withholding Order" (e.g. IRS before Student Loans). Getting this wrong can make the company liable for the debt.',
    software: [
      'Vertex: Specifically focuses on the complex sales and payroll tax calculation logic.',
      'Avalara: Provides automated tax compliance across a massive global footprint.'
    ]
  },
  {
    id: 'performance-management',
    title: 'Performance Management',
    domain: 'hr-payroll',
    apqc: 'A component of "Manage Talent Performance" (APQC 7.5).',
    lifecycle: [
      'Goal Setting: Cascading corporate OKRs down to individual contributors.',
      'Check-ins: Ongoing, documented feedback sessions between manager and report.',
      'Annual Appraisal: Formal rating and evaluation of the year\'s performance.',
      'Succession Planning: Identifying high-potential employees for future leadership.'
    ],
    babok: [
      'Organization Modelling: Designing the "Calibration" process across different departments.',
      'Prototyping: Creating intuitive feedback forms that encourage honest input.',
      'Metric Calibration: Ensuring the same "Exceeds Expectations" rating means the same in Sales and IT.'
    ],
    deliverables: [
      'Performance Review Workflow',
      'Competency Framework Document',
      'Goal Setting UX Wireframes'
    ],
    tip: 'Avoid "Recency Bias." As a BA, design the system to allow notes throughout the year. If you only look at November\'s performance during a December review, you miss the great work done in March.',
    software: [
      'Lattice: Modern, people-management platform focused on culture and ongoing feedback.',
      'Betterworks: Specialized in OKRs and strategic performance management at scale.'
    ]
  },
  {
    id: 'offboarding',
    title: 'Offboarding & Exit Processes',
    domain: 'hr-payroll',
    apqc: 'Part of "Manage Employee Information" and "Separate Employees."',
    lifecycle: [
      'Termination Notice: Recording the resignation or involuntary leave.',
      'Workover & Asset Handover: Tracking the return of laptops, keys, and badges.',
      'Exit Interviews: Gathering data to understand "Why" people are leaving.',
      'Revocation: The millisecond IT de-provisioning of system access.'
    ],
    babok: [
      'Checklist Analysis: Ensuring all security checkpoints (IT, Finance, Facilities) are cleared.',
      'Data Analysis: Tracking "Regrettable Loss" trends in the exit data.',
      'Process Modeling: Mapping the flow for "Terminal Pay" (Final paycheck rules).'
    ],
    deliverables: [
      'Offboarding Master Checklist',
      'Exit Interview Data Template',
      'Access Revocation Sequence'
    ],
    tip: 'Security is the priority. As a BA, your most critical requirement is the "Instant Decoupling." One click in HR should ideally disable the user in Active Directory, Slack, and the VPN instantly.',
    software: [
      'ServiceNow HRSD: Excels at the complex cross-departmental orchestrations of offboarding.',
      'Workday Termination: Native, secure handling of the final employee lifecycle event.'
    ]
  }
];

const allSubnodes = [...ecommerceSubnodes, ...fintechSubnodes, ...hrSubnodes];

const template = (node) => `---
title: ${node.title}
domain: ${node.domain}
---

# ${node.title}

${node.apqc}

## Node Knowledge: The Process Lifecycle
${node.lifecycle.map((step, index) => `${index + 1}. **${step.split(':')[0]}:** ${step.split(':')[1]}`).join('\n')}

---

## Key BA Activities (BABOK® Alignment)

In alignment with the *Business Analysis Body of Knowledge (BABOK®)*, mastering this node relies on the following knowledge areas and techniques:

${node.babok.map(item => `*   **${item.split(':')[0]}:** ${item.split(':')[1]}`).join('\n')}

## Typical Deliverables

*   **${node.deliverables[0]}**
*   **${node.deliverables[1]}**
*   **${node.deliverables[2]}**

---

## 💡 Expert BA Review & Adjustments

> [!TIP]
> **From the Desk of a Lead Business Analyst**
> ${node.tip}

---

## Enterprise Software Implementation Reference

*   **${node.software[0].split(':')[0]}:** ${node.software[0].split(':')[1]}
*   **${node.software[1].split(':')[0]}:** ${node.software[1].split(':')[1]}
`;

if (!fs.existsSync(guidesDir)) {
  fs.mkdirSync(guidesDir, { recursive: true });
}

allSubnodes.forEach(node => {
  const filePath = path.join(guidesDir, `${node.id}.mdx`);
  fs.writeFileSync(filePath, template(node));
  console.log(`Restored Expert Content for: ${node.id}.mdx`);
});
