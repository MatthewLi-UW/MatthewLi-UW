import { useEffect, useRef, useState } from "react";
import { projectById } from "../data/projects";
import { experienceById } from "../data/experiences";

const experienceImpacts = {
  microsoft: "Customer-facing agentic security insights for MS Teams",
  bitgo: "Protecting 200k+ BTC from quantum attacks",
  verily: "Training code gen models @Verily for healthcare languages",
  veridocx: "ML models for FDA 510(k) submissions",
  ontario: "ML for cyber security",
  questrade: "Open banking research",
  osfi: "12% faster workflows",
  kjmedi: "Custom business software",
};

const projectImpacts = {
  hello: "Real-world English practice",
  slicefund: "Prediction-market arbitrage", precognition: "Calibrated market forecasts",
  krammy: "50+ learners in week one", justff: "Emotion-aware voice chat",
  "snake-agent": "Self-learning Snake AI", braintrainr: "Visual AI learning",
  valise: "Collaborative travel planning",
  raiinet: "Chess with abilities", countrynews: "Headlines across borders",
  anilens: "Personalized anime discovery", qlife: "Custom web experiences",
};

function ProjectLinkIcon({ type }) {
  if (type === "github") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1 .1 1.6-.8 1.8-1.2.1-.8.4-1.4.7-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6-.1c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.3.7 1 .7 2v2.9c0 .3.2.7.8.6A12 12 0 0 0 12 .7Z" /></svg>;
  if (type === "linkedin") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 3.4A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.6ZM3.3 9.7h3.8V21H3.3V9.7Zm6.2 0h3.6v1.5h.1c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.8V21h-3.8v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21H9.5V9.7Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true" style={{ fill: "none" }} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m8 13 6-6a3 3 0 0 1 4.2 4.2l-8 8a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-8 8a1.5 1.5 0 0 1-2.2-2.2L14 8" /></svg>;
}

function TrophyDoodle() {
  return (
    <svg className="trophy-doodle" viewBox="0 0 32 34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 4.5 24 4 23 13q-1 8-7 8-7-1-8-8Z M8 7 3 6q-2 10 7 10 M24 7l5-1q2 10-7 10 M16 21l-.5 7 M10 29q6-2 12 0l1 3-14-.5Z" />
      <path d="m14 8 2 2 3-1-1 3 1 2-3-.5-2 2 .2-3-2-1.5 2.8-.5 M5 2l-2-1 M27 2l2-1" opacity=".7" />
    </svg>
  );
}

