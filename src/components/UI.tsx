interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-3 mb-12 ${alignClass}`}>
      {label && (
        <span
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase font-mono text-cyan-vivid"
        >
          <span
            className="w-8 h-px bg-gradient-to-r from-cyan-vivid to-violet-electric"
            aria-hidden="true"
          />
          {label}
        </span>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-warm-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg max-w-2xl leading-relaxed text-slate-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface OrigamiDividerProps {
  flipped?: boolean;
  dark?: boolean;
}

export function OrigamiDivider({ flipped }: OrigamiDividerProps) {
  const transform = flipped ? 'scale(-1, -1)' : '';

  return (
    <div
      className="relative w-full py-8 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
      style={{ transform }}
    >
      {/* Origami Crease Seam */}
      <div className="max-w-screen-xl mx-auto px-5 lg:px-8">
        <div className="relative flex items-center justify-center">
          {/* Left subtle crease line */}
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-electric/30 to-violet-electric/60" />

          {/* Center origami diamond fold node */}
          <div className="mx-4 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-sm rotate-45 bg-cyan-vivid/70" />
            <span className="w-2.5 h-2.5 rounded-sm rotate-45 bg-gradient-to-br from-violet-electric to-cyan-vivid shadow-glow-violet" />
            <span className="w-1.5 h-1.5 rounded-sm rotate-45 bg-violet-electric/70" />
          </div>

          {/* Right subtle crease line */}
          <div className="flex-1 h-px bg-gradient-to-r from-violet-electric/60 via-cyan-vivid/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}

interface GeometricBadgeProps {
  children: React.ReactNode;
  variant?: 'violet' | 'cyan' | 'slate';
}

export function GeometricBadge({ children, variant = 'violet' }: GeometricBadgeProps) {
  const styles = {
    violet: 'bg-violet-electric/15 text-violet-soft border-violet-electric/30',
    cyan: 'bg-cyan-vivid/10 text-cyan-vivid border-cyan-vivid/25',
    slate: 'bg-white/5 text-slate-muted border-white/10',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold border rounded origami-clip-badge ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export function ImageCard({ src, alt, className = '', onClick }: ImageCardProps) {
  return (
    <button
      className={`relative overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-electric ${className}`}
      onClick={onClick}
      aria-label={`View: ${alt}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function Lightbox({ src, alt, onClose }: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight/95 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Image preview: ${alt}`}
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 p-2 text-slate-muted hover:text-warm-white transition-colors"
        aria-label="Close preview"
        onClick={onClose}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-origami-lg"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-muted px-4 text-center max-w-md">
        {alt}
      </p>
    </div>
  );
}
