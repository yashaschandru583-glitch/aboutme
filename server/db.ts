import mongoose from 'mongoose';
import { Project, IProject } from './models/Project.js';
import { Contact, IContact } from './models/Contact.js';
import { initialProjects, SeedProject } from './seedData.js';
import fs from 'fs';
import path from 'path';

let isMongooseConnected = false;

// Fallback in-memory/file storage when MONGODB_URI is not provided
const STORAGE_FILE = path.join(process.cwd(), '.portfolio_data.json');

interface LocalStorageData {
  projects: Array<SeedProject & { id: string; _id: string; createdAt: string; updatedAt: string }>;
  contacts: Array<{
    id: string;
    _id: string;
    name: string;
    email: string;
    subject?: string;
    message: string;
    read: boolean;
    ipAddress?: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

let localStore: LocalStorageData = {
  projects: initialProjects.map((p, idx) => ({
    ...p,
    id: `proj_${idx + 1}`,
    _id: `proj_${idx + 1}`,
    createdAt: new Date(Date.now() - (idx * 86400000 * 3)).toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  contacts: [
    {
      id: 'contact_demo_1',
      _id: 'contact_demo_1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@techinnovators.io',
      subject: 'Lead Full-Stack Role Opportunity',
      message: 'Hi! We reviewed your open-source projects and telemetry engine. We would love to discuss a Senior/Principal Engineer opening on our distributed systems team.',
      read: false,
      ipAddress: '192.168.1.1',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'contact_demo_2',
      _id: 'contact_demo_2',
      name: 'David Chen',
      email: 'david@venturelabs.co',
      subject: 'Consulting Inquiry for AI Studio Tooling',
      message: 'Loved your AI workflow architecture! Are you currently available for advisory or freelance technical consulting for Q3?',
      read: true,
      ipAddress: '10.0.0.12',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    }
  ]
};

// Try loading persisted local data if exists
function loadLocalStore() {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (parsed.projects && parsed.projects.length > 0) {
        localStore = parsed;
      }
    }
  } catch (err) {
    console.warn('[DB] Failed to load local cache file:', err);
  }
}

function saveLocalStore() {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(localStore, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[DB] Failed to save local cache file:', err);
  }
}

loadLocalStore();

export async function connectDB(): Promise<{ mode: 'mongodb' | 'embedded'; isConnected: boolean; uri?: string }> {
  const uri = process.env.MONGODB_URI;

  if (uri && uri.trim() !== '') {
    try {
      if (mongoose.connection.readyState === 1) {
        isMongooseConnected = true;
        return { mode: 'mongodb', isConnected: true, uri };
      }

      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      isMongooseConnected = true;
      console.log(`✅ [MongoDB] Successfully connected to MongoDB cluster.`);

      // Check if projects exist in MongoDB; seed if empty
      const count = await Project.countDocuments();
      if (count === 0) {
        console.log(`[MongoDB] Initializing database with seed projects...`);
        await Project.insertMany(initialProjects);
        console.log(`✅ [MongoDB] Seeded ${initialProjects.length} initial projects.`);
      }

      return { mode: 'mongodb', isConnected: true, uri };
    } catch (error) {
      console.error(`⚠️ [MongoDB] Connection error, falling back to embedded DB:`, error);
      isMongooseConnected = false;
      return { mode: 'embedded', isConnected: false };
    }
  }

  console.log(`ℹ️ [Database] Running in embedded Mongoose-compatible mode. Provide MONGODB_URI in .env to connect to an external MongoDB Atlas cluster.`);
  return { mode: 'embedded', isConnected: false };
}

// Unified Data Access Layer (Works identically with MongoDB or Embedded mode)
export const dbService = {
  getMode: () => (isMongooseConnected ? 'mongodb' : 'embedded'),

  async getAllProjects(filter?: { category?: string; search?: string; featured?: boolean }) {
    if (isMongooseConnected) {
      const query: Record<string, unknown> = {};
      if (filter?.category && filter.category !== 'All') {
        query.category = filter.category;
      }
      if (filter?.featured !== undefined) {
        query.featured = filter.featured;
      }
      if (filter?.search) {
        query.$or = [
          { title: { $regex: filter.search, $options: 'i' } },
          { description: { $regex: filter.search, $options: 'i' } },
          { techStack: { $in: [new RegExp(filter.search, 'i')] } },
        ];
      }
      return await Project.find(query).sort({ featured: -1, createdAt: -1 });
    }

    // Embedded mode
    let results = [...localStore.projects];
    if (filter?.category && filter.category !== 'All') {
      results = results.filter((p) => p.category.toLowerCase() === filter.category!.toLowerCase());
    }
    if (filter?.featured !== undefined) {
      results = results.filter((p) => p.featured === filter.featured);
    }
    if (filter?.search) {
      const term = filter.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.techStack.some((t) => t.toLowerCase().includes(term))
      );
    }
    return results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  },

  async getProjectById(id: string) {
    if (isMongooseConnected) {
      return await Project.findById(id);
    }
    return localStore.projects.find((p) => p.id === id || p._id === id) || null;
  },

  async createProject(projectData: Partial<SeedProject>) {
    if (isMongooseConnected) {
      const newProject = new Project(projectData);
      return await newProject.save();
    }

    const newId = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const created = {
      title: projectData.title || 'Untitled Project',
      description: projectData.description || 'Project description',
      longDescription: projectData.longDescription || projectData.description || '',
      category: (projectData.category as 'Full Stack' | 'Frontend' | 'Backend' | 'AI & Cloud') || 'Full Stack',
      image: projectData.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      techStack: Array.isArray(projectData.techStack) && projectData.techStack.length > 0 ? projectData.techStack : ['React', 'Node.js', 'Express'],
      liveUrl: projectData.liveUrl || '#',
      githubUrl: projectData.githubUrl || '#',
      featured: Boolean(projectData.featured),
      stars: projectData.stars || 0,
      highlights: projectData.highlights || [],
      id: newId,
      _id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    localStore.projects.unshift(created);
    saveLocalStore();
    return created;
  },

  async deleteProject(id: string) {
    if (isMongooseConnected) {
      return await Project.findByIdAndDelete(id);
    }
    const idx = localStore.projects.findIndex((p) => p.id === id || p._id === id);
    if (idx !== -1) {
      const removed = localStore.projects.splice(idx, 1)[0];
      saveLocalStore();
      return removed;
    }
    return null;
  },

  async resetSeedProjects() {
    if (isMongooseConnected) {
      await Project.deleteMany({});
      return await Project.insertMany(initialProjects);
    }
    localStore.projects = initialProjects.map((p, idx) => ({
      ...p,
      id: `proj_${idx + 1}`,
      _id: `proj_${idx + 1}`,
      createdAt: new Date(Date.now() - idx * 86400000 * 2).toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    saveLocalStore();
    return localStore.projects;
  },

  async createContact(contactData: { name: string; email: string; subject?: string; message: string; ipAddress?: string }) {
    if (isMongooseConnected) {
      const newContact = new Contact(contactData);
      return await newContact.save();
    }

    const newId = `contact_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const created = {
      id: newId,
      _id: newId,
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject || 'Portfolio Direct Message',
      message: contactData.message,
      read: false,
      ipAddress: contactData.ipAddress || '127.0.0.1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    localStore.contacts.unshift(created);
    saveLocalStore();
    return created;
  },

  async getContacts() {
    if (isMongooseConnected) {
      return await Contact.find().sort({ createdAt: -1 });
    }
    return localStore.contacts;
  },

  async getStats() {
    const projects = await this.getAllProjects();
    const contacts = await this.getContacts();
    return {
      totalProjects: projects.length,
      featuredProjects: projects.filter((p: any) => p.featured).length,
      categories: ['All', 'Full Stack', 'Frontend', 'Backend', 'AI & Cloud'],
      totalContactMessages: contacts.length,
      dbMode: this.getMode(),
      serverUptimeSeconds: Math.floor(process.uptime()),
    };
  }
};
