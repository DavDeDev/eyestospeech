'use client'

import { useState, useEffect, useRef } from 'react'
import WordTile from '@/components/WordTile'
import { speak } from '@/lib/speech'
import { getFourWords } from '@/lib/fetchWords'
import { Card } from '@/components/ui/card'

export default function Home() {
  const [words, setWords] = useState<string[]>([])
  const [sentence, setSentence] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [gazePosition, setGazePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    window.webgazer.setGazeListener((data: any, timestamp: number) => {
      if (data == null) {
        return
      }
      setGazePosition({ x: data.x, y: data.y })
    }).begin()

    // fetchNewWords().then(newWords => {
    //   setWords(newWords)
    //   setIsLoading(false)
    // })

    getFourWords(sentence.join(" ")).then(newWords => {
      console.log(newWords)
      setWords(newWords)
      setIsLoading(false)
    }) // Pre-fetch words for the first sentence

    return () => {
      window.webgazer.end()
      // remove webgazer script
      const script = document.querySelector('script[src="https://webgazer.cs.brown.edu/webgazer.js"]')
      if (script) {
        script.remove
      }
    }
  }, [])

  const handleWordSelected = async (word: string) => {
    speak(word)
    setSentence(prev => [...prev, word])
    setIsLoading(true)
    const newWords = await getFourWords(sentence.join(" ").concat(" ", word))
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
          {sentence.length > 0 ? sentence.join(' ') : 'Look at words to form a sentence'}
        </Card>
      </div>

      <div className="h-full grid grid-cols-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {words.map((word, index) => (
          <WordTile
            key={index}
            word={word}
            onSelect={handleWordSelected}
            gazePosition={gazePosition}
          />
        ))}
      </div>
    </div>
  )
}

