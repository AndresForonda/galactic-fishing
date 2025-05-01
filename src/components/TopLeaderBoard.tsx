import { FunctionalComponent } from 'preact'
import { LeaderboardPlayer, LeaderboardResponse } from '../api'
import { getFishAmountByEmoji } from '../utils'

const TopLeaderBoard: FunctionalComponent<LeaderboardResponse> = ({
  players,
}) => {
  const RANK_ICONS = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
  }

  return (
    <div class="flex flex-col items-center justify-between w-full gap-1 sm:gap-4 lg:mt-2 xl:mt-0">
      {players &&
        players.map((player: LeaderboardPlayer, index: number) => (
          <div
            key={player.username}
            class={`${
              index === 0
                ? 'border-yellow-500 border-4'
                : index === 1
                ? 'border-slate-300 border-2'
                : 'border-orange-500 border-2'
            } group w-full bg-terminal max-w-108 cursor-text border-border  lg:min-w-84  xl:min-w-md 2xl:min-w-160`}
          >
            <div class="flex flex-col items-center justify-between w-full gap-1  2k:gap-5">
              <p
                class={`${
                  player.rank === 1
                    ? ' lg:flex-col xl:text-3xl 2xl:text-5xl'
                    : ' '
                }
                flex text-xl items-center xs:py-1 gap-2`}
              >
                <span
                  class={`${
                    player.rank === 1
                      ? 'lg:text-4xl  xl:text-8xl'
                      : 'xl:text-6xl'
                  }`}
                >
                  {RANK_ICONS[player.rank as keyof typeof RANK_ICONS]}
                </span>
                <span
                  title={player.username}
                  class="max-w-3xs sm:max-w-92  truncate overflow-hidden whitespace-nowrap block"
                >
                  {player.username}
                </span>
              </p>
              <div
                class={`
                ${
                  index === 0
                    ? 'bg-yellow-500 border-yellow-500 text-terminal'
                    : index === 1
                    ? 'bg-slate-300 border-slate-300 text-terminal'
                    : 'bg-orange-500 border-orange-500 text-shadow-lg'
                }
                flex border-t-2 justify-between px-4 items-center font-bold font-terminal w-full text-lg sm:text-lg sm:font-mono lg:text-base lg:font-normal xl:text-xl xl:font-bold 2k:py-4`}
              >
                <div class="flex items-center lg:flex-col 2xl:flex-row 2xl:gap-2">
                  <p class="xl:text-3xl">🏆</p> <p>{player.level}</p>
                </div>
                <div class="flex items-center lg:flex-col 2xl:flex-row 2xl:gap-2">
                  <p class="xl:text-3xl">🧠</p>{' '}
                  <p>{player.xp.toLocaleString()}</p>
                </div>
                <div class="flex items-center lg:flex-col 2xl:flex-row 2xl:gap-2">
                  <p class="xl:text-3xl">💰</p>{' '}
                  <p>{player.gold.toLocaleString()}</p>
                </div>
                <div class="flex items-center lg:flex-col 2xl:flex-row 2xl:gap-2">
                  <p class="xl:text-3xl">🐟</p>{' '}
                  <p>{getFishAmountByEmoji(player.fishEmojis)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default TopLeaderBoard
