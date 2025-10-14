'use client'

import Link from 'next/link'
import { TrendingUp, Book, Code, Lightbulb, ArrowRight } from 'lucide-react'
import { WalletConnect } from '@/components/WalletConnect'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function DocsPage() {
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
          <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Documentation</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Learn how to use BNB Prediction Market</p>
        </div>

        <div className="grid gap-6">
          <div className="card p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Book className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Getting Started</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Learn the basics of prediction markets and how to start trading with BNB.
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4 text-primary-600" />
                    <span>Connect your MetaMask wallet to BNB Smart Chain</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4 text-primary-600" />
                    <span>Browse markets and find predictions you're interested in</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4 text-primary-600" />
                    <span>Buy shares in outcomes you believe will happen</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4 text-primary-600" />
                    <span>Redeem winning shares for BNB when markets resolve</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">How Prediction Markets Work</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Prediction markets aggregate information from many participants to forecast future events.
                </p>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p><strong>Market Creation:</strong> Anyone can create a market by defining a question and possible outcomes.</p>
                  <p><strong>Trading:</strong> Users buy shares representing different outcomes. Share prices reflect the probability of each outcome.</p>
                  <p><strong>Resolution:</strong> When the event occurs, the market resolves and winning shares pay out 1 BNB each.</p>
                  <p><strong>Fees:</strong> A small 2% fee is collected from winning payouts to maintain the platform.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Smart Contracts</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our smart contracts are deployed on BNB Smart Chain for transparency and security.
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4 text-primary-600" />
                    <span>Non-custodial: You always control your funds</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4 text-primary-600" />
                    <span>Transparent: All transactions are on-chain</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4 text-primary-600" />
                    <span>Audited: Smart contracts follow OpenZeppelin standards</span>
                  </li>
                </ul>
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

