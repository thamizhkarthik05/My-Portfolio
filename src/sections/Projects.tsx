import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionHeading, GeometricBadge } from '../components/UI';
import { portfolioData } from '../data/portfolio';
import { ExternalLink, Layers, Sparkles } from 'lucide-react';
import { Github } from '../components/SocialIcons';

const STATUS_STYLES: Record<string, string> = {
  'In Development': 'text-cyan-vivid border-cyan-vivid/30 bg-cyan-vivid/10',
  Completed: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  'Research Prototype': 'text-violet-soft border-violet-electric/30 bg-violet-electric/15',
  Concept: 'text-slate-muted border-white/15 bg-white/5',
};

export function ProjectsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.06 });
  const { projects } = portfolioData;
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const toggleProjectCard = (id: string) => {
    setActiveProjectId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24"
      aria-label="Projects and software builds"
    >
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <SectionHeading
            label="Projects"
            title="Projects & Engineering Builds"
            subtitle="Explore my software products, AI applications, and frontend architectures. Hover or tap any project card to discover its technical architecture, problem statement, and source code."
          />
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {projects.map((project, idx: number) => {
            const isCardActive = activeProjectId === project.id;

            return (
              <article
                key={project.id}
                onClick={() => toggleProjectCard(project.id)}
                className={`group relative bg-[#151F38] border border-violet-electric/25 rounded-2xl overflow-hidden hover:border-cyan-vivid/50 hover:shadow-origami-lg transition-all duration-300 flex flex-col h-[490px] sm:h-[480px] cursor-pointer select-none focus-within:border-cyan-vivid/70 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 75 + 100}ms` }}
                aria-label={`${project.title} project card`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleProjectCard(project.id);
                  }
                }}
              >
                {/* ============================================================ */}
                {/* 1. DEFAULT STATE: Prominent Application Screenshot Header */}
                {/* ============================================================ */}
                <div className="relative h-56 sm:h-52 w-full bg-[#080D1A] overflow-hidden border-b border-violet-electric/20 shrink-0">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={`${project.title} application screenshot`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0F172E] to-[#070B16]">
                      <Layers className="w-10 h-10 text-cyan-vivid mb-2 opacity-80" aria-hidden="true" />
                      <span className="font-heading text-sm font-semibold text-warm-white">
                        {project.title}
                      </span>
                      <span className="text-[11px] font-mono text-cyan-300/80 mt-1">
                        Architecture & Analytics Repo
                      </span>
                    </div>
                  )}

                  {/* Gradient shadow for contrast */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#151F38] via-transparent to-black/30 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Category Badge — Top Left */}
                  <div className="absolute top-3 left-3 z-10">
                    <GeometricBadge variant="cyan">{project.category}</GeometricBadge>
                  </div>

                  {/* Status / Github Badge — Top Right */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                    {project.status && (
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-sm ${
                          STATUS_STYLES[project.status] ?? STATUS_STYLES.Completed
                        }`}
                      >
                        {project.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* ============================================================ */}
                {/* 2. DEFAULT STATE: Project Body */}
                {/* ============================================================ */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-warm-white leading-snug mb-2 group-hover:text-cyan-vivid transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Technology Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono font-medium text-slate-300 bg-midnight-secondary px-2.5 py-1 rounded border border-violet-electric/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[10px] font-mono font-medium text-cyan-vivid bg-cyan-vivid/10 px-2 py-1 rounded border border-cyan-vivid/20">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="pt-3 border-t border-violet-electric/15 flex items-center justify-between text-xs font-mono text-cyan-vivid">
                      <span className="flex items-center gap-1 text-[11px] text-slate-muted group-hover:text-cyan-vivid transition-colors">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-vivid shrink-0" aria-hidden="true" />
                        <span>Hover / Tap to view details</span>
                      </span>
                      {project.githubUrl && (
                        <span className="flex items-center gap-1 font-semibold text-slate-300 group-hover:text-warm-white">
                          <Github size={13} />
                          <span>Code</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ============================================================ */}
                {/* 3. HOVER / TAP STATE: Detailed Description Overlay */}
                {/* Reveals smoothly on desktop hover, mobile tap, or focus */}
                {/* ============================================================ */}
                <div
                  className={`absolute inset-0 z-20 bg-[#0A1020]/95 backdrop-blur-md p-6 flex flex-col justify-between border-2 border-cyan-400/80 shadow-[0_0_35px_rgba(57,217,245,0.25)] transition-all duration-300 ${
                    isCardActive
                      ? 'opacity-100 pointer-events-auto translate-y-0'
                      : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto translate-y-2 group-hover:translate-y-0'
                  }`}
                  aria-hidden={!isCardActive}
                >
                  <div className="overflow-y-auto pr-1">
                    {/* Top Row: Category + Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <GeometricBadge variant="cyan">{project.category}</GeometricBadge>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          STATUS_STYLES[project.status] ?? STATUS_STYLES.Completed
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-xl font-bold text-white mb-2 leading-tight">
                      {project.title}
                    </h3>

                    {/* Complete Description */}
                    <div className="mb-4">
                      <p className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-1.5">
                        Problem & Functionality
                      </p>
                      <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Full Technology Stack */}
                    <div className="mb-4">
                      <p className="text-xs font-mono font-semibold uppercase tracking-wider text-violet-soft mb-1.5">
                        Technologies & Tools
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono font-semibold text-cyan-200 bg-[#152244] border border-cyan-400/30 px-2.5 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-violet-electric/30 flex items-center gap-3 shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-mono text-xs font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-vivid"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <Github size={15} />
                        <span>View on GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-90" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
