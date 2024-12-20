'use client';

import { useState } from 'react';
import { Box, Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Add as AddIcon, Logout as LogoutIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { ContactList } from './contact-list';
import ContactMap from './contact-map';
import { AddContactDialog } from './add-contact-dialog';
import { DeleteContactDialog } from './delete-contact-dialog';
import { useContacts } from '@/hooks/useContacts';
import { useAccount } from '@/hooks/useAccount';
import { Contact } from '@/types';

export default function ContactsPage() {
  const router = useRouter();
  const { contacts, setContacts, error } = useContacts();
  const { logout, deleteAccount } = useAccount();

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const handleAddContact = (newContact: Contact) => {
    setContacts([...contacts, newContact]);
    setIsAddDialogOpen(false);
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    setSelectedContact(null);
    setIsDeleteDialogOpen(false);
  };

  const confirmDeleteAccount = async () => {
    const success = await deleteAccount();
    if (!success) {
      console.error('Erro ao excluir a conta.');
    }
  };

  if (error) {
    console.error(error);
    router.push('/'); // Redireciona para a página de login em caso de erro
    return null;
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
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Gerenciador de Contatos
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsAddDialogOpen(true)}>
              Adicionar Contato
            </Button>
            <Button variant="contained" color="secondary" startIcon={<LogoutIcon />} onClick={logout}>
              Sair
            </Button>
            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => setIsConfirmDeleteOpen(true)}>
              Excluir Conta
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <ContactList
            contacts={contacts}
            onSelectContact={setSelectedContact}
            onDeleteContact={() => setIsDeleteDialogOpen(true)}
            onUpdateContact={() => {}}
          />
          <Box sx={{ flexGrow: 1 }}>
            <ContactMap contacts={contacts} selectedContact={selectedContact} />
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
      <Dialog open={isConfirmDeleteOpen} onClose={() => setIsConfirmDeleteOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir sua conta? Essa ação é irreversível.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmDeleteOpen(false)}>Cancelar</Button>
          <Button color="error" onClick={confirmDeleteAccount}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
