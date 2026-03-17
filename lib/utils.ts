import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CATEGORIES = [
  "AI",
  "Fintech",
  "Healthcare",
  "Education",
  "Developer Tools",
  "Climate",
  "Consumer",
  "SaaS",
]

export const MARKET_POTENTIALS = ["Low", "Medium", "High", "Very High"]

export const DEFAULT_USER_ID = "default-user"
export const DEFAULT_USERNAME = "launcher"
export const DEFAULT_AVATAR = ""

const MARKET_WEIGHTS: Record<string, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
  "Very High": 4,
}

export function computePopularity(
  votes: number,
  marketPotential: string,
  difficulty: number
): number {
  const mw = MARKET_WEIGHTS[marketPotential] || 1
  return votes * 2 + mw * 5 - difficulty * 2
}
