import React from 'react';
import { 
  ArrowUp, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone,
  Server, 
  Database,
  Terminal,
  BookOpen,
  FileText
} from 'lucide-react';
import { developerProfile } from '../data/portfolioData';
import { ServerHealth } from '../types';

interface FooterProps {
  serverHealth: ServerHealth | null;
  onOpenGuide: () => void;
  onOpenResume: () => void;
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  serverHealth,
  onOpenGuide,
  onOpenResume,
  isDark,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="main-footer"
      className="border-t border-white/5 bg-[#0a0a0a] text-gray-400 font-mono text-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center font-bold text-black text-xs font-mono">
                Y
              </div>
              <span className="font-bold text-sm text-white tracking-tight">
                {developerProfile.name.toUpperCase()} // PORTFOLIO
              </span>
            </div>

            <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-sm">
              Principal Full-Stack Engineer crafting resilient microservices, Mongoose models, and React applications.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] text-emerald-400">
                SYSTEM STATUS: ONLINE (MONGODB READY)
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              NAVIGATION
            </div>
            <ul className="space-y-1.5 text-xs text-gray-500">
              <li>
                <a href="#hero" className="hover:text-emerald-400 transition-colors">01. // HOME</a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">02. // ABOUT</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-emerald-400 transition-colors">03. // SKILLS</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-emerald-400 transition-colors">04. // PROJECTS</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors">05. // CONTACT</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Telemetry */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              RESOURCES & CODE
            </div>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={onOpenGuide}
                className="block text-left text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                → Architecture Blueprint (Docs)
              </button>
              <button
                onClick={onOpenResume}
                className="block text-left text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                → Download Resume (PDF/Print)
              </button>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 pt-3">
              <a
                href={developerProfile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded border border-white/10 flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-white"
                title="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href={developerProfile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded border border-white/10 flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-emerald-400"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href={developerProfile.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded border border-white/10 flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-sky-400"
                title="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href={developerProfile.socials.email}
                className="w-8 h-8 rounded border border-white/10 flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-emerald-400"
                title="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
              <a
                href={`tel:${developerProfile.phone.replace(/\s+/g, '')}`}
                className="w-8 h-8 rounded border border-white/10 flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-emerald-400"
                title={`Call ${developerProfile.phone}`}
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Telemetry Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-600">
          <div>
            &copy; {new Date().getFullYear()} {developerProfile.name.toUpperCase()} // ALL RIGHTS RESERVED
          </div>

          <div className="flex items-center gap-6">
            <span>LOC: {developerProfile.location.toUpperCase()}</span>
            <span>STACK: REACT 19 / EXPRESS / MONGO</span>
            <button
              id="btn-footer-scroll-top"
              onClick={scrollToTop}
              className="p-1.5 rounded border border-white/10 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
