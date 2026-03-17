"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import LeftSidebar from "@/components/layout/LeftSidebar"
import {
  User,
  Lightbulb,
  ThumbsUp,
  Bookmark,
  MessageSquare,
  CalendarDays,
} from "lucide-react"

type Profile = {
  id: string
  username: string
  avatar: string
  createdAt: string
  ideasSubmitted: number
  totalVotesReceived: number
  savedCount: number
  commentsCount: number
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then(setProfile)
  }, [])

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <LeftSidebar />
          <main className="flex flex-1 items-center justify-center py-20">
            <p className="text-muted-foreground">Loading profile...</p>
          </main>
        </div>
      </div>
    )
  }

  const stats = [
    { label: "Ideas Submitted", value: profile.ideasSubmitted, icon: Lightbulb, color: "text-blue-500" },
    { label: "Total Votes", value: profile.totalVotesReceived, icon: ThumbsUp, color: "text-green-500" },
    { label: "Saved Ideas", value: profile.savedCount, icon: Bookmark, color: "text-purple-500" },
    { label: "Comments", value: profile.commentsCount, icon: MessageSquare, color: "text-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <LeftSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-4 py-10">
            {/* Profile card */}
            <div className="mb-8 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {profile.username}
              </h2>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                Joined {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ label, value, icon: Icon, color }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Icon className={`mb-2 h-6 w-6 ${color}`} />
                  <p className="text-2xl font-bold text-foreground">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
