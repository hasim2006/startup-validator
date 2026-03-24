import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ThemeProvider from "@/components/ThemeProvider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hasim Office Solutions | Office Portfolio",
  description:
    "A modern office portfolio website for Hasim Office Solutions showcasing services, projects, testimonials, and contact details.",
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
