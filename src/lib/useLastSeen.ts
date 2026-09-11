import { useEffect, useState } from 'react'
import type { LastSeen } from '../content/types'

type State = { status: 'loading' } | { status: 'ready'; data: LastSeen } | { status: 'error' }

/** Loads the hand-edited /last-seen.json once per mount. */
export function useLastSeen(): State {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    fetch('/last-seen.json', { cache: 'no-cache', signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status))
        return res.json() as Promise<LastSeen>
      })
      .then((data) => setState({ status: 'ready', data }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setState({ status: 'error' })
      })
    return () => controller.abort()
  }, [])

  return state
}
