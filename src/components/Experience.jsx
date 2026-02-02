/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

import { useMemo, useState } from "react";

const BASE_URL = import.meta.env.BASE_URL;

const experiences = [
  {
    period: "Jan 2026 onwards",
    title: "Software Engineer (Co-op)",
    imgSrc: "images/verily.jpeg",
    company: "Verily (Google Life Sciences)",
    description: "Precision Health Platform",
    skills: ["Go", "Kubernetes", "Google Cloud", "Terraform"],
  },
  {
    period: "May 2025 onwards",
    title: "Software Engineer (Part-time)",
    imgSrc: "images/veridocx.jpg",
    company: "Veridocx",
    description:
      "Engineering AI models and backend systems to help health startups navigate the regulatory maze.",
    skills: ["Python", "React", "FastAPI", "LangChain", "Docker", "Kubernetes", "Azure"],
  },
  {
    period: "Jan 2025 - Apr 2025",
    title: "Full-Stack Developer (Co-op)",
    imgSrc: "images/ops.png",
    company: "Ontario Public Service",
    description:
      "Co-led development of an AI-powered enterprise application with RAG solutions and production data pipelines.",
    skills: ["Python", "C#", "Databricks", ".NET 9", "JavaScript", "SQL", "Spark", "Semantic Kernel"],
  },
  {
    period: "Jan 2024 - Apr 2024",
    title: "Data Analyst (Co-op)",
    imgSrc: "images/questrade.png",
    company: "Questrade Financial Group",
    description:
      "Open Banking API for modern fintech systems.",
    skills: ["Apps Script", "JavaScript", "REST API", "BigQuery", "JQL"],
  },
  {
    period: "May 2023 - Aug 2023",
    title: "Software Developer (Co-op)",
    imgSrc: "images/osfi_logo.svg",
    company: "OSFI - Technology Risk Division",
    description:
      "Built internal backend automation to improve risk workflow efficiency in a regulated environment.",
    skills: ["Python", "Power Query M", "Power BI", "REST API", "Excel"],
  },
  {
    period: "Apr 2023 - Sep 2023",
    title: "Software Developer (Freelance)",
    imgSrc: "images/kjmedi.png",
    company: "K J Medi Aesthetic Inc.",
    description: "Designed and implemented custom software solutions for business operations.",
    skills: ["Angular", "TypeScript", "Node.js", "HTML", "CSS", "Azure"],
  },
];

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExperience = useMemo(() => experiences[activeIndex], [activeIndex]);

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="headline-2 mb-3 reveal-up">Work Experience</h2>
        <p className="text-zinc-400 mb-10 reveal-up">Roles where I shipped product-facing engineering work.</p>

        <div className="hidden lg:grid lg:grid-cols-[320px,1fr] gap-6 reveal-up">
          <div className="bg-zinc-800/50 rounded-2xl p-3 ring-1 ring-inset ring-zinc-50/5">
            {experiences.map((experience, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={experience.company}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left rounded-xl px-4 py-3 mb-2 last:mb-0 transition-colors ${
                    isActive
                      ? "bg-sky-400/15 ring-1 ring-sky-300/30"
                      : "bg-transparent hover:bg-zinc-700/40 ring-1 ring-transparent"
                  }`}
                >
                  <p className="text-sm text-zinc-400 mb-1">{experience.period}</p>
                  <p className={`font-medium ${isActive ? "text-sky-200" : "text-zinc-100"}`}>{experience.title}</p>
                  <p className="text-sm text-zinc-400 truncate">{experience.company}</p>
                </button>
              );
            })}
          </div>

          <article className="bg-zinc-800/55 rounded-2xl p-8 ring-1 ring-inset ring-zinc-50/5">
            <div className="flex items-start gap-4 mb-5">
              <figure className="w-16 h-16 rounded-xl bg-white p-2 shrink-0">
                <img
                  src={`${BASE_URL}${activeExperience.imgSrc}`}
                  alt={activeExperience.company}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </figure>

              <div className="min-w-0">
                <p className="text-sm text-sky-300 mb-1">{activeExperience.period}</p>
                <h3 className="headline-3 mb-1">{activeExperience.title}</h3>
                <p className="text-zinc-300">{activeExperience.company}</p>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed mb-6">{activeExperience.description}</p>

            <div className="flex flex-wrap gap-2">
              {activeExperience.skills.map((skill) => (
                <span
                  key={skill}
                  className="h-8 px-3 text-sm bg-zinc-50/5 text-zinc-300 grid place-items-center rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        </div>

        <div className="lg:hidden grid gap-4 reveal-up">
          {experiences.map((experience) => (
            <article
              key={`${experience.company}-${experience.period}`}
              className="bg-zinc-800/55 rounded-2xl p-5 ring-1 ring-inset ring-zinc-50/5"
            >
              <div className="flex items-start gap-3 mb-4">
                <figure className="w-12 h-12 rounded-lg bg-white p-1.5 shrink-0">
                  <img
                    src={`${BASE_URL}${experience.imgSrc}`}
                    alt={experience.company}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </figure>
                <div>
                  <p className="text-xs text-sky-300 mb-1">{experience.period}</p>
                  <h3 className="text-base font-semibold text-zinc-50 leading-tight">{experience.title}</h3>
                  <p className="text-sm text-zinc-300">{experience.company}</p>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-4">{experience.description}</p>

              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill) => (
                  <span
                    key={`${experience.company}-${skill}`}
                    className="h-7 px-2.5 text-xs bg-zinc-50/5 text-zinc-300 grid place-items-center rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
