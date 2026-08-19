import { SkillCategory, ExperienceItem, Project } from '../types';

export const fallbackProjects: Project[] = [
  {
    id: "proj_1",
    _id: "proj_1",
    title: "CloudScale Metrics Engine",
    description: "Distributed telemetry platform processing 50k+ metrics/sec with real-time anomaly detection and interactive Grafana-style dashboards.",
    longDescription: "Architected a high-throughput monitoring pipeline with Go/Node microservices and Express REST gateway. Implemented WebSocket streams and Redis pub/sub for instant alert dispatching. Features custom query builder and exportable incident postmortems.",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    techStack: ["React 19", "TypeScript", "Node.js", "Express", "MongoDB", "Redis", "Tailwind CSS"],
    liveUrl: "https://example.com/demo/cloudscale",
    githubUrl: "https://github.com/developer/cloudscale-telemetry",
    featured: true,
    stars: 142,
    highlights: [
      "Sub-50ms query response latency over 10M+ metrics records",
      "Dynamic alert rules engine with webhooks & Slack integration",
      "Role-based multi-tenant workspace isolation"
    ]
  },
  {
    id: "proj_2",
    _id: "proj_2",
    title: "DevForge AI Workflow Studio",
    description: "Collaborative developer workspace utilizing Gemini & LLM pipelines for automated code refactoring, AST linting, and PR generation.",
    longDescription: "Engineered an AI-assisted code review platform with tree-sitter AST parsing and asynchronous job queues. Provides smart context injection from Git diffs and interactive code editing canvases with syntax highlighting.",
    category: "AI & Cloud",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    techStack: ["Next.js / React", "Express", "TypeScript", "Mongoose", "Gemini API", "Docker", "Tailwind"],
    liveUrl: "https://example.com/demo/devforge",
    githubUrl: "https://github.com/developer/devforge-ai-studio",
    featured: true,
    stars: 289,
    highlights: [
      "Streamed semantic code explanations with diff patch previews",
      "Context-aware token reduction algorithms lowering API cost by 42%",
      "Automated CI/CD GitHub Action integration"
    ]
  },
  {
    id: "proj_3",
    _id: "proj_3",
    title: "NexusPay Global Checkout & Ledger",
    description: "Idempotent payment orchestration service handling multi-currency billing, webhook retries, and double-entry accounting ledgers.",
    longDescription: "High-reliability backend service built with Express, MongoDB transactions, and Stripe/PayPal integration. Features distributed lock mechanisms preventing double charges, automated reconciliation cron jobs, and HMAC webhook verification.",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    techStack: ["Node.js", "Express", "MongoDB", "Mongoose", "Stripe API", "Docker", "Jest"],
    liveUrl: "https://example.com/demo/nexuspay",
    githubUrl: "https://github.com/developer/nexuspay-ledger-service",
    featured: true,
    stars: 97,
    highlights: [
      "ACID compliant MongoDB transactions with rollback guarantees",
      "99.99% uptime with exponential backoff webhook dispatch engine",
      "Comprehensive OpenAPI 3.0 specification & Swagger UI"
    ]
  },
  {
    id: "proj_4",
    _id: "proj_4",
    title: "VividDesign Component Design System",
    description: "Accessible, zero-runtime CSS tokens component library with dark-mode, keyboard navigation, and interactive story documentation.",
    longDescription: "Developed a comprehensive UI kit and design system with 40+ production-ready components. Enforces strict WCAG AAA color contrast ratios, screen-reader aria compliance, and fluid typography scale calculations.",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Vite", "Motion"],
    liveUrl: "https://example.com/demo/vividdesign",
    githubUrl: "https://github.com/developer/vivid-design-system",
    featured: false,
    stars: 215,
    highlights: [
      "Zero layout shifts (CLS < 0.01) and Lighthouse 100/100 score",
      "Full keyboard navigation & Focus trap implementation",
      "Micro-interactions powered by motion physics"
    ]
  },
  {
    id: "proj_5",
    _id: "proj_5",
    title: "OmniRoute Fleet Logistics & Routing",
    description: "Real-time fleet tracking and multi-stop route optimization platform with live GPS websocket broadcasting and geofence alerts.",
    longDescription: "Full-stack enterprise application mapping 500+ daily deliveries. Uses Dijkstra and genetic algorithms for delivery sequence optimization, reducing transit fuel consumption by 18%.",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    techStack: ["React", "Express", "MongoDB", "Socket.io", "Leaflet / Maps", "Tailwind CSS"],
    liveUrl: "https://example.com/demo/omniroute",
    githubUrl: "https://github.com/developer/omniroute-logistics",
    featured: false,
    stars: 84,
    highlights: [
      "Dynamic shortest-path recalculation under live traffic constraints",
      "Low-latency WebSockets for sub-second vehicle telemetry",
      "Driver mobile-responsive progressive web app (PWA)"
    ]
  },
  {
    id: "proj_6",
    _id: "proj_6",
    title: "HyperPulse Serverless Event Bus",
    description: "Lightweight cloud event broker supporting pub/sub topics, message filtering, deduplication, and dead-letter queues.",
    longDescription: "High-speed backend engine written for resilient asynchronous microservice choreography. Features replayable event streams, tenant rate limiting, and structured JSON logging with OpenTelemetry tracing.",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    techStack: ["Node.js", "Express", "MongoDB", "Redis", "Kafka", "Docker"],
    liveUrl: "https://example.com/demo/hyperpulse",
    githubUrl: "https://github.com/developer/hyperpulse-event-bus",
    featured: false,
    stars: 168,
    highlights: [
      "Guaranteed at-least-once message delivery semantics",
      "Pluggable storage engine with MongoDB change streams",
      "Built-in chaos testing suite and resilience benchmarks"
    ]
  }
];

