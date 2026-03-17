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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ideaId = searchParams.get("ideaId")

  if (!ideaId) {
    return NextResponse.json({ error: "ideaId is required." }, { status: 400 })
  }

  const comments = await prisma.comment.findMany({
    where: { ideaId },
    include: { user: { select: { username: true, avatar: true } } },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(comments)
}

export async function POST(request: NextRequest) {
  await ensureUser()
  const body = await request.json()
  const { ideaId, content } = body

  if (!ideaId || !content?.trim()) {
    return NextResponse.json(
      { error: "ideaId and content are required." },
      { status: 400 }
    )
  }

  const comment = await prisma.comment.create({
    data: {
      ideaId,
      userId: DEFAULT_USER_ID,
      content: content.trim(),
    },
    include: { user: { select: { username: true, avatar: true } } },
  })

  return NextResponse.json(comment, { status: 201 })
}
