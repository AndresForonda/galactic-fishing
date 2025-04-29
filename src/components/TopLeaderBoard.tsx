import { FunctionalComponent } from 'preact'
import { LeaderboardPlayer, LeaderboardResponse } from '../api'

const TopLeaderBoard: FunctionalComponent<LeaderboardResponse> = ({
  players,
}) => {
  const RANK_ICONS = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
  }

  return (
    <div class="flex flex-col items-center justify-between w-full gap-2 mb-2">
      {players &&
        players.map((player: LeaderboardPlayer) => (
          <div key={player.username} class="bg-border w-full p-2">
            <div class="flex flex-col items-center justify-between w-full gap-1">
              <div class="flex items-center text-lg font-bold">
                <div class=" pr-2">
                  {RANK_ICONS[player.rank as keyof typeof RANK_ICONS]}
                </div>
                <div>{player.username}</div>
              </div>
              <div class="flex justify-center items-center w-full text-sm gap-6">
                <div>🆙 {player.level}</div>
                <div>🧠 {player.xp.toLocaleString()}</div>
                <div>💰 {player.gold.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default TopLeaderBoard
