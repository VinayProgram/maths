const Mirror = () => {
  return (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <mesh
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
