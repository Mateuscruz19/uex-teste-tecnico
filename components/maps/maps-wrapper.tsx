'use client'

import { useEffect, useState } from 'react'
import { Box, Alert, CircularProgress } from '@mui/material'

interface MapsWrapperProps {
  children: React.ReactNode
}

export function MapsWrapper({ children }: MapsWrapperProps) {
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    if (!apiKey) {
      setError('Google Maps API key is not configured')
      setIsLoading(false)
      return
    }

    // Check if Google Maps API is loaded
    const checkGoogleMapsLoaded = () => {
      if (window.google && window.google.maps) {
        setIsLoading(false)
      } else {
        setError('Failed to load Google Maps')
      }
    }

    // Add listener for Google Maps script load error
    const script = document.querySelector('script[src*="maps.googleapis.com/maps/api"]')
    if (script) {
      script.addEventListener('error', () => {
        setError('Failed to load Google Maps')
        setIsLoading(false)
      })
    }

    // Check after a timeout to ensure the API had time to load
    setTimeout(checkGoogleMapsLoaded, 1000)
  }, [apiKey])

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    )
  }

  return <>{children}</>
}

