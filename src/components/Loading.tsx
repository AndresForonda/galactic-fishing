import { FunctionalComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'

export const Loading: FunctionalComponent = () => {
  const [loadingText, setLoadingText] = useState<string>('')

  // funtion to write Loading... char by char
  const writeLoading = (text: string, index: number) => {
    if (index < text.length) {
      setLoadingText((prev) => prev + text[index])
      setTimeout(() => writeLoading(text, index + 1), 200)
    } else {
      setLoadingText('')
      writeLoading('Loading...', 0)
    }
  }

  useEffect(() => {
    writeLoading('Loading...', 0)
  }, [])

  return (
    <div class="flex flex-col items-left w-full">
      <p>
        {loadingText}
        {loadingText.length % 2 ? '_' : ''}
      </p>
    </div>
  )
}
