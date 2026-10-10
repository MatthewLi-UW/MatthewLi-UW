import { useCallback, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "./Scene";
import ExplorerHUD from "../ui/ExplorerHUD";
import ExplorationHint from "../ui/ExplorationHint";
import { hasVisitedObservatory } from "../data/observatoryVisit";
import ConstellationPanel from "../ui/ConstellationPanel";
import SimpleView from "../ui/SimpleView";
import LivingLanding from "../ui/LivingLanding";
import PaintedSkyFeature from "../ui/PaintedSkyFeature";
import PaintedConstellations from "../ui/PaintedConstellations";
import SkyMarkers from "../ui/SkyMarkers";
import { constellationById } from "../data/constellations";

const interiorLamps = [
  { x: 10.1, y: 81.3, duration: 2.83, delay: -0.44, pattern: "a" },
  { x: 25.3, y: 82.8, duration: 3.47, delay: -1.91, pattern: "b" },
  { x: 40.2, y: 84.2, duration: 2.61, delay: -1.12, pattern: "a" },
  { x: 59.8, y: 84.2, duration: 3.19, delay: -2.37, pattern: "b" },
  { x: 74.7, y: 82.8, duration: 2.97, delay: -0.83, pattern: "a" },
  { x: 89.9, y: 81.3, duration: 3.73, delay: -2.66, pattern: "b" },
];

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export default function PortfolioExperience({
  mode,
  setMode,
  selectedConstellation,
  setSelectedConstellation,
  discoveredConstellations,
  setDiscoveredConstellations,
}) {
  const pointerRef = useRef({ x: 0, y: 0.15 });
  const aimRef = useRef({ yaw: 0, pitch: 0.05, direction: new THREE.Vector3(0, 0, -1) });
  const dragRef = useRef({ active: false, moved: false, x: 0, y: 0 });
  const reticleRef = useRef(null);
  const [touchDragging, setTouchDragging] = useState(false);
  const [signal, setSignal] = useState({ id: null, status: "searching", alignment: 0 });
  const [aim, setAim] = useState({ yaw: 0, pitch: 0.05 });
  const [simpleView, setSimpleView] = useState(false);
  const webglSupported = useMemo(supportsWebGL, []);
  const reducedMotion = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  const changeMode = useCallback((nextMode) => {
    setMode(nextMode === "entering" && hasVisitedObservatory() ? "observatory" : nextMode);
  }, [setMode]);

  const markDiscovered = useCallback((id) => {
    if (!id) return;
    if (constellationById[id]?.kind === "sky-feature") return;
    setDiscoveredConstellations((previous) => previous.includes(id) ? previous : [...previous, id]);
  }, [setDiscoveredConstellations]);

  const handleSignal = useCallback((nextSignal) => {
    setSignal((current) => current.id === nextSignal.id && current.status === nextSignal.status
      ? current
      : nextSignal);
  }, []);

  const openConstellation = useCallback((id) => {
    if (!id) return;
    markDiscovered(id);
    setSelectedConstellation(id);
  }, [markDiscovered, setSelectedConstellation]);

  const setPointer = (event) => {
    pointerRef.current.x = THREE.MathUtils.clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1);
    pointerRef.current.y = THREE.MathUtils.clamp(-((event.clientY / window.innerHeight) * 2 - 1), -1, 1);
    if (reticleRef.current) {
      reticleRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    }
  };

  const onPointerDown = (event) => {
    if (mode !== "observatory" || selectedConstellation) return;
    if (event.target.closest?.("button, a")) return;
    dragRef.current = { active: true, moved: false, x: event.clientX, y: event.clientY };
    setTouchDragging(false);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setPointer(event);
  };

  const onPointerMove = (event) => {
    if (event.pointerType === "mouse" || dragRef.current.active) setPointer(event);
    if (mode !== "observatory" || selectedConstellation || !dragRef.current.active) return;
    if (Math.hypot(event.clientX - dragRef.current.x, event.clientY - dragRef.current.y) > 7) {
      dragRef.current.moved = true;
      if (event.pointerType !== "mouse") setTouchDragging(true);
    }
  };

  const onPointerUp = (event) => {
    if (!dragRef.current.active) return;
    const wasTap = !dragRef.current.moved;
    dragRef.current.active = false;
    setTouchDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    if (wasTap && signal.status === "locked") openConstellation(signal.id);
  };

  if (!webglSupported) return <SimpleView isFallback />;
  if (simpleView) return <SimpleView onClose={() => setSimpleView(false)} />;

  return (
    <main
      className={`portfolio-experience mode-${mode}${selectedConstellation ? " has-selection" : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { dragRef.current.active = false; setTouchDragging(false); }}
      onLostPointerCapture={() => { dragRef.current.active = false; setTouchDragging(false); }}
    >
      {mode !== "field" && (
        <div
          className="observatory-interior-art"
          style={{
            "--interior-sky-x": `${aim.yaw * -26}px`,
            "--interior-sky-y": `${aim.pitch * 22}px`,
          }}
          aria-hidden="true"
        >
          <img
            className="interior-sky-layer"
            src={`${import.meta.env.BASE_URL}images/observatory/interior-sky-handpainted-v3.png`}
            alt=""
            draggable="false"
          />
          <PaintedSkyFeature status={signal.id === "milky-way" ? signal.status : "searching"} />
          <PaintedConstellations signal={signal} discovered={discoveredConstellations} />
          <svg
            className="interior-architecture-layer"
            viewBox="0 0 1672 941"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="torch-light-fade">
                <stop offset="38%" stopColor="white" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              {interiorLamps.map((lamp, index) => (
                <mask key={index} id={`torch-light-${index}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1672" height="941">
                  <ellipse cx={lamp.x * 16.72} cy={lamp.y * 9.41} rx="20.064" ry="28.23" fill="url(#torch-light-fade)" />
                </mask>
              ))}
            </defs>
            <image
              href={`${import.meta.env.BASE_URL}images/observatory/interior-architecture-handpainted-v1.png`}
              width="1672"
              height="941"
            />
            {interiorLamps.map((lamp, index) => (
              <image
                key={index}
                className={`interior-light-paint-layer lamp-pattern-${lamp.pattern}`}
                href={`${import.meta.env.BASE_URL}images/observatory/interior-architecture-handpainted-v1.png`}
                width="1672"
                height="941"
                mask={`url(#torch-light-${index})`}
                style={{
                  "--lamp-duration": `${lamp.duration}s`,
                  "--lamp-delay": `${lamp.delay}s`,
                }}
              />
            ))}
          </svg>
        </div>
      )}
      <Canvas
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
        dpr={[1, 1.25]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ fov: 50, near: 0.1, far: 220, position: [0, 3.2, 24] }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.18;
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Scene
          mode={mode}
          setMode={changeMode}
          pointerRef={pointerRef}
          aimRef={aimRef}
          onSignalChange={handleSignal}
          onAimChange={setAim}
          reducedMotion={reducedMotion}
        />
      </Canvas>
      <div ref={reticleRef} className={`reticle ${signal.status}${touchDragging ? " is-touch-dragging" : ""}`} aria-hidden="true" />

      {mode === "observatory" && !selectedConstellation && (
        <SkyMarkers signal={signal} aim={aim} onOpen={openConstellation} />
      )}
      {mode === "observatory" && <span className="interior-paper-texture" aria-hidden="true" />}
      {mode === "observatory" && <ExplorationHint />}

      {mode !== "observatory" && (
        <LivingLanding
          entering={mode === "entering"}
          onEnter={() => changeMode("entering")}
          onSimpleView={() => setSimpleView(true)}
        />
      )}
      {mode === "observatory" && !selectedConstellation && (
        <ExplorerHUD aim={aim} onSimpleView={() => setSimpleView(true)} />
      )}
      <ConstellationPanel
        constellation={selectedConstellation ? constellationById[selectedConstellation] : null}
        onClose={() => setSelectedConstellation(null)}
      />
    </main>
  );
}
