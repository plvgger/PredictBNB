// Market data service with real functionality
export interface Market {
  id: number
  question: string
  questionZh?: string
  outcomes: string[]
  outcomesZh?: string[]
  endTime: number
  resolved: boolean
  winningOutcome: number
  totalLiquidity: number
  outcomeLiquidity: number[]
  creator: string
  creationTime: number
  volume24h?: number
  participants?: number
  category?: 'Crypto' | 'Sports' | 'Politics' | 'Macro' | 'Tech'
}

// Realistic, diverse market data inspired by current events
export const mockMarkets: Market[] = [
  // Crypto markets
  {
    id: 1,
    question: "Will Bitcoin close above $80k this month?",
    questionZh: "比特币本月收盘价会超过8万美元吗？",
    outcomes: ["Yes", "No"],
    outcomesZh: ["是", "否"],
    endTime: Date.now() + 15 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 24.8,
    outcomeLiquidity: [15.4, 9.4], // 62% Yes, 38% No
    creator: "0x7a2...f81",
    creationTime: Date.now() - 3 * 24 * 60 * 60 * 1000,
    volume24h: 6.7,
    participants: 312,
    category: 'Crypto'
  },
  {
    id: 2,
    question: "Will ETH reach $5,000 before year end?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 65 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 18.3,
    outcomeLiquidity: [8.2, 10.1], // 45% Yes, 55% No
    creator: "0x3b9...c42",
    creationTime: Date.now() - 5 * 24 * 60 * 60 * 1000,
    volume24h: 4.2,
    participants: 245,
    category: 'Crypto'
  },
  {
    id: 3,
    question: "Will BNB hit a new all-time high this year?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 50 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 16.5,
    outcomeLiquidity: [7.3, 9.2], // 44% Yes, 56% No
    creator: "0x9c1...d23",
    creationTime: Date.now() - 4 * 24 * 60 * 60 * 1000,
    volume24h: 3.8,
    participants: 198,
    category: 'Crypto'
  },
  // Politics
  {
    id: 4,
    question: "Will there be a government shutdown by October 15?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 2 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 32.4,
    outcomeLiquidity: [8.4, 24.0], // 26% Yes, 74% No
    creator: "0x1e4...a92",
    creationTime: Date.now() - 6 * 24 * 60 * 60 * 1000,
    volume24h: 9.8,
    participants: 487,
    category: 'Politics'
  },
  {
    id: 5,
    question: "Will Trump meet with Xi Jinping by October 31?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 18 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 27.6,
    outcomeLiquidity: [17.4, 10.2], // 63% Yes, 37% No
    creator: "0x8f2...b67",
    creationTime: Date.now() - 7 * 24 * 60 * 60 * 1000,
    volume24h: 7.2,
    participants: 412,
    category: 'Politics'
  },
  // Sports
  {
    id: 6,
    question: "Will the Lakers win their next game?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 3 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 14.2,
    outcomeLiquidity: [8.2, 6.0], // 58% Yes, 42% No
    creator: "0x4d8...e19",
    creationTime: Date.now() - 1 * 24 * 60 * 60 * 1000,
    volume24h: 5.1,
    participants: 223,
    category: 'Sports'
  },
  {
    id: 7,
    question: "Will Manchester City win their next Premier League match?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 5 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 11.8,
    outcomeLiquidity: [8.3, 3.5], // 70% Yes, 30% No
    creator: "0x6a7...f43",
    creationTime: Date.now() - 2 * 24 * 60 * 60 * 1000,
    volume24h: 3.6,
    participants: 178,
    category: 'Sports'
  },
  {
    id: 8,
    question: "Will the Yankees make the World Series?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 8 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 13.1,
    outcomeLiquidity: [6.0, 7.1], // 46% Yes, 54% No
    creator: "0x2f5...c88",
    creationTime: Date.now() - 3 * 24 * 60 * 60 * 1000,
    volume24h: 4.3,
    participants: 201,
    category: 'Sports'
  },
  // Tech/Business
  {
    id: 9,
    question: "Will Apple beat earnings expectations this quarter?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 35 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 19.4,
    outcomeLiquidity: [12.2, 7.2], // 63% Yes, 37% No
    creator: "0x5c3...d91",
    creationTime: Date.now() - 2 * 24 * 60 * 60 * 1000,
    volume24h: 5.4,
    participants: 267,
    category: 'Tech'
  },
  {
    id: 10,
    question: "Will Tesla (TSLA) beat quarterly earnings?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 28 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 21.3,
    outcomeLiquidity: [16.4, 4.9], // 77% Yes, 23% No
    creator: "0x9a8...b34",
    creationTime: Date.now() - 1 * 24 * 60 * 60 * 1000,
    volume24h: 6.8,
    participants: 298,
    category: 'Tech'
  },
  {
    id: 11,
    question: "Will Amazon announce major layoffs this quarter?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 42 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 12.9,
    outcomeLiquidity: [4.5, 8.4], // 35% Yes, 65% No
    creator: "0x7b2...e56",
    creationTime: Date.now() - 4 * 24 * 60 * 60 * 1000,
    volume24h: 2.9,
    participants: 156,
    category: 'Tech'
  },
  // Macro/Economy
  {
    id: 12,
    question: "Will the Fed cut interest rates at the next meeting?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 22 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 17.8,
    outcomeLiquidity: [5.3, 12.5], // 30% Yes, 70% No
    creator: "0x4e9...a77",
    creationTime: Date.now() - 5 * 24 * 60 * 60 * 1000,
    volume24h: 5.2,
    participants: 234,
    category: 'Macro'
  },
  {
    id: 13,
    question: "Will US inflation come in below 3% this month?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 18 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 15.6,
    outcomeLiquidity: [6.7, 8.9], // 43% Yes, 57% No
    creator: "0x6d1...c29",
    creationTime: Date.now() - 3 * 24 * 60 * 60 * 1000,
    volume24h: 4.1,
    participants: 189,
    category: 'Macro'
  },
  {
    id: 14,
    question: "Will unemployment rate fall this month?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 12 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 11.2,
    outcomeLiquidity: [5.5, 5.7], // 49% Yes, 51% No
    creator: "0x3a6...f14",
    creationTime: Date.now() - 2 * 24 * 60 * 60 * 1000,
    volume24h: 2.8,
    participants: 142,
    category: 'Macro'
  },
  // More Politics
  {
    id: 15,
    question: "Will Congress pass a funding bill by month end?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 14 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 13.7,
    outcomeLiquidity: [4.1, 9.6], // 30% Yes, 70% No
    creator: "0x8c4...d82",
    creationTime: Date.now() - 4 * 24 * 60 * 60 * 1000,
    volume24h: 3.9,
    participants: 178,
    category: 'Politics'
  },
  {
    id: 16,
    question: "Will NYC elect a new mayor in the next election?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 180 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 22.4,
    outcomeLiquidity: [19.7, 2.7], // 88% Yes, 12% No
    creator: "0x1f7...b91",
    creationTime: Date.now() - 8 * 24 * 60 * 60 * 1000,
    volume24h: 5.6,
    participants: 334,
    category: 'Politics'
  },
  // More Sports
  {
    id: 17,
    question: "Will the Golden State Warriors make the playoffs?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 90 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 9.8,
    outcomeLiquidity: [5.5, 4.3], // 56% Yes, 44% No
    creator: "0x5b8...e47",
    creationTime: Date.now() - 6 * 24 * 60 * 60 * 1000,
    volume24h: 2.1,
    participants: 124,
    category: 'Sports'
  },
  {
    id: 18,
    question: "Will Novak Djokovic win the next Grand Slam?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 120 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 12.6,
    outcomeLiquidity: [7.6, 5.0], // 60% Yes, 40% No
    creator: "0x9e2...a53",
    creationTime: Date.now() - 5 * 24 * 60 * 60 * 1000,
    volume24h: 3.1,
    participants: 167,
    category: 'Sports'
  },
  // More Crypto
  {
    id: 19,
    question: "Will Solana flip BNB by market cap this year?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 70 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 14.9,
    outcomeLiquidity: [5.2, 9.7], // 35% Yes, 65% No
    creator: "0x2d4...f28",
    creationTime: Date.now() - 7 * 24 * 60 * 60 * 1000,
    volume24h: 3.5,
    participants: 189,
    category: 'Crypto'
  },
  {
    id: 20,
    question: "Will a Bitcoin ETF be approved in the EU this quarter?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 45 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 19.8,
    outcomeLiquidity: [8.5, 11.3], // 43% Yes, 57% No
    creator: "0x6f9...c71",
    creationTime: Date.now() - 3 * 24 * 60 * 60 * 1000,
    volume24h: 4.9,
    participants: 256,
    category: 'Crypto'
  },
  // More Tech
  {
    id: 21,
    question: "Will OpenAI release GPT-5 this year?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 60 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 16.7,
    outcomeLiquidity: [5.8, 10.9], // 35% Yes, 65% No
    creator: "0x7c8...d45",
    creationTime: Date.now() - 4 * 24 * 60 * 60 * 1000,
    volume24h: 4.6,
    participants: 221,
    category: 'Tech'
  },
  {
    id: 22,
    question: "Will Netflix add 10M+ subscribers this quarter?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 38 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 13.4,
    outcomeLiquidity: [7.4, 6.0], // 55% Yes, 45% No
    creator: "0x4a9...e82",
    creationTime: Date.now() - 2 * 24 * 60 * 60 * 1000,
    volume24h: 3.2,
    participants: 167,
    category: 'Tech'
  },
  // More Macro
  {
    id: 23,
    question: "Will oil prices exceed $100/barrel this quarter?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 55 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 15.3,
    outcomeLiquidity: [4.9, 10.4], // 32% Yes, 68% No
    creator: "0x5e1...a36",
    creationTime: Date.now() - 5 * 24 * 60 * 60 * 1000,
    volume24h: 3.7,
    participants: 194,
    category: 'Macro'
  },
  {
    id: 24,
    question: "Will gold hit $2,500/oz this month?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 20 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 10.9,
    outcomeLiquidity: [6.5, 4.4], // 60% Yes, 40% No
    creator: "0x8b6...c57",
    creationTime: Date.now() - 1 * 24 * 60 * 60 * 1000,
    volume24h: 2.9,
    participants: 138,
    category: 'Macro'
  },
  // More diverse topics
  {
    id: 25,
    question: "Will China impose 100% tariff on US goods by November?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 30 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 18.6,
    outcomeLiquidity: [3.3, 15.3], // 18% Yes, 82% No
    creator: "0x9d3...f62",
    creationTime: Date.now() - 2 * 24 * 60 * 60 * 1000,
    volume24h: 5.8,
    participants: 278,
    category: 'Politics'
  },
  {
    id: 26,
    question: "Will Nvidia stock hit $150 this quarter?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 48 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 17.2,
    outcomeLiquidity: [10.3, 6.9], // 60% Yes, 40% No
    creator: "0x1a5...e94",
    creationTime: Date.now() - 3 * 24 * 60 * 60 * 1000,
    volume24h: 4.7,
    participants: 223,
    category: 'Tech'
  },
  {
    id: 27,
    question: "Will there be a major crypto exchange hack this quarter?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 55 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 11.4,
    outcomeLiquidity: [3.4, 8.0], // 30% Yes, 70% No
    creator: "0x6c7...d18",
    creationTime: Date.now() - 6 * 24 * 60 * 60 * 1000,
    volume24h: 2.6,
    participants: 145,
    category: 'Crypto'
  },
  {
    id: 28,
    question: "Will BNB Smart Chain TVL exceed $10B this quarter?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 60 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 13.8,
    outcomeLiquidity: [6.1, 7.7], // 44% Yes, 56% No
    creator: "0x3f4...b82",
    creationTime: Date.now() - 4 * 24 * 60 * 60 * 1000,
    volume24h: 3.3,
    participants: 172,
    category: 'Crypto'
  },
  {
    id: 29,
    question: "Will the S&P 500 reach 6,000 by year end?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 75 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 20.1,
    outcomeLiquidity: [11.1, 9.0], // 55% Yes, 45% No
    creator: "0x8e5...a94",
    creationTime: Date.now() - 7 * 24 * 60 * 60 * 1000,
    volume24h: 5.9,
    participants: 289,
    category: 'Macro'
  },
  {
    id: 30,
    question: "Will Real Madrid win the Champions League this year?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 150 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 14.7,
    outcomeLiquidity: [8.1, 6.6], // 55% Yes, 45% No
    creator: "0x2b9...f73",
    creationTime: Date.now() - 9 * 24 * 60 * 60 * 1000,
    volume24h: 3.4,
    participants: 201,
    category: 'Sports'
  },
  {
    id: 31,
    question: "Will GTA 6 release in 2025?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 180 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 26.8,
    outcomeLiquidity: [26.5, 0.3], // 99% Yes, 1% No - near certain
    creator: "0x9f1...e22",
    creationTime: Date.now() - 5 * 24 * 60 * 60 * 1000,
    volume24h: 7.9,
    participants: 412,
    category: 'Tech'
  },
  {
    id: 32,
    question: "Will there be a leap year in 2028?",
    outcomes: ["Yes", "No"],
    endTime: Date.now() + 365 * 24 * 60 * 60 * 1000,
    resolved: false,
    winningOutcome: 0,
    totalLiquidity: 8.2,
    outcomeLiquidity: [8.1, 0.1], // 99% Yes, 1% No - guaranteed
    creator: "0x4c2...b88",
    creationTime: Date.now() - 10 * 24 * 60 * 60 * 1000,
    volume24h: 1.8,
    participants: 67,
    category: 'Macro'
  }
]

