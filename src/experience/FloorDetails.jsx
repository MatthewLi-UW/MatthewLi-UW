import { useMemo } from "react";

export default function FloorDetails({ visible }) {
  const centerZ = -10;
  const ticks = useMemo(() => Array.from({ length: 24 }, (_, index) => {
    const angle = index * (Math.PI * 2 / 24);
    const radius = 3.88;
    return {
      angle,
      cardinal: index % 6 === 0,
      position: [Math.sin(angle) * radius, 0.012, -10 + Math.cos(angle) * radius],
    };
  }), []);

  if (!visible) return null;

  return (
    <group>
      <mesh position={[0, 0.002, centerZ]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[2.7, 2.74, 96]} />
        <meshBasicMaterial color="#8198ab" transparent opacity={0.3} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.004, centerZ]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[4.15, 4.185, 96]} />
        <meshBasicMaterial color="#8198ab" transparent opacity={0.2} depthWrite={false} />
      </mesh>
      {ticks.map(({ angle, cardinal, position }, index) => (
        <mesh key={index} position={position} rotation-y={angle}>
          <boxGeometry args={[cardinal ? 0.035 : 0.018, 0.008, cardinal ? 0.34 : 0.2]} />
          <meshBasicMaterial color={cardinal ? "#c5ad7b" : "#748b9f"} transparent opacity={cardinal ? 0.42 : 0.2} />
        </mesh>
      ))}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle) => (
        <mesh key={angle} position={[Math.sin(angle) * 4.75, 0.035, centerZ + Math.cos(angle) * 4.75]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#d7a85b" transparent opacity={0.72} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
