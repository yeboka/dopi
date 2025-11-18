import { cn } from '@/lib/utils'
import type { FC, ReactNode } from 'react'

const Container: FC<{ className?: string; children: ReactNode }> = ({ className, children }) => {
  const useAgent = typeof navigator !== 'undefined' ? navigator.userAgent : null
  const isMobile = useAgent ? /Mobi|Android|iPhone/i.test(useAgent) : false
  console.log('isMobile:', isMobile)
  console.log('userAgent:', useAgent)
  return (
    <div
      className={cn('w-full h-screen mx-auto my-auto bg-red-400 p-5', !isMobile && 'max-w-[390px] max-h-[700px] rounded-2xl', className)}
    >
      {children}
    </div>
  )
}

export default Container
