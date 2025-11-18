import './App.css'
import Container from './components/Container'

function App() {
  return (
    <div className='min-h-screen flex'>
      <Container className='p-5 flex flex-col gap-5 rounded-2xl'>
        <div className='w-[300px] h-[300px] mx-auto border-8 border-white rounded-2xl'>
          <img src="./images/currents-cover.jpg" alt="album cover" className='w-full max-h-[300px] rounded-[8px]' />
        </div>
        <div className='w-[300px] h-[300px] bg-blue-400 rounded-full mx-auto my-auto flex'>
          <div className='w-[150px] h-[150px] border border-gray-500 rounded-full mx-auto my-auto'></div>
        </div>
      </Container>
    </div>
  )
}

export default App
