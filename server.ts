import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { connectDB, dbService } from './server/db.js';

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();

  // Basic Middlewares
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Initialize DB Connection
  await connectDB();

  // ----------------------------------------------------
  // REST API Routes
  // ----------------------------------------------------

  // 1. Health check & DB Status
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      databaseMode: dbService.getMode(),
      uptimeSeconds: Math.floor(process.uptime()),
      environment: process.env.NODE_ENV || 'development',
    });
  });

  // 2. Stats endpoint
  app.get('/api/stats', async (req: Request, res: Response) => {
    try {
      const stats = await dbService.getStats();
      res.json({ success: true, data: stats });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. Projects Endpoints (GET, POST, DELETE, SEED)
  app.get('/api/projects', async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string | undefined;
      const search = req.query.search as string | undefined;
      const featured = req.query.featured === 'true' ? true : req.query.featured === 'false' ? false : undefined;

      const projects = await dbService.getAllProjects({ category, search, featured });
      res.json({
        success: true,
        count: projects.length,
        data: projects,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const project = await dbService.getProjectById(req.params.id);
      if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }
      res.json({ success: true, data: project });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/projects', async (req: Request, res: Response) => {
    try {
      const { title, description, longDescription, category, image, techStack, liveUrl, githubUrl, featured, highlights } = req.body;

      if (!title || !description || !image) {
        return res.status(400).json({
          success: false,
          error: 'Title, description, and image URL are required fields.',
        });
      }

      const formattedTech = Array.isArray(techStack)
        ? techStack
        : typeof techStack === 'string'
        ? techStack.split(',').map((t) => t.trim()).filter(Boolean)
        : ['Full-Stack'];

      const created = await dbService.createProject({
        title,
        description,
        longDescription: longDescription || description,
        category: category || 'Full Stack',
        image,
        techStack: formattedTech,
        liveUrl: liveUrl || '#',
        githubUrl: githubUrl || '#',
        featured: Boolean(featured),
        stars: 1,
        highlights: Array.isArray(highlights) ? highlights : [],
      });

      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: created,
      });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const deleted = await dbService.deleteProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Project not found to delete' });
      }
      res.json({ success: true, message: 'Project deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/projects/seed', async (req: Request, res: Response) => {
    try {
      const reset = await dbService.resetSeedProjects();
      res.json({
        success: true,
        message: 'Projects restored to official seed catalog',
        data: reset,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. Contact Endpoints (POST, GET)
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Please provide all required fields (Name, Email, Message).',
        });
      }

      // Basic regex email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Please enter a valid email address.',
        });
      }

      if (message.trim().length < 10) {
        return res.status(400).json({
          success: false,
          error: 'Message must be at least 10 characters long.',
        });
      }

      const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

      const contactSubmission = await dbService.createContact({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject ? subject.trim() : 'Portfolio Direct Inquiry',
        message: message.trim(),
        ipAddress: clientIp,
      });

      res.status(201).json({
        success: true,
        message: `Thank you, ${name}! Your message has been safely received. I will get back to you soon.`,
        data: contactSubmission,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/contact', async (req: Request, res: Response) => {
    try {
      const messages = await dbService.getContacts();
      res.json({
        success: true,
        count: messages.length,
        data: messages,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // ----------------------------------------------------
  // Vite Integration (Dev vs Prod)
  // ----------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Error handling middleware
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled server error:', err);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred.',
      details: process.env.NODE_ENV !== 'production' ? err.message : undefined,
    });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Developer Portfolio Server active at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
