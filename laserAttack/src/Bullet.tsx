const Bullet = () => {
  return (
    <mesh>
        <sphereGeometry args={[1,100]}/>
        <meshBasicMaterial color={'blue'}/>
    </mesh>
  )
}

export default Bullet