export class MarketService {
  private static markets: Market[] = [...mockMarkets]
  private static nextId = mockMarkets.length + 1

  static getAllMarkets(): Market[] {
    return this.markets
  }

  static getMarket(id: number): Market | undefined {
    return this.markets.find(market => market.id === id)
  }

  static createMarket(question: string, outcomes: string[], endTime: number, creator: string): Market {
    const market: Market = {
      id: this.nextId++,
      question,
      outcomes,
      endTime,
      resolved: false,
      winningOutcome: 0,
      totalLiquidity: 0,
      outcomeLiquidity: new Array(outcomes.length).fill(0),
      creator,
      creationTime: Date.now(),
      volume24h: 0,
      participants: 0
    }
    
    this.markets.unshift(market) // Add to beginning
    return market
  }

  static updateMarketLiquidity(marketId: number, outcomeIndex: number, amount: number): boolean {
    const market = this.getMarket(marketId)
    if (!market || market.resolved) return false

    market.outcomeLiquidity[outcomeIndex] += amount
    market.totalLiquidity += amount
    return true
  }

  static resolveMarket(marketId: number, winningOutcome: number): boolean {
    const market = this.getMarket(marketId)
    if (!market || market.resolved) return false

    market.resolved = true
    market.winningOutcome = winningOutcome
    return true
  }

