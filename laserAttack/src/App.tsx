import { Environment, OrbitControls, useEnvironment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Mirror from './mirror'
import Bullet from './Bullet'
import { useCommonStore } from './store/commonStore'


const App = () => {
  const {setAttackEvent}= useCommonStore()

  return (
    <>
    <Canvas style={{height:'100vh'}}>
      <Environment preset='studio'/>
      <Mirror/>
      <ambientLight intensity={2} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      <Bullet/>
      <OrbitControls/>
    </Canvas>
    <button style={{position:'absolute' ,top:0}} onClick={()=>{
      setAttackEvent(true);
      setTimeout(() => {
      setAttackEvent(false)
    }, 100);}}>shoot</button>
    </>
  )
}

export default App
