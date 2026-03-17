import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { DEFAULT_USER_ID, DEFAULT_USERNAME } from "@/lib/utils"

export async function GET() {
  // Ensure the default user always exists
  const user = await prisma.user.upsert({
    where: { id: DEFAULT_USER_ID },
    update: {},
    create: { id: DEFAULT_USER_ID, username: DEFAULT_USERNAME, avatar: "" },
    include: {
      _count: { select: { votes: true, comments: true, saved: true } },
    },
  })

  const ideasSubmitted = await prisma.idea.count()
  const allIdeas = await prisma.idea.findMany({ select: { votes: true } })
  const totalVotesReceived = allIdeas.reduce((sum, i) => sum + i.votes, 0)

  return NextResponse.json({
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    createdAt: user.createdAt,
    ideasSubmitted,
    totalVotesReceived,
    savedCount: user._count.saved,
    commentsCount: user._count.comments,
  })
}
