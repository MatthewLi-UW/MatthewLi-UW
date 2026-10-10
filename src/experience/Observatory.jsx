import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Observatory({ mode, onEnter }) {
  const [hovered, setHovered] = useState(false);
  const domeMaterialRef = useRef();
  const windowMaterialRef = useRef();
  const doorMaterialRef = useRef();
  const slitMaterialRef = useRef();
  const entryMaterialRef = useRef();
  const silhouetteMaterialRef = useRef();
  const warmLightRef = useRef();
  const isField = mode === "field";

  useFrame(({ camera }) => {
    const exteriorFade = mode === "field"
      ? 1
      : mode === "entering"
        ? THREE.MathUtils.smoothstep(camera.position.z, 4.4, 12)
        : 0;
    const facadeFade = mode === "field"
      ? 1
      : mode === "entering"
        ? THREE.MathUtils.smoothstep(camera.position.z, 7.5, 14)
        : 0;

    if (domeMaterialRef.current) {
      domeMaterialRef.current.opacity = 0.15 + exteriorFade * 0.85;
      domeMaterialRef.current.depthWrite = exteriorFade > 0.72;
    }
    if (windowMaterialRef.current) windowMaterialRef.current.opacity = facadeFade;
    if (doorMaterialRef.current) doorMaterialRef.current.opacity = facadeFade;
    if (slitMaterialRef.current) slitMaterialRef.current.opacity = facadeFade;
    if (entryMaterialRef.current) entryMaterialRef.current.opacity = facadeFade;
    if (silhouetteMaterialRef.current) silhouetteMaterialRef.current.opacity = facadeFade;
    if (warmLightRef.current) warmLightRef.current.intensity = 5.2 * facadeFade;
  });

  const handleEnter = (event) => {
    event.stopPropagation();
    if (isField) onEnter();
  };

  return (
    <group
      onClick={handleEnter}
      onPointerEnter={(event) => {
        event.stopPropagation();
        if (isField) {
          setHovered(true);
        }
      }}
      onPointerLeave={() => {
        setHovered(false);
      }}
    >
      <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[4.15, 4.35, 1.25, 48, 1, true]} />
        <meshStandardMaterial color={hovered ? "#627a9b" : "#526986"} roughness={0.72} metalness={0.32} />
      </mesh>
      <mesh position={[0, 1.28, 0]}>
        <cylinderGeometry args={[4.48, 4.48, 0.22, 48, 1, true]} />
        <meshStandardMaterial color="#7188a7" metalness={0.48} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[4.62, 4.62, 0.16, 48, 1, true]} />
        <meshStandardMaterial color="#334967" metalness={0.38} roughness={0.55} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[4.15, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          ref={domeMaterialRef}
          color={hovered ? "#7894ba" : "#667fa3"}
          roughness={0.48}
          metalness={0.52}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
          depthWrite
        />
      </mesh>
      <mesh position={[0, 3.4, 3.84]} rotation={[-0.28, 0, 0]}>
        <boxGeometry args={[1.05, 3.35, 0.16]} />
        <meshStandardMaterial ref={slitMaterialRef} color="#10182a" roughness={0.8} transparent opacity={1} />
      </mesh>
      <mesh position={[0, 0.9, 4.15]}>
        <boxGeometry args={[1.45, 1.8, 0.18]} />
        <meshStandardMaterial ref={entryMaterialRef} color="#263b59" roughness={0.72} transparent opacity={1} />
      </mesh>
      {mode !== "observatory" && (
        <>
          <mesh position={[0, 3.45, 3.94]} rotation={[-0.28, 0, 0]}>
            <planeGeometry args={[0.62, 2.42]} />
            <meshStandardMaterial ref={windowMaterialRef} color="#f2ad5d" emissive="#df7225" emissiveIntensity={1.7} transparent opacity={1} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0.88, 4.26]}>
            <planeGeometry args={[0.7, 1.35]} />
            <meshStandardMaterial ref={doorMaterialRef} color="#efa456" emissive="#d96d25" emissiveIntensity={1.45} transparent opacity={1} toneMapped={false} />
          </mesh>
          <mesh position={[0.02, 3.4, 4.06]} rotation={[Math.PI / 2 - 0.28, 0, -0.32]}>
            <cylinderGeometry args={[0.055, 0.08, 1.22, 10]} />
            <meshBasicMaterial ref={silhouetteMaterialRef} color="#332318" transparent opacity={1} />
          </mesh>
          <pointLight ref={warmLightRef} position={[0, 2.15, 4.6]} intensity={5.2} distance={7} color="#ff9e45" />
        </>
      )}
      <pointLight position={[0, 2.6, 2.6]} intensity={mode === "observatory" ? 4.2 : 0.7} distance={10} color="#a9c9ed" />
    </group>
  );
}
