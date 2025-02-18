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
  boxmesh2.position.set(-10, 8, 0);
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
  //the perfect circle is called as eucledian distance
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

  //subtracting adding and multipication box1 and box2 and getting position
  const box3 = new THREE.BoxGeometry(1,1,1)
  const box3material = new THREE.MeshBasicMaterial({color:'pink'})
  const box3mesh = new THREE.Mesh(box3,box3material)
  const newPostionbysubb1b2=boxmesh.position.clone().sub(boxmesh2.position.clone())
  // box3mesh.position.set(newPostionbysubb1b2.x,newPostionbysubb1b2.y,newPostionbysubb1b2.z)
  scene.add(box3mesh)



//dot product why it is required
// Dot Product Calculation
// This formula computes the dot product of two 2D position vectors (boxmesh.position and boxmesh2.position).
// If the vectors point in the same direction, the dot product is positive.
// If they are perpendicular, the dot product is zero.
// If they are opposite, the dot product is negative.
const dotProduct = (boxmesh.position.x * boxmesh2.position.x) + (boxmesh.position.y * boxmesh2.position.y)
console.log(dotProduct)
box3mesh.position.multiplyScalar(dotProduct)

//scalar projection when we notmalize the dot product and 
// Scalar Projection and Normalization
// A scalar projection is when we normalize one vector and then project another onto it: 
// If we normalize boxmesh2.position before taking the dot product:

const normalizedB = boxmesh2.position.clone().normalize();
const scalarProjection = boxmesh.position.dot(normalizedB);
console.log(scalarProjection)
// This projects boxmesh onto boxmesh2 along its unit direction.
// Useful for:
// Finding the alignment of vectors.
// Determining how much one object moves along another’s direction.
// When Do We Need This?
// Physics and Motion → Calculating force or movement in a specific direction.
// Lighting & Shading → Dot product is used in Phong shading to determine brightness based on the light direction.
// Collision Detection → Checking how much one object's velocity aligns with another's direction.
// Projection & Scaling → Helps in vector decomposition, mapping motion onto an axis.
// Let me know if you need more clarity! 🚀


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
