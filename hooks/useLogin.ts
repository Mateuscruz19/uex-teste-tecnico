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
        const token = data.token

        // Armazena o token no localStorage (opcional)
       // Exemplo de armazenamento do token após o login
       console.log('Token recebido:', token);  // Exibe o token no console
       console.log(data);  // Exibe o objeto de resposta no console
       localStorage.setItem('authToken', token);
       localStorage.setItem('token', data);
       console.log('Token armazenado:', localStorage.getItem('authToken'));  // Verifique se o token está sendo salvo corretamente


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
