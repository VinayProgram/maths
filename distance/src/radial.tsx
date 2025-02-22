import React from "react";
import * as math from 'mathjs'
import * as THREE from "three";
const Radial = () => {
  const canvas = React.useRef<HTMLDivElement | null>(null);
  const scene = new THREE.Scene();
  const render = new THREE.WebGLRenderer();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  render.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 50;

  const cube = new THREE.BoxGeometry(1,1,1)
  const cubeMaterial = new THREE.MeshBasicMaterial({color:"red"})
  const meshCube = new THREE.Mesh(cube,cubeMaterial)
  scene.add(meshCube)

  const human = new THREE.CircleGeometry(2,100)
  const humanMat = new THREE.MeshBasicMaterial({color:'peach'})
  const humanmesh = new THREE.Mesh(human,humanMat)
  humanmesh.position.set(100,100,0)

  scene.add(humanmesh)

  const distanceBetweenHumanandCube = math.distance([...humanmesh.position.toArray()],[...meshCube.position.toArray()])
  console.log(distanceBetweenHumanandCube)

  if(Number(distanceBetweenHumanandCube)<=2){
    humanmesh.material.color.set('blue')
  }

   React.useEffect(() => {
    function animate() {
      // Move the human towards the cube (Example: Linear movement)
      if (humanmesh.position.x > meshCube.position.x) {
        humanmesh.position.x -= 0.05; // Move left
      }
      if (humanmesh.position.y > meshCube.position.y) {
        humanmesh.position.y -= 0.05; // Move down
      }

      // Calculate Distance
      const distance =eucDistance(meshCube.position,humanmesh.position)
      console.log(distance)
      // Change color if close enough
      if (distance <= 10) {
        humanmesh.material.color.set("blue");
      }

      render.render(scene, camera);
    }

    render.setAnimationLoop(animate);
    canvas.current?.appendChild(render.domElement);
  }, []);


  return <div ref={canvas}></div>;
};

const eucDistance = (v1: THREE.Vector3, v2: THREE.Vector3): number => {
    return Math.sqrt(
        Math.pow(v2.x - v1.x, 2) +
        Math.pow(v2.y - v1.y, 2) +
        Math.pow(v2.z - v1.z, 2)
    );
};
export default Radial;
