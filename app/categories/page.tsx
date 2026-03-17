"use client"

import { useCallback, useEffect, useState } from "react"
import Header from "@/components/Header"
import LeftSidebar from "@/components/layout/LeftSidebar"
import IdeaGrid from "@/components/IdeaGrid"
import { CATEGORIES } from "@/lib/utils"
import {
  Brain,
  Landmark,
  HeartPulse,
  GraduationCap,
  Wrench,
  Leaf,
  ShoppingBag,
  Cloud,
  LayoutGrid,
} from "lucide-react"

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  AI: Brain,
  Fintech: Landmark,
  Healthcare: HeartPulse,
  Education: GraduationCap,
  "Developer Tools": Wrench,
  Climate: Leaf,
  Consumer: ShoppingBag,
  SaaS: Cloud,
}

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

export default function CategoriesPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [ideas, setIdeas] = useState<Idea[]>([])

  const fetchIdeas = useCallback(async () => {
    const params = new URLSearchParams()
    if (selected) params.set("category", selected)
    const res = await fetch(`/api/ideas?${params.toString()}`)
    if (res.ok) setIdeas(await res.json())
  }, [selected])

  useEffect(() => {
    fetchIdeas()
  }, [fetchIdeas])

  const handleVote = async (id: string, type: "upvote" | "downvote") => {
    await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ideaId: id, type }),
    })
    fetchIdeas()
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
                <LayoutGrid className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Categories</h2>
                <p className="text-sm text-muted-foreground">
                  Browse ideas by category
                </p>
              </div>
            </div>

            {/* Category grid */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICONS[cat] || LayoutGrid
                const isActive = selected === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelected(isActive ? null : cat)}
                    className={`flex items-center gap-2.5 rounded-xl border p-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {cat}
                  </button>
                )
              })}
            </div>

            <IdeaGrid ideas={ideas} onVote={handleVote} onSave={() => fetchIdeas()} />
          </div>
        </main>
      </div>
    </div>
  )
}
