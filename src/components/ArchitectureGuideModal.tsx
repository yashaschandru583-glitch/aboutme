import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  FolderTree, 
  Database, 
  Layers, 
  CloudUpload, 
  Copy, 
  Check, 
  ArrowRight
} from 'lucide-react';

interface ArchitectureGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const ArchitectureGuideModal: React.FC<ArchitectureGuideModalProps> = ({
  isOpen,
  onClose,
  isDark,
}) => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const folderStructureCode = `my-portfolio-project/
├── .env.example                # Environment variables template (MONGODB_URI, PORT)
├── package.json                # Project manifest & unified scripts
├── tsconfig.json               # TypeScript compiler config
├── vite.config.ts              # Vite frontend configuration
├── server.ts                   # Express server entry point & Vite middleware
│
├── server/                     # Backend architecture (Node.js + Express + Mongoose)
│   ├── db.ts                   # Database connection & data access layer
│   ├── seedData.ts             # Initial JSON projects & seed catalog
│   └── models/
│       ├── Project.ts          # Mongoose Project Schema & TypeScript interface
│       └── Contact.ts          # Mongoose Contact Message Schema & validation
│
└── src/                        # Frontend architecture (React + Tailwind CSS)
    ├── main.tsx                # React DOM root entry
    ├── App.tsx                 # Root application coordinator
    ├── index.css               # Global Tailwind CSS imports & theme rules
    ├── types.ts                # TypeScript domain models & API response types
    ├── data/
    │   └── portfolioData.ts    # Developer bio, categorized skills, work experience
    └── components/
        ├── Navbar.tsx          # Sticky navbar with section links
        ├── Hero.tsx            # Animated typing headline, social badges, CTAs
        ├── About.tsx           # Developer bio, metrics grid, career timeline
        ├── SkillsGrid.tsx      # Categorized skill badges with proficiency bars
        ├── ProjectsGallery.tsx # REST API projects showcase with category filters
        ├── ProjectCard.tsx     # Card with image, tags, star counter, demo links
        ├── ProjectModal.tsx    # Case study deep-dive architecture modal
        ├── NewProjectModal.tsx # Interactive form testing POST /api/projects
        ├── ContactForm.tsx     # Form connected to POST /api/contact
        ├── ResumeModal.tsx     # Interactive printable CV viewer & exporter
        └── Toast.tsx           # Dynamic notification toast system`;

  const mongooseSchemaCode = `// server/models/Project.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription?: string;
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'AI & Cloud';
  image: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  stars: number;
  highlights: string[];
}

export const ProjectSchema: Schema = new Schema<IProject>(
  {
    title: { type: String, required: [true, 'Project title is required'], trim: true },
    description: { type: String, required: [true, 'Project short description is required'], trim: true },
    longDescription: { type: String, default: '' },
    category: {
      type: String,
      required: true,
      enum: ['Full Stack', 'Frontend', 'Backend', 'AI & Cloud'],
      default: 'Full Stack',
    },
    image: { type: String, required: true },
    techStack: { type: [String], required: true },
    liveUrl: { type: String, default: '#' },
    githubUrl: { type: String, default: '#' },
    featured: { type: Boolean, default: false },
    stars: { type: Number, default: 0 },
    highlights: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
export default Project;`;

  const expressRoutesCode = `// server.ts - REST Route Handlers
import express, { Request, Response } from 'express';
import { Project } from './server/models/Project.js';
import { Contact } from './server/models/Contact.js';

const app = express();
app.use(express.json());

// 1. GET /api/projects - Query with category and search filter
app.get('/api/projects', async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    const query: any = {};
    if (category && category !== 'All') query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { techStack: { $in: [new RegExp(String(search), 'i')] } }
      ];
    }
    const projects = await Project.find(query).sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. POST /api/projects - Create new project
app.post('/api/projects', async (req: Request, res: Response) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({ success: true, message: 'Project created', data: newProject });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 3. POST /api/contact - Receive visitor submissions
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields required' });
    }
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ success: true, message: 'Message safely stored in MongoDB!' });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});`;

  const deploymentEnvCode = `# .env file configuration
PORT=3000
NODE_ENV=production

# MongoDB Atlas Connection URI
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority"
`;

  return (
    <div 
      id="architecture-guide-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="architecture-guide-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0a0a0a] text-gray-200 shadow-2xl overflow-hidden my-8"
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs">
              DOCS.API
            </span>
            <div>
              <h2 className="text-lg font-bold text-white font-mono">
                FULL-STACK ARCHITECTURE BLUEPRINT
              </h2>
              <p className="text-xs text-gray-500 font-mono">
                Production architecture covering folder tree, Mongoose models, Express REST APIs & Vercel/Render deployment.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex items-center border-b border-white/10 overflow-x-auto bg-white/[0.01]">
          {[
            { step: 1, title: '01. FOLDER TREE', icon: FolderTree },
            { step: 2, title: '02. REST APIS & DB', icon: Database },
            { step: 3, title: '03. REACT FRONTEND', icon: Layers },
            { step: 4, title: '04. DEPLOYMENT (VERCEL/RENDER)', icon: CloudUpload },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeStep === tab.step;
            return (
              <button
                key={tab.step}
                id={`guide-tab-step-${tab.step}`}
                onClick={() => setActiveStep(tab.step as any)}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-mono font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10'
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6 font-mono text-xs">
          
          {/* STEP 1 */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold mb-2 flex items-center gap-2 text-white">
                  <FolderTree className="w-4 h-4 text-emerald-400" />
                  <span>PRODUCTION FOLDER & FILE STRUCTURE</span>
                </h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  Separation of concerns: React 19 frontend with Tailwind CSS, and a Node.js + Express backend running Mongoose MongoDB models.
                </p>
              </div>

              <div className="relative rounded-xl border border-white/10 bg-black/60 p-4 text-emerald-400 overflow-x-auto">
                <button
                  onClick={() => copyToClipboard(folderStructureCode, 'folder')}
                  className="absolute top-3 right-3 px-2.5 py-1 rounded bg-white/10 text-white hover:bg-white/20 border border-white/10 text-[11px] flex items-center gap-1"
                >
                  {copiedKey === 'folder' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'folder' ? 'COPIED' : 'COPY'}</span>
                </button>
                <pre>{folderStructureCode}</pre>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold mb-2 flex items-center gap-2 text-white">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span>MONGOOSE MODELS & EXPRESS REST HANDLERS</span>
                </h3>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-400">1. Mongoose Model: `server/models/Project.ts`</span>
                  <button
                    onClick={() => copyToClipboard(mongooseSchemaCode, 'schema')}
                    className="text-[11px] text-gray-400 hover:text-emerald-400 flex items-center gap-1"
                  >
                    {copiedKey === 'schema' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'schema' ? 'COPIED' : 'COPY CODE'}</span>
                  </button>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/60 p-4 text-gray-300 overflow-x-auto max-h-60">
                  <pre>{mongooseSchemaCode}</pre>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-400">2. Express Endpoints (`GET /api/projects`, `POST /api/projects`, `POST /api/contact`)</span>
                  <button
                    onClick={() => copyToClipboard(expressRoutesCode, 'routes')}
                    className="text-[11px] text-gray-400 hover:text-emerald-400 flex items-center gap-1"
                  >
                    {copiedKey === 'routes' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'routes' ? 'COPIED' : 'COPY CODE'}</span>
                  </button>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/60 p-4 text-gray-300 overflow-x-auto max-h-60">
                  <pre>{expressRoutesCode}</pre>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold mb-2 flex items-center gap-2 text-white">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>REACT FRONTEND ARCHITECTURE</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-1">
                  <div className="font-bold text-xs text-emerald-400">Hero Component (`Hero.tsx`)</div>
                  <p className="text-xs text-gray-400 font-sans">Typing effect loop, live server telemetry, social badges, and CTA triggers.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-1">
                  <div className="font-bold text-xs text-emerald-400">Projects Gallery (`ProjectsGallery.tsx`)</div>
                  <p className="text-xs text-gray-400 font-sans">Asynchronously queries `GET /api/projects`, with search, category filtering, and modal review.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {activeStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold mb-2 flex items-center gap-2 text-white">
                  <CloudUpload className="w-4 h-4 text-emerald-400" />
                  <span>DEPLOYMENT & ENVIRONMENT CONFIGURATION</span>
                </h3>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300">Required `.env` Variables:</span>
                  <button
                    onClick={() => copyToClipboard(deploymentEnvCode, 'env')}
                    className="text-[11px] text-gray-400 hover:text-emerald-400 flex items-center gap-1"
                  >
                    {copiedKey === 'env' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'env' ? 'COPIED' : 'COPY .ENV'}</span>
                  </button>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/60 p-4 text-gray-300">
                  <pre>{deploymentEnvCode}</pre>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-white/10 bg-white/5 space-y-2">
                <div className="font-bold text-xs text-emerald-400">Deploying to GitHub Pages (Static Hosting)</div>
                <p className="text-xs text-gray-300 font-sans">
                  The <code className="text-emerald-400 font-mono">vite.config.ts</code> is already configured with <code className="text-emerald-400 font-mono">base: &apos;./&apos;</code> so asset paths resolve relatively on GitHub Pages subpaths.
                </p>
                <ol className="list-decimal list-inside text-xs text-gray-300 space-y-1 font-sans">
                  <li>Run <code className="px-1 py-0.5 rounded bg-black/60 text-emerald-400 font-mono">npm run build</code> (outputs to <code className="font-mono">dist/</code>).</li>
                  <li>In your GitHub Repository, go to <strong>Settings &gt; Pages</strong>.</li>
                  <li>Under <strong>Build and deployment &gt; Source</strong>, choose <strong>GitHub Actions</strong> or select <strong>Deploy from a branch</strong> (<code className="font-mono">gh-pages</code> / <code className="font-mono">dist</code>).</li>
                  <li>Alternatively, deploy directly via <code className="px-1 py-0.5 rounded bg-black/60 text-emerald-400 font-mono">npx gh-pages -d dist</code>.</li>
                </ol>
              </div>

              <div className="p-5 rounded-xl border border-white/10 bg-white/5 space-y-2">
                <div className="font-bold text-xs text-emerald-400">Deploying to Render / Cloud Run (Full-Stack Node + React)</div>
                <ol className="list-decimal list-inside text-xs text-gray-300 space-y-1 font-sans">
                  <li>Create a new Web Service on Render linked to your repository.</li>
                  <li>Set Build Command: <code className="px-1 py-0.5 rounded bg-black/60 text-emerald-400 font-mono">npm run build</code></li>
                  <li>Set Start Command: <code className="px-1 py-0.5 rounded bg-black/60 text-emerald-400 font-mono">npm run start</code></li>
                  <li>Add <code className="text-emerald-400 font-mono">MONGODB_URI</code> to Render&apos;s Environment variables tab.</li>
                </ol>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-white/10 flex items-center justify-between bg-white/[0.02]">
          <span className="text-[11px] font-mono text-gray-500">
            STEP {activeStep} OF 4
          </span>

          <div className="flex items-center gap-2">
            {activeStep > 1 && (
              <button
                onClick={() => setActiveStep((prev) => (prev - 1) as any)}
                className="px-4 py-2 rounded text-xs font-mono border border-white/10 text-gray-300 hover:text-white hover:bg-white/5"
              >
                PREVIOUS
              </button>
            )}
            {activeStep < 4 ? (
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) as any)}
                className="px-4 py-2 rounded text-xs font-mono font-bold bg-emerald-500 text-black hover:bg-emerald-400 flex items-center gap-1"
              >
                <span>NEXT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded text-xs font-mono font-bold bg-emerald-500 text-black hover:bg-emerald-400"
              >
                DONE
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
