import { useState, useEffect } from 'preact/hooks'
import {
  getLeaderboard,
  getMarket,
  LeaderboardPlayer,
  LeaderboardResponse,
  MarketResponse,
} from './api'

import { TopLeaderBoard } from './components/TopLeaderBoard'
import { Loading } from './components/Loading'

import { Tabs } from './components/Tabs'
import { lazy, Suspense } from 'preact/compat'
const Market = lazy(() => import('./components/Market'))
const Leaderboard = lazy(() => import('./components/Leaderboard'))

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

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await fetchLeaderboardData()
      await fetchMarketData()
      setIsLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    console.log('App mounted')
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt fired', e)
    })
  }, [])

  return (
    <>
      <div class="flex flex-col items-center h-screen min-h-screen bg-black text-white p-2 overflow-hidden pb-6">
        <div class="h-14 flex items-center justify-center px-1 bg-black">
          <img
            src="/logo-400.avif"
            width="400"
            height="50"
            alt="Logo"
            loading="lazy"
            fetchpriority="high"
          />
        </div>
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          onSelectedTab={setSelectedTab}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {selectedTab === 'leaderboard' && (
              <TopLeaderBoard players={topPlayers} />
            )}
            <div class="flex-grow overflow-hidden w-full !p-0">
              {selectedTab === 'leaderboard' && (
                <Suspense fallback={<Loading />}>
                  {otherPlayers && <Leaderboard players={otherPlayers || []} />}
                </Suspense>
              )}
              {selectedTab === 'market' && (
                <Suspense fallback={<Loading />}>
                  {marketData && <Market items={marketData.items} />}
                </Suspense>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
