'use client'

import { useState, useEffect } from 'react'
import { WalletConnect } from '@/components/WalletConnect'
import { MarketCard } from '@/components/MarketCard'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useLanguage } from '@/contexts/LanguageContext'
import { TrendingUp, Users, DollarSign, Clock, ArrowRight, Sparkles, Zap, Shield, Globe, LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import { MarketService } from '@/services/marketService'

export default function Home() {
  const { t } = useLanguage()
  const [featuredMarkets, setFeaturedMarkets] = useState<any[]>([])
  const [endingSoon, setEndingSoon] = useState<any[]>([])
  const [topMovers, setTopMovers] = useState<any[]>([])

  useEffect(() => {
    setFeaturedMarkets(MarketService.getFeaturedMarkets(6))
    setEndingSoon(
      MarketService.getAllMarkets()
        .filter(m => !m.resolved && m.endTime > Date.now())
        .sort((a, b) => a.endTime - b.endTime)
        .slice(0, 4)
    )
    setTopMovers(
      MarketService.getAllMarkets()
        .sort((a, b) => (b.volume24h || 0) - (a.volume24h || 0))
        .slice(0, 4)
    )
  }, [])

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="BNB Prediction Market" className="w-12 h-12 object-contain" />
              <h1 className="text-2xl font-bold gradient-text">PredictBNB</h1>
            </div>
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <ThemeToggle />
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-gray-200/70 bg-white/60 backdrop-blur-sm dark:bg-gray-900/60 dark:border-gray-700/70" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6 h-12 text-sm">
            <Link href="/markets" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 font-medium" suppressHydrationWarning>{t.nav.markets}</Link>
            <Link href="/create" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 font-medium" suppressHydrationWarning>{t.nav.create}</Link>
            <Link href="/trades" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 font-medium" suppressHydrationWarning>{t.nav.trades}</Link>
            <Link href="/portfolio" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 font-medium" suppressHydrationWarning>{t.nav.portfolio}</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-24 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            <span>{t.home.tagline}</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-8 leading-tight" suppressHydrationWarning>
            {t.home.heroTitle}
            <br />
            <span className="gradient-text">{t.home.heroSubtitle}</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
            {t.home.heroDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/markets" className="btn-primary text-lg px-8 py-4">
              {t.home.exploreMarkets}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/create" className="btn-secondary text-lg px-8 py-4">
              {t.home.createMarket}
            </Link>
          </div>
          
          {/* Contract Address Section */}
          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 dark:bg-gray-800/20 dark:border-gray-700/20">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.home.contractAddress}</p>
              <div className="flex items-center justify-center space-x-2">
                <code className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200">
                  {t.home.contractComingSoon}
                </code>
                <button 
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={() => {
                    navigator.clipboard?.writeText('0x538324dbfc321e8f9f019d5e992c709ce1494444')
                  }}
                  title="Copy Contract Address"
                >
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">$2.4M</div>
            <div className="text-gray-600 dark:text-gray-300">{t.home.totalVolume}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">1,247</div>
            <div className="text-gray-600 dark:text-gray-300">{t.home.activeMarkets}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">89%</div>
            <div className="text-gray-600 dark:text-gray-300">{t.home.accuracyRate}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">0.1%</div>
            <div className="text-gray-600 dark:text-gray-300">{t.home.tradingFees}</div>
          </div>
        </div>

        {/* Featured Markets */}
        <div className="py-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <LayoutGrid className="h-6 w-6 text-primary-600" /> {t.home.featuredMarkets}
            </h3>
            <Link href="/markets" className="btn-secondary">{t.home.seeAll}</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMarkets.map((m) => (
              <MarketCard key={m.id} market={m} />
            ))}
          </div>
        </div>

        {/* Discovery: Ending Soon & Top Movers */}
        <div className="py-12 grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t.home.endingSoon}</h3>
              <Link href="/markets" className="text-primary-600 font-medium">{t.home.viewAll}</Link>
            </div>
            <div className="grid gap-4">
              {endingSoon.map(m => (
                <MarketCard key={m.id} market={m} />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t.home.topMovers}</h3>
              <Link href="/markets" className="text-primary-600 font-medium">{t.home.viewAll}</Link>
            </div>
            <div className="grid gap-4">
              {topMovers.map(m => (
                <MarketCard key={m.id} market={m} />
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t.home.whyChoose}</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t.home.whyDescription}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t.home.lightningFast}</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.home.lightningFastDesc}
              </p>
            </div>
            
            <div className="card p-8 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-3xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t.home.fullyDecentralized}</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.home.fullyDecentralizedDesc}
              </p>
            </div>
            
            <div className="card p-8 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-3xl flex items-center justify-center mb-6">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t.home.ultraLowFees}</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.home.ultraLowFeesDesc}
              </p>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="py-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t.home.howItWorks}</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t.home.howItWorksDesc}
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: t.home.step1Title, desc: t.home.step1Desc },
              { step: "02", title: t.home.step2Title, desc: t.home.step2Desc },
              { step: "03", title: t.home.step3Title, desc: t.home.step3Desc },
              { step: "04", title: t.home.step4Title, desc: t.home.step4Desc }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24">
          <div className="card p-12 text-center">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t.home.readyToTrade}</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t.home.readyToTradeDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/markets" className="btn-primary text-lg px-8 py-4">
                {t.home.startTradingNow}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/create" className="btn-secondary text-lg px-8 py-4">
                {t.home.createMarket}
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/logo.png" alt="BNB Prediction Market" className="w-10 h-10 object-contain" />
                <span className="text-xl font-bold">PredictBNB</span>
              </div>
              <p className="text-gray-400">
                The future of decentralized prediction markets on BNB Smart Chain.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/markets" className="hover:text-white transition-colors">Markets</Link></li>
                <li><Link href="/create" className="hover:text-white transition-colors">Create Market</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Portfolio</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Analytics</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/api-docs" className="hover:text-white transition-colors">API</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Twitter</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Discord</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Telegram</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">GitHub</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PredictBNB. Built on BNB Smart Chain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
