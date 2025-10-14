'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WalletProvider } from '@/contexts/WalletContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from 'next-themes'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
        <LanguageProvider>
          <WalletProvider>
            {children}
          </WalletProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
