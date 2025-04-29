import { FunctionalComponent } from 'preact'
import { useState, useRef, useEffect } from 'preact/hooks'
import { LeaderboardResponse } from '../api'
import { useIsMobile } from '../hooks.ts'

export const Leaderboard: FunctionalComponent<LeaderboardResponse> = ({
  players,
}) => {
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const rowHeight = 40
  const buffer = 5
  const [visibleStart, setVisibleStart] = useState(0)
  const [visibleEnd, setVisibleEnd] = useState(15)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const toggleRow = (username: string) => {
    setExpandedRow(expandedRow === username ? null : username)
  }

  // Set the initial visible rows based on the container height, optimizing for rendering less rows
  useEffect(() => {
    const updateVisibleRows = () => {
      if (containerRef.current) {
        const height = containerRef.current.clientHeight
        const startIndex = Math.floor(
          containerRef.current.scrollTop / rowHeight
        )
        setVisibleStart(startIndex)
        const endIndex = startIndex + Math.ceil(height / rowHeight) + buffer
        setVisibleEnd(endIndex)
      }
    }

    updateVisibleRows()

    containerRef.current?.addEventListener('scroll', updateVisibleRows)

    return () => {
      containerRef.current?.removeEventListener('scroll', updateVisibleRows)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      class="overflow-y-auto flex-grow"
      style={{ maxHeight: '100%' }}
    >
      <table class="w-full">
        <thead class="bg-black sticky top-0 z-10">
          <tr class="text-md">
            <th class="border-t-1 py-2 w-16">Rank</th>
            <th class="border-t-1 py-2">Username</th>
            <th class="border-t-1 py-2 w-16">Level</th>
            <th class="border-t-1 py-2 hidden">XP</th>
            <th class="border-t-1 py-2 hidden">Gold</th>
          </tr>
        </thead>
        <tbody class="text-xl mt-2 relative">
          <tr style={{ height: `${visibleStart * rowHeight}px` }}></tr>
          {players.slice(visibleStart, visibleEnd).map((player, index) => {
            const realIndex = visibleStart + index
            const bgColor = realIndex % 2 === 0 ? 'bg-gray-900' : 'bg-black'

            if (!player) {
              return (
                <tr key={`empty-${index}`} class={`h-8 ${bgColor}`}>
                  <td class="custom-dashed text-right pr-2">&nbsp;</td>
                  <td class="custom-dashed">&nbsp;</td>
                  <td class="custom-dashed text-right px-2">&nbsp;</td>
                  <td class="custom-dashed text-right hidden">&nbsp;</td>
                  <td class="custom-dashed text-right hidden">&nbsp;</td>
                </tr>
              )
            }

            return (
              <tr
                key={player.username}
                class={`h-8 ${bgColor} ${isMobile ? 'cursor-pointer' : ''}`}
                onClick={() => isMobile && toggleRow(player.username)}
              >
                <td class="custom-dashed text-right pr-2">{player.rank}</td>
                <td
                  class={`custom-dashed overflow-hidden truncate whitespace-nowrap ${
                    expandedRow === player.username ? 'font-bold py-2' : ''
                  }`}
                  title={player.username}
                >
                  {player.username}
                  {expandedRow === player.username && (
                    <div class="text-base text-info-500">
                      🧠 {player.xp.toLocaleString()} · 💰{' '}
                      {player.gold.toLocaleString()}
                    </div>
                  )}
                </td>
                <td class="custom-dashed text-right px-2">{player.level}</td>
                <td class="custom-dashed text-right hidden">
                  {player.xp.toLocaleString()}
                </td>
                <td class="custom-dashed text-right hidden">
                  {player.gold.toLocaleString()}
                </td>
              </tr>
            )
          })}
          <tr
            style={{ height: `${(players.length - visibleEnd) * rowHeight}px` }}
          ></tr>
        </tbody>
      </table>
    </div>
  )
}
