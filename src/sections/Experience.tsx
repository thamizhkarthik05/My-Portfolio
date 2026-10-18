import { useState, useRef, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionHeading } from '../components/UI';
import { CertificateViewer, type CertificateDoc } from '../components/CertificateViewer';
import { portfolioData } from '../data/portfolio';
import { Calendar, MapPin, Tag, CheckCircle2, Award, ExternalLink } from 'lucide-react';

function ExperienceTimelineCard({
  exp,
  index,
  onOpenCertificate,
}: {
  exp: (typeof portfolioData.experiences)[0];
  index: number;
  onOpenCertificate: (doc: CertificateDoc) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const typeStyles: Record<string, { badge: string; dot: string }> = {
    Internship: {
      badge: 'text-cyan-vivid border-cyan-vivid/30 bg-cyan-vivid/10',
      dot: 'from-cyan-vivid to-violet-electric',
    },
    Leadership: {
      badge: 'text-violet-soft border-violet-electric/30 bg-violet-electric/15',
      dot: 'from-violet-electric to-cyan-vivid',
    },
    'Full-time': {
      badge: 'text-warm-white border-white/20 bg-white/10',
      dot: 'from-warm-white to-violet-electric',
    },
  };

  const style = typeStyles[exp.type] ?? typeStyles['Leadership'];

  return (
    <div
      ref={cardRef}
      className="relative pl-12 sm:pl-16 transition-all duration-700 ease-out"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px) scale(1)' : 'translateY(28px) scale(0.97)',
        transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${index * 140}ms`,
      }}
    >
      {/* Origami Timeline Track Node — animates in coordination */}
      <div
        className="absolute left-6 sm:left-8 top-6 -translate-x-1/2 flex items-center justify-center z-10"
        aria-hidden="true"
      >
        <div
          className={`w-5 h-5 rounded-[3px] rotate-45 bg-gradient-to-br ${style.dot} transition-all duration-700 ease-out flex items-center justify-center ${
            inView
              ? 'shadow-glow-cyan scale-100 opacity-100'
              : 'scale-50 opacity-0 rotate-0'
          }`}
          style={{ transitionDelay: `${index * 140 + 60}ms` }}
        >
          <div className="w-2 h-2 rounded-[2px] bg-midnight" />
        </div>
      </div>

      {/* Main Experience Card */}
      <article
        className="relative bg-[#151F38] border border-violet-electric/20 rounded-2xl overflow-hidden p-6 sm:p-8 hover:border-cyan-vivid/40 transition-all duration-300 hover:shadow-origami-md group"
        aria-label={`${exp.role} at ${exp.organization}`}
      >
        {/* Subtle accent crease indicator */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-electric/40 via-cyan-vivid/50 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest border rounded font-mono ${style.badge}`}
              >
                {exp.type}
              </span>
              {exp.badge && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] text-slate-muted border border-violet-electric/20 bg-midnight-secondary/60 rounded uppercase tracking-wider font-mono">
                  <Tag className="w-2.5 h-2.5 text-cyan-vivid" aria-hidden="true" />
                  {exp.badge}
                </span>
              )}
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-semibold text-warm-white leading-tight">
              {exp.role}
            </h3>
            <p className="text-sm sm:text-base font-medium text-cyan-vivid mt-1">
              {exp.organization}
            </p>
          </div>

          {/* Period & Location Meta */}
          <div className="flex flex-col sm:items-end gap-1.5 text-xs text-slate-muted font-mono shrink-0">
            <span className="flex items-center gap-1.5 bg-midnight-secondary/80 px-3 py-1 rounded-full border border-violet-electric/15">
              <Calendar className="w-3.5 h-3.5 text-cyan-vivid" aria-hidden="true" />
              {exp.period}
            </span>
            <span className="flex items-center gap-1.5 text-slate-muted/80 px-1">
              <MapPin className="w-3.5 h-3.5 text-violet-electric" aria-hidden="true" />
              {exp.location}
            </span>
          </div>
        </div>

        {/* Complete Meaningful Description (No truncation) */}
        <p className="text-sm sm:text-base text-slate-muted leading-relaxed mb-5">
          {exp.description}
        </p>

        {/* Key Contributions & Deliverables (Visible directly, no toggle dropdowns) */}
        {exp.deliverables && exp.deliverables.length > 0 && (
          <div className="mb-5 pt-4 border-t border-violet-electric/15">
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-violet-soft mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-sm rotate-45 bg-cyan-vivid" aria-hidden="true" />
              Key Contributions & Impact
            </p>
            <ul className="grid gap-2.5">
              {exp.deliverables.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-muted leading-relaxed"
                >
                  <CheckCircle2
                    className="w-4 h-4 text-cyan-vivid shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies & Certificate Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-violet-electric/15">
          {/* Tech Chips */}
          <div className="flex flex-wrap gap-1.5">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-mono font-medium bg-midnight-secondary border border-violet-electric/20 text-violet-soft rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Certificate Action (Directly available) */}
          {exp.certificateImage && (
            <button
              onClick={() =>
                onOpenCertificate({
                  src: exp.certificateImage!,
                  title: `${exp.role} Completion Certificate`,
                  issuer: exp.organization,
                  date: exp.period,
                  badge: 'Verified Credential',
                })
              }
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-semibold text-cyan-vivid bg-cyan-vivid/10 border border-cyan-vivid/30 rounded-lg hover:bg-cyan-vivid/20 hover:border-cyan-vivid transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-vivid"
              aria-label={`View certificate for ${exp.role}`}
            >
              <Award className="w-3.5 h-3.5" aria-hidden="true" />
              View Certificate
              <ExternalLink className="w-3 h-3 opacity-70" aria-hidden="true" />
            </button>
          )}
        </div>
      </article>
    </div>
  );
}

export function ExperienceSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });
  const [selectedDoc, setSelectedDoc] = useState<CertificateDoc | null>(null);
  const { experiences } = portfolioData;

  return (
    <>
      <section
        id="experience"
        ref={ref}
        className="relative py-24"
        aria-label="Professional experience and leadership"
      >
        <div className="max-w-screen-xl mx-auto px-5 lg:px-8">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <SectionHeading
              label="Experience"
              title="The Journey So Far"
              subtitle="Each role shaped how I think, communicate, and engineer — from radio broadcasting studios to computational research teams."
            />
          </div>

          <div className="relative">
            {/* Timeline continuous vertical line */}
            <div
              className="absolute left-6 sm:left-8 top-6 bottom-6 w-px bg-gradient-to-b from-cyan-vivid via-violet-electric to-transparent"
              aria-hidden="true"
            />

            {/* Experience Cards Stack */}
            <div className="flex flex-col gap-10">
              {experiences.map((exp, idx) => (
                <ExperienceTimelineCard
                  key={exp.id}
                  exp={exp}
                  index={idx}
                  onOpenCertificate={setSelectedDoc}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Document Viewer for Certificates */}
      <CertificateViewer
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        document={selectedDoc}
      />
    </>
  );
}
