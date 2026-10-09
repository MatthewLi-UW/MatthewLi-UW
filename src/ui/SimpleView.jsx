import { projects } from "../data/projects";
import { experiences } from "../data/experiences";

export default function SimpleView({ onClose, isFallback = false }) {
  return (
    <div className="simple-view">
      <header className="simple-header">
        <a href={import.meta.env.BASE_URL} className="wordmark">MATTHEW LI</a>
        {!isFallback && <button type="button" className="simple-close" onClick={onClose}>Return to observatory <span aria-hidden="true">↗</span></button>}
      </header>
      <main>
        <section className="simple-hero">
          <span>COMPUTER SCIENCE + BUSINESS · AI SPECIALIZATION · WATERLOO</span>
          <h1>I build AI systems for difficult, real-world problems.</h1>
          <p>I’m Matthew, a Waterloo CS + BBA double-degree student. My work spans security agents at Microsoft, quantum-resistant Bitcoin infrastructure at BitGo, healthcare developer tooling at Verily, and products of my own.</p>
          <div className="simple-actions">
            <a href="mailto:mf5li@uwaterloo.ca">Email me ↗</a>
            <a href="https://github.com/MatthewLi-UW" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/matthew-li-mfl/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </section>

        <section className="simple-section">
          <div className="simple-section-title"><span>01</span><h2>Builds</h2></div>
          <div className="simple-projects">
            {projects.map((project) => {
              const ProjectCard = project.url ? "a" : "article";
              return (
              <ProjectCard key={project.id} {...(project.url ? { href: project.url, target: "_blank", rel: "noreferrer" } : {})}>
                <span>{project.eyebrow}</span><h3>{project.name}</h3><p>{project.summary}</p><small>{project.tags.join(" · ")}</small>
              </ProjectCard>
              );
            })}
          </div>
        </section>

        <section className="simple-section">
          <div className="simple-section-title"><span>02</span><h2>Experience</h2></div>
          <div className="simple-experiences">
            {experiences.map((experience) => (
              <article key={experience.id}>
                <span>{experience.period}</span><div><img className="company-logo" src={experience.logo} alt={`${experience.company.split(" · ")[0]} logo`} loading="lazy" /><h3>{experience.role}</h3><h4>{experience.company}</h4><p>{experience.story}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="simple-section simple-notes">
          <div className="simple-section-title"><span>03</span><h2>Education + toolkit</h2></div>
          <div>
            <article><span>UNIVERSITY OF WATERLOO · 2022–2027</span><h3>CS + Business Administration</h3><p>Double degree with an Artificial Intelligence specialization and a 3.7/4.0 GPA.</p></article>
            <article><span>LANGUAGES</span><h3>From Python to Rust</h3><p>Python, Go, TypeScript, JavaScript, C, C++, C#, Java, Kotlin, Rust, SQL, HTML, CSS, M, and Bash.</p></article>
            <article><span>SYSTEMS</span><h3>Built across the stack</h3><p>React, Next.js, Node.js, .NET, PostgreSQL, Redis, Docker, Kubernetes, Terraform, GCP, Azure, Databricks, PyTorch, and LangChain.</p></article>
          </div>
        </section>
      </main>
      <footer className="simple-footer"><span>MATTHEW LI · 2026</span><a href="mailto:mf5li@uwaterloo.ca">mf5li@uwaterloo.ca</a></footer>
    </div>
  );
}
