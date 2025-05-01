export const FISH_EMOJIS_DICT = {
  '🐟🐟🐟': '1-5',
  '🦈 ···': '6-9',
  '🚣': '10+',
  '🛶': '10+',
  '⛵': '10+',
  '🛥️': '10+',
  '🚢': '100+',
  '🛳️': '100+',
  '🏊': '100+',
  '🚢🚢': '1000+',
  '🛳️🛳️': '1000+',
  '🛥️🛥️': '1000+',
  '⛴️⛴️': '1000+',
  '🚢🚢🚢 🌊': '10000+',
}

export const getFishAmountByEmoji = (emoji: string) => {
  const fishAmount = FISH_EMOJIS_DICT[emoji as keyof typeof FISH_EMOJIS_DICT]
  return fishAmount ? fishAmount : '0'
}
