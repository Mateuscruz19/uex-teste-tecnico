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
import { useRegister } from '@/hooks/useRegister'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { error, success, register } = useRegister()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    register(fullName, email, password, confirmPassword) // Chama a função de registro do hook
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)} // Atualiza o estado do nome
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
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do e-mail
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
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar senha"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Atualiza o estado da confirmação de senha
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
