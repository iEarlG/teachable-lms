import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Poppins } from 'next/font/google';

import './globals.css';

import { ToastProvider } from '@/components/providers/ToastProvider';
import { ConfettiProvider } from '@/components/providers/ConfettiProvider';

const inter = Poppins({
  subsets: ['latin'],
  weight: ["400", "500", "600", "700", "800"]
})

export const metadata: Metadata = {
  title: 'Teachable | Learning Management System',
  description: 'Teachable is a learning management system that helps you create and sell online courses and coaching services.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
