import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Autocomplete,
} from '@mui/material';
import type { Contact } from '@/types';

interface AddContactDialogProps {
  open: boolean;
  onClose: () => void;
  onAddContact: (contact: Contact) => void;
}

export function AddContactDialog({ open, onClose, onAddContact }: AddContactDialogProps) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);

  const handleGeocode = async () => {
    const address = `${street}, ${number}, ${neighborhood}, ${city}, ${state}`;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        setLatitude(location.lat.toString());
        setLongitude(location.lng.toString());
        alert('Coordenadas calculadas com sucesso!');
      } else {
        console.error('Erro ao calcular coordenadas:', data.status);
        alert('Não foi possível calcular as coordenadas. Verifique o endereço.');
      }
    } catch (error) {
      console.error('Erro na requisição de geocodificação:', error);
      alert('Erro ao tentar calcular as coordenadas.');
    }
  };

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);

    if (e.target.value.length > 3) {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(e.target.value)}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        const suggestions: string[] = data.results.map((result: { formatted_address: string }) => result.formatted_address);
        setAddressSuggestions(suggestions);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      alert('Por favor, calcule as coordenadas antes de adicionar o contato.');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Usuário não autenticado. Faça login novamente.');
      return;
    }

    const newContact = {
      Name: name,
      Cpf: cpf,
      Phone: phone,
      Street: street,
      Number: number,
      Neighborhood: neighborhood,
      City: city,
      State: state,
      Latitude: latitude,
      Longitude: longitude,
    };

    try {
      const response = await fetch('http://localhost:5160/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newContact),
      });
      console.log(newContact);
      console.log()
      if (!response.ok) {
        console.log(newContact);
        throw new Error('Erro ao adicionar o contato.');
      }

      const createdContact = await response.json();
      onAddContact(createdContact);
      alert('Contato adicionado com sucesso!');

      // Limpar campos após adicionar o contato
      setName('');
      setCpf('');
      setPhone('');
      setStreet('');
      setNumber('');
      setNeighborhood('');
      setCity('');
      setState('');
      setLatitude(null);
      setLongitude(null);
    } catch (error) {
      console.error(error);
      alert('Erro ao adicionar o contato.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
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
          <Autocomplete
            freeSolo
            options={addressSuggestions}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                label="Rua"
                fullWidth
                value={street}
                onChange={handleAddressChange}
                required
              />
            )}
          />
          <TextField
            margin="dense"
            label="Número"
            type="text"
            fullWidth
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Bairro"
            type="text"
            fullWidth
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Cidade"
            type="text"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Estado"
            type="text"
            fullWidth
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          <Button onClick={handleGeocode} variant="contained" sx={{ mt: 2 }}>
            Calcular Coordenadas
          </Button>
          {latitude && longitude && (
            <Box sx={{ mt: 2 }}>
              <p><strong>Latitude:</strong> {latitude}</p>
              <p><strong>Longitude:</strong> {longitude}</p>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">Adicionar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
