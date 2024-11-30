import { CalibrationProvider } from '../context/CalibrationContext'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'eyesToSpeech',
  description: 'Turn your eye movements into speech',
}

export default function RootLayout( {
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-blue-100 to-white min-h-screen`}>
        <CalibrationProvider>
          {children}
        </CalibrationProvider>
      </body>
    </html>
  )
}

