import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";

const fieldPosition = new THREE.Vector3(0, 3.2, 24);
const fieldTarget = new THREE.Vector3(0, 1.7, 0);
const settledPosition = new THREE.Vector3(0, 2.55, 3.15);
const explorationTarget = new THREE.Vector3(0, 4.35, -14);

export default function CameraRig({ mode, setMode, reducedMotion }) {
  const { camera } = useThree();
  const progress = useRef({ value: 0 });
  const activeTween = useRef();
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    fieldPosition.clone(),
    new THREE.Vector3(0, 3.1, 15.5),
    new THREE.Vector3(0, 3.05, 10.5),
    new THREE.Vector3(0, 3.2, 6.2),
    new THREE.Vector3(0, 2.85, 4.35),
    settledPosition.clone(),
  ], false, "centripetal"), []);

  useEffect(() => {
    camera.position.copy(fieldPosition);
    camera.lookAt(fieldTarget);
  }, [camera]);

  useEffect(() => {
    if (mode !== "entering") return undefined;
    progress.current.value = 0;
    activeTween.current = gsap.to(progress.current, {
      value: 1,
      duration: reducedMotion ? 0.45 : 3.4,
      ease: "power2.inOut",
      onComplete: () => setMode("observatory"),
    });
    return () => activeTween.current?.kill();
  }, [mode, reducedMotion, setMode]);

  useFrame((_, delta) => {
    if (mode === "field") {
      camera.position.copy(fieldPosition);
      camera.lookAt(fieldTarget);
      return;
    }

    if (mode === "entering") {
      const amount = progress.current.value;
      const position = curve.getPoint(amount);
      const lookProgress = THREE.MathUtils.smoothstep(amount, 0.28, 1);
      const target = fieldTarget.clone().lerp(explorationTarget, lookProgress);
      camera.position.copy(position);
      camera.lookAt(target);
      return;
    }

    camera.position.lerp(settledPosition, 1 - Math.exp(-4 * delta));
    camera.lookAt(explorationTarget);
  });

  return null;
}
