import React, { useState } from 'react';
import { 
  X, 
  FileDown, 
  Copy, 
  Check, 
  Printer, 
  ExternalLink, 
  Mail, 
  Phone,
  MapPin, 
  Github, 
  Linkedin,
  Briefcase,
  GraduationCap,
  Layers,
  Award,
  Terminal
} from 'lucide-react';
import { developerProfile, experienceData, skillsData } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  isDark,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyMarkdown = () => {
    const text = `# ${developerProfile.name}
**${developerProfile.title}**
Email: ${developerProfile.email} | Phone: ${developerProfile.phone} | Location: ${developerProfile.location}

## Professional Summary
${developerProfile.bio}

## Work Experience
${experienceData.map(e => `
### ${e.role} — ${e.company} (${e.period})
${e.description}
Achievements:
${e.achievements.map(a => `- ${a}`).join('\n')}
Tech: ${e.technologies.join(', ')}
`).join('\n')}

## Technical Competencies
- Frontend: React 19, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express, REST APIs, Microservices, MongoDB
- Databases: MongoDB, Mongoose, PostgreSQL, Prisma, Redis
- DevOps: Docker, Vercel, Render, GitHub Actions CI/CD
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="resume-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0a0a0a] text-gray-200 shadow-2xl overflow-hidden my-8"
      >
        {/* Modal Controls Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-4 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs">
              RESUME.MD
            </span>
            <div>
              <h3 className="text-sm font-bold text-white font-mono">
                {developerProfile.name.toUpperCase()} // CV
              </h3>
              <p className="text-[11px] text-gray-500 font-mono">
                Principal Full-Stack Engineer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-copy-resume"
              onClick={handleCopyMarkdown}
              className={`px-3 py-1.5 rounded text-xs font-mono border flex items-center gap-1.5 transition-all ${
                copied 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'MARKDOWN'}</span>
            </button>

            <button
              id="btn-print-resume"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded text-xs font-mono font-bold bg-emerald-500 text-black hover:bg-emerald-400 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / PDF</span>
            </button>

            <button
              id="btn-close-resume-modal"
              onClick={onClose}
              className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Body */}
        <div className="p-6 sm:p-10 space-y-8 max-h-[75vh] overflow-y-auto print:max-h-none print:overflow-visible font-mono text-xs">
          
          {/* Header info */}
          <div className="border-b border-white/10 pb-6 font-sans">
            <h1 className="text-3xl font-extrabold text-white mb-1">
              {developerProfile.name}
            </h1>
            <p className="text-sm font-semibold text-emerald-400 font-mono mb-3">
              {developerProfile.title}
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> {developerProfile.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> {developerProfile.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {developerProfile.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-gray-300" /> github.com/developer
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-blue-400" /> linkedin.com/in/developer
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              // EXECUTIVE SUMMARY
            </h2>
            <p className="text-xs font-sans text-gray-300 leading-relaxed">
              {developerProfile.bio} Proven track record taking greenfield cloud initiatives to production, leading cross-functional engineering teams, and optimizing high-volume database aggregation pipelines.
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>// PROFESSIONAL EXPERIENCE</span>
            </h2>

            <div className="space-y-6">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div className="font-bold text-sm text-white font-sans">
                      {exp.role} <span className="text-emerald-400 font-mono">@ {exp.company}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      {exp.period} | {exp.location}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 font-sans">{exp.description}</p>

                  <ul className="space-y-1 text-xs text-gray-300">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <span className="text-emerald-400">→</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-[11px] text-gray-500">
                    <span className="font-semibold text-gray-400">Technologies: </span>
                    {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical Stack */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>// TECHNICAL MATRIX</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                <span className="font-bold text-white block mb-1">Frontend:</span>
                <span className="text-gray-400">React 19, Next.js, TypeScript, Tailwind CSS, Web Vitals</span>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                <span className="font-bold text-white block mb-1">Backend:</span>
                <span className="text-gray-400">Node.js, Express, REST APIs, Microservices, WebSockets</span>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                <span className="font-bold text-white block mb-1">Databases:</span>
                <span className="text-gray-400">MongoDB, Mongoose, PostgreSQL, Prisma, Redis</span>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                <span className="font-bold text-white block mb-1">DevOps & Cloud:</span>
                <span className="text-gray-400">Docker, GitHub Actions, Vercel, Render, GCP</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
