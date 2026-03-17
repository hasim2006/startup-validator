"use client"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import LeftSidebar from "@/components/layout/LeftSidebar"
import RightSidebar from "@/components/layout/RightSidebar"
import SearchBar from "@/components/SearchBar"
import FilterBar, { Filters } from "@/components/FilterBar"
import IdeaGrid from "@/components/IdeaGrid"
import StatsPanel from "@/components/StatsPanel"
import { computeStats } from "@/lib/stats"

type Idea = {
  id: string
  title: string
  description: string
  problemStatement: string
  category: string
  difficulty: number
  marketPotential: string
  votes: number
  createdAt: string
  commentCount: number
  isSaved: boolean
  userVote: string | null
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [seeded, setSeeded] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    category: "",
    difficulty: "",
    marketPotential: "",
  })

  // Seed default user + example data on first load
  useEffect(() => {
    fetch("/api/seed", { method: "POST" }).finally(() => setSeeded(true))
  }, [])

  const fetchIdeas = useCallback(async () => {
    const params = new URLSearchParams()
    if (filters.category) params.set("category", filters.category)
    if (filters.difficulty) params.set("difficulty", filters.difficulty)
    if (filters.marketPotential)
      params.set("marketPotential", filters.marketPotential)
    if (search) params.set("search", search)

    const res = await fetch(`/api/ideas?${params.toString()}`)
    if (res.ok) {
      const data = await res.json()
      setIdeas(data)
    }
  }, [filters, search])

  useEffect(() => {
    if (seeded) fetchIdeas()
  }, [fetchIdeas, seeded])

  const handleVote = async (id: string, type: "upvote" | "downvote") => {
    const res = await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ideaId: id, type }),
    })
    if (res.ok) {
      fetchIdeas()
    }
  }

  const stats = useMemo(() => computeStats(ideas), [ideas])

  return (
    <div className="flex">
      <LeftSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-6">
          <StatsPanel {...stats} />
          <div className="space-y-3">
            <SearchBar value={search} onChange={setSearch} />
            <FilterBar filters={filters} onChange={setFilters} />
          </div>
          <IdeaGrid ideas={ideas} onVote={handleVote} onSave={() => fetchIdeas()} />
        </div>
      </main>
      <RightSidebar />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={
        <div className="flex">
          <div className="hidden w-56 lg:block" />
          <div className="flex flex-1 items-center justify-center py-20">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }>
        <DashboardContent />
      </Suspense>
    </div>
  )
}