  static getMarketsByStatus(status: 'all' | 'active' | 'resolved' | 'ended'): Market[] {
    const now = Date.now()
    
    switch (status) {
      case 'active':
        return this.markets.filter(m => !m.resolved && m.endTime > now)
      case 'resolved':
        return this.markets.filter(m => m.resolved)
      case 'ended':
        return this.markets.filter(m => !m.resolved && m.endTime <= now)
      default:
        return this.markets
    }
  }

  static searchMarkets(query: string): Market[] {
    const lowercaseQuery = query.toLowerCase()
    return this.markets.filter(market => 
      market.question.toLowerCase().includes(lowercaseQuery) ||
      market.outcomes.some(outcome => outcome.toLowerCase().includes(lowercaseQuery))
    )
  }

  static getMarketStats() {
    const now = Date.now()
    const active = this.markets.filter(m => !m.resolved && m.endTime > now).length
    const resolved = this.markets.filter(m => m.resolved).length
    const totalVolume = this.markets.reduce((sum, m) => sum + (m.volume24h || 0), 0)
    const totalLiquidity = this.markets.reduce((sum, m) => sum + m.totalLiquidity, 0)

    return {
      totalMarkets: this.markets.length,
      activeMarkets: active,
      resolvedMarkets: resolved,
      totalVolume24h: totalVolume,
      totalLiquidity
    }
  }

