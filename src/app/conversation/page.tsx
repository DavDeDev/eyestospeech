'use client'

import { useState, useEffect } from 'react'
import WordTile from '@/components/WordTile'
import { speak } from '@/lib/speech'
import { fetchNewWords } from '@/lib/fetchWords'
import { Card } from '@/components/ui/card'

export default function Home() {
  const [words, setWords] = useState<string[]>([])
  const [sentence, setSentence] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchNewWords().then(newWords => {
      setWords(newWords)
      setIsLoading(false)
    })
  }, [])

  const handleWordSelected = async (word: string) => {
    speak(word)
    setSentence(prev => [...prev, word])
    setIsLoading(true)
    const newWords = await fetchNewWords()
    setWords(newWords)
    setIsLoading(false)
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow p-4">
        <Card className="p-4 text-center text-lg bg-secondary/50 text-secondary-foreground">
          {sentence.length > 0 ? sentence.join(' ') : 'Select words to form a sentence'}
        </Card>
      </div>
      
      <div className="h-full grid grid-cols-2 gap-4 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {words.map((word, index) => (
          <WordTile key={index} word={word} onSelect={handleWordSelected} />
        ))}
      </div>
    </div>
  )
}

