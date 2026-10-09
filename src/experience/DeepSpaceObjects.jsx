import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SKY_ORIGIN } from "./skyConstants";

function seeded(index) {
  const value = Math.sin(index * 73.173) * 43758.5453;
  return value - Math.floor(value);
}

function SpiralGalaxy({ direction, color, scale = 1, speed = 0.018, offset = 0, reducedMotion }) {
  const groupRef = useRef();
  const positions = useMemo(() => {
    const count = 460;
    const coordinates = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = Math.pow(seeded(index + offset), 0.62) * 4.4;
      const arm = index % 3;
      const angle = arm * (Math.PI * 2 / 3) + radius * 1.45 + (seeded(index + offset + 9) - 0.5) * 0.58;
      coordinates[index * 3] = Math.cos(angle) * radius;
      coordinates[index * 3 + 1] = Math.sin(angle) * radius * 0.58;
      coordinates[index * 3 + 2] = (seeded(index + offset + 21) - 0.5) * 0.3;
    }

    return coordinates;
  }, [offset]);
  const position = useMemo(() => {
    const vector = new THREE.Vector3(...direction).normalize();
    return SKY_ORIGIN.clone().add(vector.multiplyScalar(76));
  }, [direction]);

  useLayoutEffect(() => {
    groupRef.current?.lookAt(SKY_ORIGIN);
  }, []);

  useFrame((_, delta) => {
    if (!reducedMotion && groupRef.current) groupRef.current.rotateZ(delta * speed);
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.13}
          sizeAttenuation
          transparent
          opacity={0.42}
          depthWrite={false}
          fog={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh>
        <circleGeometry args={[0.75, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

export default function DeepSpaceObjects({ visible, reducedMotion }) {
  if (!visible) return null;

  return (
    <group>
      <SpiralGalaxy direction={[0.24, 0.45, -1]} color="#9aabd8" scale={0.92} speed={0.016} offset={41} reducedMotion={reducedMotion} />
      <SpiralGalaxy direction={[-0.35, 0.35, -1]} color="#b5a4c9" scale={0.68} speed={-0.021} offset={163} reducedMotion={reducedMotion} />
    </group>
  );
}
