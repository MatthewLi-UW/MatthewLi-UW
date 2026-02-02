import { useMemo, useState } from "react";

const BASE_URL = import.meta.env.BASE_URL;

const skillGroups = [
  {
    id: "languages",
    label: "Languages",
    icon: "code",
    color: "#38BDF8",
    skills: [
      { label: "Python", imgSrc: "images/python.svg" },
      { label: "TypeScript", imgSrc: "images/typescript.svg" },
      { label: "JavaScript", imgSrc: "images/javascript.svg" },
      { label: "C#", imgSrc: "images/csharp.svg" },
      { label: "C++", imgSrc: "images/cplusplus.svg" },
      { label: "Go", imgSrc: "images/Go_Logo_Blue.png" },
      { label: "Bash", imgSrc: "images/bash.svg" },
      { label: "Java", imgSrc: "images/java.png" },
      { label: "Kotlin", imgSrc: "images/kotlin.svg" },
    ],
  },
  {
    id: "web",
    label: "Web + Backend",
    icon: "web",
    color: "#60A5FA",
    skills: [
      { label: "React", imgSrc: "images/react.svg" },
      { label: "Next.js", imgSrc: "images/next.svg" },
      { label: "Node.js", imgSrc: "images/nodejs.svg" },
      { label: "Flask", imgSrc: "images/flask.png" },
      { label: "Angular", imgSrc: "images/angular.svg" },
      { label: ".NET", imgSrc: "images/dotnet.png" },
      { label: "PostgreSQL", imgSrc: "images/postgresql.svg" },
      { label: "MongoDB", imgSrc: "images/mongodb.svg" },
    ],
  },
  {
    id: "ml",
    label: "AI + Data",
    icon: "neurology",
    color: "#34D399",
    skills: [
      { label: "PyTorch", imgSrc: "images/pytorch.png" },
      { label: "Scikit-learn", imgSrc: "images/scikit-learn.png" },
      { label: "LangChain", imgSrc: "images/langchain.png" },
      { label: "Pandas", imgSrc: "images/pandas.png" },
      { label: "Spark", imgSrc: "images/spark.png" },
      { label: "Databricks", imgSrc: "images/databricks.png" },
      { label: "TensorFlow", imgSrc: "images/tensorflow.png" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud + DevOps",
    icon: "cloud",
    color: "#FBBF24",
    skills: [
      { label: "Google Cloud", imgSrc: "images/google-cloud.svg" },
      { label: "Azure", imgSrc: "images/azure.svg" },
      { label: "Firebase", imgSrc: "images/firebase.png" },
      { label: "Git", imgSrc: "images/git.svg" },
      { label: "GitLab", imgSrc: "images/gitlab.svg" },
    ],
  },
];

const Skill = () => {
  const [activeGroup, setActiveGroup] = useState("all");
  const [query, setQuery] = useState("");

  const allSkills = useMemo(
    () =>
      skillGroups.flatMap((group) =>
        group.skills.map((skill) => ({
          ...skill,
          groupId: group.id,
          groupLabel: group.label,
          groupColor: group.color,
        }))
      ),
    []
  );

  const visibleSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesGroup = activeGroup === "all" || skill.groupId === activeGroup;
      const matchesQuery =
        query.trim() === "" ||
        skill.label.toLowerCase().includes(query.toLowerCase()) ||
        skill.groupLabel.toLowerCase().includes(query.toLowerCase());

      return matchesGroup && matchesQuery;
    });
  }, [activeGroup, allSkills, query]);

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="headline-2 mb-3 reveal-up">Skills</h2>
        <p className="text-zinc-400 mb-8 reveal-up">Browse by field and quickly find the tools I use.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 reveal-up">
          {skillGroups.map((group) => (
            <div key={group.id} className="rounded-xl bg-zinc-800/60 ring-1 ring-zinc-50/5 p-4">
              <p className="text-xs text-zinc-500">{group.label}</p>
              <p className="text-2xl font-semibold mt-1" style={{ color: group.color }}>
                {group.skills.length}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-zinc-800/50 rounded-2xl ring-1 ring-zinc-50/5 p-4 md:p-6 reveal-up">
          <div className="grid gap-3 md:grid-cols-[1fr,auto] mb-5">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="text-field"
              placeholder="Search skill or field"
              aria-label="Search skills"
            />

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveGroup("all")}
                className={`h-10 px-4 rounded-lg text-sm ring-1 transition-colors ${
                  activeGroup === "all"
                    ? "bg-sky-400/15 text-sky-200 ring-sky-300/30"
                    : "bg-zinc-700/40 text-zinc-300 ring-zinc-50/10 hover:bg-zinc-700"
                }`}
              >
                All Fields
              </button>
              {skillGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setActiveGroup(group.id)}
                  className={`h-10 px-3 rounded-lg text-sm ring-1 transition-colors inline-flex items-center gap-2 ${
                    activeGroup === group.id
                      ? "text-white"
                      : "bg-zinc-700/40 text-zinc-300 ring-zinc-50/10 hover:bg-zinc-700"
                  }`}
                  style={{
                    backgroundColor: activeGroup === group.id ? `${group.color}22` : undefined,
                    borderColor: activeGroup === group.id ? `${group.color}66` : undefined,
                  }}
                >
                  <span className="material-symbols-rounded text-base leading-none -translate-y-px">{group.icon}</span>
                  {group.label}
                </button>
              ))}
            </div>
          </div>

          {visibleSkills.length === 0 ? (
            <div className="rounded-xl bg-zinc-900/50 border border-zinc-700/70 p-6 text-zinc-400 text-sm">
              No skills match this filter. Try another field or search term.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {visibleSkills.map((skill) => (
                <article
                  key={`${skill.groupId}-${skill.label}`}
                  className="rounded-xl bg-zinc-900/60 ring-1 ring-zinc-50/5 p-4 border-l-2"
                  style={{ borderLeftColor: skill.groupColor }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <figure className="w-10 h-10 rounded-lg bg-zinc-800 grid place-items-center p-2 shrink-0">
                      <img
                        src={`${BASE_URL}${skill.imgSrc}`}
                        alt={skill.label}
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    </figure>
                    <div className="min-w-0">
                      <p className="text-zinc-100 font-medium truncate">{skill.label}</p>
                      <p className="text-xs text-zinc-400 truncate">{skill.groupLabel}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skill;
