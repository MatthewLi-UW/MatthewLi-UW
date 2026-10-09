import Field from "./Field";
import Observatory from "./Observatory";
import Telescope from "./Telescope";
import Sky from "./Sky";
import CameraRig from "./CameraRig";

export default function Scene({ mode, setMode, pointerRef, aimRef, onSignalChange, onAimChange, reducedMotion }) {
  return (
    <>
      <fog attach="fog" args={["#0a1930", 22, 76]} />
      <ambientLight intensity={0.72} color="#8ca7ca" />
      <directionalLight position={[-8, 12, 9]} intensity={2.65} color="#b9d3f1" castShadow={false} />
      <directionalLight position={[7, 5, -8]} intensity={0.65} color="#496a9b" />
      <hemisphereLight args={["#8fb1dc", "#07101f", 0.92]} />
      {mode === "field" && (
        <>
          <Field />
          <Observatory mode={mode} onEnter={() => setMode("entering")} />
        </>
      )}
      <Telescope mode={mode} pointerRef={pointerRef} aimRef={aimRef} reducedMotion={reducedMotion} onAimChange={onAimChange} />
      <Sky mode={mode} pointerRef={pointerRef} aimRef={aimRef} onSignalChange={onSignalChange} reducedMotion={reducedMotion} />
      <CameraRig mode={mode} setMode={setMode} reducedMotion={reducedMotion} />
    </>
  );
}
