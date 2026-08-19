import React, { useState, useEffect } from 'react';
import { 
  Search, 
  PlusCircle, 
  RefreshCw, 
  Database,
  FolderGit2
} from 'lucide-react';
import { Project, ServerHealth } from '../types';
import { fallbackProjects } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { NewProjectModal } from './NewProjectModal';

interface ProjectsGalleryProps {
  serverHealth: ServerHealth | null;
  isDark: boolean;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  serverHealth,
  isDark,
  onShowToast,
}) => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'AI & Cloud'];

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProjects(data.data);
      } else {
        setProjects(fallbackProjects);
      }
    } catch (err) {
      // Graceful fallback for static hosting (GitHub Pages / Vercel static)
      console.warn('API fetch unavailable; using embedded portfolio catalog:', err);
      try {
        const stored = localStorage.getItem('portfolio_projects_custom');
        if (stored) {
          const custom = JSON.parse(stored);
          if (Array.isArray(custom) && custom.length > 0) {
            setProjects([...custom, ...fallbackProjects]);
            return;
          }
        }
      } catch {}
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleResetSeed = async () => {
    setIsResetting(true);
    try {
      const res = await fetch('/api/projects/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
        onShowToast('Database reset to official Mongoose seed catalog!', 'success');
      }
    } catch (err) {
      onShowToast('Error resetting projects catalog', 'error');
    } finally {
      setIsResetting(false);
    }
  };

  const handleProjectCreated = (newProj: Project) => {
    setProjects((prev) => [newProj, ...prev]);
    onShowToast(`Project "${newProj.title}" saved to MongoDB!`, 'success');
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const term = searchQuery.toLowerCase().trim();
    const matchesSearch = !term || 
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.techStack.some((t) => t.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });

  return (
    <section 
      id="projects" 
      className="py-20 px-4 sm:px-8 lg:px-10 border-t border-white/5 bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1.5">
              04. // FEATURED REPOSITORIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Projects & Case Studies
            </h2>
          </div>
          <span className="text-xs font-mono text-gray-500 hidden sm:inline">
            VIEW ALL ({projects.length})
          </span>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`project-category-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Search + Action CTA */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                id="project-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH PROJECT..."
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 pl-9 text-xs font-mono focus:border-emerald-500 outline-none text-white placeholder-gray-600 transition-colors"
              />
            </div>

            <button
              id="btn-gallery-add-project"
              onClick={() => setIsNewModalOpen(true)}
              className="px-3 py-2 rounded-md text-xs font-mono font-bold bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ POST</span>
            </button>

            <button
              id="btn-gallery-reset-seed"
              onClick={handleResetSeed}
              disabled={isResetting}
              className="p-2 rounded-md border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              title="Reset seed data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
          </div>

        </div>

        {/* Projects Grid Display */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="h-64 rounded-xl animate-pulse bg-white/5 border border-white/10"
              />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id || project._id}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
                isDark={isDark}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-xl border border-dashed border-white/10 bg-white/5 text-gray-400 font-mono text-xs">
            <FolderGit2 className="w-8 h-8 mx-auto text-gray-600 mb-2" />
            <p className="mb-3">NO PROJECTS MATCHING QUERY</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-4 py-1.5 rounded bg-white/10 text-white hover:bg-white/20"
            >
              RESET FILTERS
            </button>
          </div>
        )}

        {/* Database Status Tagline */}
        <div className="mt-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border border-white/5 bg-white/[0.03] text-gray-400">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>SERVING {filteredProjects.length} RECORDS FROM REST API</span>
          </div>
        </div>

      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        isDark={isDark}
      />

      <NewProjectModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onProjectCreated={handleProjectCreated}
        isDark={isDark}
      />
    </section>
  );
};
