// NOTE: Placeholder stubs for build; swap to real on-chain hooks later
export function useContract() {
  const createMarket = async () => {}
  const buyShares = async () => {}
  const addLiquidity = async () => {}
  return {
    createMarket,
    buyShares,
    addLiquidity,
    isPending: false,
    isConfirming: false,
    isConfirmed: false,
    error: null as any,
    hash: undefined as any
  }
}

export function useMarket(_marketId: number) {
  return {
    market: null,
    isLoading: false,
    error: null as any
  }
}

export function useUserShares(_marketId: number, _outcome: number) {
  return {
    shares: 0,
    isLoading: false,
    error: null as any
  }
}
