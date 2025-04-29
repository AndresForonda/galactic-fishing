import { FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'
import { LeaderboardResponse } from '../api'
import { useIsMobile } from '../hooks.ts'

const Leaderboard: FunctionalComponent<LeaderboardResponse> = ({ players }) => {
  const isMobile = useIsMobile()
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const toggleRow = (username: string) => {
    setExpandedRow(expandedRow === username ? null : username)
  }

  return (
    <div class="overflow-y-auto flex-grow" style={{ maxHeight: '100%' }}>
      <table class="w-full">
        <thead class="bg-black sticky top-0 z-10">
          <tr class="text-md">
            <th class="border-t-1 py-2">Rank</th>
            <th class="border-t-1 py-2">Username</th>
            <th class="border-t-1 py-2">Level</th>
            <th class="border-t-1 py-2 hidden">XP</th>
            <th class="border-t-1 py-2 hidden">Gold</th>
          </tr>
        </thead>
        <tbody class="text-xl mt-2 relative">
          <tr></tr>
          {players.map((player) => {
            return (
              <tr
                key={player.username}
                class={`h-8 even:bg-gray-900 odd:bg-black ${
                  isMobile ? 'cursor-pointer' : ''
                }`}
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
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
