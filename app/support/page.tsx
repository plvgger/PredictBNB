'use client'

import Link from 'next/link'
import { TrendingUp, HelpCircle, MessageCircle, Mail, FileText } from 'lucide-react'
import { WalletConnect } from '@/components/WalletConnect'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function SupportPage() {
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
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Support Center</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Get help with your prediction market trading</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">FAQ</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Find answers to common questions about trading, fees, and market resolution.
            </p>
            <button className="btn-secondary">Browse FAQ</button>
          </div>

          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Live Chat</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Chat with our support team in real-time for immediate assistance.
            </p>
            <button className="btn-secondary">Start Chat</button>
          </div>

          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Email Support</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Send us an email and we'll get back to you within 24 hours.
            </p>
            <button className="btn-secondary">Send Email</button>
          </div>

          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-warning-500 to-warning-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Submit Ticket</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Create a support ticket for technical issues or account problems.
            </p>
            <button className="btn-secondary">New Ticket</button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/markets" className="btn-primary text-lg px-8 py-4">
            Back to Markets
          </Link>
        </div>
      </main>
    </div>
  )
}

