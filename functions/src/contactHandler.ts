/**
 * Contact API Handler — Nodemailer SMTP
 *
 * Used for:
 * - Vercel / Netlify serverless functions (deploy api/contact.ts as a function)
 * - Local development via Express proxy (see server/index.ts which handles /api/contact)
 *
 * Environment Variables:
 *   SMTP_HOST     — SMTP server hostname
 *   SMTP_PORT     — SMTP port (587 STARTTLS / 465 SSL)
 *   SMTP_SECURE   — "true" for port 465 SSL, "false" for port 587 STARTTLS
 *   SMTP_USER     — Authenticated SMTP username (your sending email)
 *   SMTP_PASS     — SMTP password or app-specific password
 *   CONTACT_EMAIL — Recipient address for delivered messages
 */

import nodemailer from 'nodemailer';

interface ContactRequestBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Simple in-memory rate limiter (5 requests / 10 minutes per IP)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.expiresAt < now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count += 1;
  return true;
}

// Strip characters that could enable SMTP header injection
function sanitize(str: string, maxLen: number): string {
  return String(str).replace(/[\r\n\t]/g, ' ').slice(0, maxLen).trim();
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });

  // Rate limiting by IP
  const clientIp = ((req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown') as string)
    .split(',')[0]
    .trim();

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Too many messages sent from this IP. Please wait a few minutes and try again.',
    });
  }

  // Parse body
  let body: ContactRequestBody;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  } catch {
    return res.status(400).json({ error: 'Invalid JSON request payload.' });
  }

  const { name, email, subject, message } = body;

  // Server-side validation
  if (!name || String(name).trim().length < 2)
    return res.status(400).json({ error: 'Name is required (minimum 2 characters).' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(String(email).trim()))
    return res.status(400).json({ error: 'A valid email address is required.' });

  if (!subject || String(subject).trim().length < 3)
    return res.status(400).json({ error: 'Subject is required (minimum 3 characters).' });

  if (!message || String(message).trim().length < 10)
    return res.status(400).json({ error: 'Message is required (minimum 10 characters).' });

  const cleanName = sanitize(name, 100);
  const cleanEmail = sanitize(email, 150);
  const cleanSubject = sanitize(subject, 200);
  const cleanMessage = String(message).slice(0, 5000).trim();

  // Check SMTP configuration
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT ?? '587', 10);
  const smtpSecure = process.env.SMTP_SECURE === 'true';
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!smtpHost || !smtpUser || !smtpPass || !contactEmail) {
    console.warn('[contact] SMTP environment variables are not configured.');
    return res.status(503).json({
      error:
        'Email delivery is not configured on the server. Please contact me directly at the email address shown on the page.',
      configured: false,
    });
  }

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const textBody = `
New contact form submission from your portfolio website.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  FROM:     ${cleanName} <${cleanEmail}>
  SUBJECT:  ${cleanSubject}
  SENT:     ${timestamp} IST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${cleanMessage}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reply to this email to respond to ${cleanName}.
  `.trim();

  const htmlBody = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:system-ui,sans-serif;background:#0d1117;color:#e2e8f0;margin:0;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#151f38;border-radius:16px;overflow:hidden;border:1px solid rgba(99,91,255,0.3);">
    <div style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:24px 28px;">
      <h1 style="margin:0;font-size:18px;font-weight:700;color:#fff;">📬 New Portfolio Contact</h1>
    </div>
    <div style="padding:28px;">
      <table style="width:100%;border-collapse:collapse;font-size:13px;font-family:monospace;margin-bottom:20px;">
        <tr><td style="padding:8px 0;color:#94a3b8;width:90px;">From</td><td style="padding:8px 0;color:#e2e8f0;font-weight:600;">${cleanName}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8;">Reply-To</td><td style="padding:8px 0;"><a href="mailto:${cleanEmail}" style="color:#06b6d4;">${cleanEmail}</a></td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8;">Subject</td><td style="padding:8px 0;color:#e2e8f0;">${cleanSubject}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8;">Sent</td><td style="padding:8px 0;color:#e2e8f0;">${timestamp} IST</td></tr>
      </table>
      <div style="background:#0d1117;border-radius:10px;padding:18px;border:1px solid rgba(99,91,255,0.2);font-size:14px;line-height:1.7;color:#cbd5e1;white-space:pre-wrap;">${cleanMessage}</div>
    </div>
    <div style="padding:16px 28px;border-top:1px solid rgba(99,91,255,0.2);font-size:11px;color:#64748b;text-align:center;">
      Submitted via portfolio contact form
    </div>
  </div>
</body></html>`;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
    connectionTimeout: 10_000,
    greetingTimeout: 5_000,
    socketTimeout: 15_000,
  });

  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: contactEmail,
      replyTo: `${cleanName} <${cleanEmail}>`,
      subject: `Portfolio Contact — ${cleanSubject}`,
      text: textBody,
      html: htmlBody,
    });

    console.log(`[contact] Accepted: ${info.messageId} (from ${cleanEmail})`);
    return res.status(200).json({ success: true, message: 'Your message has been delivered successfully.' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[contact] SMTP error: ${msg}`);
    return res.status(500).json({
      error:
        'The email could not be delivered due to a server error. Please try again or reach out directly via the email address shown on the page.',
    });
  }
}
