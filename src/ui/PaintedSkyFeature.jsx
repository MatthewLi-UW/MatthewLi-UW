export default function PaintedSkyFeature({ status }) {
  return (
    <span className={`painted-sky-feature is-${status}`} aria-hidden="true">
      <span className="painted-sky-feature-dimmer" />
      <img
        className="painted-sky-feature-band"
        src={`${import.meta.env.BASE_URL}images/observatory/interior-sky-handpainted-v10.png`}
        alt=""
        draggable="false"
      />
    </span>
  );
}
