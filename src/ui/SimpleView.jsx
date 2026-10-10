import { skyDestinations } from "../data/constellations";
import { Entry, MePhotoScene, RecordTimeline } from "./ConstellationPanel";

export default function SimpleView({ onClose, isFallback = false }) {
  const about = skyDestinations.find(({ name }) => name === "Me");
  const experience = skyDestinations.find(({ name }) => name === "Experience");
  const builds = skyDestinations.find(({ name }) => name === "Builds");

  return (
    <div className="simple-view">
      <header className="simple-header">
        <a href={import.meta.env.BASE_URL} className="wordmark"><span aria-hidden="true">✦</span> Matthew Li</a>
        {!isFallback && <button type="button" className="simple-close" onClick={onClose}>Return to observatory <span aria-hidden="true">↗</span></button>}
      </header>
      <main>
        <section className="simple-about">
          <div className="simple-about-copy">
            <h1>About Matthew</h1>
            <p>{about.description}</p>
            <p>{about.note}</p>
            <div className="simple-socials">
              {about.entries.map((entry) => <Entry key={entry.title} entry={entry} />)}
            </div>
          </div>
          <MePhotoScene />
        </section>
        <section className="simple-section">
          <div className="simple-section-title"><span>02</span><h2>Experience</h2></div>
          <div className="simple-experience-content">
            <RecordTimeline entries={experience.entries} isExperience />
          </div>
        </section>
        <section className="simple-section">
          <div className="simple-section-title"><span>03</span><h2>Builds</h2></div>
          <RecordTimeline entries={builds.entries} />
        </section>
      </main>
      <footer className="simple-footer"><span><span aria-hidden="true">✦</span> Matthew Li</span><a href="mailto:mf5li@uwaterloo.ca">mf5li@uwaterloo.ca</a></footer>
    </div>
  );
}
