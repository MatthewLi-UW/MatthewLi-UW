import { useEffect, useRef } from "react";
import { projectById } from "../data/projects";
import { experienceById } from "../data/experiences";

function Entry({ entry }) {
  if (entry.type === "project") {
    const project = projectById[entry.id];
    if (!project) return null;
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

  return (
    <div className="panel-backdrop" role="presentation" onPointerDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <aside className="constellation-panel" ref={panelRef} tabIndex={-1} aria-label={`${constellation.name} ${recordType.toLowerCase()} record`}>
        <header>
          <div>
            <i className="panel-doodle" aria-hidden="true">✦ · · ✦</i>
            <span>{recordType} / {String(constellation.entries.length).padStart(2, "0")} RECORDS</span>
            <h2>{constellation.name}</h2>
            <p>{constellation.subtitle}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close record">Close <span aria-hidden="true">×</span></button>
        </header>
        <div className="panel-intro">
          <p>{constellation.description}</p>
          {constellation.note && <p>{constellation.note}</p>}
        </div>
        <div className="record-list">
          {constellation.entries.map((entry, index) => <Entry key={`${entry.id ?? entry.title}-${index}`} entry={entry} />)}
        </div>
      </aside>
    </div>
  );
}
