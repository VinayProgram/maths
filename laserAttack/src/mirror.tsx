import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { useCommonStore } from "./store/commonStore";

const Mirror = () => {
  const mirrors = React.useRef<(THREE.Mesh | null)[]>([]); // Properly initialize as an array
  const BulletRef = useCommonStore((s) => s.bulletRef);
  const directionRef = useCommonStore((s) => s.directionRef);
  // const d= useTexture('/')
  useFrame(() => {
    if (BulletRef && directionRef) {
      const bulletPos = BulletRef.position;

      const ray = new THREE.Raycaster(
        bulletPos,
        directionRef.clone().normalize(),
        0,
        1
      );
     

      const mirrorsArray = mirrors.current.filter((mirror) => mirror !== null);

      const intersects = ray.intersectObjects(mirrorsArray);

      if (intersects.length >= 1) {
        const mirrorNormal = intersects[0].object.position.clone().normalize();
        const incident = directionRef.clone().normalize();
        const dot = incident.dot(mirrorNormal);
       
          const reflection = incident
            .clone()
            .sub(mirrorNormal.clone().multiplyScalar(2 * dot));
          directionRef.copy(reflection);
        
      }
    }
  });

  return (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <mesh
          name={"Mirror-" + i}
          key={i} // Always add a key in array maps
          ref={(el) => {
            if (el) mirrors.current[i] = el; // Ensure non-null before assignment
          }}
          position={[
            Math.sin((i / 20) * Math.PI * 2) * 20,
            0,
            Math.cos((i / 20) * Math.PI * 2) * 20,
          ]}
          rotation={[0, Math.PI + (i / 20) * Math.PI * 2, 0]}
        >
          <boxGeometry args={[5, 10]} />
          <meshPhysicalMaterial metalness={1} roughness={0} emissive={3} />
        </mesh>
      ))}
    </>
  );
};

export default Mirror;
