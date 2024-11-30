import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Eye, MessageSquare } from 'lucide-react'

export default function Hero() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="flex justify-center mb-8">
        <Eye className="w-24 h-24 text-blue-500" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
        Welcome to eyesToSpeech
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Transform your eye movements into speech. Communicate effortlessly with our cutting-edge technology.
      </p>
      <div className="flex justify-center space-x-4">
        <Link href="/calibration">
          <Button size="lg" className="text-lg px-6 py-3">
            Start Calibration
          </Button>
        </Link>
        <Link href="/about">
          <Button size="lg" variant="outline" className="text-lg px-6 py-3">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  )
}

