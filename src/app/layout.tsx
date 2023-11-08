import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gastro Gnome',
  description: 'A Recipe Sharing App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      {/* <body className={inter.className}> */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
