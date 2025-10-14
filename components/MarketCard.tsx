'use client'

import { useState } from 'react'
import { Clock, Users, TrendingUp, ChevronRight, Activity } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { useLanguage } from '@/contexts/LanguageContext'
import { translateMarket } from '@/utils/translate'

interface Market {
  id: number
  question: string
  outcomes: string[]
  endTime: number
  resolved: boolean
  totalLiquidity: number
  outcomeLiquidity: number[]
  creator: string
  creationTime: number
  participants?: number
}

interface MarketCardProps {
  market: Market
}

export function MarketCard({ market }: MarketCardProps) {
  const { language, t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const translatedMarket = translateMarket(market as any, language)

  const getMarketStatus = () => {
    if (market.resolved) return { text: 'Resolved', color: 'bg-success-100 text-success-800 border-success-200' }
    if (market.endTime <= Date.now()) return { text: 'Ended', color: 'bg-gray-100 text-gray-800 border-gray-200' }
    return { text: 'Active', color: 'bg-primary-100 text-primary-800 border-primary-200' }
  }

  const getTimeRemaining = () => {
    if (market.resolved) return 'Resolved'
    if (market.endTime <= Date.now()) return 'Ended'
    return formatDistanceToNow(new Date(market.endTime), { addSuffix: true })
  }

  const getOutcomeProbabilities = () => {
    const total = market.outcomeLiquidity.reduce((sum, liquidity) => sum + liquidity, 0)
    if (total === 0) return market.outcomes.map(() => 50) // Default to 50% if no liquidity
    
    return market.outcomeLiquidity.map(liquidity => 
      Math.round((liquidity / total) * 100)
    )
  }

  const probabilities = getOutcomeProbabilities()
  const status = getMarketStatus()
  const maxChance = Math.max(...probabilities)

  return (
    <div 
      className="card p-6 card-hover cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/markets/${market.id}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {translatedMarket.question}
            </h3>
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{getTimeRemaining()}</span>
              </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span suppressHydrationWarning>{market.totalLiquidity.toFixed(2)} BNB</span>
            </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-300" suppressHydrationWarning>{maxChance}%</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${status.color}`}>
              {status.text}
            </span>
            <ChevronRight 
              className={`h-5 w-5 text-gray-400 transition-all duration-200 ${
                isHovered ? 'translate-x-1 text-primary-500' : ''
              }`} 
            />
          </div>
        </div>

        {/* Outcomes */}
        <div className="space-y-4 mb-6">
          {translatedMarket.outcomes.map((outcome: string, index: number) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{outcome}</span>
                <span className="text-lg font-bold gradient-text" suppressHydrationWarning>
                  {probabilities[index]}%
                </span>
              </div>
              <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${probabilities[index]}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse dark:via-white/10" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              {typeof market.participants === 'number' && (
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{market.participants} {t.markets.traders}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Activity className="h-4 w-4" />
                <span>{market.outcomes.length} {t.markets.outcomes}</span>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t.markets.by} {market.creator}
            </div>
        </div>
      </Link>
    </div>
  )
}
