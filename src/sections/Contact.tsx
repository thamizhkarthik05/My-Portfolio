import { useState, useRef, type FormEvent, type ChangeEvent, type FocusEvent } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionHeading } from '../components/UI';
import { portfolioData } from '../data/portfolio';
import { Mail, Send, CheckCircle2, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { Linkedin, Github } from '../components/SocialIcons';

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const [form, setForm] = useState<FormFields>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormFields, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');
  const [lastSubmitted, setLastSubmitted] = useState<FormFields | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { personal } = portfolioData;

  const validateField = (name: keyof FormFields, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address.';
        return undefined;
      case 'subject':
        if (!value.trim()) return 'Subject is required.';
        if (value.trim().length < 3) return 'Subject must be at least 3 characters.';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters.';
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const nextErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(form) as Array<keyof FormFields>).forEach((field) => {
      const err = validateField(field, form[field]);
      if (err) {
        nextErrors[field] = err;
        isValid = false;
      }
    });

    setErrors(nextErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    return isValid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormFields;
    setForm((prev) => ({ ...prev, [fieldName]: value }));

    if (touched[fieldName]) {
      const err = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: err }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormFields;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const err = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: err }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    if (!validateAll()) {
      return;
    }

    setStatus('submitting');
    setServerMessage('');
    const submittedData = { ...form };
    setLastSubmitted(submittedData);

    const apiEndpoint = import.meta.env.VITE_CONTACT_API_ENDPOINT || '/api/contact';

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submittedData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus('success');
        setServerMessage(
          `Thank you, ${submittedData.name}! Your message was delivered successfully. I'll get back to you at ${submittedData.email} soon.`
        );
        setForm({ name: '', email: '', subject: '', message: '' });
        setTouched({ name: false, email: false, subject: false, message: false });
      } else {
        setStatus('error');
        setServerMessage(
          data.error ||
            'Something went wrong while sending your message. Please try again, or use the fallback email link below.'
        );
      }
    } catch (err: any) {
      setStatus('error');
      setServerMessage(
        err.message ||
          'Could not reach the email server. Please check your connection, or use the fallback email link below.'
      );
    }
  };

  const getDirectMailto = () => {
    const data = lastSubmitted || form;
    const bodyText = `Hi Kaarthik,\n\n${data.message || ''}\n\nBest regards,\n${data.name || ''}\nEmail: ${data.email || ''}`;
    return `mailto:${personal.email}?subject=${encodeURIComponent(data.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(bodyText)}`;
  };

  const inputClass = (field: keyof FormFields) =>
    `w-full bg-[#10182D] border text-warm-white placeholder:text-slate-muted/50 text-sm rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-1 ${
      touched[field] && errors[field]
        ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/30'
        : 'border-violet-electric/25 focus:border-cyan-vivid focus:ring-cyan-vivid/30 hover:border-violet-electric/40'
    }`;

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 overflow-hidden bg-transparent"
      aria-label="Contact Kaarthik"
    >
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <SectionHeading
            label="Let's Connect"
            title="Let's Build Something Great"
            subtitle="Whether it's a research idea, a collaboration opportunity, or just a chat about tech and creativity — I'm always open to a good conversation."
            align="center"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
          {/* Left: Contact info */}
          <div
            className={`flex flex-col gap-6 transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="p-6 bg-[#151F38] rounded-2xl border border-violet-electric/25 shadow-origami-md">
              <h3 className="font-heading text-base font-semibold text-warm-white mb-5">
                Reach Out Directly
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-3 group text-sm"
                  aria-label={`Send email to Kaarthik at ${personal.email}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-electric/15 border border-violet-electric/25 flex items-center justify-center group-hover:bg-violet-electric/25 transition-colors">
                    <Mail className="w-4 h-4 text-violet-soft" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-muted/70 uppercase tracking-widest font-mono mb-0.5">
                      Email
                    </p>
                    <p className="text-warm-white font-medium group-hover:text-cyan-vivid transition-colors break-all">
                      {personal.email}
                    </p>
                  </div>
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-sm"
                  aria-label="Connect with Kaarthik on LinkedIn (opens in new tab)"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-vivid/10 border border-cyan-vivid/25 flex items-center justify-center group-hover:bg-cyan-vivid/20 transition-colors">
                    <Linkedin className="w-4 h-4 text-cyan-vivid" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-muted/70 uppercase tracking-widest font-mono mb-0.5">
                      LinkedIn
                    </p>
                    <p className="text-warm-white font-medium group-hover:text-cyan-vivid transition-colors">
                      linkedin.com/in/kaarthik-m
                    </p>
                  </div>
                </a>

                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-sm"
                  aria-label="Visit Kaarthik's GitHub profile (opens in new tab)"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/15 flex items-center justify-center group-hover:bg-white/12 transition-colors">
                    <Github className="w-4 h-4 text-slate-muted" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-muted/70 uppercase tracking-widest font-mono mb-0.5">
                      GitHub
                    </p>
                    <p className="text-warm-white font-medium group-hover:text-warm-white transition-colors">
                      github.com/thamizhkarthik05
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Availability status */}
            <div className="flex items-center gap-3 px-5 py-3.5 bg-emerald-500/10 border border-emerald-500/25 rounded-xl shadow-origami-sm">
              <div
                className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.5)] animate-pulse shrink-0"
                aria-hidden="true"
              />
              <p className="text-sm text-slate-muted">
                <span className="font-semibold text-warm-white">Open to opportunities</span> — internships,
                research collaboration, and product engineering.
              </p>
            </div>
          </div>

          {/* Right: Working Contact form */}
          <div
            className={`p-6 sm:p-8 bg-[#151F38] border border-violet-electric/25 rounded-2xl shadow-origami-md transition-all duration-700 delay-250 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              aria-label="Contact form"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {/* 1. Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-slate-muted uppercase tracking-widest mb-1.5"
                  >
                    Name <span className="text-violet-electric" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass('name')}
                    disabled={status === 'submitting'}
                    aria-required="true"
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {touched.name && errors.name && (
                    <p id="contact-name-error" className="text-xs text-rose-400 mt-1 font-mono">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* 2. Email Address Field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-slate-muted uppercase tracking-widest mb-1.5"
                  >
                    Email Address <span className="text-violet-electric" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass('email')}
                    disabled={status === 'submitting'}
                    aria-required="true"
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {touched.email && errors.email && (
                    <p id="contact-email-error" className="text-xs text-rose-400 mt-1 font-mono">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* 3. Subject Field */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold text-slate-muted uppercase tracking-widest mb-1.5"
                >
                  Subject <span className="text-violet-electric" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="What's on your mind?"
                  value={form.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('subject')}
                  disabled={status === 'submitting'}
                  aria-required="true"
                  aria-invalid={touched.subject && !!errors.subject}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                />
                {touched.subject && errors.subject && (
                  <p id="contact-subject-error" className="text-xs text-rose-400 mt-1 font-mono">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* 4. Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-slate-muted uppercase tracking-widest mb-1.5"
                >
                  Message <span className="text-violet-electric" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  rows={5}
                  placeholder="Tell me about your project, idea, or collaboration..."
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputClass('message')} resize-none`}
                  disabled={status === 'submitting'}
                  aria-required="true"
                  aria-invalid={touched.message && !!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
                {touched.message && errors.message && (
                  <p id="contact-message-error" className="text-xs text-rose-400 mt-1 font-mono">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Success Notification */}
              {status === 'success' && (
                <div
                  className="flex flex-col gap-2 p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-xl text-sm text-emerald-300 animate-fadeIn"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>Message Accepted & Sent!</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {serverMessage}
                  </p>
                </div>
              )}

              {/* Error Notification with Direct Mailto Fallback Action */}
              {status === 'error' && (
                <div
                  className="flex flex-col gap-3 p-4 bg-rose-500/15 border border-rose-500/40 rounded-xl text-xs text-rose-200 animate-fadeIn"
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                      <p className="font-semibold text-rose-300 mb-1">Notice</p>
                      <p className="text-slate-300 leading-relaxed mb-3">
                        {serverMessage}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={getDirectMailto()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-warm-white font-mono font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-cyan-vivid" aria-hidden="true" />
                          <span>Send via Email Client (Fallback)</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setStatus('idle')}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-slate-400 hover:text-white transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" /> Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-violet-electric to-cyan-vivid hover:opacity-95 text-midnight font-bold text-sm rounded-xl transition-all duration-300 shadow-glow-violet hover:shadow-glow-cyan disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-vivid mt-2 cursor-pointer"
                aria-label="Send message"
              >
                {status === 'submitting' ? (
                  <>
                    <div
                      className="w-4 h-4 border-2 border-midnight/30 border-t-midnight rounded-full animate-spin"
                      aria-hidden="true"
                    />
                    <span>Submitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-midnight" aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
