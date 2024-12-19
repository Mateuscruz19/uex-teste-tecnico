import { useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Paper,
  IconButton,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import type { Contact } from '@/types'

interface ContactListProps {
  contacts: Contact[]
  onSelectContact: (contact: Contact) => void
  onDeleteContact: (contactId: string) => void
  onUpdateContact: (updatedContact: Contact) => void
}

export function ContactList({
  contacts,
  onSelectContact,
  onDeleteContact,
  onUpdateContact,
}: ContactListProps) {
  const [search, setSearch] = useState('')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [editName, setEditName] = useState('')
  const [editCpf, setEditCpf] = useState('')
  const [editPhone, setEditPhone] = useState('')

  const openEditDialog = (contact: Contact) => {
    setSelectedContact(contact)
    setEditName(contact.name)
    setEditCpf(contact.cpf)
    setEditPhone(contact.phone)
    setIsEditDialogOpen(true)
  }

  const closeEditDialog = () => {
    setIsEditDialogOpen(false)
    setSelectedContact(null)
  }

  const handleEditSubmit = () => {
    if (selectedContact) {
      const updatedContact = {
        ...selectedContact,
        name: editName,
        cpf: editCpf,
        phone: editPhone,
      }
      onUpdateContact(updatedContact)
    }
    closeEditDialog()
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase()) || contact.cpf.includes(search)
  )

  return (
    <Paper sx={{ width: 300, height: '100%', overflowY: 'auto' }}>
      <TextField
        fullWidth
        label="Buscar contatos"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ padding: '12px' }}
      />
      <List>
        {filteredContacts.map((contact) => (
          <ListItem key={contact.id} button onClick={() => onSelectContact(contact)}>
            <ListItemText
              primary={contact.name}
              secondary={`${contact.cpf} - ${contact.address.street}, ${contact.address.number}, ${contact.address.city}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => openEditDialog(contact)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDeleteContact(contact.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Diálogo de Edição */}
      {selectedContact && (
        <Dialog open={isEditDialogOpen} onClose={closeEditDialog} fullWidth>
          <DialogTitle>Editar Contato</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nome"
              type="text"
              fullWidth
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="CPF"
              type="text"
              fullWidth
              value={editCpf}
              onChange={(e) => setEditCpf(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Telefone"
              type="tel"
              fullWidth
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditDialog}>Cancelar</Button>
            <Button onClick={handleEditSubmit} variant="contained">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Paper>
  )
}
