"use client"

import { useEffect, useState } from "react"
import { TrendingUp, BarChart3, Lightbulb, ThumbsUp, Star } from "lucide-react"
import { computePopularity } from "@/lib/utils"

type Idea = {
  id: string
  title: string
  votes: number
  category: string
  difficulty: number
  marketPotential: string
}

type Stats = {
  total: number
  mostCommonCategory: string
  averageDifficulty: number
  totalVotes: number
  mostPopularIdea: string
}

export default function RightSidebar() {
  const [trending, setTrending] = useState<Idea[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [categoryBreakdown, setCategoryBreakdown] = useState<
    { name: string; count: number }[]
  >([])

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/ideas?sort=trending")
      if (!res.ok) return
      const data = await res.json()

      // Trending: top 5 by popularity score
      const sorted = [...data]
        .map((d: Idea) => ({
          ...d,
          score: computePopularity(d.votes, d.marketPotential, d.difficulty),
        }))
        .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
        .slice(0, 5)
      setTrending(sorted)

      // Category breakdown
      const cats: Record<string, number> = {}
      for (const idea of data) {
        cats[idea.category] = (cats[idea.category] || 0) + 1
      }
      setCategoryBreakdown(
        Object.entries(cats)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6)
      )

      // Stats
      if (data.length > 0) {
        let totalVotes = 0
        let topIdea = data[0]
        let diffSum = 0
        const catCount: Record<string, number> = {}
        for (const d of data) {
          totalVotes += d.votes
          diffSum += d.difficulty
          catCount[d.category] = (catCount[d.category] || 0) + 1
          if (d.votes > topIdea.votes) topIdea = d
        }
        const mostCommon = Object.entries(catCount).sort(
          (a, b) => b[1] - a[1]
        )[0][0]
        setStats({
          total: data.length,
          mostCommonCategory: mostCommon,
          averageDifficulty:
            Math.round((diffSum / data.length) * 10) / 10,
          totalVotes,
          mostPopularIdea: topIdea.title,
        })
      }
    }
    load()
  }, [])

  return (
    <aside className="sticky top-[65px] hidden h-[calc(100vh-65px)] w-72 shrink-0 overflow-y-auto border-l border-border bg-card p-4 xl:block">
      {/* Trending Ideas */}
      <div className="mb-6">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          Trending Ideas
        </h3>
        <div className="space-y-2">
          {trending.map((idea, i) => (
            <div
              key={idea.id}
              className="flex items-start gap-2.5 rounded-lg p-2 transition-colors hover:bg-secondary"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {idea.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {idea.votes} votes
                </p>
              </div>
            </div>
          ))}
          {trending.length === 0 && (
            <p className="text-xs text-muted-foreground">No ideas yet</p>
          )}
        </div>
      </div>

      {/* Top Categories */}
      <div className="mb-6">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          <BarChart3 className="h-4 w-4" />
          Top Categories
        </h3>
        <div className="space-y-1.5">
          {categoryBreakdown.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-secondary"
            >
              <span className="text-foreground">{cat.name}</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      {stats && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            <Lightbulb className="h-4 w-4" />
            Statistics
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Ideas</span>
              <span className="font-semibold text-foreground">
                {stats.total}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <ThumbsUp className="h-3 w-3" /> Total Votes
              </span>
              <span className="font-semibold text-foreground">
                {stats.totalVotes}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Avg Difficulty</span>
              <span className="font-semibold text-foreground">
                {stats.averageDifficulty}/5
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Star className="h-3 w-3" /> Most Popular
              </span>
              <span className="max-w-[120px] truncate font-semibold text-foreground">
                {stats.mostPopularIdea}
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
