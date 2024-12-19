'use client'

import { useState } from 'react'
import { List, ListItem, ListItemText, TextField, Paper, IconButton, ListItemSecondaryAction } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import type { Contact } from '@/types'

interface ContactListProps {
  contacts: Contact[]
  onSelectContact: (contact: Contact) => void
  onDeleteContact: () => void
}

export function ContactList({ contacts, onSelectContact, onDeleteContact }: ContactListProps) {
  const [search, setSearch] = useState('')

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    contact.cpf.includes(search)
  )

  return (
    <Paper sx={{ width: 300, height: '100%', overflowY: 'auto' }}>
      <TextField
        fullWidth
        label="Buscar contatos"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ p: 2 }}
      />
      <List>
        {filteredContacts.map((contact) => (
          <ListItem
            key={contact.id}
            button
            onClick={() => onSelectContact(contact)}
          >
            <ListItemText
              primary={contact.name}
              secondary={contact.cpf}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={onDeleteContact}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

