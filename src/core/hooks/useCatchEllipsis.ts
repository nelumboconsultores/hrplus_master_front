import { isEllipsisActive } from 'core/utils'
import { useEffect, useRef, useState } from 'react'

export const useCatchEllipsis = () => {
  const [isOver, setIsOver] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (el) setIsOver(isEllipsisActive(el))
  }, [])
  return { isOver, ref }
}
