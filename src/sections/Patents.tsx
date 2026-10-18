import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionHeading } from '../components/UI';
import { CertificateViewer, type CertificateDoc } from '../components/CertificateViewer';
import { portfolioData } from '../data/portfolio';
import { Shield, ChevronDown, ChevronUp, Calendar, Sparkles, FileText, ExternalLink } from 'lucide-react';

const STATUS_STYLES: Record<string, { label: string; color: string }> = {
  Published: { label: 'Published Application', color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' },
  Pending: { label: 'Pending Examination', color: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' },
  Filed: { label: 'Filed Application', color: 'text-cyan-vivid border-cyan-vivid/30 bg-cyan-vivid/10' },
};

export function PatentsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.06 });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<CertificateDoc | null>(null);
  const { patents } = portfolioData;

  const togglePatent = (id: string) => {
    setExpandedId((curr) => (curr === id ? null : id));
  };

  return (
    <>
      <section
        id="patents"
        ref={ref}
        className="relative py-24 overflow-hidden"
        aria-label="Patent applications and research inventions"
      >
        <div className="relative z-10 max-w-screen-xl mx-auto px-5 lg:px-8">
          {/* Header */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <SectionHeading
              label="Patents"
              title="Ideas into Impact"
              subtitle="Five published patent applications spanning on-device edge AI, cybercrime evolutionary forensics, computer vision identity profiles, and multi-agent railway systems."
            />
          </div>

          {/* Patent count badge */}
          <div
            className={`flex items-center gap-4 mb-10 transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3.5 px-5 py-3 bg-[#151F38] border border-violet-electric/25 rounded-2xl shadow-origami-sm">
              <Shield className="w-5 h-5 text-cyan-vivid" aria-hidden="true" />
              <div>
                <span className="font-mono text-2xl font-bold text-warm-white">
                  {patents.length}×
                </span>
                <span className="text-xs text-slate-muted font-mono ml-2 uppercase tracking-widest">
                  Published Patent Applications
                </span>
              </div>
            </div>
          </div>

          {/* Patent list with smooth animated expansion */}
          <div className="flex flex-col gap-4">
            {patents.map((patent, idx) => {
              const isExpanded = expandedId === patent.id;
              const statusStyle = STATUS_STYLES[patent.status] ?? STATUS_STYLES.Filed;

              return (
                <article
                  key={patent.id}
                  className={`bg-[#151F38] border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isExpanded
                      ? 'border-cyan-vivid/50 shadow-glow-violet bg-[#141E38]'
                      : 'border-violet-electric/20 hover:border-violet-electric/40'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${idx * 80 + 100}ms` }}
                  aria-label={patent.title}
                >
                  {/* Header row */}
                  <button
                    className="w-full text-left px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-vivid cursor-pointer select-none"
                    onClick={() => togglePatent(patent.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`patent-body-${patent.id}`}
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Number badge */}
                      <div
                        className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold font-mono border shadow-origami-sm transition-colors ${
                          isExpanded
                            ? 'bg-cyan-vivid text-midnight font-black border-cyan-300'
                            : 'bg-midnight-secondary text-cyan-vivid border-cyan-vivid/30'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="font-mono text-xs text-slate-muted">
                            App No: {patent.applicationNumber}
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border rounded-full ${statusStyle.color}`}
                          >
                            {statusStyle.label}
                          </span>
                        </div>
                        <h3 className="font-heading text-base sm:text-lg font-semibold text-warm-white leading-snug">
                          {patent.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 sm:self-center">
                      <div className="text-left sm:text-right text-xs font-mono text-slate-muted hidden md:block">
                        <p className="text-violet-soft">{patent.field}</p>
                        <p>{patent.filingDate}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-midnight-secondary border border-violet-electric/20 text-slate-muted group-hover:text-cyan-vivid transition-colors">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-cyan-vivid" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="w-4 h-4" aria-hidden="true" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Smooth Animated Expandable Details using Framer Motion */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={`patent-body-${patent.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-violet-electric/15 bg-midnight-secondary/70"
                      >
                        <div className="px-6 sm:px-8 py-6">
                          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-muted font-mono mb-4 pb-4 border-b border-violet-electric/15">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-cyan-vivid" aria-hidden="true" />
                              Filed: {patent.filingDate}
                            </span>
                            {patent.publicationDate && (
                              <span className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-violet-electric" aria-hidden="true" />
                                Published: {patent.publicationDate}
                              </span>
                            )}
                            <span className="text-violet-soft">
                              Domain: {patent.field}
                            </span>
                          </div>

                          {/* Technical Abstract */}
                          <div className="mb-5">
                            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-muted mb-2">
                              Technical Abstract
                            </p>
                            <p className="text-sm text-slate-200 leading-relaxed">
                              {patent.abstract}
                            </p>
                          </div>

                          {/* Core Problem & Technical Approach */}
                          {patent.problem && patent.approach && (
                            <div className="grid sm:grid-cols-2 gap-4 mb-5 p-4 rounded-xl bg-midnight/60 border border-violet-electric/15">
                              <div>
                                <p className="text-xs font-mono font-semibold text-rose-300 uppercase tracking-wider mb-1.5">
                                  Problem Addressed
                                </p>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {patent.problem}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-mono font-semibold text-cyan-300 uppercase tracking-wider mb-1.5">
                                  Invention Solution
                                </p>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {patent.approach}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Inventors */}
                          {patent.inventors && patent.inventors.length > 0 && (
                            <div className="mb-6">
                              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-muted mb-2">
                                Inventors
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {patent.inventors.map((inv) => (
                                  <span
                                    key={inv}
                                    className="text-xs font-mono px-2.5 py-1 bg-midnight border border-violet-electric/25 text-warm-white rounded-lg"
                                  >
                                    {inv}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Official Actions & Verified Draft Documents */}
                          <div className="pt-4 border-t border-violet-electric/15 flex flex-wrap items-center justify-between gap-3">
                            <span className="text-xs font-mono text-slate-400">
                              Indian Patent Office Application · Application No: {patent.applicationNumber}
                            </span>

                            <div className="flex flex-wrap items-center gap-2.5">
                              {/* View Official Filing Draft PDF */}
                              {patent.draftDocument && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedDoc({
                                      src: patent.draftDocument!,
                                      title: `${patent.title} — Filing Draft`,
                                      issuer: `Indian Patent Office · App No. ${patent.applicationNumber}`,
                                      date: patent.filingDate,
                                      badge: 'Complete Filing Draft PDF',
                                    });
                                  }}
                                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold text-white bg-gradient-to-r from-violet-electric to-cyan-vivid rounded-xl shadow-glow-cyan hover:opacity-95 transition-all cursor-pointer"
                                  aria-label={`View complete patent filing draft for ${patent.title}`}
                                >
                                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                                  <span>View Filing Draft</span>
                                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" aria-hidden="true" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Viewport-Safe Document Viewer (Supports both PDF Drafts and Image Records) */}
      <CertificateViewer
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        doc={selectedDoc}
      />
    </>
  );
}
