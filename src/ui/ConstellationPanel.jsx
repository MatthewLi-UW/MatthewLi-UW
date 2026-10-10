import { useEffect, useRef, useState } from "react";
import { projectById } from "../data/projects";
import { experienceById } from "../data/experiences";

function Entry({ entry }) {
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
      <aside className={`constellation-panel ${constellation.name === "Me" ? "me-panel" : ""}`} ref={panelRef} tabIndex={-1} aria-label={`${constellation.name} ${recordType.toLowerCase()} record`}>
        <header>
          <div>
            <i className="panel-doodle" aria-hidden="true">✦ · · ✦</i>
            {!constellation.hideRecordMeta && <span>{recordType} / {String(constellation.entries.length).padStart(2, "0")} RECORDS</span>}
            <h2>{constellation.name}</h2>
            {constellation.subtitle && <p>{constellation.subtitle}</p>}
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
