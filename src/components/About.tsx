import React from 'react';
import { 
  User, 
  Briefcase, 
  Award, 
  GraduationCap, 
  MapPin, 
  CheckCircle2, 
  Zap,
  Terminal
} from 'lucide-react';
import { developerProfile, experienceData } from '../data/portfolioData';

interface AboutProps {
  isDark: boolean;
}

export const About: React.FC<AboutProps> = ({ isDark }) => {
  return (
    <section 
      id="about" 
      className="py-20 px-4 sm:px-8 lg:px-10 border-t border-white/5 bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
            02. // BACKGROUND & METRICS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Architecture & Engineering Mindset
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-2 font-normal">
            8+ years architecting scalable microservices, resilient MongoDB schemas, and developer-first web platforms.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {developerProfile.metrics.map((metric, idx) => (
            <div
              key={idx}
              id={`metric-card-${idx}`}
              className="p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/[0.08] transition-all"
            >
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400 font-mono mb-1">
                {metric.value}
              </div>
              <div className="font-semibold text-xs text-white uppercase tracking-wider mb-0.5">
                {metric.label}
              </div>
              <div className="text-[11px] text-gray-500 font-mono">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout: Bio + Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          
          {/* Left Column: Bio & Core Tenets */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-base font-bold font-mono text-white mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>PRINCIPAL_PHILOSOPHY.MD</span>
              </h3>
              
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {developerProfile.bio}
              </p>

              <p className="text-xs text-gray-400 leading-relaxed mb-6 font-mono">
                &ldquo;Simplicity is prerequisite for reliability. Build systems that are easy to observe, straightforward to debug, and resilient by design.&rdquo;
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white font-mono">API Idempotency</div>
                    <div className="text-[11px] text-gray-500">Atomic transactional workflows</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white font-mono">Schema Safety</div>
                    <div className="text-[11px] text-gray-500">Strict Mongoose validation</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white font-mono">High Observability</div>
                    <div className="text-[11px] text-gray-500">Distributed logs & APM tracing</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white font-mono">Core Web Vitals</div>
                    <div className="text-[11px] text-gray-500">Sub-100ms INP & zero CLS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Location & Quick Specs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-4 text-emerald-400 flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>SYSTEM_SPECS</span>
              </h4>

              <div className="space-y-3.5 text-xs font-mono">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-gray-500 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> LOCATION
                  </span>
                  <span className="text-white">
                    {developerProfile.location}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" /> DIRECT_PHONE
                  </span>
                  <a 
                    href={`tel:${developerProfile.phone.replace(/\s+/g, '')}`}
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    {developerProfile.phone}
                  </a>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5" /> FOCUS
                  </span>
                  <span className="text-emerald-400">
                    Full-Stack & Cloud Architecture
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-gray-500 flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5" /> DEGREE
                  </span>
                  <span className="text-white">
                    B.S. in Computer Science
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" /> PRIMARY_DB
                  </span>
                  <span className="text-emerald-400 font-bold">
                    MongoDB & PostgreSQL
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Experience Timeline */}
        <div className="mt-8">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-4">
            CAREER TIMELINE & DELIVERABLES
          </div>

          <div className="space-y-4">
            {experienceData.map((item, idx) => (
              <div 
                key={idx}
                id={`experience-item-${idx}`}
                className="p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/[0.08] transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {item.role} <span className="text-emerald-400 font-normal">@ {item.company}</span>
                    </h4>
                    <div className="text-xs text-gray-500 font-mono">
                      {item.location}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                    {item.period}
                  </span>
                </div>

                <p className="text-xs text-gray-400 mb-3">
                  {item.description}
                </p>

                <ul className="space-y-1 mb-3 font-mono">
                  {item.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="text-xs text-gray-300 flex items-start gap-2">
                      <span className="text-emerald-400">→</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {item.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/40 text-gray-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
