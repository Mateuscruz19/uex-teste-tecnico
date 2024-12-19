'use client'

import { useState, useEffect } from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import { Add as AddIcon, Logout as LogoutIcon } from '@mui/icons-material'
import { ContactList } from './contact-list'
import ContactMap from './contact-map'
import { Logo } from '../shared/logo'
import { AddContactDialog } from './add-contact-dialog'
import { DeleteContactDialog } from './delete-contact-dialog'
import type { Contact } from '@/types'
import Link from 'next/link'

interface ContactMapProps {

  contacts: Contact[]

  selectedContact: Contact | null

}
export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    // Fetch contacts from API
    const fetchContacts = async () => {
      const response = await fetch('/api/contacts')
      const data = await response.json()
      setContacts(data)
    }
    fetchContacts()
  }, [])

  const handleAddContact = (newContact: Contact) => {
    setContacts([...contacts, newContact])
    setIsAddDialogOpen(false)
  }

  const handleDeleteContact = (contactId: string) => {
    setContacts(contacts.filter(contact => contact.id !== contactId))
    setSelectedContact(null)
    setIsDeleteDialogOpen(false)
  }

  const handleLogout = () => {
    
  }
  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
          <Logo width={100} height={40} />
          <Typography variant="h6" component="h1">
            Gerenciador de Contatos
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddDialogOpen(true)}
          >
            Adicionar Contato
          </Button>
          <Button
              variant="contained"
              color="secondary"
              startIcon={<LogoutIcon />}
              onClick={handleLogout} // Ação de logout
            >
              Sair
            </Button>
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <ContactList
            contacts={contacts}
            onSelectContact={setSelectedContact}
            onDeleteContact={() => setIsDeleteDialogOpen(true)}
          />
          <Box sx={{ flexGrow: 1 }}>
            <ContactMap
              contacts={contacts}
              selectedContact={selectedContact}
            />
          </Box>
        </Box>
      </Box>
      <AddContactDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddContact={handleAddContact}
      />
      <DeleteContactDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDeleteContact={() => handleDeleteContact(selectedContact?.id || '')}
        contactName={selectedContact?.name || ''}
      />
    </Container>
  )
}

