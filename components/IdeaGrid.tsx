"use client"

import Link from "next/link"
import { Rocket, Plus } from "lucide-react"
import IdeaCard from "./IdeaCard"

type Idea = {
  id: string
  title: string
  description: string
  category: string
  difficulty: number
  marketPotential: string
  votes: number
  createdAt?: string
  commentCount?: number
  isSaved?: boolean
  userVote?: string | null
}

type IdeaGridProps = {
  ideas: Idea[]
  onVote: (id: string, type: "upvote" | "downvote") => void
  onSave?: (id: string) => void
}

export default function IdeaGrid({ ideas, onVote, onSave }: IdeaGridProps) {
  if (ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/50 px-8 py-20">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Rocket className="h-10 w-10 text-primary" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-foreground">
          No startup ideas yet
        </h3>
        <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
          Be the first to submit one! Share your vision and let the community vote.
        </p>
        <Link
          href="/submit"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-200 hover:shadow-lg hover:brightness-110"
        >
          <Plus className="h-4 w-4" />
          Submit an Idea
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} {...idea} onVote={onVote} onSave={onSave} />
      ))}
    </div>
  )
}
