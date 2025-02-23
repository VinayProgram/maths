import React from "react";
import { Object3D } from "three";
import { useCommonStore } from "./store/commonStore";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Bullet = () => {
  const bulletRefo = React.useRef<Object3D>(null!);
  const directionRefo = React.useRef(new THREE.Vector3());
  const { setBulletRef, attackEvent,setDirectionRef,bulletRef,directionRef } = useCommonStore();

  useFrame((state) => {
    if (attackEvent) {
      if (directionRef.lengthSq() === 0) {
        state.camera.getWorldDirection(directionRef);
      }
    }

    if (bulletRef?.position) {
      bulletRef.position.addScaledVector(directionRef, 0.1);
    }
  });

  React.useEffect(() => {
    bulletRefo.current && setBulletRef(bulletRefo.current);
    directionRefo.current&& setDirectionRef(directionRefo.current)
  }, []);

  return (
    <mesh ref={bulletRefo}>
      <sphereGeometry args={[1, 100]} />
      <meshBasicMaterial color={"blue"} />
    </mesh>
  );
};

export default Bullet;
