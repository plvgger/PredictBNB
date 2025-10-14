'use client'

import { useState } from 'react'
import { WalletConnect } from '@/components/WalletConnect'
import { TrendingUp, Plus, X, Calendar } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'
import { MarketService } from '@/services/marketService'
import { useWallet } from '@/contexts/WalletContext'

export default function CreateMarketPage() {
  const [question, setQuestion] = useState('')
  const [outcomes, setOutcomes] = useState(['', ''])
  const [endTime, setEndTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isConnected, address } = useWallet()

  const addOutcome = () => {
    if (outcomes.length < 10) {
      setOutcomes([...outcomes, ''])
    }
  }

  const removeOutcome = (index: number) => {
    if (outcomes.length > 2) {
      setOutcomes(outcomes.filter((_, i) => i !== index))
    }
  }

  const updateOutcome = (index: number, value: string) => {
    const newOutcomes = [...outcomes]
    newOutcomes[index] = value
    setOutcomes(newOutcomes)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected || !address) return

    setIsSubmitting(true)
    
    try {
      // Create market using the service
      const endTimeMs = new Date(endTime).getTime()
      const market = MarketService.createMarket(
        question.trim(),
        outcomes.map(o => o.trim()).filter(o => o.length > 0),
        endTimeMs,
        address
      )
      
      // Reset form
      setQuestion('')
      setOutcomes(['', ''])
      setEndTime('')
      
      alert(`Market created successfully! Market ID: ${market.id}`)
      
      // Redirect to the new market
      window.location.href = `/markets/${market.id}`
    } catch (error) {
      console.error('Error creating market:', error)
      alert('Error creating market. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValid = question.trim() && 
    outcomes.every(outcome => outcome.trim()) && 
    endTime && 
    new Date(endTime) > new Date()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="BNB Prediction Market" className="w-12 h-12 object-contain" />
              <h1 className="text-2xl font-bold gradient-text">PredictBNB</h1>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create New Market</h2>
          <p className="text-gray-600">Create a prediction market for others to trade on</p>
        </div>

        {!isConnected ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm">
            <div className="max-w-md mx-auto">
              <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
              <p className="text-gray-600 mb-6">
                Connect your wallet to create prediction markets
              </p>
              <WalletConnect />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Question */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                Market Question *
              </label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., Will Bitcoin reach $100,000 by end of 2024?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows={3}
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Be specific and clear about what you're asking
              </p>
            </div>

            {/* Outcomes */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Possible Outcomes *
                </label>
                <button
                  type="button"
                  onClick={addOutcome}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Outcome</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={outcome}
                      onChange={(e) => updateOutcome(index, e.target.value)}
                      placeholder={`Outcome ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                    {outcomes.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOutcome(index)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <p className="mt-3 text-sm text-gray-500">
                Minimum 2 outcomes, maximum 10 outcomes
              </p>
            </div>

            {/* End Time */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                Market End Time *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="datetime-local"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                When should this market close for new bets?
              </p>
            </div>

            {/* Submit Button */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Creating Market...' : 'Create Market'}
              </button>
              
              <p className="mt-3 text-sm text-gray-500 text-center">
                Creating a market requires a small BNB fee for gas
              </p>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}
