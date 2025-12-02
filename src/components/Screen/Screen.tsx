export const Screen = () => {
  const items = [
    { id: 1, name: 'Cover FLow' },
    { id: 1, name: 'Music' },
    { id: 1, name: 'Settings' },
    { id: 1, name: 'About' },
    { id: 1, name: 'Sign in' }
  ]

  return (
    <div className='flex-1'>
      <div className='w-full aspect-square mx-auto p-2 bg-white border-white rounded-[10px]'>
        <div className='w-full h-full bg-gray-200 flex flex-col'>
          <ul>
            {items.map(item => (
              <button key={item.id} className='p-4 border-b border-gray-300 focus:bg-blue-400 w-full text-left' data-menu-item>
                {item.name}
              </button>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
