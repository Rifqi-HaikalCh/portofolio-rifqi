'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { contactInfo } from '../../data/portfolio';

/*
  Contact form Server Action (DesignRules.md §4 `06`, §12).
  Validates with zod, drops bots (honeypot + minimum fill time), and reports
  `sent` only after Resend accepts the message, so the postmark never lies.
*/

export type ContactField = 'name' | 'email' | 'subject' | 'message';
export type ContactIssue = 'required' | 'email' | 'long';

export interface ContactState {
  status: 'idle' | 'sent' | 'invalid' | 'failed' | 'too-fast';
  issues?: Partial<Record<ContactField, ContactIssue>>;
  values?: Partial<Record<ContactField, string>>;
}

const MIN_FILL_MS = 3000;

const text = (max: number) =>
  z
    .string()
    .trim()
    .min(1, { message: 'required' })
    .max(max, { message: 'long' });

const schema = z.object({
  name: text(120),
  email: z.string().trim().min(1, { message: 'required' }).max(180, { message: 'long' }).pipe(z.email({ message: 'email' })),
  subject: text(180),
  message: text(5000),
});

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function sendMessage(_previous: ContactState, form: FormData): Promise<ContactState> {
  const raw = {
    name: String(form.get('name') ?? ''),
    email: String(form.get('email') ?? ''),
    subject: String(form.get('subject') ?? ''),
    message: String(form.get('message') ?? ''),
  };

  // Bots fill every field they find; people never see this one.
  if (String(form.get('website') ?? '') !== '') return { status: 'sent' };

  const startedAt = Number(form.get('startedAt') ?? 0);
  if (startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) return { status: 'too-fast', values: raw };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const issues: ContactState['issues'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      if (!issues[field]) issues[field] = issue.message as ContactIssue;
    }
    return { status: 'invalid', issues, values: raw };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { status: 'failed', values: raw };

  const { name, email, subject, message } = parsed.data;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: contactInfo.email,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `<p><strong>Name</strong><br>${escapeHtml(name)}</p><p><strong>Email</strong><br>${escapeHtml(email)}</p><p><strong>Subject</strong><br>${escapeHtml(subject)}</p><p><strong>Message</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
  });

  if (error) return { status: 'failed', values: raw };
  return { status: 'sent' };
}
