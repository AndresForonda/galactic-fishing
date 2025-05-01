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
import AnimatedFishWriter from './components/AnimatedFishWriter'
import Logo from './components/Logo'
import Market from './components/Market'
import Leaderboard from './components/Leaderboard'
import TopLeaderBoard from './components/TopLeaderBoard'

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
          <div class="w-full h-full lg:w-auto ">
            <p class="font-terminal text-center text-3xl xl:hidden">
              Total players: {leaderboardData?.players.length}{' '}
            </p>
            <div class="h-full  overflow-scroll">
              <TopLeaderBoard players={topPlayers} />
            </div>
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
        <div class="flex-grow overflow-scroll w-full">
          <Market items={marketData.items} />
        </div>
      )
    }

    return null
  }

  return (
    <div class="flex flex-col gap-1 items-center justify-start h-dvh max-h-dvh bg-blue-950 text-white p-4 overflow-hidden xs:gap-2 sm:py-4 xl:py-8 ">
      <div class="flex w-full xs:w-auto flex-col gap-2">
        <Logo />
        <AnimatedFishWriter />
      </div>
      <div class="hidden fixed pt-20 inset-0 z-50 bg-terminal text-white text-center p-6 items-center justify-center sm:landscape:block lg:landscape:hidden ">
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
      {renderContent()}
    </div>
  )
}
