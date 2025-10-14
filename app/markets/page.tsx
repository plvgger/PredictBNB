'use client'

import { useState, useEffect } from 'react'
import { WalletConnect } from '@/components/WalletConnect'
import { TrendingUp, Plus, Filter, Search, RefreshCw } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle'
import Link from 'next/link'
import { MarketCard } from '@/components/MarketCard'
import { MarketService, Market } from '@/services/marketService'
import { useWallet } from '@/contexts/WalletContext'
import { useLanguage } from '@/contexts/LanguageContext'

export default function MarketsPage() {
  const { t } = useLanguage()
  const [markets, setMarkets] = useState<Market[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [category, setCategory] = useState<'All' | 'Crypto' | 'Sports' | 'Politics' | 'Macro' | 'Tech'>('All')
  const [isLoading, setIsLoading] = useState(true)
  const { isConnected } = useWallet()

  // Load markets on component mount
  useEffect(() => {
    const loadMarkets = () => {
      setIsLoading(true)
      try {
        const allMarkets = MarketService.getAllMarkets()
        console.log('Loaded markets:', allMarkets) // Debug log
        setMarkets(allMarkets)
      } catch (error) {
        console.error('Error loading markets:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMarkets()
  }, [])

  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.outcomes.some(outcome => outcome.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'active' && !market.resolved && market.endTime > Date.now()) ||
      (filterStatus === 'resolved' && market.resolved) ||
      (filterStatus === 'ended' && !market.resolved && market.endTime <= Date.now())
    const matchesCategory = category === 'All' || market.category === category
    
    return matchesSearch && matchesFilter && matchesCategory
  })

  const refreshMarkets = () => {
    const allMarkets = MarketService.getAllMarkets()
    setMarkets(allMarkets)
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="BNB Prediction Market" className="w-12 h-12 object-contain" />
              <h1 className="text-2xl font-bold gradient-text">PredictBNB</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <ThemeToggle />
              <button
                onClick={refreshMarkets}
                className="btn-secondary flex items-center space-x-2"
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{t.common.refresh}</span>
              </button>
              <Link 
                href="/create"
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>{t.home.createMarket}</span>
              </Link>
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t.markets.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t.markets.description}</p>
        </div>

        {/* Search and Filter */}
        <div className="card p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.markets.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-lg text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-700"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                aria-label="Filter by status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-200 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-lg min-w-[150px] text-gray-900 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="all">{t.markets.allMarkets}</option>
                <option value="active">{t.markets.active}</option>
                <option value="resolved">{t.markets.resolved}</option>
                <option value="ended">{t.markets.ended}</option>
              </select>
              <select
                aria-label="Filter by category"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="border border-gray-200 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-lg min-w-[150px] text-gray-900 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="All">{t.markets.all}</option>
                <option value="Crypto">{t.markets.crypto}</option>
                <option value="Sports">{t.markets.sports}</option>
                <option value="Politics">{t.markets.politics}</option>
                <option value="Macro">{t.markets.macro}</option>
                <option value="Tech">{t.markets.tech}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Markets Grid */}
        {isLoading ? (
          <div className="card p-16 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <RefreshCw className="h-12 w-12 text-primary-600 animate-spin" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Loading Markets...</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Fetching the latest prediction markets
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {filteredMarkets.length === 0 ? (
              <div className="card p-16 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <TrendingUp className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">No Markets Found</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  No markets match your search criteria. Try adjusting your filters or create a new market.
                </p>
                <Link 
                  href="/create"
                  className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create Market</span>
                </Link>
              </div>
            ) : (
              filteredMarkets.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  )
}
