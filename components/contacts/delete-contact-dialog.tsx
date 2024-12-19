'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'

interface DeleteContactDialogProps {
  open: boolean
  onClose: () => void
  onDeleteContact: () => void
  contactName: string
}

export function DeleteContactDialog({ open, onClose, onDeleteContact, contactName }: DeleteContactDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <Typography>
          Tem certeza que deseja excluir o contato {contactName}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onDeleteContact} color="error">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}

