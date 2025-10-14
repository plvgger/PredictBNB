'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface WalletContextType {
  isConnected: boolean
  address: string
  balance: number
  connect: () => Promise<void>
  disconnect: () => void
  deposit: (amount: number) => void
  withdraw: (amount: number) => boolean
  refreshBalance: () => Promise<void>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState(10)

  const fetchBalance = async (addr: string) => {
    try {
      const eth = typeof window !== 'undefined' ? (window as any).ethereum : undefined
      if (!eth || !addr) return
      const weiHex: string = await eth.request({
        method: 'eth_getBalance',
        params: [addr, 'latest']
      })
      const wei = BigInt(weiHex)
      const bnb = Number(wei) / 1e18
      setBalance(bnb)
    } catch (e) {
      console.error('Failed to fetch balance', e)
    }
  }

  // Check if wallet is already connected on mount
  useEffect(() => {
    const eth = typeof window !== 'undefined' ? (window as any).ethereum : undefined
    if (eth) {
      eth.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAddress(accounts[0])
            setIsConnected(true)
            fetchBalance(accounts[0])
          }
        })
        .catch(console.error)
      const onAccountsChanged = (accs: string[]) => {
        if (accs && accs[0]) {
          setAddress(accs[0])
          setIsConnected(true)
          fetchBalance(accs[0])
        } else {
          setIsConnected(false)
          setAddress('')
          setBalance(0)
        }
      }
      const onChainChanged = () => {
        if (address) fetchBalance(address)
      }
      eth.on?.('accountsChanged', onAccountsChanged)
      eth.on?.('chainChanged', onChainChanged)
      return () => {
        try {
          eth.removeListener?.('accountsChanged', onAccountsChanged)
          eth.removeListener?.('chainChanged', onChainChanged)
        } catch {}
      }
    }
  }, [])

  const connect = async () => {
    const eth = typeof window !== 'undefined' ? (window as any).ethereum : undefined
    if (eth) {
      try {
        const accounts = await eth.request({
          method: 'eth_requestAccounts',
        })
        setAddress(accounts[0])
        setIsConnected(true)
        await fetchBalance(accounts[0])
      } catch (error) {
        console.error('Error connecting wallet:', error)
        throw error
      }
    } else {
      alert('Please install MetaMask!')
      throw new Error('MetaMask not installed')
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress('')
    setBalance(0)
  }

  const persist = (next: number) => {
    setBalance(next)
    if (typeof window !== 'undefined') localStorage.setItem('balance', String(next))
  }

  const deposit = (amount: number) => {
    if (amount <= 0) return
    persist(balance + amount)
  }

  const withdraw = (amount: number) => {
    if (amount <= 0) return false
    if (amount > balance) return false
    persist(balance - amount)
    return true
  }

  const refreshBalance = async () => {
    if (address) await fetchBalance(address)
  }

  return (
    <WalletContext.Provider value={{ isConnected, address, balance, connect, disconnect, deposit, withdraw, refreshBalance }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
