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
      <div className='w-full aspect-square mx-auto p-2 bg-white border-white rounded-[10px]'>
        <div className='w-full h-full bg-gray-200 flex flex-col'>
          <ul>
            {items.map((item, i) => (
              <button
                key={item.id}
                className={cn(
                  'p-4 border-b border-gray-300 focus:bg-blue-400 w-full text-left',
                  focusedIndex === i && 'bg-blue-400'
                )}
                data-menu-item
              >
                {item.name}
              </button>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
