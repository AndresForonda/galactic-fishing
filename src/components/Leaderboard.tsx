import { useState, useEffect } from 'preact/hooks'
import { LeaderboardPlayer } from '../api'
import { useIsMobile } from '../hooks.ts'

const Leaderboard = ({ players }: { players: LeaderboardPlayer[] }) => {
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

  const paginate = (page: number, newRows: number) => {
    setRowsPerPage(newRows)
    setTotalPages(Math.ceil(players.length / newRows))
    setCurrentPage(page)
    const start = (page - 1) * newRows
    const end = start + newRows
    setPlayersOnPage(players.slice(start, end))
  }

  useEffect(() => {
    paginate(currentPage, rowsPerPage)
  }, [players, currentPage, rowsPerPage])

  return (
    <div class="overflow-y-auto flex flex-col flex-grow w-full max-w-108 mx-auto h-full sm:max-w-3xl xl:w-3xl">
      <table class="w-full border-2 border-t-0 border-border">
        <thead class="bg-terminal sticky top-0 sm:top-[-1px] z-10">
          <tr class="text-md sm:text-lg">
            {[
              { icon: '🏆', label: 'Rank', class: 'w-16 md:w-20' },
              { icon: '👤', label: 'Username', class: 'lg:w-96' },
              { icon: '🆙', label: 'Level', class: 'lg:w-20' },
              {
                icon: '🧠',
                label: 'XP',
                class: 'hidden sm:table-cell lg:min-w-20 lg:px-4',
              },
              {
                icon: '💰',
                label: 'Gold',
                class: 'hidden sm:table-cell lg:min-w-20 lg:px-4',
              },
            ].map(({ icon, label, class: cls }) => (
              <th class={`border-t-3 border-border py-2 ${cls}`}>
                <p class="hidden md:block">{icon}</p>
                <p>{label}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody class="text-xl xl:text-2xl">
          {playersOnPage.map((player) => {
            const highlight = player.rank <= 10 ? 'font-bold text-primary' : ''
            const infected = player.isInfected
              ? 'bg-poison text-shadow-lg'
              : 'odd:bg-gray-900 even:bg-terminal h-12 xl:h-14'
            const rowClickable = isMobile
              ? 'cursor-crosshair hover:bg-gray-700'
              : ''

            return (
              <tr
                key={player.username}
                class={`${highlight} ${infected} ${rowClickable}`}
                onClick={() => isMobile && toggleRow(player.username)}
              >
                <td class="custom-dashed text-right pr-2">{player.rank}</td>
                <td
                  class={`custom-dashed max-w-52 lg:max-w-12 overflow-hidden truncate whitespace-nowrap pl-4 gap-1 ${
                    isMobile && expandedRow === player.username
                      ? 'font-bold py-2'
                      : ''
                  }`}
                  title={player.username}
                >
                  {player.isInfected && <span>☠️ </span>}
                  {player.username}
                  {isMobile && expandedRow === player.username && (
                    <div class="text-xs text-info-500 mt-1">
                      {`🧠${player.xp.toLocaleString(
                        'en-US'
                      )} 💰${player.gold.toLocaleString('en-US')}`}
                    </div>
                  )}
                </td>
                <td class="custom-dashed text-right pr-4 font-bold">
                  {player.level}
                </td>
                <td class="custom-dashed text-right hidden sm:table-cell pr-2">
                  {player.xp.toLocaleString('en-US')}
                </td>
                <td class="custom-dashed text-right hidden sm:table-cell pr-2">
                  {player.gold.toLocaleString('en-US')}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div class="w-full bg-terminal border-border border-2 max-h-16 sticky bottom-0 flex justify-between md:grid md:grid-flow-col md:items-center md:gap-4 md:justify-end">
        <p class="hidden text-xl pr-10 xl:block">
          Players: {players.length + 3}
        </p>

        <button
          onClick={() => paginate(currentPage - 1, rowsPerPage)}
          disabled={currentPage <= 1}
          class={`text-2xl w-8 h-full bg-border md:col-start-2 md:text-5xl md:w-12 ${
            currentPage <= 1
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-crosshair'
          }`}
        >
          &lt;
        </button>

        <div class="flex justify-center items-center gap-1 h-full md:col-start-3">
          <p class="flex items-center text-sm md:text-xl">
            {`Page ${currentPage} of ${totalPages}`}
          </p>
        </div>

        <div class="flex justify-center items-center gap-1 h-full">
          <div class="flex items-center h-full gap-2">
            <label htmlFor="page-select" class="md:text-xl">
              Rows per page
            </label>
            <select
              class="bg-border h-full cursor-crosshair md:text-xl"
              id="page-select"
              value={rowsPerPage}
              onChange={(e) => {
                paginate(1, parseInt(e.currentTarget.value, 10))
              }}
            >
              {[10, 20, 30, 70].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => paginate(currentPage + 1, rowsPerPage)}
          disabled={currentPage >= totalPages}
          class={`text-2xl w-8 h-full bg-border md:justify-self-end md:text-5xl md:w-12 ${
            currentPage >= totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-crosshair'
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

export default Leaderboard
