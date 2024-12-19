'use client'

import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'
import { Logo } from '@/components/shared/logo'
// Implement your login logic here
export default function WelcomePage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: 4,
        }}
      >// Implement your login logic here
        <Logo width={400} height={160} />
        
        <Typography variant="h4" component="h1" gutterBottom>
          Bem-vindo ao Gerenciador de Contatos
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Organize seus contatos de forma eficiente com nossa plataforma integrada ao Google Maps.
          Gerencie endereços, visualize localizações e mantenha seus contatos sempre atualizados.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            href="/login"
            variant="contained"
            size="large"
          >
            Login
          </Button>
          <Button
            component={Link}
            href="/register"
            variant="outlined"
            size="large"
          >
            Cadastre-se
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

