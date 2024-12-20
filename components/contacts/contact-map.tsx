import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { Box, Alert, CircularProgress } from '@mui/material'
import { Contact } from '@/types'

// Importando o Marker
import { Marker } from '@react-google-maps/api'

export default function ContactMap({ contacts, selectedContact }: { contacts: Contact[], selectedContact: Contact | null }) {
  const [loadError, setLoadError] = useState<string>('')

  const center = selectedContact 
    ? { lat: selectedContact.address.latitude, lng: selectedContact.address.longitude }
    : { lat: -23.5505, lng: -46.6333 }  // Default: São Paulo

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <LoadScript 
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} 
        onLoad={() => console.log('Google Maps Loaded')}
        onError={() => setLoadError('Failed to load Google Maps')}
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={15}
        >
          {/* Usando o Marker */}
          {contacts.map((contact) => (
            <Marker
              key={contact.id}
              position={{ lat: contact.address.latitude, lng: contact.address.longitude }}
              label={{ text: contact.name, color: 'red' }}  // Exemplo de conteúdo customizado
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Exibe detalhes do contato selecionado */}
      {selectedContact && (
        <Box sx={{ p: 2, position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white' }}>
          <h4>{selectedContact.name}</h4>
          <p>{selectedContact.address.street}, {selectedContact.address.number}, {selectedContact.address.city} - {selectedContact.address.state}</p>
        </Box>
      )}

      {/* Exibe erro caso não consiga carregar o mapa */}
      {loadError && <Alert severity="error">{loadError}</Alert>}
    </Box>
  )
}
