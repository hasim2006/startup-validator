import ContactForm from "@/components/portfolio/ContactForm"
import {
  PortfolioAbout,
  PortfolioContact,
  PortfolioHero,
  PortfolioProjects,
  PortfolioServices,
  PortfolioStats,
  PortfolioTestimonials,
} from "@/components/portfolio/PortfolioSections"
import { portfolioContent } from "@/lib/portfolio-content"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PortfolioHero
        content={{
          shortName: portfolioContent.shortName,
          heroTitle: portfolioContent.heroTitle,
          heroText: portfolioContent.heroText,
        }}
      />

      <PortfolioStats items={portfolioContent.stats} />

      <PortfolioAbout
        content={{
          aboutTitle: portfolioContent.aboutTitle,
          aboutText: portfolioContent.aboutText,
          mission: portfolioContent.mission,
          vision: portfolioContent.vision,
        }}
      />

      <PortfolioServices items={portfolioContent.services} />
      <PortfolioProjects items={portfolioContent.projects} />
      <PortfolioTestimonials items={portfolioContent.testimonials} />
      <PortfolioContact content={portfolioContent.contact} />

      <section className="bg-muted/30 px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Work with {portfolioContent.shortName}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to present your office with more clarity and confidence?
            </h2>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              From portfolio websites to workflow-oriented digital systems, we create practical
              solutions that help offices communicate value and operate more effectively.
            </p>
            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
              <p className="text-sm font-medium text-foreground">
                Prefer direct contact?
              </p>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>{portfolioContent.contact.email}</p>
                <p>{portfolioContent.contact.phone}</p>
                <p>{portfolioContent.contact.address}</p>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  )
}
