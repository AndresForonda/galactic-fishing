import { useState, useEffect } from 'preact/hooks'

export const Loading = ({ text = 'Loading...' }) => {
  const [loadingText, setLoadingText] = useState<string>('')

  const writeLoading = (text: string, index: number) => {
    if (index < text.length) {
      setLoadingText((prev) => prev + text[index])
      setTimeout(() => writeLoading(text, index + 1), 200)
    } else {
      setLoadingText('')
      writeLoading(text, 0)
    }
  }

  useEffect(() => {
    writeLoading(text, 0)
  }, [text])

  return (
    <div class="flex flex-col items-left flex-grow overflow-hidden w-full">
      <p class="flex justify-center items-center text-5xl text-primary font-terminal">
        {loadingText}
        {loadingText.length % 2 ? '_' : ''}
      </p>
    </div>
  )
}
