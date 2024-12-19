import { Metadata } from 'next'
import { Suspense } from 'react'
import ClientThemeProvider from '@/components/client-theme-provider'

export const metadata: Metadata = {
  title: 'Contact Manager',
  description: 'Manage your contacts efficiently',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientThemeProvider>{children}</ClientThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}

