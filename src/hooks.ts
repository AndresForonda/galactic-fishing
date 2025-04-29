import { useEffect, useState } from 'preact/hooks'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true) // Por defecto asumimos mobile para SSR friendly

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640)
    update() // Actualizamos inmediatamente
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return isMobile
}
