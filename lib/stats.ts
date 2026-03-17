type IdeaLike = { category: string; difficulty: number; votes: number; title: string }

export function computeStats(ideas: IdeaLike[]) {
  const total = ideas.length

  if (total === 0) {
    return {
      total: 0,
      mostCommonCategory: "N/A",
      averageDifficulty: 0,
      totalVotes: 0,
      mostPopularIdea: "N/A",
    }
  }

  const categoryCount: Record<string, number> = {}
  let difficultySum = 0
  let totalVotes = 0
  let topIdea = ideas[0]

  for (const idea of ideas) {
    categoryCount[idea.category] = (categoryCount[idea.category] || 0) + 1
    difficultySum += idea.difficulty
    totalVotes += idea.votes
    if (idea.votes > topIdea.votes) topIdea = idea
  }

  const mostCommonCategory = Object.entries(categoryCount).sort(
    (a, b) => b[1] - a[1]
  )[0][0]

  const averageDifficulty = Math.round((difficultySum / total) * 10) / 10

  return {
    total,
    mostCommonCategory,
    averageDifficulty,
    totalVotes,
    mostPopularIdea: topIdea.title,
  }
}
