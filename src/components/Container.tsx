import { cn } from '@/lib/utils'
import type { FC, ReactNode } from 'react'

const Container: FC<{ className?: string; children: ReactNode }> = ({
  className,
  children,
  ...props
}) => {
  const useAgent = typeof navigator !== 'undefined' ? navigator.userAgent : null
  const isMobile = useAgent ? /Mobi|Android|iPhone/i.test(useAgent) : false

  return (
    <div
      className={cn(
        'w-full mx-auto p-9 flex-1 flex flex-col inset-shadow-lg  relative overflow-clip bg-wheel bg-center',
        !isMobile &&
          'max-w-[420px] rounded-[46px] shadow-soft-xl aspect-[1/2] w-full h-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
