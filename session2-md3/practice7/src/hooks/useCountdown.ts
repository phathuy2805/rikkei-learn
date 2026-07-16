import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * COMPARISON: RETURN DATA STRUCTURES IN CUSTOM HOOKS
 * 
 * | Evaluation Criterion | Option A: Object Return (`{ seconds, isActive, start, ... }`) | Option B: Tuple Const Assertion Return (`[seconds, { start, ... }] as const`) |
 * | :--- | :--- | :--- |
 * | **Type-Safety** | **Very High**. Explicit keys bind directly to type definitions. Immune to order mismatches. | **High**. Relies on readonly positional typing (`readonly [number, { ... }]`). |
 * | **Flexibility (Renaming)** | **Moderate**. Renaming requires alias syntax: `const { seconds: timerVal } = useCountdown(...)`. | **Excellent**. Easily rename values by positions: `const [timerVal, control] = useCountdown(...)`. |
 * | **Extensibility** | **Excellent**. Adding return keys (e.g., `isFinished`) will not break existing destructured assignments. | **Poor**. Modifying the array size or changing value positions breaks existing destructuring. |
 * | **Self-Documentation** | **Excellent**. The returned property names make the intent and function of each value instantly clear. | **Moderate**. Relies on documentation or IDE autocomplete parameter tooltips to verify what each index contains. |
 * | **Partial Consumption** | **Excellent**. Caller only destructures what is needed: `const { start } = useCountdown(...)`. | **Poor**. To access a later index, caller must destructure preceding values: `const [_, control] = ...`. |
 * 
 * ---
 * 
 * ### Selected Solution: **Option A: Object Return**
 * Although Tuple const assertions (Option B) are popular for state-like hooks (like React's standard `useState`), a complex countdown utility
 * is controller-heavy (multiple control functions: `start`, `pause`, `reset` and states: `seconds`, `isActive`). 
 * The Object return type provides superior self-documentation, effortless partial consumption, and robust extensibility, which is critical
 * for scaling production components without causing breaking API changes.
 */

export interface UseCountdownProps {
  initialSeconds: number
  onComplete?: () => void
}

export interface UseCountdownReturn {
  seconds: number
  isActive: boolean
  start: () => void
  pause: () => void
  reset: () => void
}

export function useCountdown({ initialSeconds, onComplete }: UseCountdownProps): UseCountdownReturn {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(false)
  const timerRef = useRef<number | null>(null)
  
  // Use a ref for onComplete callback to avoid re-triggering effect if callback reference changes
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  const start = useCallback(() => {
    if (seconds > 0) {
      setIsActive(true)
    }
  }, [seconds])

  const pause = useCallback(() => {
    setIsActive(false)
  }, [])

  const reset = useCallback(() => {
    setIsActive(false)
    setSeconds(initialSeconds)
  }, [initialSeconds])

  // Timer interval effect
  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    timerRef.current = window.setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsActive(false)
          if (timerRef.current) {
            window.clearInterval(timerRef.current)
            timerRef.current = null
          }
          if (onCompleteRef.current) {
            onCompleteRef.current()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Cleanup interval on unmount or when isActive changes
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isActive])

  return { seconds, isActive, start, pause, reset }
}
