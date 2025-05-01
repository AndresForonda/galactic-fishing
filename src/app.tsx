import { useState, useEffect } from 'preact/hooks'
import {
  getLeaderboard,
  getMarket,
  LeaderboardPlayer,
  LeaderboardResponse,
  MarketResponse,
} from './api'

import { LoadingCube } from './components/LoadingCube'
import { Loading } from './components/Loading'

import { Tabs } from './components/Tabs'
import { lazy, Suspense } from 'preact/compat'
import AnimatedFishWriter from './components/AnimatedFishWriter'
import Logo from './components/Logo'
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
      if (!leaderboardData) return <LoadingCube />
      return (
        <div class="flex flex-col items-center justify-start h-full  overflow-hidden w-full gap-2 sm:gap-4 lg:flex-row lg:items-start lg:gap-1  xl:pb-2 xl:mt-4 xl:gap-4 lg:w-auto ">
          <div class="w-full lg:w-auto">
            <p class="font-terminal text-center text-3xl xl:hidden">
              Total players: {leaderboardData?.players.length}{' '}
            </p>
            <TopLeaderBoard players={topPlayers} />
          </div>
          <div class="flex-grow overflow-hidden w-full lg:h-full">
            <Leaderboard players={otherPlayers} />
          </div>
        </div>
      )
    }

    if (selectedTab === 'market') {
      if (!marketData) return <LoadingCube />
      return (
        <div class="flex-grow overflow-hidden w-full">
          <Market items={marketData.items} />
        </div>
      )
    }

    return null
  }

  return (
    <div class="flex flex-col items-center justify-start h-dvh max-h-dvh gap-4 bg-blue-950 text-white p-4 overflow-hidden sm:py-4 xl:py-8 ">
      <div>
        <Logo />
        <AnimatedFishWriter />
      </div>
      <div class="sm:landscape:block lg:landscape:hidden hidden fixed pt-20 inset-0 z-40 bg-terminal text-white text-center p-6 items-center justify-center">
        <div class="flex flex-col items-center gap-4">
          <p class="text-lg font-bold">
            This app only works in portrait mode. Please rotate your device.
          </p>
          <Loading text="WAITING" />
        </div>
      </div>

      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectedTab={setSelectedTab}
      />
      <Suspense fallback={<LoadingCube />}>{renderContent()}</Suspense>
    </div>
  )
}
