import { cn } from '@/lib/utils'
import type { FC, ReactNode } from 'react'

const Container: FC<{ className?: string; children: ReactNode }> = ({ className, children, ...props }) => {
  const useAgent = typeof navigator !== 'undefined' ? navigator.userAgent : null
  const isMobile = useAgent ? /Mobi|Android|iPhone/i.test(useAgent) : false

  return (
    <div
      className={cn(
        'w-full h-screen mx-auto my-auto p-9 flex flex-col shadow-soft-xl relative overflow-clip bg-wheel bg-ipod-aluminium-cover bg-cover bg-center',
        !isMobile && 'max-w-[420px] max-h-[839px] rounded-[46px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
