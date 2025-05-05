import { LeaderboardPlayer } from '../api'

const Stat = ({ icon, value }: { icon: string; value: string | number }) => (
  <div class="flex items-center lg:flex-col 2xl:flex-row 2xl:gap-2">
    <p class="xl:text-3xl">{icon}</p>
    <p>{value}</p>
  </div>
)

const TopLeaderBoard = ({ players }: { players: LeaderboardPlayer[] }) => {
  const RANK_ICONS = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
  }

  return (
    <div class="flex flex-col items-center justify-between w-full gap-2 sm:gap-4">
      {players.map((player, index) => {
        const borderColor =
          index === 0
            ? 'border-yellow-500 border-4'
            : index === 1
            ? 'border-slate-300 border-2'
            : 'border-orange-500 border-2'

        const bgColor =
          index === 0
            ? 'bg-yellow-500 border-yellow-500 text-terminal'
            : index === 1
            ? 'bg-slate-300 border-slate-300 text-terminal'
            : 'bg-orange-500 border-orange-500 text-shadow-lg'

        const isFirst = player.rank === 1

        return (
          <div
            key={player.username}
            class={`group w-full bg-terminal max-w-108 cursor-text border-border lg:min-w-84 xl:min-w-md 2xl:min-w-160 ${borderColor}`}
          >
            <div class="flex flex-col items-center justify-between w-full gap-1 2k:gap-5">
              <p
                class={`flex items-center xs:py-1 gap-2 ${
                  isFirst
                    ? 'lg:flex-col text-2xl 2xl:text-5xl'
                    : 'text-xl 2xl:text-3xl'
                }`}
              >
                <span
                  class={isFirst ? 'lg:text-3xl xl:text-8xl' : 'xl:text-6xl'}
                >
                  {RANK_ICONS[player.rank as keyof typeof RANK_ICONS]}
                </span>
                <span
                  title={player.username}
                  class={`block max-w-2xs sm:max-w-sm ${
                    isFirst ? '2xl:max-w-xl' : '2xl:max-w-lg'
                  } truncate overflow-hidden whitespace-nowrap`}
                >
                  {player.username}
                </span>
              </p>

              <div
                class={`flex border-t-2 justify-between px-4 items-center font-bold font-terminal w-full text-lg sm:text-lg sm:font-mono lg:text-base lg:font-normal xl:text-xl xl:font-bold 2k:py-4 ${bgColor}`}
              >
                <Stat icon="🏆" value={player.level} />
                <Stat icon="🧠" value={player.xp.toLocaleString('en-US')} />
                <Stat icon="💰" value={player.gold.toLocaleString('en-US')} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TopLeaderBoard
