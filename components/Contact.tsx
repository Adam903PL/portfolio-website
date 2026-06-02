'use client';

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import {
  Check,
  Copy,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
  X,
} from 'lucide-react';

const CONTACT_EMAIL = 'pukaluk.adam505@gmail.com';
const CONTACT_PHONE = '+48 695 031 104';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';
type FieldName = keyof FormData;

function FieldGroup({
  id,
  label,
  error,
  icon,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"
      >
        <span className="text-gray-500">{icon}</span>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-gray-300">
          {error}
        </p>
      )}
    </div>
  );
}

function fieldClass(hasError?: boolean) {
  return `w-full rounded-lg border bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors duration-200 placeholder:text-gray-600 focus:border-white/45 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
    hasError ? 'border-white/35' : 'border-white/10'
  }`;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const nextErrors: Partial<Record<FieldName, string>> = {};

    if (!formData.firstName.trim()) {
      nextErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      nextErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address';
    }
    if (!formData.message.trim()) {
      nextErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      nextErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
      setTimeout(() => setStatus('idle'), 2600);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2600);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const fieldName = name as FieldName;

    setFormData((current) => ({ ...current, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((current) => ({ ...current, [fieldName]: undefined }));
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  return (
    <main className="min-h-screen px-4 pb-20 pt-28">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase text-gray-500">
            Contact
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl text-white">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400">
            Send a clear brief, a rough idea, or a technical question. I read
            every message and usually respond fast when the scope is concrete.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-2xl border border-white/10 bg-black/75 p-6 backdrop-blur-xl lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase text-gray-500">
              Direct line
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              No color noise. Just the useful routes.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Best for full-stack work, automation, portfolio projects and
              practical web interfaces that need to feel sharp without getting
              loud.
            </p>

            <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 py-4 text-sm text-gray-300 transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <span className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-black/30">
                  <Mail className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase text-gray-500">
                    Email
                  </span>
                  <span className="block truncate">{CONTACT_EMAIL}</span>
                </span>
              </a>

              <a
                href="tel:+48695031104"
                className="flex items-center gap-3 py-4 text-sm text-gray-300 transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <span className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-black/30">
                  <Phone className="size-4" />
                </span>
                <span>
                  <span className="block text-xs uppercase text-gray-500">
                    Phone
                  </span>
                  <span>{CONTACT_PHONE}</span>
                </span>
              </a>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-black/30 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {copied ? (
                <>
                  <Check className="size-4" />
                  Email copied
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copy email
                </>
              )}
            </button>

            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
              <div>
                <p className="text-2xl font-bold text-white">24h</p>
                <p className="mt-1 text-xs uppercase text-gray-500">
                  usual reply
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">PL / EN</p>
                <p className="mt-1 text-xs uppercase text-gray-500">language</p>
              </div>
            </div>
          </aside>

          <section
            id="contact-form"
            className="scroll-mt-28 rounded-2xl border border-white/10 bg-black/75 p-5 backdrop-blur-xl sm:p-8"
          >
            {status !== 'idle' && (
              <div
                role={status === 'error' ? 'alert' : 'status'}
                className="mb-6 flex items-center gap-3 rounded-lg border border-white/15 bg-black/35 p-4 text-sm text-gray-200"
              >
                {status === 'success' && <Check className="size-5" />}
                {status === 'error' && <X className="size-5" />}
                {status === 'sending' && (
                  <span
                    aria-hidden
                    className="size-5 rounded-full border-2 border-white/20 border-t-white motion-safe:animate-spin"
                  />
                )}
                <p>
                  {status === 'success' &&
                    'Message sent. I will get back to you soon.'}
                  {status === 'error' &&
                    'Something went wrong. Try again or use direct email.'}
                  {status === 'sending' && 'Sending message...'}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldGroup
                  id="firstName"
                  label="First Name"
                  error={errors.firstName}
                  icon={<User className="size-4" />}
                >
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.firstName)}
                    aria-describedby={
                      errors.firstName ? 'firstName-error' : undefined
                    }
                    placeholder="Adam"
                    className={fieldClass(Boolean(errors.firstName))}
                  />
                </FieldGroup>

                <FieldGroup
                  id="lastName"
                  label="Last Name"
                  error={errors.lastName}
                  icon={<User className="size-4" />}
                >
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.lastName)}
                    aria-describedby={
                      errors.lastName ? 'lastName-error' : undefined
                    }
                    placeholder="Pukaluk"
                    className={fieldClass(Boolean(errors.lastName))}
                  />
                </FieldGroup>
              </div>

              <FieldGroup
                id="email"
                label="Email Address"
                error={errors.email}
                icon={<Mail className="size-4" />}
              >
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="adam@example.com"
                  className={fieldClass(Boolean(errors.email))}
                />
              </FieldGroup>

              <FieldGroup
                id="phone"
                label="Phone Number (optional)"
                icon={<Phone className="size-4" />}
              >
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={CONTACT_PHONE}
                  className={fieldClass()}
                />
              </FieldGroup>

              <FieldGroup
                id="message"
                label="Your Message"
                error={errors.message}
                icon={<MessageSquare className="size-4" />}
              >
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                  placeholder="Tell me what you want to build, fix, automate or launch..."
                  className={`${fieldClass(Boolean(errors.message))} resize-none`}
                />
              </FieldGroup>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-black transition-colors duration-200 hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-black/70 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {status === 'sending' ? (
                  <>
                    <span
                      aria-hidden
                      className="size-4 rounded-full border-2 border-black/20 border-t-black motion-safe:animate-spin"
                    />
                    Sending
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
