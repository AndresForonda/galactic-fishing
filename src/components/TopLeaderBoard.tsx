import { FunctionalComponent } from 'preact'
import { LeaderboardPlayer, LeaderboardResponse } from '../api'

export const TopLeaderBoard: FunctionalComponent<LeaderboardResponse> = ({
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
            <div class="flex flex-col items-center justify-between w-full gap-2">
              <div class="flex items-center text-2xl font-bold">
                <div class="text-2xl pr-2">
                  {RANK_ICONS[player.rank as keyof typeof RANK_ICONS]}
                </div>
                <div class="">{player.username}</div>
              </div>
              <div class="flex justify-between items-center w-full text-md">
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
