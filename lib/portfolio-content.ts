export type ContactInfo = {
  email: string
  phone: string
  address: string
}

export type ServiceItem = {
  title: string
  description: string
  bullets: string[]
}

export type ProjectItem = {
  title: string
  category: string
  summary: string
  impact: string
}

export type TestimonialItem = {
  name: string
  role: string
  quote: string
}

export type StatItem = {
  label: string
  value: string
}

export type PortfolioContent = {
  companyName: string
  shortName: string
  tagline: string
  description: string
  heroTitle: string
  heroText: string
  aboutTitle: string
  aboutText: string
  mission: string
  vision: string
  contact: ContactInfo
  services: ServiceItem[]
  projects: ProjectItem[]
  testimonials: TestimonialItem[]
  stats: StatItem[]
}

export const portfolioContent: PortfolioContent = {
  companyName: "Hasim Office Solutions",
  shortName: "HOS",
  tagline: "Professional digital solutions for modern offices",
  description:
    "Hasim Office Solutions helps teams streamline operations, showcase capability, and deliver confident client experiences with modern digital workflows.",
  heroTitle: "Building efficient, trusted, and modern office experiences",
  heroText:
    "We design practical digital systems, business workflows, and presentation-ready solutions that help offices operate smoothly and grow with confidence.",
  aboutTitle: "A reliable partner for office transformation",
  aboutText:
    "Hasim Office Solutions is presented as a modern office portfolio brand built on clarity, consistency, and dependable delivery. This website highlights services, outcomes, and a simple way for clients to get in touch.",
  mission:
    "To help offices improve their digital presence, internal efficiency, and client-facing professionalism through practical technology solutions.",
  vision:
    "To become a trusted partner for organizations seeking a polished, scalable, and future-ready office ecosystem.",
  contact: {
    email: "contact@hasimoffice.com",
    phone: "+91 90000 00000",
    address: "Bengaluru, Karnataka, India",
  },
  services: [
    {
      title: "Office Portfolio Websites",
      description:
        "Professional websites that communicate your company story, capabilities, and credibility with a clean and modern design.",
      bullets: ["Responsive design", "Fast performance", "Clear service presentation"],
    },
    {
      title: "Workflow Digitization",
      description:
        "Digital tools and structured processes that reduce repetitive manual work and support team productivity.",
      bullets: ["Process mapping", "Internal dashboards", "Operational clarity"],
    },
    {
      title: "Client Presentation Systems",
      description:
        "Presentation-ready digital assets and interfaces that help teams pitch, report, and communicate value more effectively.",
      bullets: ["Project showcases", "Reporting views", "Brand-aligned experiences"],
    },
  ],
  projects: [
    {
      title: "Executive Office Profile",
      category: "Corporate Website",
      summary:
        "A conversion-focused office website designed to present leadership, services, and company trust factors in one place.",
      impact: "Improved clarity for new client inquiries and partnership outreach.",
    },
    {
      title: "Operations Dashboard Concept",
      category: "Internal Tooling",
      summary:
        "A dashboard-style experience to track priorities, highlight service metrics, and simplify office operations visibility.",
      impact: "Reduced reporting friction and improved status communication.",
    },
    {
      title: "Service Showcase Platform",
      category: "Digital Experience",
      summary:
        "A structured content experience that organizes offerings, proofs of work, and business value for decision-makers.",
      impact: "Created a stronger first impression and better service discoverability.",
    },
  ],
  testimonials: [
    {
      name: "Aarav Sharma",
      role: "Operations Lead",
      quote:
        "The portfolio experience feels polished, trustworthy, and easy to navigate. It reflects professionalism from the very first screen.",
    },
    {
      name: "Neha Patel",
      role: "Business Development Manager",
      quote:
        "The service presentation is clear and modern, making it much easier to explain our value to potential clients.",
    },
    {
      name: "Rahul Mehta",
      role: "Office Administrator",
      quote:
        "The structure is practical and clean. It balances visual quality with useful business information.",
    },
  ],
  stats: [
    { label: "Projects Presented", value: "24+" },
    { label: "Client Workflows Improved", value: "18+" },
    { label: "Average Delivery Rating", value: "4.9/5" },
    { label: "Support Availability", value: "Mon-Sat" },
  ],
}
