'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useCalibration } from '@/context/CalibrationContext';

declare global {
  interface Window {
    webgazer: any;
  }
}

export default function CaliberPage() {
  const [isCalibrating, setIsCalibrating] = useState(false)

  const { isCalibrated, setIsCalibrated } = useCalibration()
  

  useEffect(() => {
    // Load WebGazer script
    const script = document.createElement('script')
    script.src = 'https://webgazer.cs.brown.edu/webgazer.js'
    script.async = true
    document.body.appendChild(script)

    // MutationObserver to monitor for the element with id 'webgazerVideoContainer' being hidden
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === 1 && (node as HTMLElement).id === 'webgazerVideoContainer') {
            console.log('webgazerVideoContainer has been hidden')
          }
        })
      })
    })

    // Start observing the document body for added nodes
    observer.observe(document.body, {
      childList: true,
      subtree: true, // To observe changes deep inside the DOM
    })

    script.onload = () => {
      window.webgazer.setGazeListener((data: any, timestamp: number) => {
        if (data == null) {
          return
        }
        // var xprediction = data.x //these x coordinates are relative to the viewport
        // var yprediction = data.y //these y coordinates are relative to the viewport
        // console.log("CIAOOO", timestamp, xprediction, yprediction) //elapsed time is based on time since begin was called
      }).begin()
    }

    // Cleanup observer when component unmounts
    // return () => {
    //   observer.disconnect()
    //   if (window.webgazer) {
    //     window.webgazer.end()
    //   }
    //   document.body.removeChild(script)
    // }
  }, [])

  const startCalibration = () => {
    setIsCalibrating(true)
    // Start WebGazer calibration
    window.webgazer.showPredictionPoints(true)
  }

  const endCalibration = () => {
    setIsCalibrating(false)
    setIsCalibrated(true)
    // End WebGazer calibration
    window.webgazer.showPredictionPoints(true)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">WebGazer Calibration</h1>
      {!isCalibrating && !isCalibrated && (
        <Button onClick={startCalibration} className="mb-4">
          Start Calibration
        </Button>
      )}
      {isCalibrating && (
        <div className="text-center">
          <p className="mb-4">
            Please look at different points on the screen and click them to calibrate WebGazer.
          </p>
          <Button onClick={endCalibration} className="mb-4">
            End Calibration
          </Button>
        </div>
      )}
      {isCalibrated && (
        <div className="text-center">
          <p className="mb-4">Calibration complete! WebGazer is now tracking your gaze.</p>
          <Link href="/">
            <Button className="mb-4">Return to Home</Button>
          </Link>
        </div>
      )}
      <Button onClick={() => {
        console.log('Stop tracking button clicked');
        window.webgazer.end();
      }}>
        Stop tracking
      </Button>
    </div>
  )
}
