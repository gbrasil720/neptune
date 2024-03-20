'use client'

import { Inter as FontSans } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
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
