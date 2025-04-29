import { useState, useEffect } from 'preact/hooks'
import {
  getLeaderboard,
  getMarket,
  LeaderboardPlayer,
  LeaderboardResponse,
  MarketResponse,
} from './api'

import { Loading } from './components/Loading'

import { Tabs } from './components/Tabs'
import { lazy, Suspense } from 'preact/compat'
const Market = lazy(() => import('./components/Market'))
const Leaderboard = lazy(() => import('./components/Leaderboard'))
const TopLeaderBoard = lazy(() => import('./components/TopLeaderBoard'))

export function App() {
  const tabs = [
    { label: 'Leaderboard', key: 'leaderboard' },
    { label: 'Market', key: 'market' },
  ]

  const [selectedTab, setSelectedTab] = useState(tabs[0].key)

  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardResponse | null>(null)

  const [topPlayers, setTopPlayers] = useState<LeaderboardPlayer[]>([])
  const [otherPlayers, setOtherPlayers] = useState<LeaderboardPlayer[]>([])

  useEffect(() => {
    if (leaderboardData?.players) {
      setTopPlayers(leaderboardData.players.slice(0, 3)) // primeros 3
      setOtherPlayers(leaderboardData.players.slice(3))
    }
  }, [leaderboardData])

  const [marketData, setMarketData] = useState<MarketResponse | null>(null)

  const fetchLeaderboardData = async () => {
    const { error, data } = await getLeaderboard()
    if (error) {
      console.error('Error fetching leaderboard data:', error)
    } else {
      setLeaderboardData(data)
    }
  }

  const fetchMarketData = async () => {
    const { error, data } = await getMarket()
    if (error) {
      console.error('Error fetching market data:', error)
    } else {
      setMarketData(data)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchLeaderboardData()
      await fetchMarketData()
    }
    fetchData()
  }, [])

  const renderContent = () => {
    if (selectedTab === 'leaderboard') {
      if (!leaderboardData) return <Loading />
      return (
        <>
          <TopLeaderBoard players={topPlayers} />
          <div class="flex-grow overflow-hidden w-full">
            <Leaderboard players={otherPlayers} />
          </div>
        </>
      )
    }

    if (selectedTab === 'market') {
      if (!marketData) return <Loading />
      return (
        <div class="flex-grow overflow-hidden w-full">
          <Market items={marketData.items} />
        </div>
      )
    }

    return null
  }

  return (
    <>
      <div class="flex flex-col items-center justify-start h-lvh gap-4 bg-black text-white p-2 overflow-hidden">
        <div class="h-14 p-2 sticky flex items-center justify-center bg-black top-0">
          <img
            src="/logo-400.avif"
            class="w-[400px] h-[50px] object-contain block"
            alt="Logo"
            fetchpriority="high"
          />
        </div>
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          onSelectedTab={setSelectedTab}
        />
        <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
      </div>
    </>
  )
}
