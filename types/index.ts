export interface Contact {
  id: string
  userId: string
  name: string
  cpf: string
  phone: string
  address: {
    cep: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    latitude: number
    longitude: number
  }
}

