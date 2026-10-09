import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { SKY_ORIGIN } from "./skyConstants";

function sketchConnection(stars, from, to, index, direction = 1) {
  const [fromX, fromY] = stars[from];
  const [toX, toY] = stars[to];
  const deltaX = toX - fromX;
  const deltaY = toY - fromY;
  const length = Math.hypot(deltaX, deltaY) || 1;
  const bend = (0.018 + (index % 3) * 0.008) * direction;
  const middleX = (fromX + toX) * 0.5 - (deltaY / length) * bend;
  const middleY = (fromY + toY) * 0.5 + (deltaX / length) * bend;

  return [
    [fromX * 7, fromY * 7, 0],
    [middleX * 7, middleY * 7, direction * 0.006],
    [toX * 7, toY * 7, 0],
  ];
}

export default function Constellation({ data, alignmentRef, visible }) {
  const groupRef = useRef();
  const starRefs = useRef([]);
  const lineRefs = useRef([]);
  const echoLineRefs = useRef([]);
  const starTexture = useTexture(`${import.meta.env.BASE_URL}images/observatory/handpainted-star-v2.png`);
  starTexture.colorSpace = THREE.SRGBColorSpace;
  const position = useMemo(() => {
    const direction = new THREE.Vector3(...data.direction).normalize();
    return SKY_ORIGIN.clone().add(direction.multiplyScalar(68));
  }, [data.direction]);

  useLayoutEffect(() => {
    groupRef.current?.lookAt(SKY_ORIGIN);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const alignment = visible ? alignmentRef.current[data.id] ?? 0 : 0;
    const reveal = THREE.MathUtils.smoothstep(alignment, 0.958, 0.99);
    const locked = alignment > 0.985;
    const pulse = locked ? 1 + Math.sin(state.clock.elapsedTime * 2.8) * 0.07 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(pulse, pulse, pulse), 1 - Math.exp(-5 * delta));

    starRefs.current.forEach((material, index) => {
      if (!material) return;
      const shimmer = 0.5 + Math.sin(state.clock.elapsedTime * (1.45 + (index % 4) * 0.19) + index * 1.73) * 0.5;
      const restingOpacity = index % 3 === 0 ? 0.76 + shimmer * 0.22 : 0.68 + shimmer * 0.17;
      material.opacity = visible ? restingOpacity + reveal * (1 - restingOpacity) : 0;
    });
    lineRefs.current.forEach((line) => {
      if (!line?.material) return;
      line.material.opacity = visible ? 0.095 + reveal * (locked ? 0.825 : 0.47) : 0;
      line.material.color.set(locked ? "#d8cdb6" : "#93aab1");
    });
    echoLineRefs.current.forEach((line) => {
      if (!line?.material) return;
      line.material.opacity = visible ? 0.035 + reveal * (locked ? 0.277 : 0.14) : 0;
      line.material.color.set(locked ? "#eadfc5" : "#738eaa");
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {data.connections.map(([from, to], index) => (
        <group key={`${from}-${to}`}>
          <Line
            ref={(node) => { lineRefs.current[index] = node; }}
            points={sketchConnection(data.stars, from, to, index)}
            color="#93aab1"
            lineWidth={0.72}
            transparent
            opacity={0}
            depthWrite={false}
          />
          <Line
            ref={(node) => { echoLineRefs.current[index] = node; }}
            points={sketchConnection(data.stars, from, to, index, -0.7)}
            color="#738eaa"
            lineWidth={0.36}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </group>
      ))}
      {data.stars.map(([x, y], index) => (
        <sprite
          key={index}
          position={[x * 7, y * 7, 0]}
          scale={index % 3 === 0 ? [0.96, 0.96, 1] : [0.68, 0.68, 1]}
        >
          <spriteMaterial
            ref={(node) => { starRefs.current[index] = node; }}
            map={starTexture}
            color="#fff8e7"
            rotation={index * 0.31}
            transparent
            opacity={0}
            alphaTest={0.02}
            depthWrite={false}
            fog={false}
            toneMapped={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}
