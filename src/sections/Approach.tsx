import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionHeading } from '../components/UI';
import { portfolioData } from '../data/portfolio';
import { Compass, Lightbulb, Target, RefreshCw, Users2, ArrowRight } from 'lucide-react';

const PRINCIPLE_ICONS = [
  <Compass className="w-5 h-5" aria-hidden="true" />,
  <Lightbulb className="w-5 h-5" aria-hidden="true" />,
  <Target className="w-5 h-5" aria-hidden="true" />,
  <RefreshCw className="w-5 h-5" aria-hidden="true" />,
  <Users2 className="w-5 h-5" aria-hidden="true" />,
];

export function ApproachSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.08 });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { principles } = portfolioData;

  return (
    <section
      id="approach"
      ref={ref}
      className="relative py-24"
      aria-label="Engineering approach and philosophy"
    >
      <div className="max-w-screen-xl mx-auto px-5 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <SectionHeading
            label="Approach"
            title="How I Make Things Happen"
            subtitle="Five foundational principles that guide my approach to solving complex problems, building robust systems, and collaborating with cross-functional teams."
          />
        </div>

        {/* Connected Geometric Origami Sequence */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {principles.map((p, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={p.number}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative bg-[#151F38] border rounded-2xl p-7 transition-all duration-300 hover:shadow-origami-md hover:scale-[1.02] flex flex-col justify-between group overflow-hidden ${
                  isHovered
                    ? 'border-cyan-vivid/50 shadow-glow-violet'
                    : 'border-violet-electric/20 hover:border-violet-electric/40'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 100 + 100}ms` }}
              >
                {/* Origami corner fold facet */}
                <div
                  className="absolute top-0 right-0 w-12 h-12 transition-opacity duration-300 pointer-events-none"
                  style={{
                    clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                    background: isHovered
                      ? 'linear-gradient(135deg, #8B6CFF, #39D9F5)'
                      : 'linear-gradient(135deg, rgba(139, 108, 255, 0.4), rgba(57, 217, 245, 0.2))',
                  }}
                  aria-hidden="true"
                />

                {/* Top Section with Number and Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-midnight-secondary border border-violet-electric/25 text-cyan-vivid shadow-origami-sm">
                      {PRINCIPLE_ICONS[idx % PRINCIPLE_ICONS.length]}
                    </div>
                    <span className="font-mono text-2xl font-bold text-violet-soft/30 group-hover:text-cyan-vivid/60 transition-colors">
                      {p.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg sm:text-xl font-semibold text-warm-white leading-snug mb-3 group-hover:text-cyan-vivid transition-colors">
                    {p.title}
                  </h3>

                  {/* Core Summary (Emphasized) */}
                  <p className="text-sm font-medium text-slate-muted leading-relaxed mb-3">
                    {p.summary}
                  </p>

                  {/* Practical Execution Detail (Directly visible) */}
                  <p className="text-xs text-slate-muted/80 leading-relaxed">
                    {p.detail}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="pt-4 mt-6 border-t border-violet-electric/15 flex items-center justify-between text-xs font-mono text-slate-muted">
                  <span className="text-[11px] text-cyan-vivid">
                    Principle {idx + 1} of 5
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-vivid">
                    <span>Applied in Practice</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
