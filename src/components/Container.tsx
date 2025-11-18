import { cn } from '@/lib/utils'
import type { FC, ReactNode } from 'react'

const Container: FC<{ className?: string; children: ReactNode }> = ({ className, children }) => {
  return (
    <div className={cn('max-w-[400px] max-h-[840px] w-full h-auto mx-auto my-auto bg-red-400', className)}>
      {children}
    </div>
  )
}

export default Container
