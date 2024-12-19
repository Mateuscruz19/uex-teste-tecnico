'use client'

import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { Box, Alert, CircularProgress } from '@mui/material'
import type { Contact } from '@/types'

export default function ContactMap() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [loadError, setLoadError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/contacts')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setContacts(data)
      } catch (error) {
        console.error('Failed to fetch contacts:', error)
        setLoadError('Failed to load contacts. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchContacts()
  }, [])

  if (!apiKey) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          Google Maps API key is not configured. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.
        </Alert>
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (loadError) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{loadError}</Alert>
      </Box>
    )
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100vh' }}
        center={{ lat: -23.5505, lng: -46.6333 }} // São Paulo
        zoom={10}
      >
        {contacts.map((contact) => (
          <Marker
            key={contact.id}
            position={{
              lat: contact.address.latitude,
              lng: contact.address.longitude
            }}
            onClick={() => setSelectedContact(contact)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}

