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

export async function GET() {
  const saved = await prisma.savedIdea.findMany({
    where: { userId: DEFAULT_USER_ID },
    include: { idea: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(saved.map((s) => s.idea))
}

export async function POST(request: NextRequest) {
  await ensureUser()
  const body = await request.json()
  const { ideaId } = body

  if (!ideaId) {
    return NextResponse.json({ error: "ideaId is required." }, { status: 400 })
  }

  const existing = await prisma.savedIdea.findUnique({
    where: { userId_ideaId: { userId: DEFAULT_USER_ID, ideaId } },
  })

  if (existing) {
    await prisma.savedIdea.delete({ where: { id: existing.id } })
    return NextResponse.json({ saved: false })
  }

  await prisma.savedIdea.create({
    data: { userId: DEFAULT_USER_ID, ideaId },
  })

  return NextResponse.json({ saved: true }, { status: 201 })
}
