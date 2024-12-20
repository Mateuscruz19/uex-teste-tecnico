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

    // Função para verificar se o Google Maps foi carregado
    const checkGoogleMapsLoaded = () => {
      if (window.google && window.google.maps) {
        setIsLoading(false)
      } else {
        setError('Failed to load Google Maps')
        setIsLoading(false)
      }
    }

    // Adiciona um listener para erro ao carregar o script da API
    const script = document.querySelector('script[src*="maps.googleapis.com/maps/api"]')
    if (script) {
      script.addEventListener('error', () => {
        setError('Failed to load Google Maps')
        setIsLoading(false)
      })
    }

    // Tenta verificar se o Google Maps está carregado após 1 segundo
    setTimeout(checkGoogleMapsLoaded, 1000)
  }, [apiKey])

  // Exibe um erro se não carregar o mapa ou se houver erro
  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  // Exibe um carregando enquanto o mapa não estiver pronto
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    )
  }

  return <>{children}</>
}
