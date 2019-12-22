import { useRef, useEffect } from 'react'
import { AnimateToFrame } from './useAnimateToFrame'
import { Frame } from '@spring-keyframes/driver'

interface Props {
  ref: React.MutableRefObject<Element | null>
  animateToFrame: AnimateToFrame
  from: Frame
  whileTap?: Frame
  whileHover?: Frame
}

export function useWhileInteraction({
  ref,
  animateToFrame,
  from,
  whileTap,
  whileHover,
}: Props): void {
  const isHoveredRef = useRef(false)
  const isTouchDeviceRef = useRef(false)

  function handleTap() {
    if (!whileTap) return
    animateToFrame(whileTap)
  }

  function handleTapEnd() {
    if (whileHover) {
      animateToFrame(isHoveredRef.current ? whileHover : from)
      return
    }
    animateToFrame(from)
  }

  function handleMouseEnter() {
    if (!whileHover) return
    isHoveredRef.current = true
    animateToFrame(whileHover)
  }

  function handleMouseEnterEnd() {
    isHoveredRef.current = false
    animateToFrame(from)
  }

  useEffect(() => {
    isTouchDeviceRef.current =
      typeof window !== 'undefined' && 'ontouchstart' in window

    if (!ref.current) return
    if (whileHover && !isTouchDeviceRef.current) {
      ref.current.addEventListener('mouseenter', handleMouseEnter)
      ref.current.addEventListener('mouseleave', handleMouseEnterEnd)
    }
    if (whileTap) {
      if (!isTouchDeviceRef.current) {
        ref.current.addEventListener('mousedown', handleTap)
        ref.current.addEventListener('mouseup', handleTapEnd)
      }
      ref.current.addEventListener('touchstart', handleTap)
      ref.current.addEventListener('touchend', handleTapEnd)
    }

    return () => {
      if (!ref.current) return
      if (whileHover && !isTouchDeviceRef.current) {
        ref.current.addEventListener('mouseenter', handleMouseEnter)
        ref.current.addEventListener('mouseleave', handleMouseEnterEnd)
      }
      if (whileTap) {
        ref.current.removeEventListener('mousedown', handleTap)
        ref.current.removeEventListener('mouseup', handleTapEnd)
        ref.current.removeEventListener('touchstart', handleTap)
        ref.current.removeEventListener('touchend', handleTapEnd)
      }
    }
  }, [])
}
