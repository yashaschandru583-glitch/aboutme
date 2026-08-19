import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Upload, 
  Tag, 
  Sparkles, 
  Layers, 
  RefreshCw,
  Terminal
} from 'lucide-react';
import { Project } from '../types';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
  isDark: boolean;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onProjectCreated,
  isDark,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: 'Full Stack' as 'Full Stack' | 'Frontend' | 'Backend' | 'AI & Cloud',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    techStack: 'React, Node.js, Express, MongoDB',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/developer/project',
    featured: false,
    stars: 12,
    highlights: 'Engineered sub-50ms REST endpoints\nDesigned reactive component architecture',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload: Project = {
        id: `proj_custom_${Date.now()}`,
        _id: `proj_custom_${Date.now()}`,
        title: formData.title,
        description: formData.description,
        longDescription: formData.longDescription,
        category: formData.category,
        image: formData.image,
        techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        featured: formData.featured,
        stars: Number(formData.stars) || 0,
        highlights: formData.highlights.split('\n').map(s => s.trim()).filter(Boolean),
        createdAt: new Date().toISOString(),
      };

      try {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            onProjectCreated(data.data);
            onClose();
            return;
          }
        }
      } catch {
        // Continue to static/local persistence
      }

      // Local storage fallback for GitHub Pages / static hosting
      try {
        const existing = JSON.parse(localStorage.getItem('portfolio_projects_custom') || '[]');
        localStorage.setItem('portfolio_projects_custom', JSON.stringify([payload, ...existing]));
      } catch {}

      onProjectCreated(payload);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error creating project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      id="new-project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="new-project-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0a0a0a] text-gray-200 shadow-2xl overflow-hidden my-8"
      >
        {/* Modal Top Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs">
              POST /api/projects
            </span>
            <div>
              <h3 className="text-sm font-bold text-white font-mono">
                ADD PROJECT RECORD
              </h3>
              <p className="text-[11px] text-gray-500 font-mono">
                Saves record directly to MongoDB / Mongoose collection
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto font-mono text-xs">
          {error && (
            <div className="p-3 rounded bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-gray-400 uppercase mb-1">
                PROJECT TITLE *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Nexus AI Gateway"
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 uppercase mb-1">
                CATEGORY *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:border-emerald-500 outline-none"
              >
                <option value="Full Stack">Full Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="AI & Cloud">AI & Cloud</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 uppercase mb-1">
              SHORT SUMMARY *
            </label>
            <input
              type="text"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="High-throughput message pipeline with distributed stream processing."
              className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 uppercase mb-1">
              TECH STACK (COMMA-SEPARATED) *
            </label>
            <input
              type="text"
              name="techStack"
              required
              value={formData.techStack}
              onChange={handleChange}
              placeholder="React 19, Express, MongoDB, TypeScript, Docker"
              className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-gray-400 uppercase mb-1">
                LIVE DEMO URL
              </label>
              <input
                type="url"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://nexus.dev"
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 uppercase mb-1">
                GITHUB REPOSITORY URL
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/developer/nexus"
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 uppercase mb-1">
              COVER IMAGE URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:border-emerald-500 outline-none text-[11px]"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="chk-featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="accent-emerald-500"
            />
            <label htmlFor="chk-featured" className="text-gray-300 text-xs cursor-pointer">
              Mark as Featured Project on Hero
            </label>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-xs text-gray-400 hover:text-white"
            >
              CANCEL
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded bg-emerald-500 text-black font-bold font-mono text-xs hover:bg-emerald-400 transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
            >
              {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <PlusCircle className="w-3.5 h-3.5" />}
              <span>POST TO MONGODB</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
