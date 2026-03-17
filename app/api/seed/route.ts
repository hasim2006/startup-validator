import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { DEFAULT_USER_ID, DEFAULT_USERNAME } from "@/lib/utils"

const SEED_IDEAS = [
  {
    title: "AI Legal Copilot",
    description: "An AI-powered legal assistant that helps startups navigate contracts, compliance, and IP protection without expensive lawyers.",
    problemStatement: "Small startups can't afford legal counsel and often make costly mistakes with contracts and compliance.",
    category: "AI",
    difficulty: 4,
    marketPotential: "Very High",
    votes: 42,
  },
  {
    title: "Micro SaaS Idea Generator",
    description: "A tool that analyzes market gaps and trending APIs to suggest profitable micro-SaaS ideas with validation data.",
    problemStatement: "Aspiring founders struggle to find viable SaaS ideas that aren't already saturated.",
    category: "SaaS",
    difficulty: 3,
    marketPotential: "High",
    votes: 38,
  },
  {
    title: "AI Meeting Summarizer",
    description: "Automatically joins meetings, transcribes conversations, extracts action items, and sends structured summaries to all participants.",
    problemStatement: "Teams waste hours in meetings and often forget key decisions and action items discussed.",
    category: "AI",
    difficulty: 3,
    marketPotential: "Very High",
    votes: 56,
  },
  {
    title: "Startup Investor Matching",
    description: "A matchmaking platform that pairs startups with the right investors based on industry, stage, check size, and founder background.",
    problemStatement: "Founders spend months cold-emailing investors who aren't the right fit for their stage or industry.",
    category: "Fintech",
    difficulty: 4,
    marketPotential: "High",
    votes: 31,
  },
  {
    title: "Automated Marketing Generator",
    description: "Generate complete marketing campaigns including copy, visuals, landing pages, and email sequences from a single product description.",
    problemStatement: "Small teams lack marketing expertise and budget to create professional multi-channel campaigns.",
    category: "Consumer",
    difficulty: 3,
    marketPotential: "High",
    votes: 27,
  },
  {
    title: "AI Resume Coach",
    description: "An AI that analyzes resumes against job descriptions, suggests improvements, and conducts mock interviews with personalized feedback.",
    problemStatement: "Job seekers submit hundreds of applications with generic resumes and never hear back.",
    category: "Education",
    difficulty: 2,
    marketPotential: "Medium",
    votes: 19,
  },
  {
    title: "No-Code SaaS Builder",
    description: "A visual platform that lets non-technical founders build, deploy, and monetize SaaS products without writing code.",
    problemStatement: "Non-technical founders have great ideas but can't build MVPs without hiring expensive developers.",
    category: "Developer Tools",
    difficulty: 5,
    marketPotential: "Very High",
    votes: 48,
  },
  {
    title: "Remote Team Productivity AI",
    description: "An AI workspace assistant that tracks team productivity patterns, suggests focus time blocks, and automates standup reports.",
    problemStatement: "Remote teams struggle with visibility, async communication overhead, and maintaining productivity.",
    category: "SaaS",
    difficulty: 3,
    marketPotential: "High",
    votes: 35,
  },
]

const SEED_COMMENTS = [
  { ideaIndex: 0, content: "This could be huge for Y Combinator startups. Legal costs are insane in early stages." },
  { ideaIndex: 0, content: "How would this handle jurisdiction-specific regulations?" },
  { ideaIndex: 2, content: "I'd pay $20/mo for this. Currently using Otter.ai but it misses action items." },
  { ideaIndex: 2, content: "The key differentiator here would be the action item extraction accuracy." },
  { ideaIndex: 2, content: "Integration with Slack/Notion would be essential." },
  { ideaIndex: 3, content: "AngelList tried this but the matching algorithm was too basic." },
  { ideaIndex: 4, content: "Jasper.ai does parts of this but a unified campaign builder would be great." },
  { ideaIndex: 6, content: "Bubble and Webflow are close but neither nails the SaaS billing/auth flow." },
  { ideaIndex: 6, content: "The hardest part is making it flexible enough without becoming too complex." },
  { ideaIndex: 7, content: "We need this at our company. Standup meetings are such a time sink." },
]

export async function POST() {
  // Create default user
  await prisma.user.upsert({
    where: { id: DEFAULT_USER_ID },
    update: {},
    create: {
      id: DEFAULT_USER_ID,
      username: DEFAULT_USERNAME,
      avatar: "",
    },
  })

  // Check if already seeded
  const count = await prisma.idea.count()
  if (count > 0) {
    return NextResponse.json({ message: "Database already has data.", count })
  }

  // Create ideas
  const createdIdeas = []
  for (const idea of SEED_IDEAS) {
    const created = await prisma.idea.create({ data: idea })
    createdIdeas.push(created)
  }

  // Create comments
  for (const c of SEED_COMMENTS) {
    await prisma.comment.create({
      data: {
        ideaId: createdIdeas[c.ideaIndex].id,
        userId: DEFAULT_USER_ID,
        content: c.content,
      },
    })
  }

  return NextResponse.json({
    message: "Seeded successfully.",
    ideas: createdIdeas.length,
    comments: SEED_COMMENTS.length,
  })
}
