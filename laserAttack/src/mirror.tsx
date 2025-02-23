import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { useCommonStore } from "./store/commonStore";

const Mirror = () => {
  const mirrors = React.useRef<(THREE.Mesh | null)[]>([]); // Properly initialize as an array
  const BulletRef = useCommonStore((s) => s.bulletRef);
  const directionRef = useCommonStore((s) => s.directionRef);

  useFrame(() => {
    if (BulletRef && directionRef) {
      const bulletPos = BulletRef.position;

      mirrors.current.forEach((mirror, i) => {
        if (!mirror) return;

        const mirrorPos = mirror.position;
        const distance = bulletPos.distanceTo(mirrorPos);
        console.log(mirrorPos,bulletPos)
        if (distance < 3) {
          const mirrorNormal = mirror.position.clone().normalize();
          const incident = directionRef.clone().normalize();
          
          // Calculate the reflection vector
          const dot = incident.dot(mirrorNormal);
          const reflection = incident.clone().sub(mirrorNormal.clone().multiplyScalar(2 * dot));

          // Update the bullet's direction
          directionRef.copy(reflection);

          console.log(`hitted ${i}`);
        }
      });
    }
  });

  return (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <mesh
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
          <meshBasicMaterial color={"grey"} />
        </mesh>
      ))}
    </>
  );
};

export default Mirror;
