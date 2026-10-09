import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { skyDestinations } from "../data/constellations";
import { SKY_ORIGIN } from "./skyConstants";

const PAINTED_SKY_WIDTH = 1672;
const PAINTED_SKY_HEIGHT = 941;

function distanceToSegment(pointX, pointY, start, end) {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const lengthSquared = deltaX * deltaX + deltaY * deltaY;
  if (!lengthSquared) return Math.hypot(pointX - start.x, pointY - start.y);
  const amount = THREE.MathUtils.clamp(((pointX - start.x) * deltaX + (pointY - start.y) * deltaY) / lengthSquared, 0, 1);
  return Math.hypot(pointX - (start.x + deltaX * amount), pointY - (start.y + deltaY * amount));
}

export default function Sky({ mode, pointerRef, aimRef, onSignalChange, reducedMotion }) {
  const skyGroupRef = useRef();
  const alignmentRef = useRef(Object.fromEntries(skyDestinations.map(({ id }) => [id, 0])));
  const lastSignal = useRef("");
  const frame = useRef(0);
  const projected = useMemo(() => new THREE.Vector3(), []);
  const projectedEnd = useMemo(() => new THREE.Vector3(), []);
  const worldPositions = useMemo(() => Object.fromEntries(
    skyDestinations.map((item) => {
      const direction = new THREE.Vector3(...item.direction).normalize();
      return [item.id, SKY_ORIGIN.clone().add(direction.multiplyScalar(68))];
    }),
  ), []);
  const featureSegments = useMemo(() => Object.fromEntries(
    skyDestinations
      .filter((item) => item.hitDirections)
      .map((item) => [item.id, item.hitDirections.map((values) => {
        const direction = new THREE.Vector3(...values).normalize();
        return SKY_ORIGIN.clone().add(direction.multiplyScalar(68));
      })]),
  ), []);

  useFrame(({ camera, size }, delta) => {
    if (skyGroupRef.current) {
      const targetX = mode === "observatory" ? -aimRef.current.yaw * 2.25 : 0;
      const targetY = mode === "observatory" ? -aimRef.current.pitch * 1.9 : 0;
      const follow = 1 - Math.exp(-(reducedMotion ? 18 : 9) * delta);
      skyGroupRef.current.position.x = THREE.MathUtils.lerp(skyGroupRef.current.position.x, targetX, follow);
      skyGroupRef.current.position.y = THREE.MathUtils.lerp(skyGroupRef.current.position.y, targetY, follow);
    }

    if (mode !== "observatory") return;
    let bestFeature = { id: null, alignment: 0, distance: 10, status: "searching" };
    let bestConstellation = { id: null, alignment: 0, distance: 10, status: "searching" };

    skyDestinations.forEach((item) => {
      const offset = skyGroupRef.current?.position;
      let distance = 10;

      if (item.paintedHitZones) {
        const shiftX = (-aimRef.current.yaw * 26) / (size.width * 0.5);
        const shiftY = (-aimRef.current.pitch * 22) / (size.height * 0.5);
        const points = item.paintedHitZones.map(([x, y]) => ({
          x: ((x / PAINTED_SKY_WIDTH) * 2 - 1) * 1.055 + shiftX,
          y: (1 - (y / PAINTED_SKY_HEIGHT) * 2) * 1.055 + shiftY,
        }));
        distance = points.reduce((closest, point) => Math.min(closest, Math.hypot(pointerRef.current.x - point.x, pointerRef.current.y - point.y)), 10);
      } else if (item.paintedHitPath) {
        const shiftX = (-aimRef.current.yaw * 26) / (size.width * 0.5);
        const shiftY = (-aimRef.current.pitch * 22) / (size.height * 0.5);
        const points = item.paintedHitPath.map(([x, y]) => ({
          x: ((x / PAINTED_SKY_WIDTH) * 2 - 1) * 1.055 + shiftX,
          y: (1 - (y / PAINTED_SKY_HEIGHT) * 2) * 1.055 + shiftY,
        }));
        for (let index = 0; index < points.length - 1; index += 1) {
          distance = Math.min(distance, distanceToSegment(pointerRef.current.x, pointerRef.current.y, points[index], points[index + 1]));
        }
      } else if (item.paintedStars) {
        const shiftX = (-aimRef.current.yaw * 26) / (size.width * 0.5);
        const shiftY = (-aimRef.current.pitch * 22) / (size.height * 0.5);
        const points = item.paintedStars.map(([x, y]) => ({
          x: ((x / PAINTED_SKY_WIDTH) * 2 - 1) * 1.055 + shiftX,
          y: (1 - (y / PAINTED_SKY_HEIGHT) * 2) * 1.055 + shiftY,
        }));
        distance = points.reduce((closest, point) => Math.min(closest, Math.hypot(pointerRef.current.x - point.x, pointerRef.current.y - point.y)), 10);
        item.connections.forEach(([from, to]) => {
          distance = Math.min(distance, distanceToSegment(pointerRef.current.x, pointerRef.current.y, points[from], points[to]));
        });
      } else if (featureSegments[item.id]) {
        projected.copy(featureSegments[item.id][0]);
        projectedEnd.copy(featureSegments[item.id][1]);
        if (offset) {
          projected.add(offset);
          projectedEnd.add(offset);
        }
        projected.project(camera);
        projectedEnd.project(camera);
        const isVisible = [projected, projectedEnd].some((point) => point.z >= -1 && point.z <= 1
          && Math.abs(point.x) < 1.2 && Math.abs(point.y) < 1.2);
        if (isVisible) distance = distanceToSegment(pointerRef.current.x, pointerRef.current.y, projected, projectedEnd);
      } else {
        projected.copy(worldPositions[item.id]);
        if (offset) projected.add(offset);
        projected.project(camera);
        const isVisible = projected.z >= -1 && projected.z <= 1
          && Math.abs(projected.x) < 1.15 && Math.abs(projected.y) < 1.15;
        if (isVisible) distance = Math.hypot(pointerRef.current.x - projected.x, pointerRef.current.y - projected.y);
      }

      const alignment = 1 - distance * (item.kind === "sky-feature" ? 0.3 : 0.22);
      alignmentRef.current[item.id] = alignment;
      const isSkyFeature = item.kind === "sky-feature";
      const candidate = {
        id: item.id,
        alignment,
        distance,
        status: "searching",
        selectRadius: item.selectRadius ?? (isSkyFeature ? 0.075 : 0.032),
        lockRadius: item.lockRadius ?? (isSkyFeature ? 0.05 : 0.068),
        detectRadius: item.detectRadius ?? (isSkyFeature ? 0.133 : 0.181),
      };
      if (item.kind === "sky-feature") {
        if (alignment > bestFeature.alignment) bestFeature = candidate;
      } else if (alignment > bestConstellation.alignment) {
        bestConstellation = candidate;
      }
    });

    let best;
    if (bestConstellation.distance < bestConstellation.selectRadius) best = bestConstellation;
    else if (bestFeature.distance < bestFeature.selectRadius) best = bestFeature;
    else best = bestConstellation.alignment > bestFeature.alignment ? bestConstellation : bestFeature;

    if (best.distance < best.lockRadius) best.status = "locked";
    else if (best.distance < best.detectRadius) best.status = "detected";
    else best = { id: null, alignment: best.alignment, status: "searching" };

    frame.current += 1;
    const key = `${best.id ?? "none"}-${best.status}`;
    if (key !== lastSignal.current || frame.current % 20 === 0) {
      lastSignal.current = key;
      onSignalChange(best);
    }
  });

  return <group ref={skyGroupRef} />;
}
