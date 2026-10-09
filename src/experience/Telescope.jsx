import { useMemo, useRef } from "react";
import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useTelescopeAim from "../hooks/useTelescopeAim";

const outline = "#020203";
const outlineEcho = "#111218";
const ARCHITECTURE_WIDTH = 1672;
const ARCHITECTURE_HEIGHT = 941;
const PEDESTAL_SURFACE_X = 821;
const PEDESTAL_SURFACE_Y = 798;
const TELESCOPE_Z = -6.4;
const TELESCOPE_SCALE = 0.5;
const SUPPORT_FOOT_Y = -0.42;

function BrassMaterial({ color = "#b77932", texture }) {
  return (
    <meshStandardMaterial
      map={texture}
      color={color}
      emissive="#0b1726"
      emissiveIntensity={0.09}
      metalness={0.08}
      roughness={0.94}
    />
  );
}

function InkedEdges({ threshold = 16 }) {
  return (
    <>
      <Edges threshold={threshold} color={outline} />
      <Edges threshold={threshold} color={outlineEcho} scale={1.01} />
    </>
  );
}

export default function Telescope({ mode, pointerRef, aimRef, reducedMotion, onAimChange }) {
  const telescopeGroup = useRef();
  const aimGroup = useRef();
  const projectedAnchor = useMemo(() => new THREE.Vector3(), []);
  const anchorDirection = useMemo(() => new THREE.Vector3(), []);
  const anchorWorld = useMemo(() => new THREE.Vector3(), []);
  const paintTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    context.fillStyle = "#e0d2ad";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let seed = 41;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    for (let index = 0; index < 28; index += 1) {
      const x = random() * canvas.width;
      context.beginPath();
      context.moveTo(x, -8);
      context.bezierCurveTo(x + random() * 13 - 6, 68, x + random() * 17 - 8, 172, x + random() * 11 - 5, 264);
      context.strokeStyle = index % 3 === 0 ? "rgba(86,45,22,.2)" : "rgba(255,239,191,.24)";
      context.lineWidth = 1 + random() * 4;
      context.stroke();
    }

    for (let index = 0; index < 18; index += 1) {
      const y = 8 + random() * (canvas.height - 16);
      context.beginPath();
      context.moveTo(-8, y + random() * 5 - 2.5);
      context.bezierCurveTo(
        32,
        y + random() * 8 - 4,
        88,
        y + random() * 8 - 4,
        canvas.width + 8,
        y + random() * 5 - 2.5,
      );
      context.strokeStyle = index % 3 === 0 ? "rgba(9,29,49,.16)" : "rgba(255,235,183,.14)";
      context.lineWidth = 0.7 + random() * 1.8;
      context.stroke();
    }

    for (let index = 0; index < 46; index += 1) {
      const x = random() * canvas.width;
      const y = random() * canvas.height;
      context.fillStyle = index % 4 === 0 ? "rgba(65,38,25,.2)" : "rgba(255,242,207,.22)";
      context.fillRect(x, y, 1 + random() * 4, 1 + random() * 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1.5, 1);
    return texture;
  }, []);

  useTelescopeAim({
    groupRef: aimGroup,
    pointerRef,
    aimRef,
    enabled: mode === "observatory",
    reducedMotion,
    onAimChange,
  });

  useFrame(({ camera, size }) => {
    if (!telescopeGroup.current || mode === "field") return;

    const coverScale = Math.max(
      size.width / ARCHITECTURE_WIDTH,
      size.height / ARCHITECTURE_HEIGHT,
    );
    const renderedWidth = ARCHITECTURE_WIDTH * coverScale;
    const renderedHeight = ARCHITECTURE_HEIGHT * coverScale;
    const offsetX = (size.width - renderedWidth) * 0.5;
    const offsetY = (size.height - renderedHeight) * 0.5;
    const pedestalScreenX = offsetX + PEDESTAL_SURFACE_X * coverScale;
    const pedestalScreenY = offsetY + PEDESTAL_SURFACE_Y * coverScale;
    const pedestalNdcX = (pedestalScreenX / size.width) * 2 - 1;
    const pedestalNdcY = 1 - (pedestalScreenY / size.height) * 2;

    projectedAnchor.set(pedestalNdcX, pedestalNdcY, 0.5).unproject(camera);
    anchorDirection.copy(projectedAnchor).sub(camera.position).normalize();
    const distance = (TELESCOPE_Z - camera.position.z) / anchorDirection.z;
    anchorWorld.copy(camera.position).addScaledVector(anchorDirection, distance);

    telescopeGroup.current.position.set(
      anchorWorld.x,
      anchorWorld.y - SUPPORT_FOOT_Y * TELESCOPE_SCALE,
      TELESCOPE_Z,
    );
  });

  // Mount during the fly-in so Three.js can compile the painted materials and
  // geometry before the landing artwork fades away. A late mount caused the
  // telescope head to pop in after the interior was already visible.
  if (mode === "field") return null;

  return (
    <group ref={telescopeGroup} position={[0, 0.12, TELESCOPE_Z]} scale={TELESCOPE_SCALE}>
      <group>
        <mesh position={[-0.4, 0.42, -0.005]} rotation-z={-0.445}>
          <boxGeometry args={[0.19, 1.89, 0.19]} />
          <meshBasicMaterial color={outline} />
        </mesh>
        <mesh position={[-0.4, 0.42, 0.02]} rotation-z={-0.445}>
          <boxGeometry args={[0.16, 1.86, 0.16]} />
          <BrassMaterial color="#a66b35" texture={paintTexture} />
          <InkedEdges threshold={8} />
        </mesh>
        <mesh position={[0.4, 0.42, 0.02]} rotation-z={0.445}>
          <boxGeometry args={[0.16, 1.86, 0.16]} />
          <BrassMaterial color="#a66b35" texture={paintTexture} />
          <InkedEdges threshold={8} />
        </mesh>
        <mesh position={[0, 0.43, 0.12]} rotation-x={-0.23}>
          <boxGeometry args={[0.15, 1.68, 0.16]} />
          <BrassMaterial color="#8c552e" texture={paintTexture} />
          <InkedEdges threshold={8} />
        </mesh>

        <mesh position={[0, 1.25, 0]}>
          <cylinderGeometry args={[0.28, 0.34, 0.24, 24]} />
          <BrassMaterial color="#754321" texture={paintTexture} />
          <InkedEdges threshold={9} />
        </mesh>
        <mesh position={[0, 1.42, 0]} rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.2, 0.2, 0.94, 24]} />
          <BrassMaterial color="#8b5229" texture={paintTexture} />
          <InkedEdges threshold={9} />
        </mesh>
        {[-0.43, 0.43].map((x) => (
          <mesh key={x} position={[x, 1.5, 0]}>
            <cylinderGeometry args={[0.23, 0.23, 0.1, 24]} />
            <BrassMaterial color="#c18a49" texture={paintTexture} />
            <InkedEdges threshold={9} />
          </mesh>
        ))}
      </group>

      <group ref={aimGroup} position={[0, 1.52, 0]}>
        <group rotation-x={0.52}>
          <mesh rotation-x={Math.PI / 2} position={[0, 0, -1.02]} castShadow>
            <cylinderGeometry args={[0.3, 0.39, 2.42, 28]} />
            <BrassMaterial color="#b57b3c" texture={paintTexture} />
            <InkedEdges />
          </mesh>

          {[-0.28, -1.08, -1.84].map((z, index) => (
            <mesh key={z} position={[0, 0, z]}>
              <torusGeometry args={[0.365 - index * 0.025, 0.035, 12, 32]} />
              <BrassMaterial color="#6f3d21" texture={paintTexture} />
              <InkedEdges threshold={8} />
            </mesh>
          ))}

          <mesh rotation-x={Math.PI / 2} position={[0, 0, -2.25]}>
            <cylinderGeometry args={[0.39, 0.39, 0.18, 28]} />
            <BrassMaterial color="#dda25a" texture={paintTexture} />
            <InkedEdges />
          </mesh>
          <mesh rotation-x={Math.PI / 2} position={[0, 0, -2.36]}>
            <cylinderGeometry args={[0.31, 0.31, 0.035, 32]} />
            <meshToonMaterial color="#172c46" emissive="#4b78a0" emissiveIntensity={0.42} />
            <InkedEdges threshold={10} />
          </mesh>

          <mesh rotation-x={Math.PI / 2} position={[0, 0, 0.27]}>
            <cylinderGeometry args={[0.13, 0.22, 0.48, 20]} />
            <BrassMaterial color="#88502b" texture={paintTexture} />
            <InkedEdges />
          </mesh>

          <group position={[-0.35, 0.31, -0.55]}>
            <mesh rotation-x={Math.PI / 2}>
              <cylinderGeometry args={[0.075, 0.105, 0.94, 18]} />
              <BrassMaterial color="#c98b45" texture={paintTexture} />
              <InkedEdges threshold={12} />
            </mesh>
            <mesh rotation-x={Math.PI / 2} position={[0, 0, -0.48]}>
              <cylinderGeometry args={[0.13, 0.13, 0.1, 18]} />
              <BrassMaterial color="#d9a461" texture={paintTexture} />
              <InkedEdges threshold={12} />
            </mesh>
          </group>

          <mesh rotation-z={Math.PI / 2} position={[0, 0, -0.02]}>
            <cylinderGeometry args={[0.15, 0.15, 0.98, 24]} />
            <BrassMaterial color="#83502b" texture={paintTexture} />
            <InkedEdges />
          </mesh>
        </group>
      </group>
    </group>
  );
}
