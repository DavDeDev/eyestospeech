const wordList = [
  'The', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog',
  'A', 'journey', 'of', 'thousand', 'miles', 'begins', 'with', 'single', 'step',
  'To', 'be', 'or', 'not', 'that', 'is', 'question', 'Whether',
  'All', 'world\'s', 'stage', 'and', 'men', 'women', 'merely', 'players'
]

export async function fetchNewWords(): Promise<string[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  // We will call open AI API here
  // Return 4 random words
  return Array.from({ length: 4 }, () => wordList[Math.floor(Math.random() * wordList.length)])
}