"use client"

import { Lightbulb, TrendingUp, BarChart3, ThumbsUp, Star } from "lucide-react"

type StatsPanelProps = {
  total: number
  mostCommonCategory: string
  averageDifficulty: number
  totalVotes?: number
  mostPopularIdea?: string
}

const statsDef = [
  {
    key: "total",
    label: "Total Ideas",
    icon: Lightbulb,
    bg: "bg-blue-500/10 dark:bg-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    key: "totalVotes",
    label: "Total Votes",
    icon: ThumbsUp,
    bg: "bg-green-500/10 dark:bg-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    key: "category",
    label: "Top Category",
    icon: TrendingUp,
    bg: "bg-purple-500/10 dark:bg-purple-500/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    key: "difficulty",
    label: "Avg Difficulty",
    icon: BarChart3,
    bg: "bg-orange-500/10 dark:bg-orange-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    key: "popular",
    label: "Most Popular",
    icon: Star,
    bg: "bg-yellow-500/10 dark:bg-yellow-500/20",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
] as const

export default function StatsPanel({
  total,
  mostCommonCategory,
  averageDifficulty,
  totalVotes = 0,
  mostPopularIdea = "N/A",
}: StatsPanelProps) {
  const values: Record<string, string | number> = {
    total,
    totalVotes,
    category: mostCommonCategory,
    difficulty: averageDifficulty,
    popular: mostPopularIdea,
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {statsDef.map(({ key, label, icon: Icon, bg, iconColor }) => (
        <div
          key={key}
          className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 ${bg} transition-transform duration-200 group-hover:scale-110`}>
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
              <p className="truncate text-lg font-bold text-card-foreground">
                {values[key]}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
