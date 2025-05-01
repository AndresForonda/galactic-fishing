import { FunctionalComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'

interface LoadingProps {
  text?: string
}

export const Loading: FunctionalComponent<LoadingProps> = ({
  text = 'Loading...',
}) => {
  const [loadingText, setLoadingText] = useState<string>('')

  // funtion to write Loading... char by char
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
