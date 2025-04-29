import { FunctionalComponent } from 'preact'
import { LeaderboardPlayer, LeaderboardResponse } from '../api'
import { useIsMobile } from '../hooks.ts'
import { useState } from 'preact/hooks'

export const Leaderboard: FunctionalComponent<LeaderboardResponse> = ({
  players,
}) => {
  const isMobile = useIsMobile()

  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const toggleRow = (username: string) => {
    setExpandedRow(expandedRow === username ? null : username)
  }

  return (
    <table class="w-full">
      <thead class="bg-black">
        <tr class="text-md sticky top-0 bg-black z-10 ">
          <th class="border-t-1 py-2">Rank</th>
          <th class="border-t-1 py-2">Username</th>
          <th class="border-t-1 py-2">Level</th>
          <th class="border-t-1 py-2 hidden">XP</th>
          <th class="border-t-1 py-2 hidden">Gold</th>
        </tr>
      </thead>
      <tbody class="text-xl mt-2">
        {players &&
          players.map((player: LeaderboardPlayer) => (
            <tr
              key={player.username}
              class={`h-8 even:bg-black odd:bg-gray-900 ${
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
                  <td colspan={3} class="text-base text-info-500">
                    🧠 {player.xp.toLocaleString()} · 💰{' '}
                    {player.gold.toLocaleString()}
                  </td>
                )}
              </td>
              <td class="custom-dashed text-right px-2">{player.level}</td>
              <td class="custom-dashed pr-2 text-right hidden">
                {player.xp.toLocaleString()}
              </td>
              <td class="custom-dashed text-right pr-2 hidden">
                {player.gold.toLocaleString()}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}
