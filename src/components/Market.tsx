import { FunctionComponent } from 'preact'
import { MarketItem } from '../api'

interface MarketProps {
  items: MarketItem[]
}

const Market: FunctionComponent<MarketProps> = ({ items }) => {
  const MARKET_ICONS = {
    poison_delay: '⏳',
    poison_leveling: '🆙',
    poison_recovery: '💊',
    fishing_rod: '🎣',
    poison_reveal_fishes: '🔍',
    default: '❓',
  }

  return (
    <div class="w-full flex flex-col gap-4 items-center overflow-y-scroll h-auto mt-4 sm:w-108 sm:mx-auto lg:flex-row lg:flex-start lg:flex-wrap lg:w-5xl lg:justify-center lg:items-start">
      {items &&
        items.map((item: MarketItem) => (
          <div
            key={item.id}
            class="flex  border-border bg-terminal border-2 px-2 py-4 gap-4 w-full max-w-120 lg:h-52"
          >
            <div class="text-8xl flex justify-center items-center gap-1 w-2/5 text-center">
              {MARKET_ICONS[item.type as keyof typeof MARKET_ICONS] || (
                <span>❓</span>
              )}
            </div>
            <div class="flex flex-col w-3/5 justify-between">
              <p class="text-primary font-bold text-xl">{item.name}</p>
              <p class="text-md">{item.description}</p>
              <p class="text-primary text-xl font-bold">
                💰 {item.cost.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Market
