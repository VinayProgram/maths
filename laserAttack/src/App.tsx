import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Mirror from './mirror'
import Bullet from './Bullet'
import { useCommonStore } from './store/commonStore'

const App = () => {
  const {setAttackEvent}= useCommonStore()
  return (
    <>
    <Canvas style={{height:'100vh'}}>
      <Environment preset='night'/>
      <Mirror/>
   
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Bullet/>
      <OrbitControls/>
    </Canvas>
    <button onClick={()=>{
      setAttackEvent(true);
      setTimeout(() => {
      setAttackEvent(false)
    }, 100);}}>shoot</button>
    </>
  )
}

export default App
