import { useEffect, useState } from 'preact/hooks'

type LoadingCubeProps = {
  text?: string
  speed?: number
}

const CUBE = `
         +------------+
        /|           /|
       / |          / |
      +------------+  |
      |  |         |  |
      |  |         |  |
      |  +---------|--+
      | /          | /    
      |/           |/
      +------------+`

export const LoadingCube = ({
  text = 'LOADING',
  speed = 200,
}: LoadingCubeProps) => {
  const [dotCount, setDotCount] = useState(0)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => {
        if (!reverse && prev >= text.length) {
          setReverse(true)
          return prev - 1
        }
        if (reverse && prev <= 0) {
          setReverse(false)
          return prev + 1
        }
        return reverse ? prev - 1 : prev + 1
      })
    }, speed)
    return () => clearInterval(interval)
  }, [reverse, speed, text.length])

  const display = `${text}${'.'.repeat(dotCount)}`

  return (
    <pre class="text-primary font-bold">
      {CUBE} {display}
    </pre>
  )
}
