import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionHeading } from '../components/UI';
import { CertificateViewer, type CertificateDoc } from '../components/CertificateViewer';
import { portfolioData } from '../data/portfolio';
import { Radio, Mic, Eye, Volume2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Spotify } from '../components/SocialIcons';

export function BeyondSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.08 });
  const [selectedDoc, setSelectedDoc] = useState<CertificateDoc | null>(null);
  const [expandedShowId, setExpandedShowId] = useState<string | null>(null);
  const { beyondScreen } = portfolioData;
  const { radio, volunteering } = beyondScreen;

  return (
    <>
      <section
        id="beyond"
        ref={ref}
        className="relative py-24"
        aria-label="Beyond the Code — Creative broadcasting, leadership, and community activities"
      >
        <div className="max-w-screen-xl mx-auto px-5 lg:px-8">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <SectionHeading
              label="Beyond the Code"
              title="Voices, Stories & Human Impact"
              subtitle="Where engineering discipline meets human empathy — hosting weekly radio shows, mentoring campus cohorts, and driving university-scale cultural and technical events."
            />
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column: Radio Broadcasting & Media (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Main Radio Studio Card */}
              <article
                className={`relative bg-[#151F38] border border-violet-electric/25 rounded-3xl p-6 sm:p-8 hover:border-cyan-vivid/40 transition-all duration-300 shadow-origami-md overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Top Crease Gradient */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-electric via-cyan-vivid to-transparent"
                  aria-hidden="true"
                />

                {/* Header with Live Broadcast Waveform */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-violet-electric/15">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-2xl bg-midnight-secondary border border-violet-electric/30 text-cyan-vivid shadow-origami-sm">
                      <Radio className="w-6 h-6 animate-pulse" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-vivid bg-cyan-vivid/10 border border-cyan-vivid/30 px-2 py-0.5 rounded-full">
                          On Air Host
                        </span>
                        <span className="text-xs font-mono text-slate-muted">{radio.period}</span>
                      </div>
                      <h3 className="font-heading text-xl sm:text-2xl font-semibold text-warm-white mt-1">
                        {radio.role}
                      </h3>
                      <p className="text-sm font-medium text-violet-soft">{radio.station}</p>
                    </div>
                  </div>

                  {/* Audio Equalizer Waveform Visualization */}
                  <div
                    className="flex items-end gap-1.5 h-8 px-3 py-1.5 rounded-xl bg-midnight-secondary border border-violet-electric/20"
                    aria-label="Audio waveform graphic"
                  >
                    {[45, 80, 60, 95, 70, 50, 85, 65, 90, 40].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 rounded-full bg-gradient-to-t from-violet-electric to-cyan-vivid animate-pulse"
                        style={{
                          height: `${h}%`,
                          animationDelay: `${i * 120}ms`,
                          animationDuration: '1.2s',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Studio Description */}
                <p className="text-sm sm:text-base text-slate-muted leading-relaxed mb-6">
                  {radio.description}
                </p>

                {/* Radio Broadcaster Highlights */}
                <div className="mb-6">
                  <p className="text-xs font-mono font-semibold uppercase tracking-wider text-violet-soft mb-3 flex items-center gap-2">
                    <Mic className="w-3.5 h-3.5 text-cyan-vivid" aria-hidden="true" />
                    Broadcasting Core Competencies
                  </p>
                  <ul className="grid gap-2">
                    {radio.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-muted leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-sm rotate-45 bg-cyan-vivid mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Official Radio Broadcasts & Shows */}
                <div className="pt-6 border-t border-violet-electric/15">
                  <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-muted mb-3.5 flex items-center justify-between">
                    <span>Official Radio Broadcasts & Specials</span>
                    <span className="text-[11px] text-cyan-vivid">VIT Campus 90.8 FM & Spotify</span>
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {radio.shows.map((show) => {
                      const isExpanded = expandedShowId === show.id;

                      return (
                        <div
                          key={show.id}
                          className="group/radio rounded-2xl bg-midnight-secondary/90 border border-violet-electric/25 hover:border-cyan-vivid/50 transition-all duration-300 p-4 flex flex-col justify-between overflow-hidden shadow-origami-sm hover:shadow-origami-md"
                        >
                          <div>
                            {/* Cover Artwork & Badge — 100% uncropped with ambient backdrop */}
                            <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-[#070B14] border border-violet-electric/25 mb-3.5 flex items-center justify-center">
                              {show.coverImage && (
                                <>
                                  {/* Blurred ambient reflection */}
                                  <img
                                    src={show.coverImage}
                                    alt=""
                                    aria-hidden="true"
                                    className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                                  />
                                  {/* Authentic full artwork — uncropped, aspect-preserved */}
                                  <img
                                    src={show.coverImage}
                                    alt={`${show.title} cover`}
                                    className="relative z-10 max-w-full max-h-full object-contain p-1 transition-transform duration-300 group-hover/radio:scale-[1.03]"
                                    loading="lazy"
                                  />
                                </>
                              )}

                              {/* Station & Badge */}
                              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-20">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/85 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                                  <Spotify size={11} className="text-emerald-400" />
                                  <span>Spotify Broadcast</span>
                                </span>
                              </div>

                              {show.language && (
                                <div className="absolute top-2.5 right-2.5 z-20">
                                  <span className="text-[10px] font-mono font-bold text-cyan-300 bg-[#080D1A]/95 border border-cyan-400/40 px-2.5 py-0.5 rounded-full shadow-md">
                                    {show.language}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Show & Episode Title */}
                            <div className="mb-2">
                              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-vivid mb-1">
                                <span>{show.date}</span>
                                <span className="text-slate-muted/70">{show.station || 'VIT Radio 90.8 FM'}</span>
                              </div>
                              <h4 className="font-heading text-base font-bold text-warm-white mb-1 leading-snug group-hover/radio:text-cyan-vivid transition-colors">
                                {show.title}
                              </h4>
                              {show.episodeTitle && (
                                <p className="text-xs text-violet-soft font-mono mb-2">
                                  {show.episodeTitle}
                                </p>
                              )}
                            </div>

                            {/* Description with Expand/Collapse toggle */}
                            <div className="mb-3">
                              <p className={`text-xs text-slate-300 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                                {show.description}
                              </p>
                              {show.description.length > 130 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedShowId(isExpanded ? null : show.id);
                                  }}
                                  className="text-[11px] font-mono text-cyan-vivid hover:text-cyan-hover font-semibold mt-1 flex items-center gap-1 focus:outline-none cursor-pointer"
                                >
                                  <span>{isExpanded ? 'Show less' : 'Read full description'}</span>
                                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Spotify Action CTA */}
                          <div className="pt-3 border-t border-violet-electric/20 flex items-center justify-between mt-auto">
                            {show.spotifyUrl ? (
                              <a
                                href={show.spotifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-mono text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                                aria-label={`Listen to ${show.title} on Spotify`}
                              >
                                <Spotify size={14} />
                                <span>Listen on Spotify</span>
                                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" aria-hidden="true" />
                              </a>
                            ) : (
                              <span className="text-[11px] font-mono text-slate-muted flex items-center gap-1.5">
                                <Volume2 className="w-3.5 h-3.5 text-violet-electric" aria-hidden="true" />
                                <span>Broadcast Archive</span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
            </div>

            {/* Right Column: Campus Stewardship & Volunteering (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {volunteering.map((item, idx) => (
                <article
                  key={item.id}
                  className={`bg-[#151F38] border border-violet-electric/20 rounded-3xl p-6 hover:border-cyan-vivid/40 transition-all duration-300 shadow-origami-md flex flex-col justify-between ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${idx * 120 + 150}ms` }}
                  aria-label={`${item.role} at ${item.event}`}
                >
                  <div>
                    {/* Event Tag & Period */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-violet-soft bg-violet-electric/15 border border-violet-electric/30 px-2.5 py-0.5 rounded-full">
                        {item.event}
                      </span>
                      <span className="text-xs font-mono text-slate-muted">{item.period}</span>
                    </div>

                    <h3 className="font-heading text-lg font-semibold text-warm-white leading-snug mb-1">
                      {item.role}
                    </h3>
                    <p className="text-xs font-mono text-cyan-vivid mb-3">{item.organization}</p>
                    <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <ul className="grid gap-2 mb-4">
                      {item.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-slate-muted leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-sm rotate-45 bg-violet-electric mt-1 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Photo Documentation Thumbnails */}
                  <div className="pt-4 border-t border-violet-electric/15">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-slate-muted mb-2.5">
                      Photo Documentation
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { src: item.images.tagImage, label: `${item.event} Coordinator Badge` },
                        { src: item.images.teamImage, label: `${item.event} Operations Team` },
                      ].map((photo, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() =>
                            setSelectedDoc({
                              src: photo.src,
                              title: `${item.event} — ${photo.label}`,
                              issuer: item.organization,
                              date: item.period,
                              badge: item.event,
                            })
                          }
                          className="group/p relative aspect-[4/3] rounded-xl overflow-hidden bg-midnight border border-violet-electric/20 hover:border-cyan-vivid/50 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-vivid"
                          aria-label={`View ${photo.label}`}
                        >
                          <img
                            src={photo.src}
                            alt={photo.label}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/p:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-midnight/60 opacity-0 group-hover/p:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5 text-xs font-mono font-semibold text-cyan-vivid">
                            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Enlarge</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Viewport-Safe Document Viewer */}
      <CertificateViewer
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        document={selectedDoc}
      />
    </>
  );
}
