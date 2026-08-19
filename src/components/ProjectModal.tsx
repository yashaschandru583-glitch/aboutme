import React from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Terminal,
  Calendar,
  Star
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  isDark: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  isDark,
}) => {
  if (!project) return null;

  return (
    <div 
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="project-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0a0a0a] text-gray-200 shadow-2xl overflow-hidden my-8"
      >
        {/* Modal Top Header Image & Controls */}
        <div className="relative h-64 sm:h-72 w-full bg-black/80 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

          {/* Close button */}
          <button
            id="btn-close-project-modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Status Badges */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded text-xs font-mono bg-emerald-500 text-black font-bold">
                {project.category.toUpperCase()}
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 rounded text-xs font-mono bg-black/60 border border-white/10 text-emerald-400">
                  FEATURED WORK
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-xs font-mono text-gray-400 bg-black/60 border border-white/10 px-2.5 py-1 rounded">
              <Star className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              <span>{project.stars || 0} GITHUB STARS</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans mb-2">
              {project.title}
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Architectural Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-3">
              <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>ARCHITECTURAL_HIGHLIGHTS</span>
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 font-mono">
                    <span className="text-emerald-400 shrink-0 mt-0.5">→</span>
                    <span className="leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Matrix */}
          <div>
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-3">
              COMPONENTS & DEPENDENCIES
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  id="modal-link-live-demo"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-md bg-emerald-500 text-black font-bold font-mono text-xs hover:bg-emerald-400 transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LAUNCH DEMO</span>
                </a>
              )}

              {project.githubUrl && project.githubUrl !== '#' && (
                <a
                  id="modal-link-github-repo"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-md border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 font-mono text-xs transition-all flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>VIEW REPO</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-gray-400 hover:text-white"
            >
              CLOSE
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
