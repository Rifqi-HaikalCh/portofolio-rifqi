'use client';

import { useActionState, useEffect, useRef } from 'react';
import { Loader, Send } from 'lucide-react';
import { sendMessage, type ContactField, type ContactIssue, type ContactState } from '../../app/actions/contact';
import { useLanguage } from '../../context/LanguageContext';
import { T } from '../ui/T';

const issueCopy: Record<ContactIssue, { en: string; id: string }> = {
  required: { en: 'Fill this in.', id: 'Isi bagian ini.' },
  email: { en: 'Use an address like name@example.com.', id: 'Gunakan alamat seperti nama@contoh.com.' },
  long: { en: 'This is too long.', id: 'Ini terlalu panjang.' },
};

const fields: Array<{ name: ContactField; en: string; id: string; type?: string; autoComplete?: string; area?: boolean }> = [
  { name: 'name', en: 'Your name', id: 'Nama Anda', autoComplete: 'name' },
  { name: 'email', en: 'Email for the reply', id: 'Email untuk balasan', type: 'email', autoComplete: 'email' },
  { name: 'subject', en: 'Subject', id: 'Subjek' },
  { name: 'message', en: 'Message', id: 'Pesan', area: true },
];

/*
  The letter itself. Works without JS (plain form post to the Server Action);
  with JS, useActionState keeps the values and shows field errors inline.
  The postmark appears only for `sent`, which the action returns after a 2xx.
*/
export function ContactForm() {
  const { say } = useLanguage();
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, { status: 'idle' });
  const startedRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  // Stamp when the reader arrived, for the minimum fill time (no JS: no stamp, no check).
  useEffect(() => {
    if (startedRef.current && !startedRef.current.value) startedRef.current.value = String(Date.now());
  }, [state]);

  useEffect(() => {
    if (state.status === 'invalid') {
      const first = (Object.keys(state.issues ?? {}) as ContactField[])[0];
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    } else if (state.status !== 'idle') {
      statusRef.current?.focus();
    }
  }, [state]);

  if (state.status === 'sent') {
    return (
      <div className="flex flex-col items-start gap-6 p-6 md:p-10" role="status">
        <span className="postmark font-mono text-[0.625rem] uppercase leading-tight tracking-[0.12em]" aria-hidden="true">
          <span className="text-center">
            <T en="Sent" id="Terkirim" />
            <br />
            JKT
          </span>
        </span>
        <div>
          <p className="font-serif text-3xl text-ink">
            <T en="Your letter is on its way." id="Surat Anda sedang dikirim." />
          </p>
          <p className="mt-2 max-w-[52ch] text-muted">
            <T en="I'll reply to the email address you gave." id="Saya akan membalas ke alamat email yang Anda berikan." />
          </p>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} noValidate className="grid gap-6 p-6 md:p-10">
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {fields.map((field) => {
          const issue = state.issues?.[field.name];
          const id = `contact-${field.name}`;
          const errorId = `${id}-error`;
          const shared = {
            id,
            name: field.name,
            required: true,
            defaultValue: state.values?.[field.name] ?? '',
            'aria-invalid': issue ? true : undefined,
            'aria-describedby': issue ? errorId : undefined,
            className: 'field mt-2 w-full border border-line bg-paper px-4 py-3 text-ink placeholder:text-muted focus:border-accent focus:outline-none',
          } as const;
          return (
            <div key={`${field.name}-${state.status}`} className={field.area || field.name === 'subject' ? 'md:col-span-2' : ''}>
              <label htmlFor={id} className="block text-sm text-ink">
                <T en={field.en} id={field.id} />
              </label>
              {field.area ? (
                <textarea {...shared} rows={6} className={`${shared.className} resize-y`} />
              ) : (
                <input {...shared} type={field.type ?? 'text'} autoComplete={field.autoComplete} />
              )}
              {issue && (
                <p id={errorId} className="mt-2 text-sm text-accent">
                  <T en={issueCopy[issue].en} id={issueCopy[issue].id} />
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="text-sm text-accent empty:hidden">
        {state.status === 'failed' &&
          say(
            'The message could not be sent. Please try again, or email me directly.',
            'Pesan gagal dikirim. Coba lagi, atau kirim email langsung.'
          )}
        {state.status === 'too-fast' &&
          say('That was quick. Give it a second look, then send again.', 'Terlalu cepat. Periksa sekali lagi, lalu kirim ulang.')}
      </p>

      <div>
        <button type="submit" disabled={pending} className="btn-primary-custom">
          {pending ? <Loader size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
          {pending ? <T en="Sending…" id="Mengirim…" /> : <T en="Send the letter" id="Kirim surat" />}
        </button>
      </div>
    </form>
  );
}
