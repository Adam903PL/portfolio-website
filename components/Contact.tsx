'use client';

import React, { useReducer, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tapScale, DURATION, EASE_SHARP } from '@/lib/motion';

const EMAIL = 'pukaluk.adam505@gmail.com';
const LINE = 'rgba(26,23,18,0.16)';
const LINE_STRONG = 'rgba(26,23,18,0.18)';
const INVERT = 'rgba(237,231,218,0.28)';

const socials = [
  { label: 'GitHub ↗', href: 'https://github.com/Adam903PL/' },
  {
    label: 'LinkedIn ↗',
    href: 'https://www.linkedin.com/in/adam-pukaluk-339058298/',
  },
  { label: 'Twitter ↗', href: 'https://x.com/adam_p903' },
  { label: '☕ Coffee ↗', href: 'https://buymeacoffee.com/adam903' },
];

type Status = 'idle' | 'sending' | 'success' | 'error';

type FormState = {
  name: string;
  email: string;
  message: string;
  status: Status;
  feedback: string;
};

type FormAction =
  | { type: 'field'; field: 'name' | 'email' | 'message'; value: string }
  | { type: 'submitting' }
  | { type: 'success'; feedback: string }
  | { type: 'error'; feedback: string }
  | { type: 'invalid'; feedback: string };

const initialFormState: FormState = {
  name: '',
  email: '',
  message: '',
  status: 'idle',
  feedback: '',
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'field':
      return { ...state, [action.field]: action.value };
    case 'submitting':
      return { ...state, status: 'sending', feedback: '' };
    case 'success':
      return {
        ...state,
        status: 'success',
        feedback: action.feedback,
        name: '',
        email: '',
        message: '',
      };
    case 'error':
    case 'invalid':
      return { ...state, status: 'error', feedback: action.feedback };
    default:
      return state;
  }
}

