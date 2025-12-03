import { Directions } from '@/shared/constants'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { throttle } from 'lodash'

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
  const [direction, setDirection] = useState(Directions.FORWARD)
  const [count, setCount] = useState(0)
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

      // Store the starting angle and the previous angle on start
      startThetaRef.current = thetaCurrent
      prevThetaRef.current = thetaCurrent
    },
    [centerPoint]
  )

  const handleEnd = useCallback(() => {
    setIsMouseDown(false)
    // Clear the starting angle when the interaction ends
    startThetaRef.current = null
  }, [])

  const handleMove = useCallback(
    (
      event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      // Use startThetaRef to check if drag is properly initiated
      if (!isMouseDown || startThetaRef.current === null) return

      const clientX =
        'touches' in event ? event.touches[0].clientX : event.clientX
      const clientY =
        'touches' in event ? event.touches[0].clientY : event.clientY

      const thetaCurrent = calculateTheta(clientX, clientY, centerPoint)
      const prevTheta = prevThetaRef.current
      let deltaTheta = thetaCurrent - prevTheta

      // Normalize deltaTheta to the range (-π, π] to handle the angle wrap-around
      if (deltaTheta > Math.PI) {
        deltaTheta -= 2 * Math.PI
      } else if (deltaTheta < -Math.PI) {
        deltaTheta += 2 * Math.PI
      }

      if (Math.abs(deltaTheta) > 0.01) {
        //avoiding jitter
        const isClockwise = deltaTheta > 0
        setDirection(isClockwise ? Directions.FORWARD : Directions.BACKWARD)
        if (isClockwise) {
          setCount(prev => prev + 1)
        } else {
          setCount(prev => prev - 1)
        }
      }
      // Update the previous angle for the next move event
      prevThetaRef.current = thetaCurrent
      // The `startThetaRef.current` remains unchanged throughout the drag.

      // Optional: If you wanted total angular displacement from start (not needed for direction/count):
      // let totalDelta = thetaCurrent - startThetaRef.current;
      // totalDelta = totalDelta > Math.PI ? totalDelta - 2 * Math.PI : totalDelta < -Math.PI ? totalDelta + 2 * Math.PI : totalDelta;
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
      {direction ? 'backward' : 'forward'} {count}
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
        <button
          className='w-[125px] aspect-square border border-gray-500 rounded-full mx-auto my-auto'
          // onClick={handlePlayClick}
        ></button>
      </div>
    </div>
  )
}