export const developerProfile = {
  name: "Yashas C",
  title: "Principal Full-Stack Engineer & System Architect",
  tagline: "Architecting resilient distributed backends, reactive web applications, and developer-first cloud infrastructure.",
  typingTitles: [
    "Full-Stack Software Engineer",
    "Distributed Systems Architect",
    "React & TypeScript Specialist",
    "Node.js & MongoDB Specialist",
    "Cloud & DevOps Practitioner"
  ],
  bio: "Senior engineer with 8+ years of experience designing scalable microservices, resilient full-stack systems, and polished human interfaces. Passionate about API ergonomics, clean architectural boundaries, real-time telemetry, and high-performance databases.",
  location: "San Francisco, CA (Open to Remote)",
  email: "yashaschandru583@gmail.com",
  phone: "+91 8147837927",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  availability: "Available for Senior / Principal Roles & High-Impact Consulting",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    email: "mailto:yashaschandru583@gmail.com",
    phone: "tel:+918147837927",
    portfolio: "https://yashas.dev"
  },
  metrics: [
    { label: "Years Experience", value: "8+", detail: "Full lifecycle engineering" },
    { label: "Projects Shipped", value: "45+", detail: "Production applications" },
    { label: "GitHub Commits", value: "3.2k", detail: "Past 12 months" },
    { label: "System Uptime", value: "99.98%", detail: "Across production services" }
  ]
};

