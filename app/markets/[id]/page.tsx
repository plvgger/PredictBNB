'use client'

import { useState, useEffect } from 'react'
import { WalletConnect } from '@/components/WalletConnect'
import { TrendingUp, Clock, Users, DollarSign, ArrowLeft } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { MarketService, Market } from '@/services/marketService'
import { TradingPanel } from '@/components/TradingPanel'
import { useWallet } from '@/contexts/WalletContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { translateMarket } from '@/utils/translate'

export default function MarketPage({ params }: { params: { id: string } }) {
  const { language } = useLanguage()
  const [market, setMarket] = useState<Market | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isConnected } = useWallet()

  // Load market data
  useEffect(() => {
    const loadMarket = () => {
      setIsLoading(true)
      try {
        const marketId = parseInt(params.id)
        const marketData = MarketService.getMarket(marketId)
        if (marketData) {
          setMarket(marketData)
        } else {
          // Market not found
          setMarket(null)
        }
      } catch (error) {
        console.error('Error loading market:', error)
        setMarket(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadMarket()
  }, [params.id])

  const refreshMarket = () => {
    const marketId = parseInt(params.id)
    const marketData = MarketService.getMarket(marketId)
    if (marketData) {
      setMarket(marketData)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <TrendingUp className="h-8 w-8 text-primary-600" />
          </div>
          <p className="text-lg text-gray-600">Loading market...</p>
        </div>
      </div>
    )
  }

  if (!market) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Market Not Found</h2>
          <p className="text-gray-600 mb-6">The market you're looking for doesn't exist.</p>
          <Link href="/markets" className="btn-primary">
            Browse Markets
          </Link>
        </div>
      </div>
    )
  }

  const getOutcomeProbabilities = () => {
    const total = market.outcomeLiquidity.reduce((sum, liquidity) => sum + liquidity, 0)
    if (total === 0) return market.outcomes.map(() => 50)
    
    return market.outcomeLiquidity.map(liquidity => 
      Math.round((liquidity / total) * 100)
    )
  }

  const getMarketStatus = () => {
    if (market.resolved) return { text: 'Resolved', color: 'bg-success-100 text-success-800 border-success-200' }
    if (market.endTime <= Date.now()) return { text: 'Ended', color: 'bg-gray-100 text-gray-800 border-gray-200' }
    return { text: 'Active', color: 'bg-primary-100 text-primary-800 border-primary-200' }
  }

  const probabilities = getOutcomeProbabilities()
  const status = getMarketStatus()
  const translatedMarket = translateMarket(market, language)

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
              <LanguageToggle />
              <ThemeToggle />
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/markets"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Markets</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Market Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Header */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {translatedMarket.question}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {market.resolved ? 'Resolved' : 
                         market.endTime <= Date.now() ? 'Ended' : 
                         formatDistanceToNow(new Date(market.endTime), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{market.totalLiquidity.toFixed(2)} BNB</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                  {status.text}
                </span>
              </div>
            </div>

            {/* Outcomes */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Outcomes</h3>
              <div className="space-y-4">
                {translatedMarket.outcomes.map((outcome: string, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">{outcome}</span>
                      <span className="text-lg font-bold text-primary-600">
                        {probabilities[index]}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div 
                        className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${probabilities[index]}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{market.outcomeLiquidity[index].toFixed(2)} BNB liquidity</span>
                      <span>~{((market.outcomeLiquidity[index] / market.totalLiquidity) * 100).toFixed(1)}% of total</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created by</dt>
                  <dd className="text-sm text-gray-900">{market.creator}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Liquidity</dt>
                  <dd className="text-sm text-gray-900">{market.totalLiquidity.toFixed(2)} BNB</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">End Time</dt>
                  <dd className="text-sm text-gray-900">
                    {new Date(market.endTime).toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Market ID</dt>
                  <dd className="text-sm text-gray-900">#{market.id}</dd>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Panel */}
          <div className="lg:col-span-1">
            <TradingPanel 
              market={market} 
              onTradeComplete={refreshMarket}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
