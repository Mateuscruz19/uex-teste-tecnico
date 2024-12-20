'use client'

import { useState, useEffect } from 'react'
import { Box, Container, Typography, Button, Grid } from '@mui/material'
import { Add as AddIcon, Logout as LogoutIcon, Delete as DeleteIcon } from '@mui/icons-material'
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
    // Ação de logout
  }

  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Link href="/" passHref>
            <Logo width={100} height={40} />
          </Link>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Gerenciador de Contatos
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
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
              onClick={handleLogout}
            >
              <Link href="/" passHref>
                Sair
              </Link>
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Link href="/" passHref>
                Excluir Conta
              </Link>
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <ContactList
            contacts={contacts}
            onSelectContact={setSelectedContact}
            onDeleteContact={() => setIsDeleteDialogOpen(true)} onUpdateContact={function (updatedContact: Contact): void {
              throw new Error('Function not implemented.')
            } }          />
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
