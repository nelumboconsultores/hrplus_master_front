import { useCallback, useEffect, useState } from 'react'

export const useRefresh = (): [boolean, () => void] => {
  const [refresh, setRefresh] = useState(false)

  const refreshPage = useCallback(() => setRefresh((prev) => !prev), [setRefresh])

  useEffect(() => {
    if (refresh) setRefresh(false)
  }, [refresh])

  return [refresh, refreshPage]
}
