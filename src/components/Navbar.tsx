import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { useActiveSection } from '../hooks/useScrollReveal';
import { portfolioData } from '../data/portfolio';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'education', label: 'Education' },
  { id: 'approach', label: 'Approach' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'patents', label: 'Patents' },
  { id: 'beyond', label: 'Beyond' },
  { id: 'contact', label: 'Contact' },
];

const NAV_IDS = NAV_ITEMS.map((n) => n.id);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(NAV_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-midnight/90 backdrop-blur-xl border-b border-violet-electric/20 shadow-origami-md'
            : 'bg-transparent'
        }`}
        aria-label="Primary navigation"
      >
        <div className="max-w-screen-xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group"
              aria-label="Back to top"
            >
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                  <polygon points="16,4 27,13 16,18" fill="url(#navGradA)" />
                  <polygon points="16,4 5,13 16,18" fill="url(#navGradB)" opacity="0.85" />
                  <polygon points="16,18 27,13 22,28" fill="#17143A" />
                  <polygon points="16,18 5,13 10,28" fill="url(#navGradA)" opacity="0.75" />
                  <polygon points="16,18 10,28 16,24 22,28" fill="#7657FF" />
                  <defs>
                    <linearGradient id="navGradA" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#35D5F2" />
                      <stop offset="100%" stopColor="#7657FF" />
                    </linearGradient>
                    <linearGradient id="navGradB" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#C7B8FF" />
                      <stop offset="100%" stopColor="#35D5F2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="font-heading font-semibold text-sm tracking-wide text-warm-white group-hover:text-cyan-vivid transition-colors whitespace-nowrap">
                Kaarthik M
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-1.5 text-xs font-medium tracking-wide rounded transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-cyan-vivid'
                      : 'text-slate-muted hover:text-warm-white'
                  }`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-vivid" />
                  )}
                </button>
              ))}
            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium bg-violet-electric/15 hover:bg-violet-electric/25 border border-violet-electric/35 text-violet-soft hover:text-warm-white rounded transition-all duration-200"
                aria-label="View Kaarthik's LinkedIn profile"
              >
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
                LinkedIn
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-slate-muted hover:text-warm-white transition-colors"
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div
            className="absolute inset-0 bg-midnight/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-16 right-0 w-64 bg-midnight-card border-l border-b border-violet-electric/20 h-[calc(100vh-4rem)] flex flex-col py-6 px-5 gap-1 overflow-y-auto shadow-origami-lg">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-all ${
                  activeSection === item.id
                    ? 'bg-violet-electric/20 text-cyan-vivid border border-violet-electric/30'
                    : 'text-slate-muted hover:text-warm-white hover:bg-white/5'
                }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-4 pt-4 border-t border-violet-electric/15">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-violet-soft hover:text-warm-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
