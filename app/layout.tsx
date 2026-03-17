import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ThemeProvider from "@/components/ThemeProvider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Launchpad — Discover, validate, and refine startup ideas",
  description: "A startup community platform to discover, validate, and refine your best ideas.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
