import './globals.css';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Página Não Encontrada',
  description: 'A página que você procura não existe.',
}

export default function GlobalNotFound() {
  return (
    <html>
      <body className="flex items-center justify-center h-screen">
        <div>
          <h1 className="text-4xl font-bold">404</h1>
          <p>Página não encontrada.</p>
        </div>
      </body>
    </html>
  )
}