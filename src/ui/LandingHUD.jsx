export default function LandingHUD({ mode, onEnter, onSimpleView }) {
  const visible = mode === "field";

  return (
    <div className={`landing-hud ${visible ? "is-visible" : "is-hidden"}`} aria-hidden={!visible}>
      <header className="hud-topline">
        <a className="wordmark" href={import.meta.env.BASE_URL} aria-label="Matthew Li, home">MATTHEW LI</a>
        <span>OBSERVATORY / 2026</span>
      </header>
      <div className="landing-center">
        <p className="micro-label">NIGHT ARCHIVE · WATERLOO</p>
        <h1>Look a little closer.</h1>
        <button type="button" className="enter-button" onClick={onEnter} disabled={!visible}>
          <span>Enter observatory</span>
          <span aria-hidden="true">↘</span>
        </button>
      </div>
      <footer className="landing-footer">
        <p>An archive of things I build,<br />think about, and explore.</p>
        <button type="button" className="text-button" onClick={onSimpleView}>Simple view</button>
      </footer>
    </div>
  );
}
