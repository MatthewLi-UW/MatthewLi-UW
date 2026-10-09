export default function Field() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.03, 0]} receiveShadow>
      <planeGeometry args={[90, 90, 1, 1]} />
      <meshBasicMaterial color="#08111f" />
    </mesh>
  );
}
