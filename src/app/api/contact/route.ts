import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactInfo } from '../../../data/portfolio';

const MAX_NAME = 120;
const MAX_SUBJECT = 180;
const MAX_MESSAGE = 5000;

function readField(value: unknown, max: number) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Mail is not configured.' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid message.' }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const name = readField(payload.name, MAX_NAME);
  const email = readField(payload.email, 180);
  const subject = readField(payload.subject, MAX_SUBJECT);
  const message = readField(payload.message, MAX_MESSAGE);

  if (!name || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Name, email, subject, and message are required.' }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: contactInfo.email,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `<p><strong>Name</strong><br>${safeName}</p><p><strong>Email</strong><br>${safeEmail}</p><p><strong>Subject</strong><br>${safeSubject}</p><p><strong>Message</strong><br>${safeMessage}</p>`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: 'The message could not be sent.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
