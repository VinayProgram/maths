import React from "react"
import { Object3D } from "three"
import { useCommonStore } from "./store/commonStore"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'

const Bullet = () => {
    const bulletRefo = React.createRef<Object3D>()
    const {setBulletRef} = useCommonStore()

    useFrame((state)=>{
        if(bulletRefo.current?.position){
            const direction = new THREE.Vector3();
            state.camera.getWorldDirection(direction) 
            // console.log(direction)
            bulletRefo.current.position.addScaledVector(direction, 0.1); //
         }    
    })
    
    React.useEffect(()=>{bulletRefo.current&&setBulletRef(bulletRefo.current)},[])
    
    return (
    <mesh ref={bulletRefo}>
        <sphereGeometry args={[1,100]}/>
        <meshBasicMaterial color={'blue'}/>
    </mesh>
  )
}

export default Bullet
