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
import { useLogin } from '@/hooks/useLogin'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, login } = useLogin()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login(email, password) // Chama a função de login do hook
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
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
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
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
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
