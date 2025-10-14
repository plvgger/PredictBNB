'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react'
import { TradingService } from '@/services/marketService'
import { Market } from '@/services/marketService'
import { useWallet } from '@/contexts/WalletContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { translateMarket } from '@/utils/translate'

interface TradingPanelProps {
  market: Market
  onTradeComplete?: () => void
}

export function TradingPanel({ market, onTradeComplete }: TradingPanelProps) {
  const { t, language } = useLanguage()
  const [selectedOutcome, setSelectedOutcome] = useState<number | null>(null)
  const [betAmount, setBetAmount] = useState('')
  const [isPlacingBet, setIsPlacingBet] = useState(false)
  const [tradeResult, setTradeResult] = useState<{ success: boolean; message: string } | null>(null)
  const { isConnected, address, balance, withdraw, connect } = useWallet() as any
  const translatedMarket = translateMarket(market, language)

  const getOutcomeProbabilities = () => {
    const total = market.outcomeLiquidity.reduce((sum, liquidity) => sum + liquidity, 0)
    if (total === 0) return market.outcomes.map(() => 50)
    
    return market.outcomeLiquidity.map(liquidity => 
      Math.round((liquidity / total) * 100)
    )
  }

  const handlePlaceBet = async () => {
    if (!isConnected || !address || selectedOutcome === null || selectedOutcome === undefined || !betAmount) return

    setIsPlacingBet(true)
    setTradeResult(null)
    
    try {
      const amount = parseFloat(betAmount)
      if (amount <= 0) throw new Error(language === 'zh' ? '金额必须为正数' : 'Amount must be positive')
      if (amount < 0.001) throw new Error(language === 'zh' ? '最低投注为 0.001 BNB' : 'Minimum bet is 0.001 BNB')
      if (amount > 100) throw new Error(language === 'zh' ? '单笔最大投注为 100 BNB' : 'Maximum bet per trade is 100 BNB')
      if (amount > balance) throw new Error(language === 'zh' ? '余额不足' : 'Insufficient balance')

      // Deduct balance (simulated)
      const ok = withdraw(amount)
      if (!ok) throw new Error(language === 'zh' ? '余额不足' : 'Insufficient balance')

      const trade = TradingService.placeTrade(
        market.id,
        selectedOutcome,
        amount,
        address
      )

      setTradeResult({
        success: true,
        message: language === 'zh'
          ? `已成功购买 ${trade.shares.toFixed(4)} 份 "${translatedMarket.outcomes[selectedOutcome]}"`
          : `Successfully bought ${trade.shares.toFixed(4)} shares in "${translatedMarket.outcomes[selectedOutcome]}"`
      })

      setBetAmount('')
      setSelectedOutcome(null)
      
      if (onTradeComplete) {
        onTradeComplete()
      }
    } catch (error) {
      console.error('Error placing bet:', error)
      setTradeResult({
        success: false,
        message: error instanceof Error ? error.message : 'Error placing bet'
      })
    } finally {
      setIsPlacingBet(false)
    }
  }

  const probabilities = getOutcomeProbabilities()
  const canTrade = !market.resolved && market.endTime > Date.now()

  if (!isConnected) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <TrendingUp className="h-8 w-8 text-primary-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t.trading.connectToTrade}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t.trading.connectToTradeDesc}
        </p>
        <button className="btn-primary" onClick={connect}>
          {t.common.connectWallet}
        </button>
      </div>
    )
  }

  if (!canTrade) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {market.resolved ? 'Market Resolved' : 'Market Ended'}
        </h3>
        <p className="text-gray-600">
          {market.resolved 
            ? 'This market has been resolved and is no longer accepting trades.'
            : 'This market has ended and is no longer accepting trades.'
          }
        </p>
      </div>
    )
  }

  return (
    <div className="card p-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t.trading.placeBet}</h3>
      
      {/* Outcome Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {t.trading.selectOutcome}
        </label>
        <div className="space-y-3">
          {translatedMarket.outcomes.map((outcome, index) => (
            <button
              key={index}
              onClick={() => setSelectedOutcome(index)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                selectedOutcome === index
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedOutcome === index 
                      ? 'border-primary-500 bg-primary-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedOutcome === index && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                    )}
                  </div>
                  <span className="font-semibold text-gray-900">{outcome}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold gradient-text">
                    {probabilities[index]}%
                  </div>
                  <div className="text-sm text-gray-500">
                    {market.outcomeLiquidity[index].toFixed(2)} BNB
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bet Amount */}
      <div className="mb-6">
        <label htmlFor="betAmount" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {t.trading.betAmount}
        </label>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.common.balance}: {balance.toFixed(4)} BNB</div>
        <div className="relative">
          <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="number"
            id="betAmount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            placeholder="0.01"
            min="0.001"
            step="0.001"
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-lg text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-700"
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {t.trading.minimumBet}
        </p>
      </div>

      {/* Trade Result */}
      {tradeResult && (
        <div className={`p-4 rounded-2xl mb-6 ${
          tradeResult.success 
            ? 'bg-success-50 border border-success-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center space-x-2">
            {tradeResult.success ? (
              <TrendingUp className="h-5 w-5 text-success-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
            <span className={`font-medium ${
              tradeResult.success ? 'text-success-800' : 'text-red-800'
            }`}>
              {tradeResult.message}
            </span>
          </div>
        </div>
      )}

      {/* Place Bet Button */}
      <button
        onClick={handlePlaceBet}
        disabled={selectedOutcome === null || !betAmount || isPlacingBet}
        className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPlacingBet ? t.trading.placing : t.trading.placeButton}
      </button>

      {/* Trade Preview */}
      {selectedOutcome !== null && betAmount && parseFloat(betAmount) > 0 && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{t.trading.tradePreview}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t.trading.outcome}:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{translatedMarket.outcomes[selectedOutcome]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t.trading.amount}:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{betAmount} BNB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t.trading.currentPrice}:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{probabilities[selectedOutcome]}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t.trading.estimatedShares}:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {((parseFloat(betAmount) / (probabilities[selectedOutcome] / 100)) * 0.98).toFixed(4)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
