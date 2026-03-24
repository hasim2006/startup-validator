'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { portfolioContent } from '@/lib/portfolio-content';

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  company: '',
  message: '',
};

export default function ContactForm() {
  const [formState, setFormState] = useState<ContactFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const brandName = portfolioContent.shortName || portfolioContent.companyName;

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormState((current) => ({
      ...current,
      [name]: value,
    }));

    if (successMessage) {
      setSuccessMessage('');
    }

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSuccessMessage(
        data.message || `Thanks for reaching out to ${brandName}. We will be in touch soon.`
      );
      setFormState(initialFormState);
    } catch {
      setErrorMessage('Unable to send your message right now. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form"
      className="rounded-[2rem] border border-border/60 bg-background/95 px-6 py-8 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.45)] backdrop-blur sm:px-8 lg:px-10"
    >
      <div className="mb-8 space-y-3">
        <span className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Start a conversation
        </span>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Let's talk about your next project
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          Share a few details and {brandName} will follow up with the right next steps,
          recommendations, and availability.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Name</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              value={formState.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={formState.email}
              onChange={handleChange}
              placeholder="you@company.com"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">Company</span>
          <input
            type="text"
            name="company"
            autoComplete="organization"
            value={formState.company}
            onChange={handleChange}
            placeholder="Company or organization"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">Message</span>
          <textarea
            name="message"
            required
            rows={6}
            value={formState.message}
            onChange={handleChange}
            placeholder={`Tell ${brandName} about your goals, timeline, and the kind of support you need.`}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <div className="flex flex-col gap-4 border-t border-border/60 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-h-6 text-sm">
            {successMessage ? (
              <p className="text-emerald-600 dark:text-emerald-400">{successMessage}</p>
            ) : null}
            {!successMessage && errorMessage ? (
              <p className="text-red-600 dark:text-red-400">{errorMessage}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Sending message...' : 'Send message'}
          </button>
        </div>
      </form>
    </section>
  );
}