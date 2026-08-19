export interface Project {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'AI & Cloud';
  image: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  stars?: number;
  highlights?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read?: boolean;
  ipAddress?: string;
  createdAt?: string;
}

export type ContactSubmission = ContactMessage;

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  experience: string;
  iconName: string;
  popularFor: string;
  color: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ServerHealth {
  status: string;
  timestamp: string;
  databaseMode: 'mongodb' | 'embedded';
  uptimeSeconds: number;
  environment: string;
}
