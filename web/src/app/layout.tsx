'use client'

import { ClerkProvider } from '@clerk/nextjs'

import { Inter as FontSans } from 'next/font/google'
import './globals.css'

import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { useEffect } from 'react'
import { i18n } from 'next-i18next'
import { createClient } from '@/utils/supabase/client'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    async function loadSession() {
      const supabase = createClient()
      const session = await supabase.auth.getSession()
      const userExists = await supabase
        .from('TeamManager')
        .select('*')
        .eq('email', session.data.session?.user.email)

      if (!userExists) {
        const name =
          session.data.session?.user.identities?.[0]?.identity_data?.name ?? ''
        const email = session.data.session?.user.user_metadata?.email ?? ''

        await supabase.from('TeamManager').insert({
          name,
          email,
        })
      }

      console.log('DONE')
    }

    loadSession()
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
