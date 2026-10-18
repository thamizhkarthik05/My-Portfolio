import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ExternalLink, Award } from 'lucide-react';

export interface CertificateDoc {
  src: string;
  title: string;
  issuer?: string;
  date?: string;
  credentialId?: string;
  verifyUrl?: string;
  badge?: string;
  category?: string;
}

interface CertificateViewerProps {
  isOpen: boolean;
  onClose: () => void;
  doc?: CertificateDoc | null;
  document?: CertificateDoc | null;
  collection?: CertificateDoc[];
  currentIndex?: number;
  onNavigate?: (index: number) => void;
}

export function CertificateViewer({
  isOpen,
  onClose,
  doc,
  document: documentProp,
  collection,
  currentIndex = 0,
  onNavigate,
}: CertificateViewerProps) {
  const activeDoc = collection && collection.length > 0 ? collection[currentIndex] : (doc || documentProp);
  const hasCollection = collection && collection.length > 1;

  const handlePrev = useCallback(() => {
    if (!hasCollection || !onNavigate) return;
    const prev = (currentIndex - 1 + collection!.length) % collection!.length;
    onNavigate(prev);
  }, [hasCollection, currentIndex, collection, onNavigate]);

  const handleNext = useCallback(() => {
    if (!hasCollection || !onNavigate) return;
    const next = (currentIndex + 1) % collection!.length;
    onNavigate(next);
  }, [hasCollection, currentIndex, collection, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasCollection) {
        handlePrev();
      } else if (e.key === 'ArrowRight' && hasCollection) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = window.document.body.style.overflow;
    window.document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, hasCollection, handlePrev, handleNext]);

  if (!isOpen || !activeDoc) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label={`Document viewer: ${activeDoc.title}`}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-[#10182D] border border-cyan-vivid/40 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-violet-electric/30 bg-[#151F38] shrink-0 z-20">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <div className="p-2 rounded-lg bg-cyan-vivid/15 border border-cyan-vivid/30 text-cyan-vivid shrink-0">
              <Award className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-heading font-bold text-white truncate">
                  {activeDoc.title}
                </h3>
                {activeDoc.badge && (
                  <span className="shrink-0 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border border-cyan-vivid/50 bg-cyan-vivid/20 text-cyan-300">
                    {activeDoc.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-300 mt-0.5 font-mono">
                {activeDoc.issuer && <span className="text-slate-200 font-medium">{activeDoc.issuer}</span>}
                {activeDoc.date && <span>{activeDoc.date}</span>}
                {activeDoc.credentialId && (
                  <span className="text-[11px] text-violet-soft font-semibold">
                    ID: {activeDoc.credentialId}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {activeDoc.verifyUrl && activeDoc.verifyUrl !== '#' && (
              <a
                href={activeDoc.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-cyan-300 bg-cyan-vivid/15 border border-cyan-vivid/40 rounded-lg hover:bg-cyan-vivid/25 transition-colors"
                title="Verify official credential"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                Verify
              </a>
            )}
            <a
              href={activeDoc.src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-slate-200 bg-white/5 border border-white/15 rounded-lg hover:bg-white/10 hover:text-cyan-vivid transition-colors"
              title="Open full document in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">New Tab</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-200 hover:text-white bg-white/10 hover:bg-red-500/80 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-vivid cursor-pointer"
              aria-label="Close document viewer (Esc)"
              title="Close viewer (Esc)"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="relative flex-1 min-h-0 flex flex-col bg-[#080C16] overflow-hidden">
          <div className="relative flex-1 min-h-0 flex items-center justify-center p-3 sm:p-5 overflow-auto">
            {hasCollection && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-midnight/90 border border-cyan-vivid/40 text-warm-white hover:text-cyan-vivid hover:border-cyan-vivid transition-all shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-vivid cursor-pointer"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-midnight/90 border border-cyan-vivid/40 text-warm-white hover:text-cyan-vivid hover:border-cyan-vivid transition-all shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-vivid cursor-pointer"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </button>
              </>
            )}
            {activeDoc.src.toLowerCase().includes('.pdf') ? (
              <div className="w-full h-[72vh] sm:h-[75vh] flex flex-col items-center justify-center">
                <object
                  data={activeDoc.src + '#toolbar=1&navpanes=0'}
                  type="application/pdf"
                  className="w-full h-full rounded-lg border border-violet-electric/30 shadow-2xl bg-[#10182D]"
                >
                  <div className="flex flex-col items-center justify-center gap-4 p-8 text-center text-slate-300 bg-[#151F38] rounded-xl border border-violet-electric/30">
                    <p className="font-heading font-semibold text-warm-white">{activeDoc.title}</p>
                    <p className="text-xs text-slate-muted max-w-md">
                      Your browser does not support embedded PDF viewing. You can open it directly.
                    </p>
                    <a
                      href={activeDoc.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-electric to-cyan-vivid text-midnight font-bold font-mono text-xs flex items-center gap-2 shadow-glow-cyan hover:opacity-95"
                    >
                      <ExternalLink className="w-4 h-4" /> Open Filing Draft PDF
                    </a>
                  </div>
                </object>
              </div>
            ) : (
              <div className="relative flex items-center justify-center w-full h-full">
                <img
                  src={activeDoc.src}
                  alt={activeDoc.title}
                  className="max-w-full max-h-[calc(90vh-140px)] object-contain rounded-lg border border-violet-electric/30 shadow-2xl"
                  loading="lazy"
                />
              </div>
            )}
          </div>
          {hasCollection && (
            <div className="flex items-center justify-between px-5 py-2.5 border-t border-violet-electric/25 bg-[#12192F] text-xs text-slate-300 font-mono shrink-0">
              <span className="font-semibold text-cyan-300">
                Document {currentIndex + 1} of {collection!.length}
              </span>
              <div className="flex items-center gap-2">
                {collection!.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigate?.(idx)}
                    className={'h-2 rounded-full transition-all cursor-pointer ' + (idx === currentIndex ? 'w-6 bg-cyan-vivid shadow-glow-cyan' : 'w-2 bg-slate-500 hover:bg-slate-300')}
                    aria-label={'Jump to document ' + (idx + 1)}
                  />
                ))}
              </div>
              <span className="hidden sm:inline text-slate-400">Arrow keys to browse · Esc to close</span>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
