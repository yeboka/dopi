import { cn } from '@/lib/utils'
import { useMenu } from '@/store/menuStore'

const items = [
  { id: 1, name: 'Cover FLow' },
  { id: 2, name: 'Music' },
  { id: 3, name: 'Settings' },
  { id: 4, name: 'About' },
  { id: 5, name: 'Sign in' }
]

export const Screen = () => {
  const focusedIndex = useMenu(state => state.focusedIndex)

  return (
    <div className='flex-1'>
      <div className='w-full aspect-square mx-auto p-2 bg-gray-600 rounded-[10px]'>
        <div className='w-full h-full bg-gray-200 flex flex-col'>
          <div className={'flex items-center justify-between px-4 py-1 text-white font-bold bg-linear-to-b from-[#8C8C8C80] from-5% via-[#C8C8C8] via-15% to-[#8C8C8C] to-100%'}>
            <h1>dopi</h1>
          </div>
          <ul>
            {items.map((item, i) => (
              <li
                key={item.id}
                className={cn(
                  'px-4 py-1  w-full text-left',
                  focusedIndex === i && 'bg-linear-to-b from-[#4D39FF80] from-5% via-[#A99FFF] via-15% to-[#4D39FFC9] to-100% text-white'
                )}
                data-menu-item
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