  // Featured markets helper: pick by highest 24h volume then recency
  static getFeaturedMarkets(count: number = 6): Market[] {
    const sorted = [...this.markets].sort((a, b) => {
      const volA = a.volume24h || 0
      const volB = b.volume24h || 0
      if (volB !== volA) return volB - volA
      return (b.creationTime || 0) - (a.creationTime || 0)
    })
    return sorted.slice(0, count)
  }
}

// Trading functions
export interface Trade {
  id: string
  marketId: number
  outcome: number
  amount: number
  shares: number
  price: number
  timestamp: number
  user: string
  type: 'buy' | 'sell'
}

export class TradingService {
  private static trades: Trade[] = []
  private static userPositions: Map<string, Map<number, Map<number, number>>> = new Map()

  static placeTrade(
    marketId: number, 
    outcome: number, 
    amount: number, 
    user: string
  ): Trade {
    const market = MarketService.getMarket(marketId)
    if (!market) throw new Error('Market not found')

    // Calculate shares based on current liquidity (simplified)
    const currentLiquidity = market.outcomeLiquidity[outcome]
    const shares = currentLiquidity > 0 ? (amount / currentLiquidity) * 100 : amount

    const trade: Trade = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      marketId,
      outcome,
      amount,
      shares,
      price: amount / shares,
      timestamp: Date.now(),
      user,
      type: 'buy'
    }

    this.trades.push(trade)
    
    // Update market liquidity
    MarketService.updateMarketLiquidity(marketId, outcome, amount)
    
    // Update user positions
    this.updateUserPosition(user, marketId, outcome, shares)

    return trade
  }

  private static updateUserPosition(user: string, marketId: number, outcome: number, shares: number) {
    if (!this.userPositions.has(user)) {
      this.userPositions.set(user, new Map())
    }
    
    const userMarkets = this.userPositions.get(user)!
    if (!userMarkets.has(marketId)) {
      userMarkets.set(marketId, new Map())
    }
    
    const marketOutcomes = userMarkets.get(marketId)!
    const currentShares = marketOutcomes.get(outcome) || 0
    marketOutcomes.set(outcome, currentShares + shares)
  }

  static getUserPositions(user: string): Map<number, Map<number, number>> {
    return this.userPositions.get(user) || new Map()
  }

  static getMarketTrades(marketId: number): Trade[] {
    return this.trades.filter(trade => trade.marketId === marketId)
  }

  static getUserTrades(user: string): Trade[] {
    return this.trades.filter(trade => trade.user === user)
  }
}
