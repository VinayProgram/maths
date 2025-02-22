import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Mirror from './mirror'
import Bullet from './Bullet'

const App = () => {
  return (
    <Canvas style={{height:'100vh'}}>
      <Mirror/>
      <Bullet/>
      <OrbitControls/>
    </Canvas>
  )
}

export default App
