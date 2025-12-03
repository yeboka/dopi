import { Directions } from '@/shared/constants'
import { useMemo, useState } from 'react'
export type Point = { x: number; y: number }
export const Controls = () => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [direction, setDirection] = useState(Directions.FORWARD)
  const [a, setA] = useState<number>(0)
  const [b, setB] = useState<Point>({ x: 0, y: 0 })
  const [c, setC] = useState<Point>({ x: 0, y: 0 })

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

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown) return

    const result = Math.atan(
      (event.clientX - centerPoint.x) / (event.clientY - centerPoint.y)
    )
    console.log(result)
    if (result < a) {
      setDirection(Directions.FORWARD)
    } else if (result > a) {
      setDirection(Directions.BACKWARD)
    }
    setA(result)
  }

  return (
    <div className='flex-1 flex flex-col'>
      {direction ? 'backward' : 'forward'}
      <div
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onTouchStart={() => setIsMouseDown(true)}
        onTouchEnd={() => setIsMouseDown(false)}
        onMouseMove={handleMouseMove}
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
