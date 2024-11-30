'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface CalibrationContextType {
  isCalibrated: boolean
  setIsCalibrated: (value: boolean) => void
}

const CalibrationContext = createContext<CalibrationContextType | undefined>(undefined)

export function CalibrationProvider({ children }: { children: ReactNode }) {
  const [isCalibrated, setIsCalibrated] = useState(false)

  return (
    <CalibrationContext.Provider value={{ isCalibrated, setIsCalibrated }}>
      {children}
    </CalibrationContext.Provider>
  )
}

export function useCalibration() {
  const context = useContext(CalibrationContext)
  if (context === undefined) {
    throw new Error('useCalibration must be used within a CalibrationProvider')
  }
  return context
}