export default function Contact() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const [copyLabel, setCopyLabel] = useState('Copy');

  const copyEmail = () => {
    const done = () => {
      setCopyLabel('Copied!');
      setTimeout(() => setCopyLabel('Copy'), 1600);
    };
    try {
      navigator.clipboard.writeText(EMAIL).then(done, done);
    } catch {
      done();
    }
  };

  const send = async () => {
    const name = state.name.trim();
    const email = state.email.trim();
    const message = state.message.trim();

    if (!name || !email || !message) {
      dispatch({
        type: 'invalid',
        feedback: 'Please add your name, email and a message.',
      });
      return;
    }

    dispatch({ type: 'submitting' });

    const [firstName, ...rest] = name.split(/\s+/);

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(' '),
          email,
          message,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: { message?: string } | string;
        } | null;
        const detail =
          typeof data?.error === 'string' ? data.error : data?.error?.message;
        throw new Error(detail || `Request failed (${res.status})`);
      }

      dispatch({
        type: 'success',
        feedback: "Message sent - I'll get back to you within a day.",
      });
    } catch (err) {
      dispatch({
        type: 'error',
        feedback:
          err instanceof Error
            ? err.message
            : 'Something went wrong - email me directly instead.',
      });
    }
  };

  const inputClass =
    'w-full border bg-transparent px-3.5 py-[13px] text-[15px] text-cream outline-none transition-colors placeholder:text-[#9A9382] focus:border-accent';

  return (
    <>
      {/* Page hero */}
      <section className="side-pad relative z-[2] pb-5 pt-16">
        <div className="mb-[26px] font-mono text-[13px] uppercase tracking-[0.08em] text-accent">
          Contact - let&apos;s build something
        </div>
        <h1 className="display-xl m-0 font-sans font-medium leading-[0.9] tracking-[-0.03em]">
          Say{' '}
          <span className="font-serif text-[1.05em] italic text-accent">
            hello
          </span>
          .
        </h1>
      </section>

      <section className="side-pad relative z-[2] pb-[60px] pt-6">
        <div
          className="contact-grid grid border bg-paper min-[901px]:grid-cols-[0.95fr_1.05fr]"
          style={{ borderColor: LINE_STRONG }}
        >
          {/* Left: direct methods */}
          <div
            className="flex flex-col border-b px-9 py-10 min-[901px]:border-b-0 min-[901px]:border-r"
            style={{ borderColor: LINE }}
          >
            <p className="m-0 max-w-[400px] text-[17px] leading-[1.6] text-ink-70">
              Open to full-stack roles, freelance builds and interesting
              collaborations. Fastest way to reach me is email - I usually reply
              within a day.
            </p>

            <div className="mt-[34px] flex flex-col">
              {/* email */}
              <div
                className="flex items-center justify-between gap-3.5 border-t py-[18px]"
                style={{ borderColor: LINE }}
              >
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-30">
                    Email
                  </div>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-[5px] block text-[16px] font-semibold text-ink no-underline"
                  >
                    {EMAIL}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="cursor-pointer border bg-transparent px-[13px] py-[9px] font-mono text-[11px] uppercase tracking-[0.04em] text-ink"
                  style={{ borderColor: 'rgba(26,23,18,0.28)' }}
                >
                  {copyLabel}
                </button>
              </div>
              {/* phone */}
              <div
                className="flex items-center justify-between gap-3.5 border-t py-[18px]"
                style={{ borderColor: LINE }}
              >
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-30">
                    Phone
                  </div>
                  <a
                    href="tel:+48695031104"
                    className="mt-[5px] block text-[16px] font-semibold text-ink no-underline"
                  >
                    +48 695 031 104
                  </a>
                </div>
                <span className="font-mono text-[11px] text-ink-30">PL</span>
              </div>
              {/* location */}
              <div
                className="flex items-center justify-between gap-3.5 border-y py-[18px]"
                style={{ borderColor: LINE }}
              >
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-30">
                    Based in
                  </div>
                  <div className="mt-[5px] text-[16px] font-semibold">
                    Lublin, Poland
                  </div>
                </div>
                <span className="font-mono text-[11px] text-live-ink">
                  ● Available
                </span>
              </div>
            </div>

            <div className="mt-auto pt-[34px]">
              <div className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-30">
                Elsewhere
              </div>
              <div className="flex flex-wrap gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border px-[15px] py-2.5 font-mono text-[12px] text-ink no-underline transition-colors hover:border-accent"
                    style={{ borderColor: 'rgba(26,23,18,0.28)' }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="flex flex-col bg-ink px-9 py-10 text-cream">
            <div className="mb-[26px] font-mono text-[12px] uppercase tracking-[0.06em] text-accent">
              / Send a message
            </div>
            <div className="flex flex-col gap-[18px]">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.04em] text-cream-50"
                >
                  Your name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={state.name}
                  onChange={(e) =>
                    dispatch({
                      type: 'field',
                      field: 'name',
                      value: e.target.value,
                    })
                  }
                  placeholder="Jane Kowalska"
                  className={inputClass}
                  style={{ borderColor: INVERT }}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.04em] text-cream-50"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={state.email}
                  onChange={(e) =>
                    dispatch({
                      type: 'field',
                      field: 'email',
                      value: e.target.value,
                    })
                  }
                  placeholder="you@company.com"
                  className={inputClass}
                  style={{ borderColor: INVERT }}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.04em] text-cream-50"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={state.message}
                  onChange={(e) =>
                    dispatch({
                      type: 'field',
                      field: 'message',
                      value: e.target.value,
                    })
                  }
                  placeholder="Tell me about the project, role or idea…"
                  className={`${inputClass} resize-y leading-[1.5]`}
                  style={{ borderColor: INVERT }}
                />
              </div>
              <motion.button
                type="button"
                onClick={send}
                disabled={state.status === 'sending'}
                className="mt-1.5 cursor-pointer border-none bg-accent px-[22px] py-4 font-mono text-[13px] uppercase tracking-[0.04em] text-[color:var(--color-accent-ink)] disabled:cursor-not-allowed disabled:opacity-60"
                whileTap={tapScale}
              >
                <AnimatePresence mode="wait">
                  {state.status === 'sending' ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: DURATION.fast }}
                    >
                      Sending…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: DURATION.fast }}
                    >
                      Send message →
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <div
                className="font-mono text-[11px] leading-[1.5]"
                style={{
                  color:
                    state.status === 'success'
                      ? '#7FD18B'
                      : state.status === 'error'
                        ? 'var(--color-accent)'
                        : 'rgba(237,231,218,0.4)',
                }}
                role="status"
                aria-live="polite"
              >
                {state.feedback ||
                  'Sends straight to my inbox - no mail client needed.'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
