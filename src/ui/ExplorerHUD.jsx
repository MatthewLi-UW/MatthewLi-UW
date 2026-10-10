function formatRa(yaw) {
  const hours = Math.round(((yaw + 0.62) / 1.24) * 12 + 1);
  const minutes = Math.abs(Math.round(yaw * 97)) % 60;
  return `${String(hours).padStart(2, "0")}H ${String(minutes).padStart(2, "0")}M`;
}

function formatDec(pitch) {
  const value = Math.round(pitch * 110);
  return `${value >= 0 ? "+" : "−"}${String(Math.abs(value)).padStart(2, "0")}°`;
}

export default function ExplorerHUD({ aim, onSimpleView }) {
  return (
    <div className="explorer-hud">
      <header className="hud-topline">
        <button type="button" className="text-button" onClick={onSimpleView}>Simple view</button>
      </header>
      <div className="coordinates" aria-label="Telescope coordinates">
        <span>RA</span><strong>{formatRa(aim.yaw)}</strong>
        <span>DEC</span><strong>{formatDec(aim.pitch)}</strong>
      </div>
    </div>
  );
}
