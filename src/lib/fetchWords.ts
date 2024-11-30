export async function getFourWords(sentence: string): Promise<string[]> {
  console.log("[frontend] sentence:,", sentence)
  try {
    const response = await fetch('/api/word-suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sentence }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch word suggestions')
    }

    const words = await response.json()
    return words
  } catch (error) {
    console.error('Error fetching words:', error)
    // Fallback words if API fails
    return ['and', 'the', 'to', 'of']
  }
}
