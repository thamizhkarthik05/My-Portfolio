import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionHeading } from '../components/UI';
import { CertificateViewer, type CertificateDoc } from '../components/CertificateViewer';
import { portfolioData } from '../data/portfolio';
import { Calendar, ExternalLink, Eye, ShieldCheck } from 'lucide-react';

export function CertificationsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.08 });
  const [selectedDoc, setSelectedDoc] = useState<CertificateDoc | null>(null);
  const { certifications } = portfolioData;

  const categoryBadges: Record<string, string> = {
    Cloud: 'text-cyan-vivid border-cyan-vivid/30 bg-cyan-vivid/10',
    Cybersecurity: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    'AI & Data': 'text-violet-soft border-violet-electric/30 bg-violet-electric/15',
    'Networking & IoT': 'text-sky-300 border-sky-400/30 bg-sky-400/10',
    Leadership: 'text-indigo-300 border-indigo-400/30 bg-indigo-400/10',
  };

  return (
    <>
      <section
        id="certifications"
        ref={ref}
        className="relative py-24"
        aria-label="Licenses and certifications"
      >
        <div className="max-w-screen-xl mx-auto px-5 lg:px-8">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <SectionHeading
              label="Certifications"
              title="Credentials & Continuous Learning"
              subtitle="Formal credentials and industry-recognized certifications validating technical rigor across Cloud, Security, AI, and Networked Systems."
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, idx) => {
              const catClass =
                categoryBadges[cert.category ?? 'Cloud'] ??
                'text-cyan-vivid border-cyan-vivid/30 bg-cyan-vivid/10';

              return (
                <article
                  key={cert.id}
                  className={`group relative bg-[#151F38] border border-violet-electric/20 rounded-2xl p-6 hover:border-cyan-vivid/40 hover:shadow-origami-md transition-all duration-300 flex flex-col justify-between ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${idx * 60 + 60}ms` }}
                  aria-label={cert.name}
                >
                  {/* Top Fold Crease Gradient */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-violet-electric/30 via-cyan-vivid to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />

                  {/* Card Content Top */}
                  <div>
                    {/* Category pill & verified status */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border rounded ${catClass}`}
                      >
                        {cert.category ?? 'Credential'}
                      </span>
                      {cert.isVerified && (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-cyan-vivid">
                          <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Title & Issuer */}
                    <h3 className="font-heading text-base font-semibold text-warm-white leading-snug group-hover:text-cyan-vivid transition-colors mb-1.5">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-violet-soft font-medium mb-3">{cert.issuer}</p>

                    {/* Date metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-muted font-mono mb-3">
                      <Calendar className="w-3.5 h-3.5 text-cyan-vivid shrink-0" aria-hidden="true" />
                      <span>{cert.date}</span>
                      {cert.expires && (
                        <span className="text-slate-muted/60">· {cert.expires}</span>
                      )}
                    </div>

                    {/* Credential ID */}
                    {cert.credentialId && (
                      <p className="text-[11px] font-mono text-slate-muted/80 bg-midnight-secondary/80 px-2.5 py-1 rounded border border-violet-electric/15 break-all mb-4">
                        ID: {cert.credentialId}
                      </p>
                    )}

                    {/* Skills pills */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {cert.skills.slice(0, 3).map((sk) => (
                          <span
                            key={sk}
                            className="text-[10px] font-mono text-slate-muted bg-midnight-secondary/60 px-2 py-0.5 rounded border border-white/5"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Interactive Action Bar (Hover reveals preview, click opens full modal) */}
                  <div className="pt-4 border-t border-violet-electric/15 flex items-center justify-between gap-3 mt-auto">
                    {/* Certificate Preview Trigger */}
                    <button
                      onClick={() =>
                        setSelectedDoc({
                          src: cert.imageUrl ?? cert.image ?? '/assets/certifications/gcp-infrastructure-foundation.png',
                          title: cert.name,
                          issuer: cert.issuer,
                          date: cert.date,
                          credentialId: cert.credentialId,
                          verifyUrl: cert.verifyUrl,
                          badge: cert.category,
                        })
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-muted hover:text-cyan-vivid transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-vivid py-1"
                      aria-label={`View certificate for ${cert.name}`}
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-vivid" aria-hidden="true" />
                      <span>View Certificate</span>
                    </button>

                    {/* External Verify Link */}
                    {cert.verifyUrl && cert.verifyUrl !== '#' && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono font-medium text-violet-soft hover:text-violet-hover transition-colors py-1"
                        aria-label={`Verify ${cert.name} on provider website`}
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reusable Viewport-Safe Document Viewer */}
      <CertificateViewer
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        document={selectedDoc}
      />
    </>
  );
}
