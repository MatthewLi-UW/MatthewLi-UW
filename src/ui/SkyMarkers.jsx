import { skyDestinations } from "../data/constellations";

export default function SkyMarkers({ signal, aim, onOpen }) {
  return (
    <nav
      className="sky-markers"
      aria-label="Explore the three sky destinations"
      style={{
        "--interior-sky-x": `${aim.yaw * -26}px`,
        "--interior-sky-y": `${aim.pitch * 22}px`,
      }}
    >
      {skyDestinations.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`sky-marker${signal.id === item.id ? " is-active" : ""}`}
          style={{ left: `${item.marker[0] / 1672 * 100}%`, top: `${item.marker[1] / 941 * 100}%` }}
          aria-label={`${item.number}: Open ${item.name.toLowerCase()}`}
          onClick={() => onOpen(item.id)}
        >
          <span className="sky-marker-medallion" aria-hidden="true">
            <svg viewBox="0 0 80 80" fill="none">
              <path className="marker-wash" d="M40 8C58 6 73 23 71 41C73 59 56 73 38 71C19 74 6 56 9 38C6 20 22 7 40 8Z" />
              <path className="marker-ring" d="M39 7C58 5 73 23 71 41C73 59 56 73 38 71C19 74 6 56 9 38C6 20 22 7 39 7Z" />
              <path className="marker-echo" d="M23 12C43 1 66 15 67 34M58 66C38 80 12 63 13 44" />
              <path className="marker-spark" d="M69 8V20M63 14H75M8 61V69M4 65H12" />
            </svg>
            <span>{item.number}</span>
          </span>
          <span className="sky-marker-name">{item.name.toLowerCase()}</span>
        </button>
      ))}
    </nav>
  );
}
