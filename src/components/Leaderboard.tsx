import { FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'
import { LeaderboardPlayer, LeaderboardResponse } from '../api'
import { useIsMobile } from '../hooks.ts'

const Leaderboard: FunctionalComponent<LeaderboardResponse> = ({ players }) => {
  const isMobile = useIsMobile()
  const [playersOnPage, setPlayersOnPage] = useState<LeaderboardPlayer[]>([])
  const [rowsPerPage, setRowsPerPage] = useState(30)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(
    Math.ceil(players.length / rowsPerPage)
  )
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const toggleRow = (username: string) => {
    setExpandedRow(expandedRow === username ? null : username)
  }

  const handlePageChange = (page: number, newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setTotalPages(Math.ceil(players.length / newRowsPerPage))
    setCurrentPage(page)
    const startIndex = (page - 1) * newRowsPerPage
    const endIndex = startIndex + newRowsPerPage
    setPlayersOnPage(players.slice(startIndex, endIndex))
  }

  // initial players calling handlePageChange with page 1 and rowsPerPage
  if (playersOnPage.length === 0) {
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    setPlayersOnPage(players.slice(startIndex, endIndex))
  }

  return (
    <div class="overflow-y-auto flex-grow" style={{ maxHeight: '100%' }}>
      <table class="w-full border-2 border-t-0 border-border">
        <thead class="bg-black sticky top-0 z-10">
          <tr class="text-md">
            <th class="border-t-2 border-border py-2 w-16">Rank</th>
            <th class="border-t-2 border-border py-2">Username</th>
            <th class="border-t-2 border-border py-2 w-16">Level</th>
            <th class="border-t-2 border-border py-2 hidden">XP</th>
            <th class="border-t-2 border-border py-2 hidden">Gold</th>
          </tr>
        </thead>
        <tbody class="text-xl">
          {playersOnPage.map((player) => {
            return (
              <tr
                key={player.username}
                class={`h-8 odd:bg-gray-900 even:bg-black ${
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
      <div class="w-full bg-black border-y-border border-y-2 h-12 sticky bottom-0 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1, rowsPerPage)}
          disabled={currentPage <= 1}
          class="text-4xl px-2 h-full bg-border cursor-pointer"
        >
          &lt;
        </button>
        <div class="flex justify-center items-center gap-1 text-sm h-full">
          <p class="h-full flex items-center">
            Page {currentPage} of {totalPages}
          </p>
          <span class="h-full flex items-center">|</span>
          <div class="flex items-center h-full gap-2">
            <label htmlFor="page-select">Rows per page</label>
            <select
              class="bg-border h-full"
              id="page-select"
              value={rowsPerPage}
              onChange={(e) => {
                handlePageChange(1, parseInt(e.currentTarget.value, 10))
              }}
            >
              {[10, 20, 30].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          class="text-4xl px-2 h-full bg-border cursor-pointer"
          onClick={() => handlePageChange(currentPage + 1, rowsPerPage)}
          disabled={currentPage >= totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

export default Leaderboard
