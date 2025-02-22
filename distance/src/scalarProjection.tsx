import React from "react";
import * as THREE from "three";
import * as math from 'mathjs'
import { OrbitControls } from "three-stdlib";
import { color } from "three/tsl";
const scalarProjection = () => {
  const canvasRef = React.createRef<HTMLDivElement | null>();
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
  const box = new THREE.BoxGeometry(5, 5,5);
  const material = new THREE.MeshBasicMaterial({ color: "orange" });
  const boxmesh = new THREE.Mesh(box, material);
  scene.add(boxmesh);
  boxmesh.position.set(20,-17,3)
  const box2 = new THREE.BoxGeometry(5, 5,5);
  const material2 = new THREE.MeshBasicMaterial({ color: "green" });
  const boxmesh2 = new THREE.Mesh(box2, material2);
  scene.add(boxmesh2);

  boxmesh2.position.set(80, 30, 10);



    //calculating the distnace between box1 and box2
    const distanceBetweenBoxes = math.distance(boxmesh.position.toArray(),boxmesh2.position.toArray())
    console.log(distanceBetweenBoxes)

    //visulizing the distance

    const lineDistanceGeom = new THREE.BufferGeometry().setFromPoints([boxmesh.position,boxmesh2.position])
    const lineMaterial = new THREE.LineBasicMaterial({color:'red'})
    const linemesh = new THREE.Line(lineDistanceGeom,lineMaterial)
    scene.add(linemesh)

    //calculting the dot product between two vectors
    const dotProduct= boxmesh2.position.clone().normalize().dot(boxmesh.position.clone().normalize())
    console.log(dotProduct)
    const andgle = math.acos(dotProduct)
    console.log(andgle)

    //calcute the scalar projection
    const scalarProjection= boxmesh2.position.clone().normalize().dot(boxmesh.position)
    console.log(scalarProjection)

    const scalarVectorPRojection = boxmesh2.position.clone().normalize().multiplyScalar(scalarProjection)
    console.log(scalarVectorPRojection)

    const CircleGeometry= new THREE.SphereGeometry(3,12)
    const materialCircle = new THREE.MeshBasicMaterial({color:'red'})
    const circleMesh=new THREE.Mesh(CircleGeometry,materialCircle)
    circleMesh.position.copy(scalarVectorPRojection)
    scene.add(circleMesh)






  new OrbitControls(camera,render.domElement)
  React.useEffect(() => {
    function animate() {
      render.render(scene, camera);
    }
    render.setAnimationLoop(animate);
    canvasRef.current?.appendChild(render.domElement);
  }, []);
  return <div ref={canvasRef}></div>;
};

export default scalarProjection;
