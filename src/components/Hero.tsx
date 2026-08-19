import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone,
  FileDown, 
  ArrowRight, 
  Server, 
  Database, 
  Camera,
  CheckCircle2
} from 'lucide-react';
import { developerProfile } from '../data/portfolioData';
import { ServerHealth } from '../types';

interface HeroProps {
  serverHealth: ServerHealth | null;
  currentPhoto: string;
  onOpenResume: () => void;
  onOpenUploadPhoto: () => void;
  isDark: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  serverHealth,
  currentPhoto,
  onOpenResume,
  onOpenUploadPhoto,
  isDark,
}) => {
  const [typedText, setTypedText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const titles = developerProfile.typingTitles;

  useEffect(() => {
    const currentTitle = titles[titleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentTitle.substring(0, typedText.length + 1));
        setTypingSpeed(90);

        if (typedText === currentTitle) {
          setTypingSpeed(1800);
          setIsDeleting(true);
        }
      } else {
        setTypedText(currentTitle.substring(0, typedText.length - 1));
        setTypingSpeed(45);

        if (typedText === '') {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
          setTypingSpeed(400);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, titleIndex, titles, typingSpeed]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const spotlightTech = ['TypeScript', 'React 19', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Docker', 'Next.js'];

  return (
    <section 
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 lg:px-10 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto w-full flex flex-col items-start text-left">
        
        {/* Top Header Row with Profile Photo & Availability */}
        <div className="flex flex-wrap items-center justify-between gap-4 w-full mb-6">
          
          <div className="flex items-center gap-4">
            {/* Interactive Profile Photo with Upload Trigger */}
            <div 
              id="hero-profile-avatar-container"
              onClick={onOpenUploadPhoto}
              className="relative group cursor-pointer"
              title="Click to update profile photo"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-lg shadow-emerald-500/10 bg-black/60 transition-transform group-hover:scale-105">
                <img
                  src={currentPhoto}
                  alt={developerProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hover overlay with camera icon */}
              <div className="absolute inset-0 bg-black/70 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span className="text-[9px] font-mono text-emerald-300 uppercase tracking-tighter mt-0.5">
                  EDIT
                </span>
              </div>

              <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 text-black rounded-lg shadow">
                <Camera className="w-2.5 h-2.5" />
              </div>
            </div>

            <div>
              <div 
                id="hero-availability-badge"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-1"
              >
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>AVAILABLE FOR HIRE</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-400">
                <span className="text-white font-bold">{developerProfile.name}</span>
                <span className="text-gray-600">•</span>
                <a 
                  href={`tel:${developerProfile.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-1 text-emerald-400 hover:underline"
                >
                  <Phone className="w-3 h-3" />
                  <span>{developerProfile.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick upload button */}
          <button
            id="btn-hero-change-photo"
            onClick={onOpenUploadPhoto}
            className="px-3 py-1.5 rounded-md text-xs font-mono border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>CHANGE PHOTO</span>
          </button>
        </div>

        {/* Hero Main Heading */}
        <h1 
          id="hero-main-title"
          className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tighter text-white mb-3"
        >
          Principal Full-Stack <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 underline decoration-emerald-500/30 underline-offset-8">
            Software Engineer
          </span>
        </h1>

        {/* Animated Typing Text Subtitle */}
        <div 
          id="hero-animated-typing"
          className="h-10 sm:h-12 flex items-center mb-4"
        >
          <div className="font-mono text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 text-emerald-400">
            <span className="text-gray-600 select-none">&gt;</span>
            <span>{typedText}</span>
            <span className="inline-block w-2 h-6 bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Tagline / Value Proposition */}
        <p 
          id="hero-tagline"
          className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-6 font-normal"
        >
          High-performance architectural solutions for modern web applications. 
          Specialized in scalable Express + MongoDB distributed backends and reactive React user interfaces.
        </p>

        {/* Tech Stack Spotlight Badges */}
        <div className="mb-8 w-full">
          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold font-mono mb-2.5">
            Tech Stack Spotlight
          </div>
          <div className="flex flex-wrap gap-2">
            {spotlightTech.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-gray-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons & Socials */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-10">
          
          <button
            id="btn-hero-contact-cta"
            onClick={scrollToContact}
            className="bg-emerald-500 text-black font-bold font-mono text-xs sm:text-sm px-8 py-3.5 rounded-md hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="btn-hero-download-resume"
            onClick={onOpenResume}
            className="px-6 py-3.5 border border-white/10 rounded-md text-xs sm:text-sm font-mono text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-emerald-400" />
            <span>RESUME.PDF</span>
          </button>

          {/* Direct phone call button */}
          <a
            id="btn-hero-call-phone"
            href={`tel:${developerProfile.phone.replace(/\s+/g, '')}`}
            className="px-4 py-3.5 border border-white/10 rounded-md text-xs font-mono text-emerald-400 hover:text-emerald-300 hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer"
            title="Call Phone"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{developerProfile.phone}</span>
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
            <a
              id="social-link-github"
              href={developerProfile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-white hover:border-white/20 transition-all text-xs font-mono"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              id="social-link-linkedin"
              href={developerProfile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-emerald-400 hover:border-emerald-500/30 transition-all text-xs font-mono"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              id="social-link-twitter"
              href={developerProfile.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-sky-400 hover:border-sky-500/30 transition-all text-xs font-mono"
              title="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <a
              id="social-link-email"
              href={developerProfile.socials.email}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-emerald-400 hover:border-emerald-500/30 transition-all text-xs font-mono"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Live Architecture Status Pill */}
        <div 
          id="hero-tech-status-banner"
          className="w-full max-w-2xl p-3.5 rounded-xl border border-white/5 bg-white/[0.03] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-gray-400"
        >
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span className="text-gray-300">REST API:</span>
            <span>Express v4</span>
            <span className="text-gray-600">•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
              {serverHealth?.status || 'Online'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span className="text-gray-300">Database:</span>
            <span className="text-emerald-400">
              {serverHealth?.databaseMode === 'mongodb' 
                ? 'MongoDB Atlas (Cluster)' 
                : 'Mongoose Engine (Active)'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
