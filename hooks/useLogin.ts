// hooks/useLogin.ts
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const useLogin = () => {
  const [error, setError] = useState('')
  const router = useRouter()

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const login = async (email: string, password: string) => {
    // Validação de campos obrigatórios
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    // Validação de e-mail
    if (!isValidEmail(email)) {
      setError('Por favor, insira um e-mail válido.')
      return
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5160'}/api/user/login`
    const requestBody = { email, password }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (response.ok) {
        const data = await response.json()
        const token = data.Token

        // Armazena o token no localStorage (opcional)
        localStorage.setItem('authToken', token)

        setError('')
        router.push('/contacts') // Redireciona para a página de contatos
      } else {
        const data = await response.json()

        // Exibe uma mensagem específica baseada no retorno da API
        if (data.details) {
          setError(data.details) // Mensagem específica fornecida pela API
        } else if (data.message) {
          setError(data.message) // Mensagem genérica fornecida pela API
        } else {
          setError('Erro ao fazer login. Tente novamente.') // Mensagem fallback
        }
      }
    } catch (err) {
      setError('Erro ao se comunicar com o servidor. Tente novamente mais tarde.')
    }
  }

  return { error, login }
}
