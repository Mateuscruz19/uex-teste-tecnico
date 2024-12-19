import { useState } from 'react'
import { List, ListItem, ListItemText, TextField, Paper, IconButton, ListItemSecondaryAction } from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import type { Contact } from '@/types'

interface ContactListProps {
  contacts: Contact[]
  onSelectContact: (contact: Contact) => void
  onDeleteContact: () => void
  onUpdateLocation: (contactId: string) => void // Nova função para atualizar a localização
}

export function ContactList({ contacts, onSelectContact, onDeleteContact, onUpdateLocation }: ContactListProps) {
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
        sx={{ padding: '12px' }} // Ajustando o padding para dar mais espaçamento
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
              secondary={`${contact.cpf} - ${contact.address.street}, ${contact.address.number}, ${contact.address.city}`}
            />
            <ListItemSecondaryAction>
              {/* Botão para Alterar Localização */}
              <IconButton edge="end" aria-label="edit" onClick={() => onUpdateLocation(contact.id)}>
                <EditIcon />
              </IconButton>
              {/* Botão para Excluir Contato */}
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
