import React, { useState } from 'react';
import { 
  Layers, 
  Layout, 
  Server, 
  Database, 
  Cloud, 
  Search
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { SkillItem } from '../types';

interface SkillsGridProps {
  isDark: boolean;
}

export const SkillsGrid: React.FC<SkillsGridProps> = ({ isDark }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['All', 'Frontend Engineering', 'Backend & Microservices', 'Databases & Data Modeling', 'DevOps, Cloud & Tooling'];

  const filteredCategories = skillsData.map((cat) => {
    const matchingSkills = cat.skills.filter((skill) => {
      const matchesSearch = 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.popularFor.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    return {
      ...cat,
      skills: matchingSkills,
    };
  }).filter((cat) => {
    if (selectedCategory === 'All') return cat.skills.length > 0;
    return cat.title === selectedCategory && cat.skills.length > 0;
  });

  return (
    <section 
      id="skills" 
      className="py-20 px-4 sm:px-8 lg:px-10 border-t border-white/5 bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
            03. // PRODUCTION CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Tech Stack & Skills Matrix
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-2 font-normal">
            Categorized competency breakdown spanning frontend interfaces, backend engines, and cloud pipelines.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const shortName = cat === 'Frontend Engineering' 
                ? 'FRONTEND' 
                : cat === 'Backend & Microservices' 
                ? 'BACKEND' 
                : cat === 'Databases & Data Modeling' 
                ? 'DATABASES' 
                : cat === 'DevOps, Cloud & Tooling' 
                ? 'DEVOPS / TOOLS' 
                : 'ALL SKILLS';

              return (
                <button
                  key={cat}
                  id={`skill-category-tab-${shortName.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {shortName}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="skill-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH SKILL..."
              className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 pl-9 text-xs font-mono focus:border-emerald-500 outline-none text-white placeholder-gray-600 transition-colors"
            />
          </div>

        </div>

        {/* Categories & Skills Display */}
        <div className="space-y-8">
          {filteredCategories.map((category, catIdx) => (
            <div 
              key={catIdx}
              id={`skill-category-section-${catIdx}`}
              className="space-y-3"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-mono text-xs">
                    // {category.title.toUpperCase()}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-gray-500">
                  {category.skills.length} COMPETENCIES
                </span>
              </div>

              {/* Skills Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.skills.map((skill: SkillItem, sIdx: number) => (
                  <div
                    key={sIdx}
                    id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/[0.08] transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-white group-hover:text-emerald-400 transition-colors font-mono">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono mb-2.5">
                      <span>{skill.popularFor}</span>
                      <span className="text-gray-500">{skill.experience}</span>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-400 transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10 text-gray-500 font-mono text-xs">
              <p>NO SKILLS MATCHING &ldquo;{searchTerm.toUpperCase()}&rdquo;</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="mt-2 text-emerald-400 hover:underline font-bold"
              >
                RESET FILTERS
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
