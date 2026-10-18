import { ArrowUp, Mail, MessageSquare, ChevronRight } from 'lucide-react';
import { Github, Linkedin, Spotify } from './SocialIcons';
import { portfolioData } from '../data/portfolio';

export function Footer() {
  const { personal } = portfolioData;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'patents', label: 'Patents' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer
      className="relative bg-[#090D1A] border-t border-violet-electric/20 text-slate-300 select-none overflow-hidden"
      aria-label="Site footer"
    >
      {/* Top origami fold gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-screen-xl mx-auto px-5 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-violet-electric/15">
          {/* Column 1: Identity block (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {/* Origami Brand Mark */}
              <div className="relative w-8 h-8 shrink-0">
                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                  <polygon points="16,4 27,13 16,18" fill="url(#footGradA)" />
                  <polygon points="16,4 5,13 16,18" fill="url(#footGradB)" opacity="0.85" />
                  <polygon points="16,18 27,13 22,28" fill="#17143A" />
                  <polygon points="16,18 5,13 10,28" fill="url(#footGradA)" opacity="0.75" />
                  <polygon points="16,18 10,28 16,24 22,28" fill="#7657FF" />
                  <defs>
                    <linearGradient id="footGradA" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#35D5F2" />
                      <stop offset="100%" stopColor="#7657FF" />
                    </linearGradient>
                    <linearGradient id="footGradB" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#C7B8FF" />
                      <stop offset="100%" stopColor="#35D5F2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="font-heading text-lg font-bold text-warm-white tracking-tight">
                Kaarthik M
              </span>
            </div>

            <p className="text-sm text-slate-muted leading-relaxed max-w-sm">
              Building thoughtful software experiences through engineering, AI exploration, and creative problem-solving.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-vivid/90 mt-1">
              <span className="w-2 h-2 rounded-full bg-cyan-vivid animate-pulse" />
              <span>Integrated M.Tech Software Engineering · VIT Vellore</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-warm-white">
              Navigation
            </p>
            <nav aria-label="Footer quick navigation" className="grid grid-cols-2 gap-y-2 gap-x-4">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-1.5 text-xs text-slate-muted hover:text-cyan-vivid transition-colors text-left cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-violet-electric opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Column 3: Connect & Social Channels (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-warm-white">
              Connect & Dialogue
            </p>
            <p className="text-xs text-slate-muted leading-relaxed">
              Open to technical collaboration, engineering internships, and research initiatives.
            </p>

            {/* Social channels using configured authentic URLs */}
            <div className="flex items-center gap-2.5">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#151F38] border border-violet-electric/30 text-slate-300 hover:text-cyan-vivid hover:border-cyan-vivid hover:bg-cyan-vivid/10 transition-all shadow-origami-sm"
                aria-label="LinkedIn Profile"
                title="Kaarthik's LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#151F38] border border-violet-electric/30 text-slate-300 hover:text-warm-white hover:border-violet-electric hover:bg-violet-electric/10 transition-all shadow-origami-sm"
                aria-label="GitHub Profile"
                title="Kaarthik's GitHub profile"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={`mailto:${personal.email}`}
                className="p-2.5 rounded-xl bg-[#151F38] border border-violet-electric/30 text-slate-300 hover:text-cyan-vivid hover:border-cyan-vivid hover:bg-cyan-vivid/10 transition-all shadow-origami-sm"
                aria-label="Send direct email"
                title={`Email ${personal.email}`}
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                onClick={() => scrollToSection('beyond')}
                className="p-2.5 rounded-xl bg-[#151F38] border border-violet-electric/30 text-slate-300 hover:text-emerald-400 hover:border-emerald-400 hover:bg-emerald-400/10 transition-all shadow-origami-sm cursor-pointer"
                aria-label="VIT Radio Spotify Shows"
                title="Radio & Spotify Broadcasts"
              >
                <Spotify size={16} />
              </button>
            </div>

            {/* Direct Contact CTA Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-electric/15 hover:bg-violet-electric/25 border border-violet-electric/40 text-violet-soft hover:text-white font-mono text-xs font-semibold transition-all mt-1 cursor-pointer w-fit"
            >
              <MessageSquare className="w-3.5 h-3.5 text-cyan-vivid" aria-hidden="true" />
              <span>Leave a Message</span>
            </button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-muted/70">
          <p>© {new Date().getFullYear()} Kaarthik M · All rights reserved.</p>

          <p className="text-center sm:text-left text-slate-muted/60">
            Designed and built with curiosity. Origami-inspired digital experience.
          </p>

          {/* Back to top control */}
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#151F38] border border-violet-electric/20 text-slate-300 hover:text-cyan-vivid hover:border-cyan-vivid/50 transition-all cursor-pointer"
            aria-label="Back to top"
            title="Scroll back to top"
          >
            <span className="text-[11px] uppercase tracking-wider font-semibold">Top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
