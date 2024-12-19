import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { Box, Alert, CircularProgress } from '@mui/material'
import type { Contact } from '@/types'

export default function ContactMap({ contacts, selectedContact }: { contacts: Contact[], selectedContact: Contact | null }) {
  const [loadError, setLoadError] = useState<string>('')

  // Se o contato foi selecionado, centraliza o mapa na localização dele
  const center = selectedContact 
    ? { lat: selectedContact.address.latitude, lng: selectedContact.address.longitude }
    : { lat: -23.5505, lng: -46.6333 }  // Default: São Paulo

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={15}
        >
          {contacts.map((contact) => (
            <Marker
              key={contact.id}
              position={{ lat: contact.address.latitude, lng: contact.address.longitude }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      {selectedContact && (
        <Box sx={{ p: 2, position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white' }}>
          <h4>{selectedContact.name}</h4>
          <p>{selectedContact.address.street}, {selectedContact.address.number}, {selectedContact.address.city} - {selectedContact.address.state}</p>
        </Box>
      )}
      {loadError && <Alert severity="error">{loadError}</Alert>}
    </Box>
  )
}
