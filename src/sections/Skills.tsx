import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionHeading } from '../components/UI';
import { portfolioData } from '../data/portfolio';
import { Code2, Layout, BrainCircuit, Cloud, Cpu, Sparkles, Layers } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5" aria-hidden="true" />,
  Layout: <Layout className="w-5 h-5" aria-hidden="true" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5" aria-hidden="true" />,
  Cloud: <Cloud className="w-5 h-5" aria-hidden="true" />,
  Cpu: <Cpu className="w-5 h-5" aria-hidden="true" />,
  Sparkles: <Sparkles className="w-5 h-5" aria-hidden="true" />,
};

export function SkillsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.08 });
  const [activeCategory, setActiveCategory] = useState<string>(portfolioData.skills[0]?.id ?? '');
  const { skills } = portfolioData;

  const activeSkill = skills.find((s) => s.id === activeCategory);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24"
      aria-label="Technical skills and creative toolkit"
    >
      <div className="max-w-screen-xl mx-auto px-5 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <SectionHeading
            label="Skills"
            title="My Creative Toolkit"
            subtitle="An interconnected matrix of languages, architectures, distributed tools, and communication disciplines honed across real-world projects and research."
          />
        </div>

        {/* Category Navigation Pills */}
        <div
          className={`flex flex-wrap items-center gap-2.5 mb-10 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          role="tablist"
          aria-label="Skill domain categories"
        >
          {skills.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`skill-panel-${cat.id}`}
                id={`skill-tab-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-vivid cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-electric to-violet-electric/80 text-warm-white border border-cyan-vivid/50 shadow-glow-violet scale-[1.02]'
                    : 'bg-[#151F38] border border-violet-electric/20 text-slate-muted hover:border-violet-electric/40 hover:text-warm-white'
                }`}
              >
                <span className={isActive ? 'text-cyan-vivid' : 'text-violet-electric'}>
                  {ICON_MAP[cat.iconName]}
                </span>
                <span>{cat.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-vivid/60 ml-1" />
              </button>
            );
          })}
        </div>

        {/* Selected Skill Category Showcase */}
        {activeSkill && (
          <div
            id={`skill-panel-${activeCategory}`}
            role="tabpanel"
            aria-labelledby={`skill-tab-${activeCategory}`}
            className={`bg-[#151F38] border border-violet-electric/25 rounded-3xl p-6 sm:p-10 shadow-origami-md transition-all duration-500 relative overflow-hidden ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Origami Crease Background Line */}
            <div
              className="absolute -right-10 -bottom-10 w-80 h-80 opacity-5 pointer-events-none select-none"
              aria-hidden="true"
            >
              <svg viewBox="0 0 200 200" fill="none">
                <polygon points="100,0 200,100 100,200 0,100" stroke="#39D9F5" strokeWidth="2" />
                <line x1="0" y1="0" x2="200" y2="200" stroke="#8B6CFF" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-violet-electric/15">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-midnight-secondary border border-violet-electric/30 text-cyan-vivid shadow-origami-sm">
                  {ICON_MAP[activeSkill.iconName]}
                </div>
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-semibold text-warm-white">
                    {activeSkill.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-muted mt-1 max-w-xl">
                    {activeSkill.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center font-mono text-xs text-cyan-vivid bg-cyan-vivid/10 border border-cyan-vivid/25 px-3 py-1.5 rounded-lg">
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{activeSkill.skills.length} Capabilities</span>
              </div>
            </div>

            {/* Origami Skill Tiles Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {activeSkill.skills.map((skill, idx) => (
                <div
                  key={skill.name}
                  className={`group relative p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] flex items-center justify-between gap-3 ${
                    skill.highlight
                      ? 'bg-midnight-secondary border-cyan-vivid/30 hover:border-cyan-vivid/60 shadow-origami-sm'
                      : 'bg-midnight-secondary/60 border-violet-electric/15 hover:border-violet-electric/40'
                  }`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                    transition: `opacity 0.5s ease-out ${idx * 45}ms, transform 0.5s ease-out ${idx * 45}ms, border-color 0.2s, background-color 0.2s`,
                  }}
                >
                  {/* Subtle top crease corner */}
                  <div
                    className="absolute top-0 right-0 w-3 h-3 border-t border-r border-violet-electric/30 rounded-tr-lg pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-2 h-2 rounded-sm rotate-45 shrink-0 transition-transform group-hover:scale-125 ${
                        skill.highlight ? 'bg-cyan-vivid shadow-glow-cyan' : 'bg-violet-electric/60'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-warm-white group-hover:text-cyan-vivid transition-colors truncate">
                      {skill.name}
                    </span>
                  </div>

                  {skill.highlight && (
                    <span className="shrink-0 text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-vivid bg-cyan-vivid/10 border border-cyan-vivid/25 px-2 py-0.5 rounded">
                      Core
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
