'use client'

import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { WalletConnect } from '@/components/WalletConnect'

export default function TradesPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <header className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">BNB Prediction Market</h1>
            </Link>
            <WalletConnect />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Your Recent Trades</h2>
          <p className="text-gray-600 mt-2">Overview of your latest activity</p>
        </div>

        <div className="card p-12 text-center">
          <p className="text-gray-600">Trading history coming soon. Explore markets to start trading.</p>
          <Link href="/markets" className="btn-primary mt-6 inline-block">Browse Markets</Link>
        </div>
      </main>
    </div>
  )
}


