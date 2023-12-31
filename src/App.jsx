import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Three } from './components'
import './App.css'

function App() {

  return (
    <Canvas id='three-canvas-container' shadows>
      <Suspense fallback={null}>
        <Three />
      </Suspense>
    </Canvas>
  )
}

export default App
