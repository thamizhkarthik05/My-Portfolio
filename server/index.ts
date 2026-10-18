/**
 * Portfolio Contact API Server — Node.js + Express + Nodemailer (SMTP)
 *
 * Runs as a local development server during `npm run dev`.
 * In production, deploy this as a serverless function or standalone Node.js service.
 *
 * Required environment variables (set in .env):
 *   SMTP_HOST     — SMTP server hostname (e.g. smtp.gmail.com)
 *   SMTP_PORT     — SMTP server port (465 for SSL, 587 for STARTTLS, 25 for plain)
 *   SMTP_SECURE   — "true" for port 465 (SSL), "false" for STARTTLS (port 587)
 *   SMTP_USER     — SMTP authenticated username (usually your email address)
 *   SMTP_PASS     — SMTP password or app-specific password
 *   CONTACT_EMAIL — Recipient email address (where messages are delivered)
 *   PORT          — Optional server port (default: 3001)
 */

import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

// ---------------------------------------------------------------------------
// Environment
// ---------------------------------------------------------------------------
const PORT = parseInt(process.env.PORT ?? '3001', 10);
const SMTP_HOST = process.env.SMTP_HOST ?? '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT ?? '587', 10);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const SMTP_USER = process.env.SMTP_USER ?? '';
const SMTP_PASS = process.env.SMTP_PASS ?? '';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? '';

// ---------------------------------------------------------------------------
// Rate limiter — sliding window: max 5 submissions per IP per 10 minutes
// ---------------------------------------------------------------------------
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

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitMap) {
    if (val.expiresAt < now) rateLimitMap.delete(key);
  }
}, 5 * 60 * 1000);

// ---------------------------------------------------------------------------
// Input sanitizer — strip newlines / tabs that could enable header injection
// ---------------------------------------------------------------------------
function sanitize(str: string, maxLen: number): string {
  return String(str).replace(/[\r\n\t]/g, ' ').slice(0, maxLen).trim();
}

// ---------------------------------------------------------------------------
// SMTP Transporter — created lazily so the server still boots when env is unset
// ---------------------------------------------------------------------------
function createTransporter() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: {
      // Accept self-signed certs only in dev; in production leave default (false)
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    },
    connectionTimeout: 10_000,
    greetingTimeout: 5_000,
    socketTimeout: 15_000,
  });
}

// ---------------------------------------------------------------------------
// Express app
// ---------------------------------------------------------------------------
const app = express();

app.use(cors({ origin: '*', methods: ['POST', 'OPTIONS'] }));
app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: false, limit: '32kb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    smtpConfigured: !!(SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_EMAIL),
    timestamp: new Date().toISOString(),
  });
});

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
app.post('/api/contact', async (req, res) => {
  // Rate limiting
  const clientIp =
    ((req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown')
      .split(',')[0]
      .trim();

  if (!checkRateLimit(clientIp)) {
    res.status(429).json({
      error: 'Too many messages sent from your IP. Please wait a few minutes and try again.',
    });
    return;
  }

  // Parse and validate body
  const { name, email, subject, message } = req.body ?? {};

  if (!name || String(name).trim().length < 2) {
    res.status(400).json({ error: 'Name is required (minimum 2 characters).' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(String(email).trim())) {
    res.status(400).json({ error: 'A valid email address is required.' });
    return;
  }

  if (!subject || String(subject).trim().length < 3) {
    res.status(400).json({ error: 'Subject is required (minimum 3 characters).' });
    return;
  }

  if (!message || String(message).trim().length < 10) {
    res.status(400).json({ error: 'Message is required (minimum 10 characters).' });
    return;
  }

  // Sanitize inputs
  const cleanName = sanitize(name, 100);
  const cleanEmail = sanitize(email, 150);
  const cleanSubject = sanitize(subject, 200);
  const cleanMessage = String(message).slice(0, 5000).trim();

  // SMTP configuration check
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
    console.warn('[contact] SMTP environment variables are not configured.');
    res.status(503).json({
      error:
        'Email delivery is not configured on the server. Please contact me directly at the email address shown on the page.',
      configured: false,
    });
    return;
  }

  // Compose email
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const textBody = `
You have received a new contact form submission from your portfolio website.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  FROM:     ${cleanName} <${cleanEmail}>
  SUBJECT:  ${cleanSubject}
  SENT:     ${timestamp} IST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${cleanMessage}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reply directly to this email to respond to ${cleanName}.
  `.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,sans-serif;background:#0d1117;color:#e2e8f0;margin:0;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#151f38;border-radius:16px;overflow:hidden;border:1px solid rgba(99,91,255,0.3);">
    <div style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:24px 28px;">
      <h1 style="margin:0;font-size:18px;font-weight:700;color:#fff;letter-spacing:0.02em;">
        📬 New Portfolio Contact
      </h1>
    </div>
    <div style="padding:28px;">
      <table style="width:100%;border-collapse:collapse;font-size:13px;font-family:monospace;margin-bottom:20px;">
        <tr>
          <td style="padding:8px 0;color:#94a3b8;width:90px;vertical-align:top;">From</td>
          <td style="padding:8px 0;color:#e2e8f0;font-weight:600;">${cleanName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#94a3b8;vertical-align:top;">Reply-To</td>
          <td style="padding:8px 0;"><a href="mailto:${cleanEmail}" style="color:#06b6d4;text-decoration:none;">${cleanEmail}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#94a3b8;vertical-align:top;">Subject</td>
          <td style="padding:8px 0;color:#e2e8f0;">${cleanSubject}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#94a3b8;vertical-align:top;">Sent</td>
          <td style="padding:8px 0;color:#e2e8f0;">${timestamp} IST</td>
        </tr>
      </table>
      <div style="background:#0d1117;border-radius:10px;padding:18px 20px;border:1px solid rgba(99,91,255,0.2);font-size:14px;line-height:1.7;color:#cbd5e1;white-space:pre-wrap;">${cleanMessage}</div>
    </div>
    <div style="padding:16px 28px;border-top:1px solid rgba(99,91,255,0.2);font-size:11px;color:#64748b;text-align:center;">
      Submitted via kaarthik-m.dev portfolio contact form
    </div>
  </div>
</body>
</html>
  `.trim();

  // Send via SMTP
  const transporter = createTransporter()!;
  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: `${cleanName} <${cleanEmail}>`,
      subject: `Portfolio Contact — ${cleanSubject}`,
      text: textBody,
      html: htmlBody,
    });

    console.log(`[contact] Message accepted: ${info.messageId} from ${cleanEmail}`);

    res.status(200).json({
      success: true,
      message: 'Your message has been delivered successfully.',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    // Log error without exposing credentials or stack traces
    console.error(`[contact] SMTP delivery failed: ${errorMsg.replace(SMTP_PASS, '***')}`);

    res.status(500).json({
      error:
        'The email could not be delivered due to a server error. Please try again or reach out directly via the email address shown on the page.',
    });
  }
});

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  const smtpOk = !!(SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_EMAIL);
  console.log(`[server] Contact API listening on http://localhost:${PORT}`);
  console.log(`[server] SMTP configured: ${smtpOk ? 'YES ✓' : 'NO — set SMTP_* variables in .env'}`);
  if (smtpOk) {
    console.log(`[server] Delivering to: ${CONTACT_EMAIL}`);
  }
});
