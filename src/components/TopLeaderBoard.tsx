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
    <div class="flex flex-col items-center justify-between w-full gap-y-4 mb-2 mt-2">
      {players &&
        players.map((player: LeaderboardPlayer, index: number) => (
          <div
            key={player.username}
            class={`${
              index === 0 && 'border-4 border-yellow-500'
            } group  w-full max-w-92 cursor-text p-2 border-border hover:bg-black hover:border-border hover:scale-105 tranistion-all duration-300 border-2`}
          >
            <div class="flex flex-col items-center justify-between w-full gap-1">
              <div class="flex text-2xl items-center  font-bold gap-2">
                <div class="">
                  {RANK_ICONS[player.rank as keyof typeof RANK_ICONS]}
                </div>
                <div class="group-hover:text-primary">{player.username}</div>
              </div>
              <div
                class={`
                ${
                  index === 0
                    ? 'bg-yellow-500 text-black'
                    : index === 1
                    ? 'bg-slate-300 text-black'
                    : 'bg-orange-500 text-shadow-lg'
                }
                flex justify-center items-center font-bold w-full text-lg gap-6`}
              >
                <div class="inline-flex items-center gap-1 font-bold">
                  🆙 {player.level}
                </div>
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
