'use client'
import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'

interface WordTileProps {
  word: string
  onSelect: (word: string) => void
  gazePosition: { x: number; y: number }
}

export default function WordTile({ word, onSelect, gazePosition }: WordTileProps) {
  const [gazeProgress, setGazeProgress] = useState(0)
  const tileRef = useRef<HTMLDivElement>(null)
  const gazeTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const tileElement = tileRef.current
    if (!tileElement) return

    const { left, top, right, bottom } = tileElement.getBoundingClientRect()
    const isGazeOnTile =
      gazePosition.x >= left &&
      gazePosition.x <= right &&
      gazePosition.y >= top &&
      gazePosition.y <= bottom

    if (isGazeOnTile) {
      if (!gazeTimerRef.current) {
        // gazeTimerRef.current = setInterval(() => {
          setGazeProgress(prev => {
            const newProgress = prev + 2
            if (newProgress >= 100) {
              clearInterval(gazeTimerRef.current!)
              gazeTimerRef.current = null
              onSelect(word)
              return 0
            }
            return newProgress
          })
        // }, 50)
      }
    } else {
      if (gazeTimerRef.current) {
        clearInterval(gazeTimerRef.current)
        gazeTimerRef.current = null
        setGazeProgress(0)
      }
    }

    return () => {
      if (gazeTimerRef.current) {
        clearInterval(gazeTimerRef.current)
      }
    }
  }, [gazePosition, word, onSelect])

  return (
    <Card
      ref={tileRef}
      className="relative flex justify-center items-center text-xl font-medium overflow-hidden h-full"
      style={{ 
        background: `linear-gradient(to right, black ${gazeProgress}%, white ${gazeProgress}%)` 
      }}
    >
      <div className="text-center bg-white z-10">{word}</div>
    </Card>
  )
}