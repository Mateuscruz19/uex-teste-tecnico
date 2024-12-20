'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from '@mui/material'
import { Logo } from '@/components/shared/logo'

export default function RegisterPage() {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fullName = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

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
    const requestBody = {
      fullName,
      email,
      password,
    }

    console.log('API URL:', apiUrl)
    console.log('Request Body:', requestBody)

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

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Logo width={400} height={160} />

        <Typography variant="h5" component="h1">
          Criar Conta
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome completo"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar senha"
            type="password"
            id="confirmPassword"
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link href="/login" style={{ textDecoration: 'none' }}>
              <Typography color="primary">
                Já tem uma conta? Faça login
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
