import { FunctionComponent } from 'preact'
import { MarketItem } from '../api'

interface MarketProps {
  items: MarketItem[]
}

const Market: FunctionComponent<MarketProps> = ({ items }) => {
  const MARKET_ICONS = {
    poison_delay: ['☠️', '⏳'],
    poison_leveling: ['☠️', '🆙'],
    poison_recovery: ['☠️', '💊'],
    fishing_rod: ['🎣'],
  }

  return (
    <div class="flex flex-col w-full gap-4">
      {items &&
        items.map((item: MarketItem) => (
          <div
            key={item.id}
            class="flex  items-center  border-border border-2 w-full px-2 py-4 gap-4 "
          >
            <div class="text-6xl flex justify-center items-center gap-1 w-2/5 text-center">
              {MARKET_ICONS[item.type as keyof typeof MARKET_ICONS].map(
                (icon) => (
                  <span key={icon}>{icon}</span>
                )
              )}
            </div>
            <div class="flex flex-col max-w-3/5 self-end">
              <p class="text-primary font-bold text-xl">{item.name}</p>
              <p class="text-sm">{item.description}</p>
              <p class="text-primary text-lg font-bold">
                💰 {item.cost.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Market
