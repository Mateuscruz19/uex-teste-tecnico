'use client'

import Image from 'next/image'
import { Box } from '@mui/material'

interface LogoProps {
  width?: number
  height?: number
}

export function Logo({ width = 120, height = 50 }: LogoProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <Image
        src="/UEX-FIRMA-LOGO.png"
        alt="UEX - Tech for Growth"
        width={width}
        height={height}
        priority
      />
    </Box>
  )
}

