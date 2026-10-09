const grassBlades = Array.from({ length: 54 }, (_, index) => ({
  x: 1 + ((index * 17.9) % 98),
  height: 28 + ((index * 13) % 48),
  width: index % 4 === 0 ? 2 : 1,
  start: -14 + (index % 8),
  end: 4 + (index % 10),
  delay: -((index * 0.19) % 3.6),
  duration: 2.1 + (index % 5) * 0.34,
}));

const fireflies = Array.from({ length: 14 }, (_, index) => ({
  x: 4 + ((index * 29.3) % 92),
  y: 61 + ((index * 11.7) % 31),
  drift: -18 + (index % 7) * 6,
  delay: -((index * 0.67) % 6),
  duration: 4.3 + (index % 5) * 0.81,
}));

export default function LivingLanding({ entering, onEnter, onSimpleView }) {
  const handlePointerMove = (event) => {
    if (entering) return;
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    const element = event.currentTarget;
    element.style.setProperty("--sky-x", `${x * -2}px`);
    element.style.setProperty("--sky-y", `${y * -1.5}px`);
    element.style.setProperty("--grass-x", `${x * 5.5}px`);
    element.style.setProperty("--grass-y", `${y * 3.5}px`);
  };

  const resetParallax = (event) => {
    const element = event.currentTarget;
    ["--sky-x", "--sky-y", "--grass-x", "--grass-y"]
      .forEach((property) => element.style.setProperty(property, "0px"));
  };

  return (
    <div
      className={`landing-art${entering ? " is-entering" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <span className="landing-layer landing-sky" aria-hidden="true">
        <img
          src={`${import.meta.env.BASE_URL}images/observatory/observatory-sky-field-v4.png`}
          alt=""
          draggable="false"
        />
      </span>
      <button
        type="button"
        className="landing-enter-cue"
        onClick={onEnter}
        disabled={entering}
      >
        click the observatory to enter <b aria-hidden="true">↓</b>
      </button>
      <button
        type="button"
        className="landing-simple-link"
        onPointerDown={(event) => {
          event.stopPropagation();
          onSimpleView();
        }}
      >plain portfolio ↗</button>
      <button type="button" className="landing-enter-hitarea" onClick={onEnter} disabled={entering} aria-label="Enter observatory" />
      <span className="landing-layer landing-building" aria-hidden="true">
        <img src={`${import.meta.env.BASE_URL}images/observatory/observatory-building-v2.png`} alt="" draggable="false" fetchpriority="high" />
      </span>
      <span className="landing-layer landing-light-paint landing-dome-light" aria-hidden="true">
        <img src={`${import.meta.env.BASE_URL}images/observatory/observatory-building-v2.png`} alt="" draggable="false" />
      </span>
      <span className="landing-layer landing-light-paint landing-door-light" aria-hidden="true">
        <img src={`${import.meta.env.BASE_URL}images/observatory/observatory-building-v2.png`} alt="" draggable="false" />
      </span>
      <span className="landing-fireflies" aria-hidden="true">
        {fireflies.map((firefly, index) => (
          <i
            key={index}
            style={{
              left: `${firefly.x}%`,
              top: `${firefly.y}%`,
              "--firefly-drift": `${firefly.drift}px`,
              animationDelay: `${firefly.delay}s`,
              animationDuration: `${firefly.duration}s`,
            }}
          />
        ))}
      </span>
      <span className="landing-layer landing-grass" aria-hidden="true">
        <img src={`${import.meta.env.BASE_URL}images/observatory/observatory-grass-v2.png`} alt="" draggable="false" />
      </span>
      <span className="landing-grass-motion" aria-hidden="true">
        {grassBlades.map((blade, index) => (
          <i
            key={index}
            style={{
              left: `${blade.x}%`,
              width: `${blade.width}px`,
              height: `${blade.height}px`,
              "--sway-start": `${blade.start}deg`,
              "--sway-end": `${blade.end}deg`,
              animationDelay: `${blade.delay}s`,
              animationDuration: `${blade.duration}s`,
            }}
          />
        ))}
      </span>
    </div>
  );
}
