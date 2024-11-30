'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'

interface WordTileProps {
  word: string
  onSelect: (word: string) => void
}

export default function WordTile({ word, onSelect }: WordTileProps) {
  const [hoverProgress, setHoverProgress] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isHovering) {
      timer = setInterval(() => {
        setHoverProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer)
            onSelect(word)
            return 0
          }
          return prev + 2.5 // 2.5% every 100ms = 100% in 4 seconds
        })
      }, 100)
    } else {
      setHoverProgress(0)
    }

    return () => clearInterval(timer)
  }, [isHovering, word, onSelect])

  return (
    <Card
      className="relative cursor-pointer flex justify-center items-center text-xl font-medium transition-all duration-100 hover:shadow-lg overflow-hidden h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="text-center">{word}</div>
      <div
        className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-100"
        style={{ width: `${hoverProgress}%` }}
      />
    </Card>
  )
}

