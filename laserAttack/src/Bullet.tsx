import React, { useState, useRef } from "react";
import { Object3D } from "three";
import { useCommonStore } from "./store/commonStore";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Bullet = () => {
  const bulletRefo = useRef<Object3D>(null!);
  const directionRefo = useRef(new THREE.Vector3());
  const { setBulletRef, attackEvent, setDirectionRef, bulletRef, directionRef } = useCommonStore();
  const [points, setPoints] = useState<THREE.Vector3[]>([]); // Store points for the line
  const lineRef = useRef<SVGLineElement>(null!); // Ref for the line object

  useFrame((state) => {
    if (attackEvent) {
      if (directionRef.lengthSq() === 0) {
        state.camera.getWorldDirection(directionRef);
      }
    }

    if (bulletRef?.position) {
      // Update the bullet's position
      bulletRef.position.addScaledVector(directionRef, 0.8);

      // Add the new point to the points array
      setPoints((prevPoints) => [...prevPoints, bulletRef.position.clone()]);

      // Update the line geometry with the new points
      if (lineRef.current) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        //@ts-ignore
        lineRef.current.geometry = lineGeometry;
      }
    }
  });

  React.useEffect(() => {
    bulletRefo.current && setBulletRef(bulletRefo.current);
    directionRefo.current && setDirectionRef(directionRefo.current);
  }, []);

  return (
    <>
      {/* Bullet mesh */}
      <mesh ref={bulletRefo} position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 100]} />
        <meshPhysicalMaterial color="white" roughness={0} metalness={1} />
      </mesh>

      {/* Line to follow the bullet's path */}
      <line ref={lineRef}>
        <lineBasicMaterial color="red"/>
      </line>
    </>
  );
};

export default Bullet;