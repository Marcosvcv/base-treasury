import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BaseTreasury - Transparent Treasury Analytics for Base',
  description: 'Transparent on-chain treasury + spending intelligence for Base DAOs & protocols',
  other: {
    'base:app_id': '69529e62c63ad876c9081842',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69529e62c63ad876c9081842" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

