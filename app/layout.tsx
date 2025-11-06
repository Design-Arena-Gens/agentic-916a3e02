import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Criador de Currículo Minimalista',
  description: 'Crie seu currículo profissional de forma rápida e minimalista',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
