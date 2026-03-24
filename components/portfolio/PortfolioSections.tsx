import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, Quote, Sparkles } from "lucide-react";
import type {
  ContactInfo,
  PortfolioContent,
  ProjectItem,
  ServiceItem,
  StatItem,
  TestimonialItem,
} from "@/lib/portfolio-content";

type PortfolioHeroProps = {
  content: Pick<PortfolioContent, "shortName" | "heroTitle" | "heroText">;
};

type PortfolioStatsProps = {
  items: StatItem[];
};

type PortfolioAboutProps = {
  content: Pick<PortfolioContent, "aboutTitle" | "aboutText" | "mission" | "vision">;
};

type PortfolioServicesProps = {
  items: ServiceItem[];
};

type PortfolioProjectsProps = {
  items: ProjectItem[];
};

type PortfolioTestimonialsProps = {
  items: TestimonialItem[];
};

type PortfolioContactProps = {
  content: ContactInfo;
};

export function PortfolioHero({ content }: PortfolioHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.12),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>{content.shortName}</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {content.heroTitle}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {content.heroText}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Explore services
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent hover:text-accent-foreground"
            >
              Start a conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PortfolioStats({ items }: PortfolioStatsProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-12">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div
              key={`${item.label}-${item.value}`}
              className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur"
            >
              <div className="text-3xl font-semibold tracking-tight text-foreground">{item.value}</div>
              <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioAbout({ content }: PortfolioAboutProps) {
  return (
    <section id="about" className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">About</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {content.aboutTitle}
          </h2>
          <p className="mt-6 text-base leading-7 text-muted-foreground">{content.aboutText}</p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-border/70 bg-card/80 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Mission</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{content.mission}</p>
          </div>
          <div className="rounded-3xl border border-border/70 bg-card/80 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Vision</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{content.vision}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PortfolioServices({ items }: PortfolioServicesProps) {
  return (
    <section id="services" className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Services</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Solutions designed for modern office teams
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            We combine practical design, digital clarity, and business-focused structure to help offices
            present themselves better and operate more smoothly.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-border/70 bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">{item.description}</p>
              <ul className="mt-6 space-y-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioProjects({ items }: PortfolioProjectsProps) {
  return (
    <section id="projects" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Selected work</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Outcomes that reflect clarity and trust
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Each project demonstrates how structured digital experiences can improve communication,
            visibility, and confidence for office teams and their clients.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="group flex h-full flex-col rounded-3xl border border-border/70 bg-card/80 p-7 shadow-sm transition hover:border-primary/30 hover:shadow-lg"
            >
              <span className="inline-flex w-fit rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {item.category}
              </span>
              <h3 className="mt-6 text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">{item.summary}</p>
              <div className="mt-6 rounded-2xl bg-primary/8 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Impact</p>
                <p className="mt-2 text-sm leading-6 text-foreground/90">{item.impact}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioTestimonials({ items }: PortfolioTestimonialsProps) {
  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Testimonials</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What professionals say about the experience
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Feedback focused on clarity, professionalism, and the confidence a polished office presence
            creates.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.name} className="rounded-3xl border border-border/70 bg-card p-7 shadow-sm">
              <Quote className="h-8 w-8 text-primary" />
              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">{item.quote}</p>
              <div className="mt-6 border-t border-border/60 pt-5">
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioContact({ content }: PortfolioContactProps) {
  return (
    <section id="contact" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="rounded-[2rem] border border-border/70 bg-card/80 p-8 shadow-sm sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Contact</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Let's discuss your next office solution
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                Reach out for website projects, workflow improvements, or presentation-ready digital
                experiences tailored to your organization.
              </p>

              <a
                href="#contact-form"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-border/70 bg-background/70 p-5">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Email</p>
                    <a href={`mailto:${content.email}`} className="mt-1 block text-sm text-muted-foreground hover:text-foreground">
                      {content.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/70 p-5">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Phone</p>
                    <a href={`tel:${content.phone}`} className="mt-1 block text-sm text-muted-foreground hover:text-foreground">
                      {content.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/70 p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Address</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{content.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}