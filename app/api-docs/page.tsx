'use client'

import Link from 'next/link'
import { TrendingUp, Code2, Terminal, Database } from 'lucide-react'
import { WalletConnect } from '@/components/WalletConnect'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function APIDocsPage() {
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
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">API Documentation</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Integrate BNB Prediction Market into your applications</p>
        </div>

        <div className="grid gap-6">
          <div className="card p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Smart Contract ABI</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Interact directly with our smart contracts on BNB Smart Chain.
                </p>
                <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-4 overflow-x-auto">
                  <code className="text-sm text-green-400 font-mono">
                    const contract = new ethers.Contract(address, abi, signer);
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Terminal className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">REST API Endpoints</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Query market data and user positions programmatically.
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">GET /api/markets</code> - List all markets</p>
                  <p><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">GET /api/markets/:id</code> - Get market details</p>
                  <p><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">GET /api/user/:address</code> - Get user positions</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">WebSocket Streams</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Subscribe to real-time market updates and price changes.
                </p>
                <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-4 overflow-x-auto">
                  <code className="text-sm text-green-400 font-mono">
                    ws://api.bnbmarket.io/stream/markets
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/markets" className="btn-primary text-lg px-8 py-4">
            Start Trading
          </Link>
        </div>
      </main>
    </div>
  )
}

