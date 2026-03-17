"use client"

import { useCallback, useEffect, useState } from "react"
import Header from "@/components/Header"
import LeftSidebar from "@/components/layout/LeftSidebar"
import IdeaGrid from "@/components/IdeaGrid"
import { TrendingUp } from "lucide-react"

type Idea = {
  id: string
  title: string
  description: string
  category: string
  difficulty: number
  marketPotential: string
  votes: number
  createdAt: string
  commentCount?: number
  isSaved?: boolean
  userVote?: string | null
}

export default function TrendingPage() {
  const [ideas, setIdeas] = useState<Idea[]>([])

  const fetchTrending = useCallback(async () => {
    const res = await fetch("/api/ideas?sort=trending")
    if (res.ok) {
      const data = await res.json()
      setIdeas(data)
    }
  }, [])

  useEffect(() => {
    fetchTrending()
  }, [fetchTrending])

  const handleVote = async (id: string, type: "upvote" | "downvote") => {
    await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ideaId: id, type }),
    })
    fetchTrending()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <LeftSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-4 py-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Trending Ideas</h2>
                <p className="text-sm text-muted-foreground">
                  Most upvoted startup ideas right now
                </p>
              </div>
            </div>
            <IdeaGrid ideas={ideas} onVote={handleVote} onSave={() => fetchTrending()} />
          </div>
        </main>
      </div>
    </div>
  )
}
