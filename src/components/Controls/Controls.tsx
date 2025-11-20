export const Controls = () => {
  const handlePlayClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Play button clicked', event.target)
    navigator.vibrate(20)
  }

  return (
    <div className='flex-1 flex'>
      <div className='w-full aspect-square bg-white rounded-full mx-auto my-auto flex'>
        <button
          className='w-[150px] h-[150px]  border border-gray-500 rounded-full mx-auto my-auto'
          onClick={handlePlayClick}
        ></button>
      </div>
    </div>
  )
}
