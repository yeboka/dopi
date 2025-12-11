import { cn } from '@/lib/utils'
import type { FC, ReactNode } from 'react'

const Container: FC<{ className?: string; children: ReactNode }> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'w-full mx-auto p-9 flex-1 flex flex-col inset-shadow-lg  relative overflow-hidden',
        'bg-wheel bg-center xs:my-auto xs:max-w-[420px] xs:rounded-[46px] xs:shadow-soft-xl xs:aspect-1/2 xs:h-full xs:overflow-clip',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
