import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  BookOpen, 
  PlusCircle, 
  Sun, 
  Moon, 
  FileText,
  Sparkles,
  Camera
} from 'lucide-react';
import { ServerHealth } from '../types';

interface NavbarProps {
  serverHealth: ServerHealth | null;
  currentPhoto: string;
  onOpenGuide: () => void;
  onOpenNewProject: () => void;
  onOpenResume: () => void;
  onOpenUploadPhoto: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  serverHealth,
  currentPhoto,
  onOpenGuide,
  onOpenNewProject,
  onOpenResume,
  onOpenUploadPhoto,
  isDark,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { num: '01', name: 'HOME', id: 'hero' },
    { num: '02', name: 'ABOUT', id: 'about' },
    { num: '03', name: 'SKILLS', id: 'skills' },
    { num: '04', name: 'PROJECTS', id: 'projects' },
    { num: '05', name: 'CONTACT', id: 'contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 py-3.5 shadow-2xl'
          : 'bg-[#0a0a0a]/60 backdrop-blur-sm border-b border-white/[0.03] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          
          {/* Brand / Logo */}
          <div 
            id="brand-logo"
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-black font-mono text-base transition-transform group-hover:scale-105 shadow-md shadow-emerald-500/20">
              Y
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tight text-white font-mono">
                YASHAS.DEV
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ACTIVE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => scrollToSection(link.id)}
                  className={`transition-colors duration-200 flex items-center gap-1 cursor-pointer ${
                    isActive
                      ? 'text-emerald-400 font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-gray-500">{link.num}. //</span>
                  <span>{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Controls */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Guide Button */}
            <button
              id="btn-nav-architecture-guide"
              onClick={onOpenGuide}
              className="px-3 py-1.5 rounded-md text-xs font-mono border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5"
              title="View Architecture & Setup Documentation"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>DOCS.API</span>
            </button>

            {/* Resume Button */}
            <button
              id="btn-nav-resume"
              onClick={onOpenResume}
              className="px-3.5 py-1.5 border border-white/10 rounded-md text-xs font-mono text-gray-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>RESUME.PDF</span>
            </button>

            {/* Quick Add Project Button */}
            <button
              id="btn-nav-new-project"
              onClick={onOpenNewProject}
              className="px-3 py-1.5 rounded-md text-xs font-mono border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ PROJECT</span>
            </button>

            {/* Profile Photo Avatar Trigger */}
            <button
              id="btn-nav-upload-photo"
              onClick={onOpenUploadPhoto}
              className="relative group p-0.5 rounded-lg border border-white/10 hover:border-emerald-500/50 transition-colors cursor-pointer"
              title="Change Profile Photo"
            >
              <div className="w-7 h-7 rounded-md overflow-hidden bg-black/60">
                <img
                  src={currentPhoto}
                  alt="Profile"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 p-0.5 bg-emerald-500 text-black rounded text-[8px]">
                <Camera className="w-2 h-2" />
              </div>
            </button>

            {/* Theme Toggle Pill */}
            <button
              id="btn-toggle-theme"
              onClick={onToggleTheme}
              className="w-10 h-6 bg-white/5 border border-white/10 rounded-full relative p-0.5 flex items-center cursor-pointer transition-colors hover:border-white/20"
              aria-label="Toggle visual theme"
              title="Toggle Theme"
            >
              <div className={`w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center text-[10px] ${
                isDark 
                  ? 'bg-emerald-500 text-black translate-x-4' 
                  : 'bg-white text-black translate-x-0.5'
              }`}>
                {isDark ? '☾' : '☼'}
              </div>
            </button>

            {/* Start a project / Contact CTA */}
            <button
              id="btn-nav-contact-cta"
              onClick={() => scrollToSection('contact')}
              className="bg-emerald-500 text-black font-bold font-mono text-xs px-4 py-2 rounded-md hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
            >
              START A PROJECT
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-white/10 text-gray-300 bg-[#0a0a0a]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-drawer"
            className="md:hidden mt-3 p-5 rounded-2xl border border-white/10 bg-[#0a0a0a]/95 text-gray-200 backdrop-blur-xl flex flex-col gap-3 shadow-2xl"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => scrollToSection(link.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs font-mono font-medium transition-colors ${
                    isActive ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-white/5 text-gray-400'
                  }`}
                >
                  <span className="text-gray-500">{link.num}. //</span>
                  <span>{link.name}</span>
                </button>
              );
            })}

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                id="btn-mobile-guide"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGuide();
                }}
                className="w-full py-2 px-3 rounded-md text-xs font-mono border border-white/10 text-gray-300 hover:bg-white/5 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>ARCHITECTURE DOCS</span>
              </button>

              <button
                id="btn-mobile-resume"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2 px-3 rounded-md text-xs font-mono border border-white/10 text-gray-300 hover:bg-white/5 flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>RESUME.PDF</span>
              </button>

              <button
                id="btn-mobile-new-project"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNewProject();
                }}
                className="w-full py-2 px-3 rounded-md text-xs font-mono border border-white/10 text-gray-300 hover:bg-white/5 flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                <span>+ ADD PROJECT</span>
              </button>

              <button
                id="btn-mobile-contact"
                onClick={() => scrollToSection('contact')}
                className="w-full py-2.5 px-4 rounded-md text-xs font-bold font-mono bg-emerald-500 text-black hover:bg-emerald-400 flex items-center justify-center gap-2"
              >
                START A PROJECT
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
