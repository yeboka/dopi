import { Directions } from '@/shared/constants'
import { useState } from 'react'
export type Point = { x: number; y: number }
export const Controls = () => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [direction, setDirection] = useState(Directions.FORWARD)
  const [a, setA] = useState<Point>({ x: 0, y: 0 })
  const [b, setB] = useState<Point>({ x: 0, y: 0 })
  const [c, setC] = useState<Point>({ x: 0, y: 0 })

  // const handlePlayClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   navigator.vibrate(20)
  // }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown) return

    setA(b)
    setB(c)
    setC({ x: event.clientX, y: event.clientY })

    const dir = calculateDirection(a, b, c)
    console.log(event.clientX, event.clientY, dir, a, b, c)
    setDirection(dir)
  }

  const calculateDirection = (a: Point, b: Point, c: Point) => {
    const u: Point = { x: b.x - a.x, y: b.y - a.y }
    const v: Point = { x: c.x - b.x, y: c.y - b.y }

    const uv = u.x * v.y - u.y * v.x

    if (uv <= 0) {
      return Directions.FORWARD
    } else {
      return Directions.BACKWARD
    }
  }

  return (
    <div className='flex-1 flex flex-col'>
      {direction ? 'backward' : 'forward'}
      <div
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseMove={handleMouseMove}
        className='w-[300px] aspect-square bg-white rounded-full mx-auto my-auto flex'
      >
        <button
          className='w-[125px] aspect-square border border-gray-500 rounded-full mx-auto my-auto'
          // onClick={handlePlayClick}
        ></button>
      </div>
    </div>
  )
}
