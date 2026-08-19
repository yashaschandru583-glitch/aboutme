import React, { useState } from 'react';
import { 
  ExternalLink, 
  Github, 
  Star, 
  ArrowRight
} from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  isDark: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  isDark,
}) => {
  const [imgError, setImgError] = useState(false);
  const [localStars, setLocalStars] = useState(project.stars || 0);
  const [hasStarred, setHasStarred] = useState(false);

  const handleStar = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasStarred) {
      setLocalStars(prev => prev + 1);
      setHasStarred(true);
    } else {
      setLocalStars(prev => prev - 1);
      setHasStarred(false);
    }
  };

  return (
    <div
      id={`project-card-${project.id || project._id}`}
      onClick={() => onSelect(project)}
      className="group relative p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/[0.08] transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top bar with category & star */}
        <div className="flex justify-between items-start mb-3">
          <span className="text-[11px] font-mono text-gray-500 uppercase">
            // {project.category}
          </span>

          <div className="flex items-center gap-2">
            <button
              id={`btn-star-project-${project.id || project._id}`}
              onClick={handleStar}
              className={`px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1 border transition-all ${
                hasStarred
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-black/40 border-white/10 text-gray-400 hover:text-emerald-400'
              }`}
            >
              <Star className={`w-3 h-3 ${hasStarred ? 'fill-emerald-400 text-emerald-400' : ''}`} />
              <span>{localStars}</span>
            </button>
            <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* Optional Thumbnail preview */}
        <div className="h-36 w-full rounded-lg overflow-hidden mb-3 bg-black/60 border border-white/5 relative">
          <img
            src={imgError ? "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" : project.image}
            alt={project.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          />
          {project.featured && (
            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded">
              FEATURED
            </div>
          )}
        </div>

        {/* Title */}
        <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-1.5 font-sans">
          {project.title}
        </h4>

        {/* Description */}
        <p className="text-xs text-gray-400 line-clamp-2 mb-3.5 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-black/40 border border-white/10 rounded text-[10px] font-mono text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
        <span className="text-emerald-400 text-[11px] group-hover:underline">
          SPECS.VIEW
        </span>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              id={`btn-live-demo-${project.id || project._id}`}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Live Demo"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              id={`btn-github-repo-${project.id || project._id}`}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              title="GitHub Repo"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
