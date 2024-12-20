// hooks/useRegister.ts
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const useRegister = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  // Função para validar e-mail
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Função para validar senha
  const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  const register = async (
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    // Validação de campos obrigatórios
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios')
      return
    }

    // Validação de e-mail
    if (!isValidEmail(email)) {
      setError('Por favor, insira um e-mail válido')
      return
    }

    // Validação de senha
    if (!isValidPassword(password)) {
      setError(
        'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais'
      )
      return
    }

    // Validação de confirmação de senha
    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5160'}/api/user/register`
    const requestBody = { fullName, email, password }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (response.ok) {
        setSuccess('Cadastro realizado com sucesso!')
        setError('')
        setTimeout(() => {
          router.push('/login') // Redireciona para login após sucesso
        }, 2000)
      } else {
        const data = await response.json()
        setError(data.message || 'Erro ao criar conta')
        setSuccess('')
      }
    } catch (err) {
      setError('Erro ao se comunicar com o servidor')
      setSuccess('')
    }
  }

  return { error, success, register }
}
