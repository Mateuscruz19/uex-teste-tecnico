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

export default function LoginPage() {
  const [error, setError] = useState('')
  const router = useRouter()

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

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
    const requestBody = {
      email,
      password,
    }

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
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link href="/register" style={{ textDecoration: 'none' }}>
              <Typography color="primary">
                Não tem uma conta? Cadastre-se
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
