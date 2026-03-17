"use client"

import { useState, useEffect } from "react"
import { MessageSquare, X, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"

type Comment = {
  id: string
  content: string
  createdAt: string
  user: { username: string; avatar: string }
}

type CommentModalProps = {
  ideaId: string
  ideaTitle: string
  open: boolean
  onClose: () => void
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function CommentModal({
  ideaId,
  ideaTitle,
  open,
  onClose,
}: CommentModalProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return
    fetch(`/api/comments?ideaId=${ideaId}`)
      .then((r) => r.json())
      .then(setComments)
  }, [open, ideaId])

  const submit = async () => {
    if (!content.trim()) return
    setLoading(true)
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ideaId, content: content.trim() }),
    })
    if (res.ok) {
      const comment = await res.json()
      setComments((prev) => [comment, ...prev])
      setContent("")
    }
    setLoading(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[80vh] w-full max-w-lg flex-col rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-foreground">Comments</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Idea title */}
        <div className="border-b border-border px-5 py-3">
          <p className="text-sm font-medium text-foreground">{ideaTitle}</p>
        </div>

        {/* Comments list */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {comments.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <MessageSquare className="mb-3 h-10 w-10 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                No comments yet. Start the discussion!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {c.user.username}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {timeAgo(c.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-card-foreground leading-relaxed">
                      {c.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border px-5 py-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Write a comment..."
              className="flex-1 rounded-xl border border-border bg-secondary px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button
              size="icon"
              onClick={submit}
              disabled={loading || !content.trim()}
              className="rounded-xl"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
