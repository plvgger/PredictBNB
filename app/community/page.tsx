'use client'

import Link from 'next/link'
import { TrendingUp, Users, MessageSquare, Zap, Award } from 'lucide-react'
import { WalletConnect } from '@/components/WalletConnect'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function CommunityPage() {
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Community</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Join thousands of traders predicting the future</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Community Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Total Traders</span>
                <span className="text-2xl font-bold gradient-text">12,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Active Markets</span>
                <span className="text-2xl font-bold gradient-text">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Total Volume</span>
                <span className="text-2xl font-bold gradient-text">$2.4M</span>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-3xl flex items-center justify-center mb-6">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Discussion Forums</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join the conversation and share your market insights with other traders.
            </p>
            <button className="btn-primary w-full">Join Forum</button>
          </div>

          <div className="card p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-3xl flex items-center justify-center mb-6">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Governance</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Participate in platform governance and help shape the future of BNB Prediction Market.
            </p>
            <button className="btn-primary w-full">Vote Now</button>
          </div>

          <div className="card p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-warning-500 to-warning-600 rounded-3xl flex items-center justify-center mb-6">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Leaderboard</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              See who the top traders are and compete for rewards and recognition.
            </p>
            <button className="btn-primary w-full">View Rankings</button>
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

