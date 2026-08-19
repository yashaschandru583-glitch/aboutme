export interface SeedProject {
  title: string;
  description: string;
  longDescription: string;
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'AI & Cloud';
  image: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  stars: number;
  highlights: string[];
}

export const initialProjects: SeedProject[] = [
  {
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
