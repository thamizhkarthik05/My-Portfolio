import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Linkedin, Github } from '../components/SocialIcons';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { portfolioData } from '../data/portfolio';

// Refined origami frame around profile image — preserves natural appearance, face uncropped
function OrigamiFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-[420px] mx-auto select-none">
      {/* Outer subtle ambient glow */}
      <div
        className="absolute inset-0 scale-105 rounded-3xl blur-2xl opacity-20 animate-pulse-subtle pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #7657FF 0%, #35D5F2 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Profile image container — natural aspect ratio, clean origami corners, visually prominent */}
      <div className="relative mx-auto w-72 h-84 sm:w-80 sm:h-96 lg:w-[350px] lg:h-[420px] rounded-3xl overflow-hidden border border-cyan-vivid/35 bg-[#10182D] shadow-origami-lg">
        {children}

        {/* Origami corner accent folds */}
        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
            <polygon points="0,0 32,0 32,32" fill="#35D5F2" opacity="0.35" />
            <line x1="0" y1="0" x2="32" y2="32" stroke="#7657FF" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
            <polygon points="0,0 0,32 32,32" fill="#7657FF" opacity="0.35" />
            <line x1="0" y1="0" x2="32" y2="32" stroke="#35D5F2" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1, once: false });
  const [initialMounted, setInitialMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { personal } = portfolioData;

  useEffect(() => {
    const t = setTimeout(() => setInitialMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const scrollDown = () => {
    document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
  };

  const shouldReveal = initialMounted && isVisible;
  const transBase = 'transition-all duration-700 ease-out';
  const revealStyle = (_delay?: number) =>
    `${transBase} ${shouldReveal ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.98]'}`;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent"
      aria-label="Introduction"
    >
      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {/* Role chip */}
            <div
              className={`inline-flex items-center gap-2 ${revealStyle(0)}`}
              style={{ transitionDelay: '0ms' }}
            >
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-electric/35 bg-violet-electric/10 text-xs font-semibold tracking-widest uppercase text-violet-soft font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-vivid animate-pulse" />
                Pre-Final Year · VIT Vellore
              </span>
            </div>

            {/* Name — Strictly Kaarthik M without trailing period, single line */}
            <div
              className={revealStyle(100)}
              style={{ transitionDelay: '100ms' }}
            >
              <h1 className="font-heading text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-warm-white whitespace-nowrap">
                Kaarthik{' '}
                <span
                  className="relative inline"
                  style={{ WebkitTextStroke: '1px transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', backgroundImage: 'linear-gradient(135deg, #35D5F2, #7657FF, #C7B8FF)' }}
                >
                  M
                </span>
              </h1>
            </div>

            {/* Headline */}
            <div
              className={revealStyle(200)}
              style={{ transitionDelay: '200ms' }}
            >
              <p className="text-xl sm:text-2xl font-heading font-medium text-slate-muted leading-snug">
                {personal.headline}
              </p>
            </div>

            {/* Descriptor */}
            <div
              className={revealStyle(300)}
              style={{ transitionDelay: '300ms' }}
            >
              <p className="text-sm font-mono font-medium tracking-wider text-violet-soft flex flex-wrap gap-x-2 gap-y-1">
                {personal.descriptor.split(' · ').map((d, i, arr) => (
                  <span key={d} className="flex items-center gap-2">
                    <span>{d}</span>
                    {i < arr.length - 1 && <span className="text-violet-electric opacity-50">·</span>}
                  </span>
                ))}
              </p>
            </div>

            {/* Bio */}
            <div
              className={revealStyle(400)}
              style={{ transitionDelay: '400ms' }}
            >
              <p className="text-base text-slate-muted leading-relaxed max-w-lg">
                {personal.bio}
              </p>
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-3 pt-2 ${revealStyle(500)}`}
              style={{ transitionDelay: '500ms' }}
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-electric to-cyan-vivid/80 hover:from-violet-hover hover:to-cyan-hover text-white font-semibold text-sm rounded transition-all duration-300 shadow-glow-violet hover:shadow-glow-cyan hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-vivid"
                aria-label="Explore Kaarthik's work and projects"
              >
                Explore My Work
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-6 py-3 bg-transparent border border-violet-electric/40 hover:border-violet-electric text-violet-soft hover:text-warm-white font-semibold text-sm rounded transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-electric"
                aria-label="Contact Kaarthik"
              >
                Let's Connect
              </button>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-slate-muted hover:text-warm-white transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-electric rounded"
                aria-label="View Kaarthik's LinkedIn (opens in new tab)"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-slate-muted hover:text-warm-white transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-electric rounded"
                aria-label="View Kaarthik's GitHub (opens in new tab)"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div
            className={`flex justify-center lg:justify-end order-1 lg:order-2 ${revealStyle(200)}`}
            style={{ transitionDelay: '200ms' }}
          >
            <OrigamiFrame>
              <img
                src={personal.portrait}
                alt="Kaarthik M — Software Engineer & AI Explorer"
                className="w-full h-full object-cover object-[center_16%] transition-transform duration-700 hover:scale-[1.02]"
                width={340}
                height={400}
                loading="eager"
              />
            </OrigamiFrame>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${revealStyle(700)}`}
        style={{ transitionDelay: '700ms' }}
        ref={scrollRef}
      >
        <button
          onClick={scrollDown}
          className="flex flex-col items-center gap-1 text-slate-muted hover:text-cyan-vivid transition-colors group"
          aria-label="Scroll to next section"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">Scroll</span>
          <div className="p-1.5 rounded-full border border-slate-muted/30 group-hover:border-cyan-vivid/50 transition-colors">
            <ArrowDown className="w-3 h-3 animate-bounce" aria-hidden="true" />
          </div>
        </button>
      </div>
    </section>
  );
}
