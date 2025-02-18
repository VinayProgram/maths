import React from "react";
import * as THREE from "three";
import * as math from "mathjs";
const Distance = () => {
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
  camera.position.z = 20;

  const box = new THREE.BoxGeometry(5, 5);
  const material = new THREE.MeshBasicMaterial({ color: "orange" });
  const boxmesh = new THREE.Mesh(box, material);
  scene.add(boxmesh);

  const box2 = new THREE.BoxGeometry(5, 5);
  const material2 = new THREE.MeshBasicMaterial({ color: "green" });
  const boxmesh2 = new THREE.Mesh(box2, material2);
  scene.add(boxmesh2);

  //the intial position is 0 0 of both boxes and i
  // on the 3d axisi the position is 0 0  of both boxes and the direction is also 0

  //lets set the postion of first box at 10,10,0
  boxmesh.position.set(10, 10, 0);
  boxmesh2.position.set(-10, -3, 0);
  //lets calculate the distance from box1 to box2
  // to calculate distance we use euclidean methon where we take points
  //(0,0,0)-(10,10,0)
  //(0-10)+(0-10)+(0-0)
  //|10|,|10|
  //100+100
  //200 squareRoot
  //14.14 ditance
  const distance = math.distance(
    [...boxmesh.position.toArray()],
    [...boxmesh2.position.toArray()]
  );
  console.log(distance);

  //find the magnitude of the vector and find the unitVector magnitute

  const lineGeometry = new THREE.BufferGeometry().setFromPoints([
    boxmesh.position,
    boxmesh2.position,
  ]);
  const lineMaterial = new THREE.LineBasicMaterial({ color: "white" });
  const line = new THREE.Line(lineGeometry, lineMaterial);
  scene.add(line);

  const lineGeometryFromIntital = new THREE.BufferGeometry().setFromPoints([
    boxmesh.position,
    new THREE.Vector3(0, 0, 0),
  ]);
  const lineGeometryFromIntital2 = new THREE.BufferGeometry().setFromPoints([
    boxmesh2.position,
    new THREE.Vector3(0, 0, 0),
  ]);
  const lineMaterialIntial = new THREE.LineBasicMaterial({ color: "blue" });
  const lineIntial = new THREE.Line(
    lineGeometryFromIntital,
    lineMaterialIntial
  );
  const lineIntial2 = new THREE.Line(
    lineGeometryFromIntital2,
    lineMaterialIntial
  );
  scene.add(lineIntial);
  scene.add(lineIntial2);

  const center = new THREE.CircleGeometry(1, 100);
  const materialCenter = new THREE.MeshBasicMaterial({ color: "red" });
  scene.add(new THREE.Mesh(center, materialCenter));

  // Compute direction vector (unit vector from boxmesh2 to boxmesh)
  const direction = new THREE.Vector3()
    .subVectors(boxmesh.position, boxmesh2.position)
    .normalize();
  
  // Create an arrow helper to show direction
  const arrowHelper = new THREE.ArrowHelper(
    direction,
    boxmesh2.position,
    10,
    "yellow"
  );
  scene.add(arrowHelper);

  // Show the normalized vector from (0,0,0)
  const normalizedDirection = boxmesh.position.clone().normalize();
  const normalizedArrow = new THREE.ArrowHelper(
    normalizedDirection,
    new THREE.Vector3(0, 0, 0),
    5,
    "red"
  );
  scene.add(normalizedArrow);

  React.useEffect(() => {
    function animate() {
      render.render(scene, camera);
    }
    render.setAnimationLoop(animate);
    canvas.current?.appendChild(render.domElement);
  }, []);
  return <div ref={canvas}></div>;
};

export default Distance;
