import { forwardRef } from "react";
import { constellationById } from "../data/constellations";

function formatRa(yaw) {
  const hours = Math.round(((yaw + 0.62) / 1.24) * 12 + 1);
  const minutes = Math.abs(Math.round(yaw * 97)) % 60;
  return `${String(hours).padStart(2, "0")}H ${String(minutes).padStart(2, "0")}M`;
}

function formatDec(pitch) {
  const value = Math.round(pitch * 110);
  return `${value >= 0 ? "+" : "−"}${String(Math.abs(value)).padStart(2, "0")}°`;
}

const ExplorerHUD = forwardRef(function ExplorerHUD({ signal, aim, onOpen, onSimpleView }, reticleRef) {
  const target = signal.id ? constellationById[signal.id] : null;

  return (
    <div className="explorer-hud">
      <header className="hud-topline">
        <button type="button" className="text-button" onClick={onSimpleView}>Simple view</button>
      </header>
      <div className="coordinates" aria-label="Telescope coordinates">
        <span>RA</span><strong>{formatRa(aim.yaw)}</strong>
        <span>DEC</span><strong>{formatDec(aim.pitch)}</strong>
      </div>
      <div ref={reticleRef} className={`reticle ${signal.status}`} aria-hidden="true" />
      {target && <div className="signal-card is-active" aria-live="polite">
        <span>{signal.status === "locked" ? "LOCKED ON" : target.kind === "sky-feature" ? "PAINTED FEATURE" : "SIGNAL DETECTED"}</span>
        <strong>{target.name}</strong><small>{target.subtitle}</small>
        {signal.status === "locked" && (
          <button type="button" onClick={() => onOpen(signal.id)}>Open record <span aria-hidden="true">↗</span></button>
        )}
      </div>}
    </div>
  );
});

export default ExplorerHUD;
