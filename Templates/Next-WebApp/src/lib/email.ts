import type { ReactElement } from "react";
import { Resend } from "resend";
import { env } from "@/lib/env";

let resend: Resend | null = null;
if (env.RESEND_API_KEY) {
  resend = new Resend(env.RESEND_API_KEY);
}

interface SendEmailOptions {
  to: string;
  subject: string;
  react: ReactElement;
}

export async function sendEmail({ to, subject, react }: SendEmailOptions) {
  if (!resend) {
    // Dev fallback: log the email instead of sending
    console.log(`[EMAIL] To: ${to} | Subject: ${subject}`);
    return { success: true, devMode: true };
  }

  const { data, error } = await resend.emails.send({
    from: "no-reply@yourdomain.com", // TODO: update to your verified sender domain
    to,
    subject,
    react,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return { success: true, data };
}
