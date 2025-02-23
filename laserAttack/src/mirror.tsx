import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { useCommonStore } from "./store/commonStore";

const Mirror = () => {
  const mirrors = React.useRef<(THREE.Mesh | null)[]>([]); // Properly initialize as an array
  const BulletRef = useCommonStore((s) => s.bulletRef);

  useFrame(() => {
    if (BulletRef) { // Removed `&& false`
      const bulletPos = BulletRef.position;

      mirrors.current.forEach((mirror, i) => {
        if (!mirror) return;

        const mirrorPos = mirror.position;
        const distance = bulletPos.distanceTo(mirrorPos);

        if (distance < 3) {
          console.log('hitted '+ i)
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
