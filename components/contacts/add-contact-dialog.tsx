'use client'

import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import type { Contact } from '@/types'

interface AddContactDialogProps {
  open: boolean
  onClose: () => void
  onAddContact: (contact: Contact) => void
}

export function AddContactDialog({ open, onClose, onAddContact }: AddContactDialogProps) {
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newContact: Contact = {
      id: Date.now().toString(), // This should be generated on the server in a real app
      userId: 'currentUserId', // This should be the actual user ID in a real app
      name,
      cpf,
      phone,
      address: {
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        latitude: 0,
        longitude: 0,
      }
    }
    onAddContact(newContact)
    setName('')
    setCpf('')
    setPhone('')
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar Novo Contato</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="CPF"
            type="text"
            fullWidth
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Telefone"
            type="tel"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">Adicionar</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

