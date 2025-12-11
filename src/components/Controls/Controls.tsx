import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { throttle } from 'lodash'
import { useMenu } from '@/store/menuStore'
import NextIcon from '@/assets/icons/next.svg?react'
import PreviousIcon from '@/assets/icons/previous.svg?react'
import PlayIcon from '@/assets/icons/play.svg?react'
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
  const { incrementFocusedIndex, decrementFocusedIndex } = useMenu()
  const startThetaRef = useRef<number | null>(null)
  const prevThetaRef = useRef(-2.0331651641142265)
  const centerPointRef = useRef<HTMLButtonElement | null>(null)
  const clickWheelRef = useRef<HTMLDivElement | null>(null)

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
  }, [])

  const handleEnd = useCallback((event: UnifiedEvent) => {
    event.preventDefault()
    setIsMouseDown(false)
    startThetaRef.current = null
  }, [])

  const handleMove = useCallback(
    (event: UnifiedEvent) => {
      event.preventDefault()
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
        if (isClockwise) {
          incrementFocusedIndex()
        } else {
          decrementFocusedIndex()
        }
        uxFeedBack()
      }
      prevThetaRef.current = thetaCurrent
    },
    [isMouseDown, incrementFocusedIndex, decrementFocusedIndex]
  )

  const throttledMove = useMemo(() => throttle(handleMove, 100), [handleMove])

  useEffect(() => {
    const clickWheel = clickWheelRef.current
    if (!clickWheel) return

    clickWheel.addEventListener('touchstart', handleStart, { passive: false })
    clickWheel.addEventListener('touchend', handleEnd)
    clickWheel.addEventListener('touchmove', throttledMove, { passive: false })

    return () => {
      clickWheel.removeEventListener('touchstart', handleStart)
      clickWheel.removeEventListener('touchend', handleEnd)
      clickWheel.removeEventListener('touchmove', throttledMove)
      throttledMove.cancel()
    }
  }, [handleStart, handleEnd, throttledMove])

  if (!centerElPoint) {
    const rect = centerPointRef.current?.getBoundingClientRect()
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
        className='w-[250px] aspect-square bg-white rounded-full mx-auto my-auto flex relative p-5 text-red-500'
        id='clickwheel'
      >
        <button className='absolute left-[50%] -translate-x-[50%] font-semibold'>
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
          ref={centerPointRef}
          className='w-[100px] aspect-square border border-gray-500 rounded-full mx-auto my-auto'
          onClick={() => {}}
          onMouseDown={e => e.stopPropagation()}
          onMouseUp={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}
          onMouseMove={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
        ></button>
      </div>
    </div>
  )
}
