import { useState, useEffect } from 'preact/hooks'

interface Fish {
  emoji: string
  name: string
  type: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
}

const FISH_LIST: Fish[] = [
  { emoji: '🐠', name: 'Derpy Dory', type: 'common' },
  { emoji: '🐟', name: 'Boople Snoot', type: 'common' },
  { emoji: '🐠', name: 'Splashy Boi', type: 'common' },
  { emoji: '🐡', name: 'Puff Daddy', type: 'common' },
  { emoji: '🐟', name: 'Bubble Trouble', type: 'common' },
  { emoji: '🐡', name: 'Blubber Nugget', type: 'common' },
  { emoji: '🐟', name: 'Fishy McFishface', type: 'common' },
  { emoji: '🐠', name: 'Scale-y Cat', type: 'common' },
  { emoji: '🐟', name: 'Sir Fins-a-lot', type: 'uncommon' },
  { emoji: '🐟', name: 'Cod Almighty', type: 'uncommon' },
  { emoji: '🐡', name: 'Swim Shady', type: 'uncommon' },
  { emoji: '🐠', name: 'Salmon-ella', type: 'uncommon' },
  { emoji: '🦈', name: 'Baby Jaws', type: 'uncommon' },
  { emoji: '🐠', name: 'Gill-ty Pleasure', type: 'uncommon' },
  { emoji: '🐡', name: 'Puffer P. Diddy', type: 'uncommon' },
  { emoji: '🐟', name: 'Bass-ic Instinct', type: 'uncommon' },
  { emoji: '🦀', name: 'Pinchy McSnapper', type: 'rare' },
  { emoji: '🦞', name: 'Snip Snap Lobsta', type: 'rare' },
  { emoji: '🐬', name: 'Flipper McGee', type: 'rare' },
  { emoji: '🦑', name: 'Squidney Ink-man', type: 'rare' },
  { emoji: '🐙', name: 'Tentacool Dude', type: 'rare' },
  { emoji: '🐋', name: 'Chonky Bubbles', type: 'rare' },
  { emoji: '🦑', name: 'InkMaster Flash', type: 'rare' },
  { emoji: '🐙', name: 'Octavio Stretch', type: 'rare' },
  { emoji: '🐉', name: 'Sea Serpent Jr.', type: 'epic' },
  { emoji: '🐠', name: 'Rainbow Trout-standing', type: 'epic' },
  { emoji: '🐊', name: 'Croccy Balboa', type: 'epic' },
  { emoji: '🦭', name: 'Lord of the Seals', type: 'epic' },
  { emoji: '🦈', name: 'Great Byte', type: 'epic' },
  { emoji: '🐊', name: 'Snappers Delight', type: 'epic' },
  { emoji: '🐢', name: 'Shell Shocked', type: 'epic' },
  { emoji: '🦭', name: 'Seal of Approval', type: 'epic' },
  { emoji: '🌋', name: 'Magma-rine', type: 'legendary' },
  {
    emoji: '💎',
    name: 'Diamond Scales',
    type: 'legendary',
  },
  { emoji: '🔱', name: 'Kraken Jr.', type: 'legendary' },
  {
    emoji: '🐉',
    name: 'Loch Less Monster',
    type: 'legendary',
  },
  {
    emoji: '🌊',
    name: "Poseidon's Beard",
    type: 'legendary',
  },
  { emoji: '🐋', name: 'Moby Click', type: 'legendary' },
  {
    emoji: '🐲',
    name: "Nessie's Cousin",
    type: 'legendary',
  },
  { emoji: '⚡', name: 'Thunder Fin', type: 'legendary' },
]

const COLOR_MAP = {
  common: 'text-white',
  uncommon: 'text-green-500',
  rare: 'text-blue-500',
  epic: 'text-purple-500',
  legendary: 'text-yellow-300',
}

const AnimatedFishWriter = () => {
  const [fish, setFish] = useState<Fish | null>(null)
  const [typedType, setTypedType] = useState('')
  const [typedName, setTypedName] = useState('')
  const [emoji, setEmoji] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)

  const typeText = async (
    text: string,
    setter: (val: string) => void,
    delay = 150
  ) => {
    for (let i = 0; i <= text.length; i++) {
      setter(text.slice(0, i))
      await new Promise((res) => setTimeout(res, delay))
    }
  }

  const deleteText = async (setter: (val: string) => void, current: string) => {
    for (let i = current.length; i >= 0; i--) {
      setter(current.slice(0, i))
      await new Promise((res) => setTimeout(res, 80))
    }
  }

  const animate = async () => {
    const newFish = FISH_LIST[Math.floor(Math.random() * FISH_LIST.length)]
    setFish(newFish)
    await typeText(newFish.type, setTypedType)
    setEmoji(newFish.emoji)
    await typeText(newFish.name, setTypedName)
    await new Promise((res) => setTimeout(res, 1500))
    await deleteText(setTypedName, newFish.name)
    setEmoji('')
    await deleteText(setTypedType, newFish.type)
    await new Promise((res) => setTimeout(res, 500))
    animate()
  }

  const getIndefiniteArticle = (word: string) => {
    return /^[aeiou]/i.test(word) ? 'an' : 'a'
  }

  useEffect(() => {
    animate()
  }, [])

  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)
    return () => clearInterval(blink)
  }, [])

  return (
    <div class="flex flex-col font-terminal text-2xl text-shadow-lg sm:text-2xl sm:flex-row md:text-3xl xl:text-5xl">
      <p class="mr-2">
        Play and catch {getIndefiniteArticle(typedType) + ' '}
        <span class={`${fish ? COLOR_MAP[fish.type] : ''} bg-terminal`}>
          {typedType}
          {fish?.name && typedType.length < fish.type.length && (
            <span class={cursorVisible ? '' : 'invisible'}>_</span>
          )}
        </span>
      </p>
      <p>
        {`${emoji} ${typedName}`}
        <span class={typedName && cursorVisible ? '' : 'invisible'}>_</span>
      </p>
    </div>
  )
}

export default AnimatedFishWriter
