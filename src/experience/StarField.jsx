import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seeded(index) {
  const value = Math.sin(index * 91.733) * 43758.5453;
  return value - Math.floor(value);
}

export default function StarField({ reducedMotion }) {
  const pointsRef = useRef();
  const materialRef = useRef();
  const [positions, sizes] = useMemo(() => {
    const count = 2200;
    const coords = new Float32Array(count * 3);
    const values = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      const radius = 45 + seeded(index + 1) * 75;
      const theta = seeded(index + 5) * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.lerp(-0.15, 1, seeded(index + 9)));
      coords[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      coords[index * 3 + 1] = Math.abs(radius * Math.cos(phi)) - 2;
      coords[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 12;
      values[index] = 0.35 + seeded(index + 17) * 0.9;
    }
    return [coords, values];
  }, []);

  useFrame((state) => {
    if (!reducedMotion && pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.002;
      if (materialRef.current) {
        const shimmer = Math.sin(state.clock.elapsedTime * 1.35) * 0.5 + 0.5;
        materialRef.current.opacity = 0.62 + shimmer * 0.25;
        materialRef.current.size = 0.145 + shimmer * 0.035;
      }
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial ref={materialRef} color="#e8f1ff" size={0.17} sizeAttenuation transparent opacity={0.82} depthWrite={false} fog={false} />
    </points>
  );
}
