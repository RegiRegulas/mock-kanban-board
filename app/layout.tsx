import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { KanbanProvider } from '@/lib/context/KanbanContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mini Kanban Board',
  description: 'A simple Kanban board application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KanbanProvider>{children}</KanbanProvider>
      </body>
    </html>
  )
}