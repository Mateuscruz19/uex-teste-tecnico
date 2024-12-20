'use client';

import { useState, useEffect } from 'react';
import { Contact } from '@/types';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Token não encontrado!');
        return;
      }

      try {
        const response = await fetch('http://localhost:5160/api/contact', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setContacts(data);
        } else {
          setError(`Erro ao buscar contatos: ${response.status}`);
        }
      } catch (err) {
        setError('Erro ao conectar-se à API.');
      }
    };

    fetchContacts();
  }, []);

  return { contacts, setContacts, error };
}
