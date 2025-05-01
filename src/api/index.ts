const BASE_URL = 'https://api-game.bloque.app/game'

const LEADERBOARD_URL = `${BASE_URL}/leaderboard`
const MARKET_URL = `${BASE_URL}/market`

export interface HandleRequestResponse<T> {
  error: any
  data: T | null
}

export interface LeaderboardPlayer {
  rank: number
  username: string
  level: number
  xp: number
  gold: number
  isInfected: boolean
  fishEmojis: string
}

export interface LeaderboardResponse {
  players: LeaderboardPlayer[]
}

export interface MarketItem {
  id: string
  name: string
  type: string
  description: string
  cost: number
}

export interface MarketResponse {
  items: MarketItem[]
}

const handleRequest = async <T>(
  promise: Promise<T>
): Promise<HandleRequestResponse<T>> => {
  try {
    const response = await promise
    return { error: null, data: response }
  } catch (error) {
    return { error, data: null }
  }
}

export const getLeaderboard = async () => {
  const response = await fetch(LEADERBOARD_URL)
  return handleRequest<LeaderboardResponse>(response.json())
}

export const getMarket = async () => {
  const response = await fetch(MARKET_URL)
  return handleRequest<MarketResponse>(response.json())
}
