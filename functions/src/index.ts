
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import handler from "./contactHandler";

const SMTP_HOST = defineSecret("SMTP_HOST");
const SMTP_PORT = defineSecret("SMTP_PORT");
const SMTP_SECURE = defineSecret("SMTP_SECURE");
const SMTP_USER = defineSecret("SMTP_USER");
const SMTP_PASS = defineSecret("SMTP_PASS");
const CONTACT_EMAIL = defineSecret("CONTACT_EMAIL");

export const contact = onRequest(
  {
    region: "asia-south1",
    secrets: [
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_EMAIL,
    ],
  },
  async (req, res) => {
    await handler(req, res);
  }
);
