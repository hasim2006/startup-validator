"use client"

import { Sparkles } from "lucide-react"
import Header from "@/components/Header"
import LeftSidebar from "@/components/layout/LeftSidebar"
import IdeaForm from "@/components/IdeaForm"

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <LeftSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[700px] px-4 py-10">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Submit a New Idea
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Share your startup vision with the community
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <IdeaForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
