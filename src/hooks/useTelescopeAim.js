import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const forward = new THREE.Vector3(0, 0, -1);
const rotation = new THREE.Euler(0, 0, 0, "YXZ");

export default function useTelescopeAim({ groupRef, pointerRef, aimRef, enabled, reducedMotion, onAimChange }) {
  const current = useRef({ yaw: 0, pitch: 0.05 });
  const reportClock = useRef(0);

  useFrame((_, delta) => {
    const targetYaw = enabled ? pointerRef.current.x * 0.62 : 0;
    const targetPitch = enabled ? pointerRef.current.y * 0.3 : 0.05;
    const alpha = 1 - Math.exp(-(reducedMotion ? 14 : 6) * delta);

    current.current.yaw = THREE.MathUtils.lerp(current.current.yaw, targetYaw, alpha);
    current.current.pitch = THREE.MathUtils.lerp(current.current.pitch, targetPitch, alpha);

    if (groupRef.current) {
      groupRef.current.rotation.x = current.current.pitch;
      groupRef.current.rotation.y = -current.current.yaw;
    }

    aimRef.current.yaw = current.current.yaw;
    aimRef.current.pitch = current.current.pitch;
    rotation.set(current.current.pitch, -current.current.yaw, 0);
    aimRef.current.direction.copy(forward).applyEuler(rotation).normalize();

    reportClock.current += delta;
    if (reportClock.current > 0.1) {
      reportClock.current = 0;
      onAimChange?.({ yaw: current.current.yaw, pitch: current.current.pitch });
    }
  });
}