export const skillsData: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    description: "Component-driven design systems, state management, and sub-100ms web experiences.",
    iconName: "Layout",
    skills: [
      { name: "React 19 / Next.js", level: 96, experience: "7 yrs", iconName: "Atom", popularFor: "Hooks, Server Actions, SSR", color: "from-cyan-500 to-blue-500" },
      { name: "TypeScript", level: 95, experience: "6 yrs", iconName: "Code2", popularFor: "Generics, Strict Type Safety", color: "from-blue-500 to-indigo-500" },
      { name: "Tailwind CSS", level: 98, experience: "5 yrs", iconName: "Palette", popularFor: "Responsive Layouts, Design Systems", color: "from-teal-400 to-cyan-500" },
      { name: "Motion & UI Animations", level: 88, experience: "4 yrs", iconName: "Sparkles", popularFor: "Physics, Page Transitions", color: "from-purple-500 to-pink-500" },
      { name: "State Architecture (Zustand/Redux)", level: 92, experience: "6 yrs", iconName: "Cpu", popularFor: "Predictable Store Flow", color: "from-amber-500 to-orange-500" },
      { name: "Web Performance & Core Vitals", level: 90, experience: "5 yrs", iconName: "Zap", popularFor: "Lighthouse 100, Code Splitting", color: "from-emerald-400 to-teal-500" }
    ]
  },
  {
    title: "Backend & Microservices",
    description: "High-concurrency RESTful APIs, asynchronous worker queues, and event streams.",
    iconName: "Server",
    skills: [
      { name: "Node.js & Express", level: 95, experience: "8 yrs", iconName: "Server", popularFor: "REST APIs, Middleware, Streams", color: "from-emerald-500 to-green-600" },
      { name: "REST API Design & OpenAPI", level: 94, experience: "7 yrs", iconName: "Globe", popularFor: "Idempotency, Pagination, Auth", color: "from-sky-500 to-blue-600" },
      { name: "Authentication & Security (JWT/OAuth)", level: 90, experience: "6 yrs", iconName: "ShieldCheck", popularFor: "RBAC, Token Rotation, CSRF", color: "from-indigo-500 to-violet-600" },
      { name: "WebSockets & Event-Driven", level: 86, experience: "5 yrs", iconName: "Radio", popularFor: "Realtime Feeds, Pub/Sub", color: "from-rose-500 to-red-600" },
      { name: "Go / Microservices", level: 80, experience: "3 yrs", iconName: "Boxes", popularFor: "Low-latency Goroutines", color: "from-cyan-600 to-teal-600" }
    ]
  },
  {
    title: "Databases & Data Modeling",
    description: "Schema validation, transactional consistency, indexing strategies, and caching.",
    iconName: "Database",
    skills: [
      { name: "MongoDB & Mongoose", level: 94, experience: "7 yrs", iconName: "Database", popularFor: "Aggregation Pipelines, Sharding", color: "from-green-500 to-emerald-700" },
      { name: "PostgreSQL & Prisma/Drizzle", level: 88, experience: "5 yrs", iconName: "Table", popularFor: "Relational Queries, JSONB, ACID", color: "from-blue-600 to-indigo-700" },
      { name: "Redis & In-Memory Caching", level: 90, experience: "6 yrs", iconName: "Zap", popularFor: "Session Store, Rate Limiting", color: "from-red-500 to-rose-600" },
      { name: "Data Optimization & Indexing", level: 86, experience: "5 yrs", iconName: "LineChart", popularFor: "Explain Plans, Compound Indexes", color: "from-yellow-500 to-amber-600" }
    ]
  },
  {
    title: "DevOps, Cloud & Tooling",
    description: "CI/CD automation, container orchestration, serverless hosting, and observability.",
    iconName: "Cloud",
    skills: [
      { name: "Docker & Containerization", level: 90, experience: "6 yrs", iconName: "Box", popularFor: "Multi-stage Builds, Compose", color: "from-blue-400 to-sky-600" },
      { name: "Vercel / Render / Cloud Run", level: 92, experience: "5 yrs", iconName: "CloudLightning", popularFor: "Edge Functions, Automated CI", color: "from-purple-600 to-indigo-600" },
      { name: "GitHub Actions & CI/CD", level: 88, experience: "5 yrs", iconName: "GitBranch", popularFor: "Automated Tests, Semantic Releases", color: "from-slate-600 to-slate-800" },
      { name: "Monitoring & OpenTelemetry", level: 84, experience: "4 yrs", iconName: "Activity", popularFor: "Distributed Tracing, Sentry, Logs", color: "from-amber-500 to-red-500" }
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    period: "2023 — Present",
    role: "Lead Full-Stack Architect",
    company: "AetherScale Technologies",
    location: "San Francisco, CA",
    type: "Full-Time",
    description: "Leading core platform team of 8 engineers driving distributed telemetry ingestion and multi-tenant analytics dashboard.",
    achievements: [
      "Scaled Node.js/MongoDB microservices from 5,000 to 50,000 requests/sec with p99 latency < 65ms",
      "Redesigned frontend data visualization suite with React 19, reducing initial bundle size by 38%",
      "Implemented zero-downtime MongoDB sharded cluster migration with automated rollback safety"
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Redis", "Docker", "GCP"]
  },
  {
    period: "2021 — 2023",
    role: "Senior Full-Stack Engineer",
    company: "Synthetix Cloud Labs",
    location: "New York, NY (Remote)",
    type: "Full-Time",
    description: "Built AI-assisted developer tools, real-time collaboration canvas, and secure enterprise API integrations.",
    achievements: [
      "Architected real-time WebSocket state synchronizer supporting 200+ concurrent collaborators per document",
      "Created reusable Mongoose schema validation pipeline adopted across 14 internal microservices",
      "Introduced automated end-to-end integration test suite improving release confidence by 40%"
    ],
    technologies: ["Next.js", "TypeScript", "Express", "Mongoose", "Tailwind CSS", "WebSockets", "Jest"]
  },
  {
    period: "2018 — 2021",
    role: "Full-Stack Software Engineer",
    company: "PixelForge Media",
    location: "Austin, TX",
    type: "Full-Time",
    description: "Developed responsive web applications, content management APIs, and high-converting checkout flows.",
    achievements: [
      "Integrated Stripe webhook payment infrastructure processing $4M+ in annual transaction volume",
      "Transformed legacy single-page application into modern TypeScript and Tailwind design system"
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Docker"]
  }
];
