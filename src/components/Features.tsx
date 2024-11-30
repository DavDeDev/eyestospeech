import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Zap, Lock } from 'lucide-react'

const features = [
  {
    icon: Eye,
    title: 'Precise Eye Tracking',
    description: 'Advanced algorithms for accurate eye movement detection',
  },
  {
    icon: Zap,
    title: 'Real-time Translation',
    description: 'Instantly convert eye movements into spoken words',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'Your data is protected with state-of-the-art encryption',
  },
]

export default function Features() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose eyesToSpeech?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 text-blue-500 mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

