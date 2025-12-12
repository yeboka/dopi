import './App.css'
import Container from './components/Container'
import { Controls } from './components/Controls'
import { Screen } from './components/Screen'

function App() {
  return (
    <div className='box-border min-h-screen flex'>
      <Container>
        <Screen />
        <Controls />
      </Container>
    </div>
  )
}

export default App
