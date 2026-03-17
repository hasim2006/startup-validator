"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CATEGORIES, MARKET_POTENTIALS } from "@/lib/utils"

export default function IdeaForm() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    problemStatement: "",
    category: "",
    difficulty: "",
    marketPotential: "",
  })

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.problemStatement.trim() ||
      !form.category ||
      !form.difficulty ||
      !form.marketPotential
    ) {
      setError("All fields are required.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Something went wrong.")
        return
      }

      router.push("/")
    } catch {
      setError("Failed to submit idea. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-800/50 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-semibold">
          Startup Title
        </Label>
        <Input
          id="title"
          placeholder="e.g. SmartBudget"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-semibold">
          Short Description
        </Label>
        <Textarea
          id="description"
          placeholder="Briefly describe your startup idea..."
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="problemStatement" className="text-sm font-semibold">
          Problem Statement
        </Label>
        <Textarea
          id="problemStatement"
          placeholder="What problem does this solve?"
          value={form.problemStatement}
          onChange={(e) => update("problemStatement", e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-semibold">
            Category
          </Label>
          <Select
            id="category"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty" className="text-sm font-semibold">
            Difficulty (1-5)
          </Label>
          <Select
            id="difficulty"
            value={form.difficulty}
            onChange={(e) => update("difficulty", e.target.value)}
          >
            <option value="">Select difficulty</option>
            {[1, 2, 3, 4, 5].map((d) => (
              <option key={d} value={String(d)}>
                {d}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="marketPotential" className="text-sm font-semibold">
            Market Potential
          </Label>
          <Select
            id="marketPotential"
            value={form.marketPotential}
            onChange={(e) => update("marketPotential", e.target.value)}
          >
            <option value="">Select potential</option>
            {MARKET_POTENTIALS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="gap-2 rounded-xl px-6 font-semibold shadow-md hover:shadow-lg transition-shadow"
        >
          <Send className="h-4 w-4" />
          {loading ? "Submitting..." : "Submit Idea"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-xl"
          onClick={() => router.push("/")}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
