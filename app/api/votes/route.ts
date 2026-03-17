import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { DEFAULT_USER_ID, DEFAULT_USERNAME } from "@/lib/utils"

async function ensureUser() {
  await prisma.user.upsert({
    where: { id: DEFAULT_USER_ID },
    update: {},
    create: { id: DEFAULT_USER_ID, username: DEFAULT_USERNAME, avatar: "" },
  })
}

export async function POST(request: NextRequest) {
  await ensureUser()
  const body = await request.json()
  const { ideaId, type } = body

  if (!ideaId) {
    return NextResponse.json({ error: "ideaId is required." }, { status: 400 })
  }

  const voteType = type === "downvote" ? "downvote" : "upvote"

  const existing = await prisma.vote.findUnique({
    where: { userId_ideaId: { userId: DEFAULT_USER_ID, ideaId } },
  })

  if (existing) {
    if (existing.type === voteType) {
      // Remove vote (toggle off)
      await prisma.vote.delete({ where: { id: existing.id } })
      await prisma.idea.update({
        where: { id: ideaId },
        data: { votes: { increment: voteType === "upvote" ? -1 : 1 } },
      })
      return NextResponse.json({ voted: null })
    } else {
      // Switch vote direction
      await prisma.vote.update({
        where: { id: existing.id },
        data: { type: voteType },
      })
      await prisma.idea.update({
        where: { id: ideaId },
        data: { votes: { increment: voteType === "upvote" ? 2 : -2 } },
      })
      return NextResponse.json({ voted: voteType })
    }
  }

  // New vote
  await prisma.vote.create({
    data: { userId: DEFAULT_USER_ID, ideaId, type: voteType },
  })
  await prisma.idea.update({
    where: { id: ideaId },
    data: { votes: { increment: voteType === "upvote" ? 1 : -1 } },
  })

  return NextResponse.json({ voted: voteType }, { status: 201 })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ideaId = searchParams.get("ideaId")

  if (!ideaId) {
    return NextResponse.json({ error: "ideaId is required." }, { status: 400 })
  }

  const vote = await prisma.vote.findUnique({
    where: { userId_ideaId: { userId: DEFAULT_USER_ID, ideaId } },
  })

  return NextResponse.json({ voted: vote?.type || null })
}
