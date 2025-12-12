import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { throttle } from 'lodash'
import { useMenu } from '@/store/menuStore'
import NextIcon from '@/assets/icons/next.svg?react'
import PreviousIcon from '@/assets/icons/previous.svg?react'
import PlayIcon from '@/assets/icons/play.svg?react'
import { Directions } from '@/shared/constants'
// import PauseIcon from '@/assets/icons/pause.svg?react'

type UnifiedEvent =
  | React.MouseEvent<HTMLDivElement>
  | React.TouchEvent<HTMLDivElement>
  | MouseEvent
  | TouchEvent
export type Point = { x: number; y: number }
let centerElPoint: Point | null = null

const calculateTheta = (clientX: number, clientY: number): number => {
  if (!centerElPoint) return 0
  const theta = Math.atan2(
    -(clientY - centerElPoint.y),
    -(clientX - centerElPoint.x)
  )
  return theta
}

const uxFeedBack = () => {
  navigator.vibrate(10)
}

export const Controls = () => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const { scroll, select, goBack } = useMenu()

  const startThetaRef = useRef<number | null>(null)
  const prevThetaRef = useRef(-2.0331651641142265)
  const midButtonRef = useRef<HTMLButtonElement | null>(null)
  const clickWheelRef = useRef<HTMLDivElement | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const isScrollingRef = useRef<boolean>(false)

  const handleStart = useCallback((event: UnifiedEvent) => {
    event.preventDefault()
    setIsMouseDown(true)

    const clientX =
      'touches' in event ? event.touches[0].clientX : event.clientX
    const clientY =
      'touches' in event ? event.touches[0].clientY : event.clientY

    const thetaCurrent = calculateTheta(clientX, clientY)

    startThetaRef.current = thetaCurrent
    prevThetaRef.current = thetaCurrent
    isScrollingRef.current = false
  }, [])

  const handleEnd = useCallback(
    (event: UnifiedEvent) => {
      setIsMouseDown(false)
      startThetaRef.current = null

      if (!isScrollingRef.current) {
        const target = event.target
        if (
          menuButtonRef.current &&
          menuButtonRef.current.contains(target as Node)
        ) {
          goBack()
        }
      }
    },
    [goBack]
  )

  const handleRotate = useCallback(
    (event: UnifiedEvent) => {
      if (!isMouseDown || startThetaRef.current === null) return

      const clientX =
        'touches' in event ? event.touches[0].clientX : event.clientX
      const clientY =
        'touches' in event ? event.touches[0].clientY : event.clientY

      const thetaCurrent = calculateTheta(clientX, clientY)
      const prevTheta = prevThetaRef.current
      let deltaTheta = thetaCurrent - prevTheta

      if (deltaTheta > Math.PI) {
        deltaTheta -= 2 * Math.PI
      } else if (deltaTheta < -Math.PI) {
        deltaTheta += 2 * Math.PI
      }

      if (Math.abs(deltaTheta) > 0.04) {
        const isClockwise = deltaTheta > 0
        scroll(isClockwise ? Directions.FORWARD : Directions.BACKWARD)
        uxFeedBack()
        isScrollingRef.current = true
      }
      prevThetaRef.current = thetaCurrent
    },
    [isMouseDown, scroll]
  )

  const handleSelect = useCallback(() => {
    uxFeedBack()
    select()
  }, [select])

  const throttledMove = useMemo(
    () => throttle(handleRotate, 100),
    [handleRotate]
  )

  useEffect(() => {
    const addListenersToEvent = (
      element: HTMLElement | null,
      fn: () => void
    ) => {
      if (!element) return

      const stopPropagation = (event: UnifiedEvent) => {
        event.stopPropagation()
      }

      element.addEventListener('touchstart', stopPropagation)
      element.addEventListener('touchend', stopPropagation)
      element.addEventListener('touchmove', stopPropagation)
      element.addEventListener('mousemove', stopPropagation)
      element.addEventListener('mouseup', stopPropagation)
      element.addEventListener('mousedown', stopPropagation)
      element.addEventListener('click', fn)

      return () => {
        element.removeEventListener('touchstart', stopPropagation)
        element.removeEventListener('touchend', stopPropagation)
        element.removeEventListener('touchmove', stopPropagation)
        element.removeEventListener('mousemove', stopPropagation)
        element.removeEventListener('mouseup', stopPropagation)
        element.removeEventListener('mousedown', stopPropagation)
        element.removeEventListener('click', fn)
      }
    }

    const clickWheel = clickWheelRef.current
    if (clickWheel) {
      clickWheel.addEventListener('touchstart', handleStart, { passive: false })
      clickWheel.addEventListener('touchend', handleEnd)
      clickWheel.addEventListener('touchmove', throttledMove, {
        passive: false
      })
    }

    const cleanUpListeners = addListenersToEvent(
      midButtonRef.current,
      handleSelect
    )

    return () => {
      if (clickWheel) {
        clickWheel.removeEventListener('touchstart', handleStart)
        clickWheel.removeEventListener('touchend', handleEnd)
        clickWheel.removeEventListener('touchmove', throttledMove)
      }
      cleanUpListeners?.()

      throttledMove.cancel()
    }
  }, [handleStart, handleEnd, throttledMove, handleSelect, goBack])

  if (!centerElPoint) {
    const rect = midButtonRef.current?.getBoundingClientRect()
    if (rect) {
      // eslint-disable-next-line react-hooks/globals
      centerElPoint = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }
    }
  }

  return (
    <div className='flex-1 flex flex-col items-center'>
      <div
        ref={clickWheelRef}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseMove={throttledMove}
        className='w-[250px] aspect-square bg-white rounded-full mx-auto my-auto flex relative p-5 text-gray-500'
        id='clickwheel'
      >
        <button
          className='absolute left-[50%] -translate-x-[50%] font-semibold'
          ref={menuButtonRef}
        >
          MENU
        </button>
        <button className='absolute top-[50%] right-5 -translate-y-[50%]'>
          <NextIcon />
        </button>
        <button className='absolute top-[50%] -translate-y-[50%]'>
          <PreviousIcon />
        </button>
        <button className='absolute bottom-5 left-[50%] -translate-x-[50%]'>
          {/* {false ? < PlayIcon /> : <PauseIcon />} */}
          <PlayIcon />
        </button>
        <button
          ref={midButtonRef}
          className='w-[100px] aspect-square z-10 border border-gray-500 rounded-full mx-auto my-auto'
        ></button>
      </div>
    </div>
  )
}
