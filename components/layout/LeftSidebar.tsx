"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  TrendingUp,
  LayoutGrid,
  Bookmark,
  PlusCircle,
  User,
} from "lucide-react"

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/trending", label: "Trending", icon: TrendingUp },
  { href: "/categories", label: "Categories", icon: LayoutGrid },
  { href: "/saved", label: "Saved Ideas", icon: Bookmark },
  { href: "/submit", label: "Submit Idea", icon: PlusCircle },
  { href: "/profile", label: "Profile", icon: User },
]

export default function LeftSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-[65px] hidden h-[calc(100vh-65px)] w-56 shrink-0 overflow-y-auto border-r border-border bg-card p-4 lg:block">
      <nav className="space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
