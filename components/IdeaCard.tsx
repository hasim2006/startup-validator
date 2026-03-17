"use client"

import { useState } from "react"
import {
  ArrowBigUp,
  ArrowBigDown,
  BarChart3,
  Signal,
  MessageSquare,
  Bookmark,
  Flame,
} from "lucide-react"
import { computePopularity } from "@/lib/utils"
import CommentModal from "@/components/comments/CommentModal"

type IdeaCardProps = {
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
  onVote: (id: string, type: "upvote" | "downvote") => void
  onSave?: (id: string) => void
}

const difficultyColor: Record<number, string> = {
  1: "bg-green-500/10 text-green-700 dark:text-green-400",
  2: "bg-green-500/10 text-green-700 dark:text-green-400",
  3: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  4: "bg-red-500/10 text-red-700 dark:text-red-400",
  5: "bg-red-500/10 text-red-700 dark:text-red-400",
}

const marketColor: Record<string, string> = {
  Low: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
  Medium: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  High: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  "Very High": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
}

function formatTimeAgo(dateStr?: string): string {
  if (!dateStr) return ""
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function IdeaCard({
  id, title, description, category, difficulty,
  marketPotential, votes, createdAt, commentCount = 0,
  isSaved = false, userVote = null, onVote, onSave,
}: IdeaCardProps) {
  const [commentOpen, setCommentOpen] = useState(false)
  const [saved, setSaved] = useState(isSaved)
  const popularity = computePopularity(votes, marketPotential, difficulty)

  const handleSave = async () => {
    const res = await fetch("/api/saved", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ideaId: id }),
    })
    if (res.ok) {
      const data = await res.json()
      setSaved(data.saved)
      onSave?.(id)
    }
  }

  return (
    <>
      <div className="group relative flex gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40">
        {/* Vote column */}
        <div className="flex flex-col items-center gap-0.5 pt-0.5">
          <button
            onClick={() => onVote(id, "upvote")}
            className={`flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200 active:scale-90 ${
              userVote === "upvote"
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
          >
            <ArrowBigUp className="h-5 w-5" />
          </button>
          <span className={`text-sm font-bold ${
            userVote === "upvote" ? "text-primary" : userVote === "downvote" ? "text-destructive" : "text-card-foreground"
          }`}>
            {votes}
          </span>
          <button
            onClick={() => onVote(id, "downvote")}
            className={`flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200 active:scale-90 ${
              userVote === "downvote"
                ? "bg-destructive/20 text-destructive"
                : "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            }`}
          >
            <ArrowBigDown className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-card-foreground leading-snug transition-colors group-hover:text-primary">
              {title}
            </h3>
            <button
              onClick={handleSave}
              className={`shrink-0 rounded-lg p-1 transition-all duration-200 ${
                saved
                  ? "text-primary"
                  : "text-muted-foreground/50 opacity-0 group-hover:opacity-100 hover:text-primary"
              }`}
            >
              <Bookmark className={`h-4 w-4 ${saved ? "fill-primary" : ""}`} />
            </button>
          </div>

          <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* Badges */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              {category}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${difficultyColor[difficulty] || ""}`}>
              <BarChart3 className="h-3 w-3" />
              {difficulty}/5
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${marketColor[marketPotential] || ""}`}>
              <Signal className="h-3 w-3" />
              {marketPotential}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
              <Flame className="h-3 w-3" />
              {popularity}
            </span>
          </div>

          {/* Actions row */}
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <button
              onClick={() => setCommentOpen(true)}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-secondary hover:text-foreground"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              {commentCount} Comments
            </button>
            {createdAt && (
              <span className="ml-auto">{formatTimeAgo(createdAt)}</span>
            )}
          </div>
        </div>
      </div>

      <CommentModal
        ideaId={id}
        ideaTitle={title}
        open={commentOpen}
        onClose={() => setCommentOpen(false)}
      />
    </>
  )
}
