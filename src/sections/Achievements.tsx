import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionHeading } from '../components/UI';
import { CertificateViewer, type CertificateDoc } from '../components/CertificateViewer';
import { portfolioData } from '../data/portfolio';
import { Trophy, Award, ExternalLink, Calendar, MapPin, Play, Pause, X } from 'lucide-react';

// Strictly hackathon achievements — 4 verified wins
const HACKATHON_IDS = ['hackathon-1', 'hackathon-2', 'hackathon-3', 'hackathon-4'];

// High-contrast, vibrant rank styling
const RANK_ACCENTS: Record<
  string,
  {
    border: string;
    ribbon: string;
    badgeStyle: string;
    glow: string;
    awardColor: string;
  }
> = {
  '3rd Place': {
    border: '#39D9F5',
    ribbon: 'linear-gradient(180deg, #39D9F5, #8B6CFF)',
    badgeStyle: 'bg-[#081226] text-cyan-300 border-2 border-cyan-400 shadow-[0_2px_12px_rgba(0,0,0,0.85)] font-black',
    glow: 'rgba(57, 217, 245, 0.45)',
    awardColor: 'text-cyan-300',
  },
  'Podium Winner': {
    border: '#FBBF24',
    ribbon: 'linear-gradient(180deg, #FBBF24, #A78BFA)',
    badgeStyle: 'bg-[#1C1206] text-amber-300 border-2 border-amber-400 shadow-[0_2px_12px_rgba(0,0,0,0.85)] font-black',
    glow: 'rgba(251, 191, 36, 0.45)',
    awardColor: 'text-amber-300',
  },
  '3rd Prize ($100)': {
    border: '#10B981',
    ribbon: 'linear-gradient(180deg, #10B981, #39D9F5)',
    badgeStyle: 'bg-[#041A12] text-emerald-300 border-2 border-emerald-400 shadow-[0_2px_12px_rgba(0,0,0,0.85)] font-black',
    glow: 'rgba(16, 185, 129, 0.45)',
    awardColor: 'text-emerald-300',
  },
  '3rd Position': {
    border: '#A78BFA',
    ribbon: 'linear-gradient(180deg, #A78BFA, #39D9F5)',
    badgeStyle: 'bg-[#140E2C] text-violet-200 border-2 border-violet-400 shadow-[0_2px_12px_rgba(0,0,0,0.85)] font-black',
    glow: 'rgba(167, 139, 250, 0.45)',
    awardColor: 'text-violet-200',
  },
};

