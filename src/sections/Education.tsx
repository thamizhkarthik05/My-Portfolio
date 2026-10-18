import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionHeading } from '../components/UI';
import { CertificateViewer, type CertificateDoc } from '../components/CertificateViewer';
import { portfolioData } from '../data/portfolio';
import { GraduationCap, Calendar, Award, CheckCircle2, Eye } from 'lucide-react';

export function EducationSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const { education } = portfolioData;

  // Build merit certificates collection for modal viewer navigation
  const meritCollection: CertificateDoc[] =
    education[0]?.meritCertificates?.map((cert) => ({
      src: cert.path,
      title: `VIT University Merit Scholarship Certificate (${cert.year})`,
      issuer: 'Vellore Institute of Technology',
      date: cert.year,
      badge: 'Academic Distinction',
    })) ?? [];

  return (
    <>
      <section
        id="education"
        ref={ref}
        className="relative py-24"
        aria-label="Academic education and distinctions"
      >
        <div className="max-w-screen-xl mx-auto px-5 lg:px-8">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <SectionHeading
              label="Education"
              title="Where It Started"
              subtitle="A rigorous academic foundation built on continuous curiosity, software craftsmanship, and consecutive university honors."
            />
          </div>

          <div className="relative">
            {/* Origami timeline vertical line — precisely aligned across screen sizes */}
            <div
              className="absolute left-6 sm:left-8 top-6 bottom-6 w-px bg-gradient-to-b from-cyan-vivid via-violet-electric to-transparent"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-12 sm:gap-14">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className={`relative pl-12 sm:pl-16 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${idx * 150 + 100}ms` }}
                >
                  {/* Timeline diamond — precisely centered on the line (left-6 on mobile, left-8 on sm+, -translate-x-1/2) */}
                  <div
                    className="absolute left-6 sm:left-8 top-6 -translate-x-1/2 w-5 h-5 rounded-[3px] rotate-45 bg-gradient-to-br from-violet-electric to-cyan-vivid shadow-glow-violet flex items-center justify-center animate-pulse-subtle z-10"
                    aria-hidden="true"
                  >
                    <div className="w-2 h-2 rounded-[2px] bg-midnight" />
                  </div>

                  {/* Elevated Educational Card */}
                  <article className="relative bg-[#151F38] rounded-2xl border border-violet-electric/20 p-6 sm:p-9 shadow-origami-md hover:border-cyan-vivid/40 transition-all duration-300 group overflow-hidden">
                    {/* Top Fold Crease Accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-vivid/40 via-violet-electric to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    />

                    {/* Degree & Institution */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-midnight-secondary border border-violet-electric/25 text-cyan-vivid shrink-0 shadow-origami-sm">
                          <GraduationCap className="w-6 h-6" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-heading text-xl sm:text-2xl font-semibold text-warm-white leading-tight">
                            {edu.institution}
                          </h3>
                          <p className="text-sm sm:text-base font-medium text-cyan-vivid mt-1">
                            {edu.degree}
                          </p>
                        </div>
                      </div>

                      {/* Period Badge */}
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-muted bg-midnight-secondary px-3.5 py-1.5 rounded-full border border-violet-electric/20 shrink-0 self-start">
                        <Calendar className="w-3.5 h-3.5 text-cyan-vivid" aria-hidden="true" />
                        {edu.period}
                      </div>
                    </div>

                    {/* Score Highlight Box */}
                    <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-midnight-secondary/80 border border-violet-electric/20 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-2xl font-bold text-warm-white">
                          {edu.score}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-vivid bg-cyan-vivid/10 border border-cyan-vivid/25 px-2 py-0.5 rounded">
                          Top Tier
                        </span>
                      </div>
                      {edu.scoreDetail && (
                        <p className="text-xs sm:text-sm text-slate-muted font-mono sm:border-l sm:border-violet-electric/20 sm:pl-4">
                          {edu.scoreDetail}
                        </p>
                      )}
                    </div>

                    {/* Academic Distinctions & Responsibilities */}
                    {edu.highlights && (
                      <div className="mb-6">
                        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-violet-soft mb-3 flex items-center gap-2">
                          <Award className="w-3.5 h-3.5 text-cyan-vivid" aria-hidden="true" />
                          Key Academic Distinctions & Positions
                        </p>
                        <ul className="grid gap-2.5" aria-label="Academic achievements">
                          {edu.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-muted leading-relaxed"
                            >
                              <CheckCircle2
                                className="w-4 h-4 text-cyan-vivid shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Merit Scholarship Credentials — Compact credential chips (no large inline images) */}
                    {edu.meritCertificates && (
                      <div className="pt-5 border-t border-violet-electric/15">
                        <div className="flex items-center justify-between mb-3.5">
                          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-violet-soft flex items-center gap-2">
                            <Award className="w-3.5 h-3.5 text-cyan-vivid" aria-hidden="true" />
                            Merit Scholarship Credentials — 3 Consecutive Years
                          </p>
                          <span className="text-[11px] font-mono text-slate-muted/70 hidden sm:inline">
                            Click to view full certificate
                          </span>
                        </div>

                        {/* Compact Credential Chips Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {edu.meritCertificates.map((cert, cIdx) => {
                            const labelYear = cert.year.includes('1st')
                              ? '1st Year (2023–24)'
                              : cert.year.includes('2nd')
                              ? '2nd Year (2024–25)'
                              : '3rd Year (2025–26)';

                            return (
                              <button
                                key={cert.year}
                                onClick={() => setSelectedIdx(cIdx)}
                                className="group/chip flex items-center gap-3 p-3 rounded-xl bg-midnight-secondary/80 border border-violet-electric/25 hover:border-cyan-vivid/50 hover:bg-midnight-secondary transition-all duration-200 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-vivid shadow-origami-sm hover:shadow-glow-cyan"
                                aria-label={`View Merit Scholarship certificate for ${labelYear}`}
                              >
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-electric/20 to-cyan-vivid/20 border border-cyan-vivid/30 flex items-center justify-center shrink-0 text-cyan-vivid group-hover/chip:border-cyan-vivid group-hover/chip:scale-105 transition-all duration-200">
                                  <Award className="w-4 h-4 text-cyan-vivid" aria-hidden="true" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-semibold text-warm-white group-hover/chip:text-cyan-vivid transition-colors truncate">
                                    {cert.year.includes('1st')
                                      ? 'View 1st Year Certificate'
                                      : cert.year.includes('2nd')
                                      ? 'View 2nd Year Certificate'
                                      : 'View 3rd Year Certificate'}
                                  </p>
                                  <p className="text-[11px] font-mono text-slate-300 truncate">
                                    Merit Scholarship · {labelYear}
                                  </p>
                                </div>
                                <span className="p-1 rounded-md text-slate-muted/60 group-hover/chip:text-cyan-vivid group-hover/chip:bg-cyan-vivid/10 transition-colors shrink-0">
                                  <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Document Certificate Viewer for Merit Awards */}
      <CertificateViewer
        isOpen={selectedIdx !== null}
        onClose={() => setSelectedIdx(null)}
        collection={meritCollection}
        currentIndex={selectedIdx ?? 0}
        onNavigate={(newIdx) => setSelectedIdx(newIdx)}
      />
    </>
  );
}
