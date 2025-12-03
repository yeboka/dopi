import { Directions } from '@/shared/constants'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { throttle } from 'lodash'

export type Point = { x: number; y: number }
export const Controls = () => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [direction, setDirection] = useState(Directions.FORWARD)
  const [count, setCount] = useState(0)
  // const [b, setB] = useState<Point>({ x: 0, y: 0 })
  // const [c, setC] = useState<Point>({ x: 0, y: 0 })

  // const handlePlayClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   navigator.vibrate(20)
  // }

  const centerPoint: Point = useMemo(() => {
    const wheel = document.getElementById('clickwheel')
    const rect = wheel?.getBoundingClientRect()

    if (!rect) return { x: 0, y: 0 }
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
  }, [])

  const handleClickWheelScroll = useCallback(() => {
    let prevTheta = 0
    return (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isMouseDown) return

      const thetaCurrent = Math.atan2(
        event.clientY - centerPoint.y,
        event.clientX - centerPoint.x
      )
      let deltaTheta = thetaCurrent - prevTheta

      deltaTheta = deltaTheta > Math.PI ? deltaTheta - 2 * Math.PI : deltaTheta
      deltaTheta = deltaTheta < -Math.PI ? deltaTheta + 2 * Math.PI : deltaTheta

      if (Math.abs(deltaTheta) > 0.01) {
        //avoiding jitter
        console.log(deltaTheta)

        setDirection(deltaTheta > 0 ? Directions.FORWARD : Directions.BACKWARD)
        if (deltaTheta > 0) {
          setCount(prev => prev + 1)
        } else {
          setCount(prev => prev - 1)
        }
      }
      prevTheta = thetaCurrent
    }
  }, [isMouseDown, centerPoint])

  const throttledMouseMove = useMemo(
    () => throttle(handleClickWheelScroll(), 100),
    [handleClickWheelScroll]
  )

  useEffect(() => {
    return () => {
      throttledMouseMove.cancel()
    }
  }, [throttledMouseMove])

  return (
    <div className='flex-1 flex flex-col items-center'>
      {direction ? 'backward' : 'forward'} {count}
      <div
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onTouchStart={() => setIsMouseDown(true)}
        onTouchEnd={() => setIsMouseDown(false)}
        onMouseMove={throttledMouseMove}
        // onTouchMove={throttledTouchMove}
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
