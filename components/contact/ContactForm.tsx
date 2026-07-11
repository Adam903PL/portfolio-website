'use client';

import { useReducer } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { tapScale, DURATION } from '@/lib/motion';

const INVERT = 'rgba(237,231,218,0.28)';

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

const inputClass =
  'w-full border bg-transparent px-3.5 py-[13px] text-[15px] text-cream outline-none transition-colors placeholder:text-[#9A9382] focus:border-accent';

export function ContactForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

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

  return (
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
        <m.button
          type="button"
          onClick={send}
          disabled={state.status === 'sending'}
          className="mt-1.5 cursor-pointer border-none bg-accent px-[22px] py-4 font-mono text-[13px] uppercase tracking-[0.04em] text-[color:var(--color-accent-ink)] disabled:cursor-not-allowed disabled:opacity-60"
          whileTap={tapScale}
        >
          <AnimatePresence mode="wait">
            {state.status === 'sending' ? (
              <m.span
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.fast }}
              >
                Sending…
              </m.span>
            ) : (
              <m.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.fast }}
              >
                Send message →
              </m.span>
            )}
          </AnimatePresence>
        </m.button>
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
  );
}
