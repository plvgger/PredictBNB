'use client'

import { useState } from 'react'
import { Wallet, ChevronDown, Copy, ExternalLink } from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext'
import { useLanguage } from '@/contexts/LanguageContext'

export function WalletConnect() {
  const { t } = useLanguage()
  const { isConnected, address, connect, disconnect } = useWallet()
  const [showDropdown, setShowDropdown] = useState(false)

  const connectWallet = async () => {
    try {
      await connect()
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  const disconnectWallet = () => {
    disconnect()
    setShowDropdown(false)
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    // You could add a toast notification here
  }

  const openExplorer = () => {
    window.open(`https://bscscan.com/address/${address}`, '_blank')
  }

  if (isConnected) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm border border-gray-200/50 px-4 py-2 rounded-2xl hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
            <Wallet className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-900">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-xl z-50 animate-scale-in">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Connected</div>
                  <div className="text-xs text-gray-500">{address}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={copyAddress}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Copy className="h-4 w-4" />
                  <span>{t.common.copyAddress}</span>
                </button>
                
                <button
                  onClick={openExplorer}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{t.common.viewOnBSCScan}</span>
                </button>
                
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                
                <button
                  onClick={disconnectWallet}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors dark:hover:bg-red-900/20"
                >
                  <span>{t.common.disconnect}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={connectWallet}
      className="btn-primary flex items-center space-x-2"
    >
      <Wallet className="h-4 w-4" />
      <span>{t.common.connectWallet}</span>
    </button>
  )
}
