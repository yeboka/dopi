import { cn, getCurrentNode } from '@/lib/utils'
import { useMenu } from '@/store/menuStore'
import { Header } from './Header'

export const Screen = () => {
  const { selectedIndex, stack } = useMenu(state => state)

  const currentNode = getCurrentNode(stack)
  return (
    <div className='flex-1'>
      <div className='w-full aspect-square mx-auto p-2 bg-gray-600 rounded-[10px]'>
        <div className='w-full h-full bg-gray-200 flex flex-col'>
          <Header title={currentNode.title} />
          {(currentNode.type === 'menu' || currentNode.type === 'list') && (
            <ul>
              {currentNode.children?.map((item, i) => (
                <li
                  key={item.id}
                  className={cn(
                    'px-4 py-1  w-full text-left',
                    selectedIndex === i &&
                      'bg-linear-to-b from-[#4D39FF80] from-5% via-[#A99FFF] via-15% to-[#4D39FFC9] to-100% text-white'
                  )}
                  data-menu-item
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
          {currentNode.type === 'component' && currentNode.component}
        </div>
      </div>
    </div>
  )
}
