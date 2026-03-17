"use client"

import { X, ChevronDown } from "lucide-react"
import { CATEGORIES, MARKET_POTENTIALS } from "@/lib/utils"

export type Filters = {
  category: string
  difficulty: string
  marketPotential: string
}

type FilterBarProps = {
  filters: Filters
  onChange: (filters: Filters) => void
}

function PillSelect({
  value,
  onChange,
  placeholder,
  children,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  children: React.ReactNode
}) {
  const isActive = value !== ""

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none cursor-pointer rounded-full border px-4 py-2 pr-8 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
          isActive
            ? "border-primary bg-primary/10 text-primary dark:bg-primary/20"
            : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
        }`}
      >
        <option value="">{placeholder}</option>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-current opacity-50" />
    </div>
  )
}

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  const hasFilters =
    filters.category || filters.difficulty || filters.marketPotential

  const update = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value })
  }

  const clear = () => {
    onChange({ category: "", difficulty: "", marketPotential: "" })
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <PillSelect
        value={filters.category}
        onChange={(v) => update("category", v)}
        placeholder="Category"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </PillSelect>

      <PillSelect
        value={filters.difficulty}
        onChange={(v) => update("difficulty", v)}
        placeholder="Difficulty"
      >
        {[1, 2, 3, 4, 5].map((d) => (
          <option key={d} value={String(d)}>
            Difficulty: {d}
          </option>
        ))}
      </PillSelect>

      <PillSelect
        value={filters.marketPotential}
        onChange={(v) => update("marketPotential", v)}
        placeholder="Market Potential"
      >
        {MARKET_POTENTIALS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </PillSelect>

      {hasFilters && (
        <button
          onClick={clear}
          className="inline-flex items-center gap-1 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </button>
      )}
    </div>
  )
}
