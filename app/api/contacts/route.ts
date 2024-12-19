import { NextResponse } from 'next/server'
import type { Contact } from '@/types'

const mockContacts: Contact[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'John Doe',
    cpf: '123.456.789-00',
    phone: '(11) 98765-4321',
    address: {
      cep: '01310-200',
      street: 'Avenida Paulista',
      number: '1000',
      complement: 'Sala 123',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      latitude: -23.5629,
      longitude: -46.6544
    }
  },
  // Add more mock contacts here
]

export async function GET() {
  return NextResponse.json(mockContacts)
}

