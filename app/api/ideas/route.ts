import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { DEFAULT_USER_ID } from "@/lib/utils"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const category = searchParams.get("category")
  const difficulty = searchParams.get("difficulty")
  const marketPotential = searchParams.get("marketPotential")
  const search = searchParams.get("search")
  const sort = searchParams.get("sort")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {}

  if (category) {
    where.category = category
  }

  if (difficulty) {
    where.difficulty = parseInt(difficulty, 10)
  }

  if (marketPotential) {
    where.marketPotential = marketPotential
  }

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
      { problemStatement: { contains: search } },
    ]
  }

  let orderBy: Record<string, string> = { createdAt: "desc" }
  if (sort === "trending") {
    orderBy = { votes: "desc" }
  }

  const ideas = await prisma.idea.findMany({
    where,
    orderBy,
    include: {
      _count: { select: { comments: true } },
      saved: { where: { userId: DEFAULT_USER_ID }, select: { id: true } },
      voteRecords: {
        where: { userId: DEFAULT_USER_ID },
        select: { type: true },
      },
    },
  })

  const result = ideas.map((idea) => ({
    id: idea.id,
    title: idea.title,
    description: idea.description,
    problemStatement: idea.problemStatement,
    category: idea.category,
    difficulty: idea.difficulty,
    marketPotential: idea.marketPotential,
    votes: idea.votes,
    createdAt: idea.createdAt,
    commentCount: idea._count.comments,
    isSaved: idea.saved.length > 0,
    userVote: idea.voteRecords[0]?.type || null,
  }))

  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const {
    title,
    description,
    problemStatement,
    category,
    difficulty,
    marketPotential,
  } = body

  if (
    !title?.trim() ||
    !description?.trim() ||
    !problemStatement?.trim() ||
    !category ||
    !difficulty ||
    !marketPotential
  ) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    )
  }

  const existing = await prisma.idea.findUnique({
    where: { title: title.trim() },
  })

  if (existing) {
    return NextResponse.json(
      { error: "An idea with this title already exists." },
      { status: 409 }
    )
  }

  const idea = await prisma.idea.create({
    data: {
      title: title.trim(),
      description: description.trim(),
      problemStatement: problemStatement.trim(),
      category,
      difficulty: parseInt(difficulty, 10),
      marketPotential,
    },
  })

  return NextResponse.json(idea, { status: 201 })
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID is required." }, { status: 400 })
  }

  const idea = await prisma.idea.update({
    where: { id },
    data: { votes: { increment: 1 } },
  })

  return NextResponse.json(idea)
}
