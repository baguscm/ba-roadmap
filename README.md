# Business Analyst Domain Roadmap Platform

## 1. Background
Inspired by `roadmap.sh`, this project aims to provide an interactive, visual learning path specifically tailored for Business Analysts (BAs). While general BA skills are universal, the *application* of those skills varies drastically depending on the industry. 

**Goal:** To help fresh graduates and junior BAs quickly learn and master the distinct business processes, terminology, and deliverables required for their chosen industry (e.g., E-commerce, FinTech, Healthcare, Supply Chain).

## 2. Target Audience
- **Fresh Graduates** looking to enter the Business Analyst field.
- **Junior Business Analysts** transitioning into a new industry domain and needing to understand the core processes of that domain.

## 3. Core Features (MVP)
To prevent over-engineering, the Minimum Viable Product (MVP) will focus on essential features:
1. **Domain Selection:** A landing page highlighting available business domains.
2. **Interactive Roadmap:** A node-based, visual flowchart for the selected domain (e.g., showing the "Order-to-Cash" process in E-Commerce).
3. **Progress Tracking (Local):** Users can mark nodes as "Completed" to track their learning progress. This state will be saved locally in the browser.
4. **Rich Content Views:** Clicking a node opens a side panel or page containing detailed markdown-based study materials.

## 4. Tech Stack & Dependencies
To ensure simplicity while maintaining a modern, scalable foundation (inspired by `roadmap.sh` but avoiding monorepos or complex custom editors), we use:

| Layer | Technology | Reason |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js (App Router) | Modern React framework with excellent performance, SEO, and simplified routing. |
| **Language** | TypeScript | Ensures type safety for roadmap definitions, reducing runtime errors. |
| **Styling** | Tailwind CSS | Rapid UI development with utility classes, replacing custom CSS for easier maintenance while keeping premium aesthetics. |
| **Roadmap Engine** | React Flow | Industry standard for rendering interactive nodes, edges, and flowcharts in React. |
| **Content Management** | MDX (Markdown) | Allows writing guides in simple Markdown while embedding React components. |
| **State Management** | React Context + LocalStorage | Simple, persistence-based tracking without the need for a complex database backend. |
| **Deployment** | Vercel | Zero-configuration deployment optimized for Next.js. |

## 5. System Architecture / Design
- **Client Side (UI):** React Flow canvas displays the main user interface. When a user interacts with a node, Next.js routes them to (or opens) the MDX guide.
- **Data Layer:** Roadmaps are structurally defined in simple `JSON` files (listing node IDs, titles, and connections). The actual educational content lives in corresponding `.mdx` files.
- **State Layer:** A custom React Hook will read/write an array of "completed node IDs" directly to the browser's `localStorage`.

## 6. User Flow
1. **Discovery:** User arrives at the homepage and selects a business domain (e.g., "E-commerce BA").
2. **Visual Exploration:** User sees the interactive flowchart of that domain's core processes.
3. **Learning:** User clicks the first node (e.g., "Procure-to-Pay").
4. **Consumption:** A panel opens with the MDX guide explaining the process, key systems involved, and standard BA deliverables.
5. **Achievement:** User clicks "Mark as Complete". The node updates visually (e.g., turns green), and progress is saved locally.
6. **Progression:** User moves on to the next dependent node.

## 7. Project Structure
```text
/
├── app/                  # Next.js App router (Home, Domain pages, API)
├── components/
│   ├── ui/               # Reusable UI elements (buttons, side-panels, tooltips)
│   ├── roadmap/          # React Flow components (Custom Nodes, Canvas, Edges)
│   └── layout/           # Page layouts, Header, Footer
├── content/              # The actual data and study material
│   ├── maps/             # JSON structural definitions for each roadmap
│   └── guides/           # MDX files containing the reading material
├── hooks/                # Custom React hooks (e.g., useProgress)
├── styles/               # Global styles and Tailwind directives
├── types/                # TypeScript interface definitions
└── public/               # Static assets (images, icons)
```

---

## 9. Deployment

This project is optimized for **Vercel** and **GitHub**.

### Deploy to Vercel (Recommended)
1. Push your code to GitHub.
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New** > **Project** and import your repository.
4. Vercel will auto-detect the Next.js framework and deploy it.

### Local Development
```bash
npm install
npm run dev
```

## 10. License
This project is open-source and available under the MIT License.
