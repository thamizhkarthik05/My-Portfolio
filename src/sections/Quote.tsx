import { useScrollReveal } from '../hooks/useScrollReveal';
import { portfolioData } from '../data/portfolio';

export function QuoteSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.3 });
  const { quote } = portfolioData;

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0B1020 0%, #17143A 50%, #0B1020 100%)' }}
      aria-label="Quote"
    >
      {/* Geometric background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute left-0 top-0 w-1/3 h-full opacity-[0.07]" viewBox="0 0 300 600" fill="none">
          <polygon points="0,0 300,0 0,600" fill="url(#qGrad1)" />
          <defs>
            <linearGradient id="qGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7657FF" />
              <stop offset="100%" stopColor="#35D5F2" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute right-0 bottom-0 w-1/3 h-full opacity-[0.07]" viewBox="0 0 300 600" fill="none">
          <polygon points="300,0 300,600 0,600" fill="url(#qGrad2)" />
          <defs>
            <linearGradient id="qGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#C7B8FF" />
              <stop offset="100%" stopColor="#35D5F2" />
            </linearGradient>
          </defs>
        </svg>

        {/* Corner fold accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-violet-electric/20" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-cyan-vivid/20" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8 text-center">
        {/* Opening quotation */}
        <div
          className={`transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        >
          <span className="text-6xl sm:text-7xl font-heading leading-none text-violet-electric/30 select-none" aria-hidden="true">
            "
          </span>
        </div>

        <blockquote
          className={`transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="font-heading text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed text-warm-white -mt-4">
            {quote.text}
          </p>
          <footer className="mt-6 flex flex-col items-center gap-1">
            <div className="w-12 h-px bg-gradient-to-r from-violet-electric to-cyan-vivid mb-3" aria-hidden="true" />
            <cite className="not-italic font-semibold text-sm text-cyan-vivid font-mono tracking-wider">
              — {quote.author}
            </cite>
            <span className="text-xs text-slate-muted">{quote.role}</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