export function AchievementsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.08, once: false });
  const [selectedDoc, setSelectedDoc] = useState<CertificateDoc | null>(null);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // Carousel pauses when hovered, active via touch, or manually paused
  const isPaused = isManuallyPaused || isHovered || activeCardId !== null;

  // Filter strictly to the 4 hackathon wins
  const hackathons = portfolioData.achievements.filter((a) =>
    HACKATHON_IDS.includes(a.id)
  );

  // Duplicate for seamless infinite loop (4 items duplicated = 8 items)
  const track = [...hackathons, ...hackathons];

  const handleCardClick = (cardKey: string) => {
    setActiveCardId((current) => (current === cardKey ? null : cardKey));
  };

  return (
    <>
      <section
        id="achievements"
        ref={ref}
        className="relative py-24 overflow-hidden"
        aria-label="Hackathon wins and podium achievements"
      >
        {/* Section header */}
        <div className="max-w-screen-xl mx-auto px-5 lg:px-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <SectionHeading
                label="Hackathon Wins"
                title="Wins That Matter"
                subtitle="Four hackathon podiums — from university arenas to national competitions. Real problems, real teams, real results. Hover or tap any card to view detailed solutions and official credentials."
              />
            </div>

            {/* Carousel speed / pause status & manual controls */}
            <div
              className={`flex items-center gap-3 shrink-0 mb-0 md:mb-12 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#151F38] border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold shadow-glow-cyan">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isPaused ? 'bg-amber-400' : 'bg-cyan-400 animate-pulse'
                  }`}
                  aria-hidden="true"
                />
                <span>
                  {isManuallyPaused
                    ? 'PAUSED'
                    : isHovered || activeCardId
                    ? 'PAUSED (INTERACTION)'
                    : 'AUTO-SCROLLING (R→L)'}
                </span>
              </div>

              <button
                onClick={() => setIsManuallyPaused((p) => !p)}
                className="p-2.5 rounded-xl bg-[#151F38] border border-cyan-400/60 text-cyan-300 hover:bg-cyan-vivid hover:text-midnight transition-all shadow-origami-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-vivid cursor-pointer"
                aria-label={isManuallyPaused ? 'Resume auto-scrolling carousel' : 'Pause carousel'}
                title={isManuallyPaused ? 'Resume auto-scrolling' : 'Pause auto-scrolling'}
              >
                {isManuallyPaused ? (
                  <Play className="w-4 h-4 fill-current" />
                ) : (
                  <Pause className="w-4 h-4 fill-current" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 
          Continuous Horizontal Marquee Track:
          - Constrained on desktop to max-w-[1140px] mx-auto so a maximum of 3 cards fit on screen at once
          - Powered by continuous right-to-left marqueeContinuous
          - Smooth feathered edge masking
          - Pauses on hover, resumes on leave unless manually paused
        */}
        <div
          className="relative max-w-[1140px] mx-auto px-4 overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 28px, black calc(100% - 28px), transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 28px, black calc(100% - 28px), transparent)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setActiveCardId(null);
          }}
        >
          <div
            className="flex gap-6 py-4 animate-hackathon-marquee"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {track.map((ach, idx) => {
              const isClone = idx >= hackathons.length;
              const cardKey = `${ach.id}-${idx}`;
              const isCardExpanded = activeCardId === cardKey;

              const accent = RANK_ACCENTS[ach.rank ?? ''] ?? {
                border: '#8B6CFF',
                ribbon: 'linear-gradient(180deg,#8B6CFF,#39D9F5)',
                badgeStyle: 'bg-[#151F38] text-cyan-300 border border-cyan-400 font-bold',
                glow: 'rgba(139,108,255,0.4)',
                awardColor: 'text-cyan-300',
              };

              return (
                <article
                  key={cardKey}
                  onClick={() => handleCardClick(cardKey)}
                  className="w-[285px] sm:w-[325px] lg:w-[340px] h-[360px] shrink-0 rounded-2xl overflow-hidden flex flex-col group relative transition-all duration-300 select-none cursor-pointer border border-violet-electric/25 hover:border-cyan-vivid/50 shadow-origami-md hover:shadow-origami-lg"
                  style={{
                    background: '#151F38',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = accent.border;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px -6px rgba(11,16,32,0.85), 0 0 24px -4px ${accent.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,108,255,0.25)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px -4px rgba(11,16,32,0.6)';
                  }}
                  tabIndex={isClone ? -1 : 0}
                  aria-hidden={isClone ? true : undefined}
                  role="region"
                  aria-label={`${ach.title} — ${ach.award}`}
                  onFocus={() => setIsHovered(true)}
                  onBlur={() => setIsHovered(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(cardKey);
                    }
                  }}
                >
                  {/* Left rank ribbon accent line */}
                  <div
                    className="absolute top-0 left-0 w-[4px] h-full z-10 rounded-l-2xl"
                    style={{ background: accent.ribbon }}
                    aria-hidden="true"
                  />

                  {/* ============================================================ */}
                  {/* 1. TOP: Event Photograph (~42% of total card height) */}
                  {/* Strictly preserved as the main visual — never replaced on hover! */}
                  {/* ============================================================ */}
                  <div className="relative w-full h-[155px] bg-[#080D1A] overflow-hidden shrink-0 border-b border-violet-electric/20">
                    <img
                      src={ach.image}
                      alt={`${ach.title} prize ceremony`}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient shade at bottom of image for seamless integration */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#151F38] via-transparent to-black/20 pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Top-left Category Badge */}
                    <div className="absolute top-2.5 left-3 z-10">
                      <span className="text-[9px] font-mono font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-[#080D1A]/95 border border-cyan-400 text-cyan-300 shadow-md">
                        HACKATHON
                      </span>
                    </div>

                    {/* Top-right Position/Rank Badge */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md ${accent.badgeStyle}`}
                      >
                        {ach.rank}
                      </span>
                    </div>
                  </div>

                  {/* ============================================================ */}
                  {/* 2. MIDDLE & BOTTOM: Compact Default Content (NO EMPTY SPACE) */}
                  {/* Tightly structured: Title, Institution, and Award Footer */}
                  {/* ============================================================ */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 relative z-0">
                    <div>
                      <h4 className="font-heading text-base font-bold text-warm-white leading-snug line-clamp-2 group-hover:text-cyan-vivid transition-colors duration-200">
                        {ach.title}
                      </h4>
                      {ach.organization && (
                        <p className="text-xs text-violet-soft font-medium flex items-center gap-1.5 mt-1.5">
                          <MapPin className="w-3.5 h-3.5 text-cyan-vivid shrink-0" aria-hidden="true" />
                          <span className="truncate">{ach.organization}</span>
                        </p>
                      )}
                    </div>

                    {/* Compact Achievement Footer */}
                    <div className="pt-2.5 border-t border-violet-electric/15 flex items-center justify-between text-xs font-mono mt-auto">
                      <span className={`flex items-center gap-1.5 font-bold truncate ${accent.awardColor}`}>
                        <Trophy className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span className="truncate">{ach.award}</span>
                      </span>
                      {ach.year && (
                        <span className="text-slate-300 font-semibold shrink-0 ml-2">{ach.year}</span>
                      )}
                    </div>
                  </div>

                  {/* ============================================================ */}
                  {/* 3. HOVER / TAP STATE: Detailed View Panel */}
                  {/* Covers ONLY the lower information section below the photograph! */}
                  {/* Event photograph stays 100% visible at the top! */}
                  {/* ============================================================ */}
                  <div
                    className={`absolute left-0 right-0 bottom-0 top-[155px] z-20 bg-[#0B1226]/95 backdrop-blur-md p-4 sm:p-5 flex flex-col justify-between border-t border-cyan-400 shadow-[0_-8px_25px_rgba(0,0,0,0.85)] transition-all duration-300 ${
                      isCardExpanded
                        ? 'opacity-100 pointer-events-auto translate-y-0'
                        : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto translate-y-2 group-hover:translate-y-0'
                    }`}
                    aria-hidden={!isCardExpanded}
                  >
                    <div className="overflow-y-auto pr-1">
                      {/* Top Row: Date & Close button (for mobile touch) */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          {ach.date && (
                            <span className="text-[10px] font-mono text-cyan-300 font-semibold flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-cyan-400" aria-hidden="true" />
                              {ach.date}
                            </span>
                          )}
                        </div>

                        {/* Mobile tap dismiss button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCardId(null);
                          }}
                          className="sm:hidden p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
                          aria-label="Close details"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Complete Event Description */}
                      <p className="text-xs text-slate-100 font-medium leading-relaxed mb-2.5">
                        {ach.description}
                      </p>

                      {/* Tags */}
                      {ach.tags && ach.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {ach.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-[#131D36] border border-cyan-400/30 text-cyan-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* View Certificate CTA */}
                    <div className="pt-2 border-t border-violet-electric/30 flex items-center gap-2 shrink-0">
                      {ach.certificateImage && (
                        <button
                          tabIndex={isClone ? -1 : 0}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDoc({
                              src: ach.certificateImage!,
                              title: ach.title,
                              issuer: ach.organization,
                              date: ach.date,
                              badge: ach.award,
                            });
                          }}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-mono text-xs font-bold shadow-md hover:shadow-cyan-500/30 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-vivid hover:scale-[1.01]"
                          aria-label={`View Certificate for ${ach.title}`}
                        >
                          <Award className="w-3.5 h-3.5 text-cyan-200" aria-hidden="true" />
                          <span>View Official Certificate</span>
                          <ExternalLink className="w-3 h-3 ml-0.5 opacity-90" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Centered Modal / Lightbox for Full Certificate */}
      <CertificateViewer
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        doc={selectedDoc}
      />
    </>
  );
}
