import { skyDestinations } from "../data/constellations";

const SKY_WIDTH = 1672;
const SKY_HEIGHT = 941;

function connectionPath(stars, from, to, index, echo = false) {
  const [startX, startY] = stars[from];
  const [endX, endY] = stars[to];
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const length = Math.hypot(deltaX, deltaY) || 1;
  const bend = (4 + (index % 3) * 2) * (echo ? -0.65 : 1);
  const middleX = (startX + endX) * 0.5 - (deltaY / length) * bend;
  const middleY = (startY + endY) * 0.5 + (deltaX / length) * bend;
  return `M ${startX} ${startY} Q ${middleX} ${middleY} ${endX} ${endY}`;
}

export default function PaintedConstellations({ signal, discovered = [] }) {
  const painted = skyDestinations.filter((item) => item.kind !== "sky-feature" && item.paintedStars);
  const skyImage = `${import.meta.env.BASE_URL}images/observatory/interior-sky-handpainted-v3.png`;

  return (
    <svg
      className="painted-constellations"
      viewBox={`0 0 ${SKY_WIDTH} ${SKY_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="painted-star-feather">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.52" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        {painted.map((item) => (
          <mask id={`painted-stars-${item.id}`} key={item.id} maskUnits="userSpaceOnUse" x="0" y="0" width={SKY_WIDTH} height={SKY_HEIGHT}>
            {item.paintedStars.map(([x, y, radius], index) => (
              <circle key={index} cx={x} cy={y} r={radius * 1.08} fill="url(#painted-star-feather)" />
            ))}
          </mask>
        ))}
      </defs>
      {painted.map((item) => {
        const status = signal.id === item.id ? signal.status : "searching";
        const isDiscovered = discovered.includes(item.id);
        return (
          <g className={`painted-constellation is-${status}${isDiscovered ? " is-discovered" : ""}`} key={item.id}>
            <g className="painted-constellation-lines">
              {item.connections.map(([from, to], index) => (
                <g key={`${from}-${to}`}>
                  <path className="painted-connection painted-connection-echo" d={connectionPath(item.paintedStars, from, to, index, true)} />
                  <path className="painted-connection" d={connectionPath(item.paintedStars, from, to, index)} />
                </g>
              ))}
            </g>
            <image
              className="painted-constellation-stars"
              href={skyImage}
              width={SKY_WIDTH}
              height={SKY_HEIGHT}
              mask={`url(#painted-stars-${item.id})`}
            />
          </g>
        );
      })}
    </svg>
  );
}
