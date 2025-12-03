import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { throttle } from 'lodash'
import { useMenu } from '@/store/menuStore'

export type Point = { x: number; y: number }
const calculateTheta = (
  clientX: number,
  clientY: number,
  centerPoint: Point
): number => {
  return Math.atan2(clientX - centerPoint.x, -(clientY - centerPoint.y))
}

export const Controls = () => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const { incrementFocusedIndex, decrementFocusedIndex } = useMenu()
  const startThetaRef = useRef<number | null>(null)
  const prevThetaRef = useRef(0)

  const centerPoint: Point = useMemo(() => {
    const wheel = document.getElementById('clickwheel')
    const rect = wheel?.getBoundingClientRect()

    if (!rect) return { x: 0, y: 0 }
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
  }, [])

  const handleStart = useCallback(
    (
      event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      setIsMouseDown(true)

      const clientX =
        'touches' in event ? event.touches[0].clientX : event.clientX
      const clientY =
        'touches' in event ? event.touches[0].clientY : event.clientY

      const thetaCurrent = calculateTheta(clientX, clientY, centerPoint)

      startThetaRef.current = thetaCurrent
      prevThetaRef.current = thetaCurrent
    },
    [centerPoint]
  )

  const handleEnd = useCallback(() => {
    setIsMouseDown(false)
    startThetaRef.current = null
  }, [])

  const handleMove = useCallback(
    (
      event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      if (!isMouseDown || startThetaRef.current === null) return

      const clientX =
        'touches' in event ? event.touches[0].clientX : event.clientX
      const clientY =
        'touches' in event ? event.touches[0].clientY : event.clientY

      const thetaCurrent = calculateTheta(clientX, clientY, centerPoint)
      const prevTheta = prevThetaRef.current
      let deltaTheta = thetaCurrent - prevTheta

      if (deltaTheta > Math.PI) {
        deltaTheta -= 2 * Math.PI
      } else if (deltaTheta < -Math.PI) {
        deltaTheta += 2 * Math.PI
      }

      if (Math.abs(deltaTheta) > 0.01) {
        const isClockwise = deltaTheta > 0
        if (isClockwise) {
          incrementFocusedIndex()
        } else {
          decrementFocusedIndex()
        }
      }
      prevThetaRef.current = thetaCurrent
    },
    [isMouseDown, centerPoint]
  )

  const throttledMove = useMemo(() => throttle(handleMove, 50), [handleMove])

  useEffect(() => {
    return () => {
      throttledMove.cancel()
    }
  }, [throttledMove])

  return (
    <div className='flex-1 flex flex-col items-center'>
      <div
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onMouseMove={throttledMove}
        onTouchMove={throttledMove}
        className='w-[300px] aspect-square bg-white rounded-full mx-auto my-auto flex'
        id='clickwheel'
      >
        <button className='w-[125px] aspect-square border border-gray-500 rounded-full mx-auto my-auto'></button>
      </div>
    </div>
  )
}