export function Entry({ entry, compactExperience = false, compactProject = false }) {
  const [copied, setCopied] = useState(false);

  if (entry.type === "social") {
    const isEmail = entry.icon === "email";
    const copyEmail = async (event) => {
      if (!isEmail) return;
      event.preventDefault();
      try {
        await navigator.clipboard.writeText(entry.url.replace("mailto:", ""));
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      } catch (error) {
        console.error("Could not copy email address.", error);
      }
    };

    return (
      <a className={`social-entry ${entry.icon}`} href={isEmail ? undefined : entry.url} target={isEmail ? undefined : "_blank"} rel={isEmail ? undefined : "noreferrer"} onClick={copyEmail} aria-label={isEmail ? "Copy email address" : `Open ${entry.title}`}>
        {entry.icon === "github" ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1 .1 1.6-.8 1.8-1.2.1-.8.4-1.4.7-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6-.1c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.3.7 1 .7 2v2.9c0 .3.2.7.8.6A12 12 0 0 0 12 .7Z" /></svg>
        ) : entry.icon === "linkedin" ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 3.4A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.6ZM3.3 9.7h3.8V21H3.3V9.7Zm6.2 0h3.6v1.5h.1c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.8V21h-3.8v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21H9.5V9.7Z" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Zm2.4.3 6.6 5.1 6.6-5.1H5.4Zm13.2 2-6.1 4.7a.8.8 0 0 1-1 0L5.4 7.8v10.7c0 .1 0 .2.1.2h13c.1 0 .1-.1.1-.2V7.8Z" /></svg>
        )}
        <span>{copied ? "Copied!" : entry.title}</span>
      </a>
    );
  }

  if (entry.type === "project") {
    const project = projectById[entry.id];
    if (!project) return null;
    if (compactProject) {
      const isGithub = project.url?.startsWith("https://github.com/");
      const githubUrl = project.githubUrl || (isGithub ? project.url : null);
      const isDevpost = project.url?.startsWith("https://devpost.com/");
      const websiteUrl = !isGithub && !isDevpost ? project.url : null;
      const devpostUrl = project.devpostUrl || (isDevpost ? project.url : null);
      const links = [
        { type: "github", label: "GitHub", url: githubUrl },
        { type: "website", label: "website", url: websiteUrl },
        { type: "website", label: "Devpost", url: devpostUrl },
        { type: "linkedin", label: "LinkedIn", url: project.linkedinUrl },
      ].filter(({ url }) => url);
      const award = entry.id === "slicefund" ? "Hack Canada 2026 Winner" : entry.id === "precognition" ? "CxC 2026 winner" : null;
      return (
        <li className="experience-stop project-stop">
          {project.image ? <img src={project.image} alt="" /> : <span className="timeline-project-mark" aria-hidden="true">{project.name.slice(0, 2)}</span>}
          <div className="project-stop-copy">
            <h3>{project.name}</h3>
            {projectImpacts[entry.id] && <p>{projectImpacts[entry.id]}</p>}
            {award && <span className="project-award"><TrophyDoodle />{award}</span>}
          </div>
          <div className="project-stop-links">
            {links.map(({ type, label, url }) => <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} on ${label}`} title={label}><ProjectLinkIcon type={type} /></a>)}
          </div>
        </li>
      );
    }
    const ProjectCard = project.url ? "a" : "article";
    return (
      <ProjectCard className="record-entry project-entry" {...(project.url ? { href: project.url, target: "_blank", rel: "noreferrer" } : {})}>
        {project.image
          ? <img src={project.image} alt="" loading="lazy" />
          : <div className="project-mark" aria-hidden="true">{project.name.slice(0, 2).toUpperCase()}</div>}
        <div>
          <span>{project.eyebrow}</span>
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
          <small>{project.tags.join(" · ")}</small>
        </div>
        {project.url && <b aria-hidden="true">↗</b>}
      </ProjectCard>
    );
  }

  if (entry.type === "experience") {
    const experience = experienceById[entry.id];
    if (!experience) return null;
    if (compactExperience) {
      const logo = entry.id === "verily"
        ? `${import.meta.env.BASE_URL}images/google.svg`
        : entry.id === "veridocx"
          ? `${import.meta.env.BASE_URL}images/veridocx-transparent.png`
          : experience.logo;
      return (
        <li className={`experience-stop experience-stop-${entry.id}`}>
          <img src={logo} alt="" />
          <div>
            <h3>{experience.company.split(" · ")[0]}</h3>
            <p>{entry.id === "verily" ? <>Training code gen models <a className="experience-inline-link" href="https://verily.com/" target="_blank" rel="noreferrer">@Verily</a> for healthcare languages</> : entry.id === "microsoft" ? <>Customer-facing agentic security insights for <a className="experience-inline-link" href="https://www.microsoft.com/en-us/microsoft-teams/group-chat-software" target="_blank" rel="noreferrer">MS Teams</a></> : experienceImpacts[entry.id]}</p>
            {experience.pressLinks && <div className="experience-press-links">
              {experience.pressLinks.map(({ label, url }) => <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={`Read about BitGo on ${label}`}><ProjectLinkIcon type="website" />{label}</a>)}
            </div>}
          </div>
        </li>
      );
    }
    return (
      <article className="record-entry experience-entry">
        <div className="experience-heading">
          <img className="company-logo" src={experience.logo} alt={`${experience.company.split(" · ")[0]} logo`} loading="lazy" />
          <div>
            <span>{experience.period}</span>
            <h3>{experience.role}</h3>
            <h4>{experience.company}</h4>
          </div>
        </div>
        <p>{experience.story}</p>
        <small>{experience.tools.join(" · ")}</small>
      </article>
    );
  }

  if (entry.type === "link") {
    return (
      <a className="record-entry thought-entry" href={entry.url} target="_blank" rel="noreferrer">
        <span>{entry.label}</span>
        <h3>{entry.title}</h3>
        <p>{entry.text}</p>
        <b aria-hidden="true">↗</b>
      </a>
    );
  }

  return (
    <article className="record-entry thought-entry">
      <span>{entry.label ?? "Note"}</span>
      <h3>{entry.title}</h3>
      <p>{entry.text}</p>
    </article>
  );
}

export default function ConstellationPanel({ constellation, onClose }) {
  const panelRef = useRef();

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!constellation) return null;

  const recordType = constellation.kind === "sky-feature" ? "SKY FEATURE" : "CONSTELLATION";
  const isExperience = constellation.name === "Experience";
  const isProjects = constellation.name === "Builds";
  const isTimeline = isExperience || isProjects;

  return (
    <div className="panel-backdrop" role="presentation" onPointerDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <aside className={`constellation-panel ${constellation.name === "Me" ? "me-panel" : ""} ${isTimeline ? "experience-panel" : ""} ${isExperience ? "has-experience-photo" : ""}`} ref={panelRef} tabIndex={-1} aria-label={`${constellation.name} ${recordType.toLowerCase()} record`}>
        <header>
          <div>
            <i className="panel-doodle" aria-hidden="true">✦ · · ✦</i>
            {!constellation.hideRecordMeta && !isTimeline && <span>{recordType} / {String(constellation.entries.length).padStart(2, "0")} RECORDS</span>}
            <h2>{constellation.name === "Me" ? "About Matthew" : constellation.name}</h2>
            {constellation.subtitle && !isTimeline && <p>{constellation.subtitle}</p>}
          </div>
          <button type="button" onClick={onClose} aria-label="Close record">Close <span aria-hidden="true">×</span></button>
        </header>
        {!isTimeline && <div className="panel-intro">
          <p>{constellation.description}</p>
          {constellation.note && <p>{constellation.note}</p>}
        </div>}
        {isTimeline ? (
          <RecordTimeline entries={constellation.entries} isExperience={isExperience} />
        ) : <div className="record-list">
          {constellation.entries.map((entry, index) => <Entry key={`${entry.id ?? entry.title}-${index}`} entry={entry} />)}
        </div>}
        {isExperience && (
          <div className="experience-photo">
            <img src={`${import.meta.env.BASE_URL}images/experience-reading-no-pillar.png`} alt="Matthew reading on a balcony" />
          </div>
        )}
        {constellation.name === "Me" && <MePhotoScene />}
      </aside>
    </div>
  );
}

export function RecordTimeline({ entries, isExperience = false }) {
  const isProjects = !isExperience;
  return (
          <ol className={`experience-timeline ${isProjects ? "project-timeline" : ""}`}>
            {(isExperience ? entries.slice(0, 3) : entries).map((entry) => <Entry key={entry.id} entry={entry} compactExperience={isExperience} compactProject={isProjects} />)}
            {isExperience && entries.length > 3 && (
              <li className="experience-more">
                <details>
                  <summary><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 7 5 5 5-5" /></svg><span className="show-more-label">Show more</span><span className="show-less-label">Show less</span></summary>
                  <ol className="experience-older">
                    {entries.slice(3).map((entry) => <Entry key={entry.id} entry={entry} compactExperience />)}
                  </ol>
                </details>
              </li>
            )}
          </ol>
  );
}

export function MePhotoScene() {
  return (
          <div className="me-photo-scene">
            <div className="me-photo-sparkles" aria-hidden="true">
              {[
                [12, 24, 18, -1.2], [27, 10, 12, -3.1], [77, 16, 22, -0.4],
                [88, 42, 13, -2.3], [18, 55, 11, -4.2], [70, 48, 15, -1.8],
                [35, 37, 9, -0.8], [83, 65, 10, -3.6], [9, 70, 15, -2.8],
              ].map(([x, y, size, delay], index) => (
                <span key={index} style={{ left: `${x}%`, top: `${y}%`, "--sparkle-size": `${size}px`, "--sparkle-delay": `${delay}s` }}>✦</span>
              ))}
            </div>
            <svg className="me-photo-composition" viewBox="0 0 1447 1087" preserveAspectRatio="xMidYMax meet" role="img" aria-label="Matthew standing behind a rocky hill">
              <image href={`${import.meta.env.BASE_URL}images/me/matthew.png`} x="553" y="80" width="341" height="732" />
              <image href={`${import.meta.env.BASE_URL}images/me/rocky-ground.png`} x="0" y="0" width="1447" height="1087" />
            </svg>
          </div>
  );
}
