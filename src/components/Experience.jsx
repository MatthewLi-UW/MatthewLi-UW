/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

/* Components */
import ExperienceCard from "./ExperienceCard";
import { useState, useRef, useEffect } from "react";

const BASE_URL = import.meta.env.BASE_URL;

const experiences = [
    {
      content: 'Jan 2026 Onwards',
      title: 'Software Engineer (Co-op',
      imgSrc: 'images/verily.jpeg',
      company: 'Verily (Google Life Sciences)',
      description: 'Precision Health Platform',
      skills: ['Golang', 'Kubernetes', 'Google Cloud', 'Terraform' ]
    },  
    {
      content: 'May 2025 Onwards',
      title: 'Software Engineer (Part-time)',
      imgSrc: 'images/veridocx.jpg',
      company: 'Veridocx',
      description: 'Engineering AI models and backend systems to help health startups navigate the regulatory maze.',
      skills: ['Full-Stack Development', 'Python', 'React', 'FastAPI', 'LangChain', 'Docker', 'Kubernetes', 'Azure' ]
    },  
    {
      content: 'January 2025 to April 2025',
      title: 'Full-Stack Developer (Co-op)',
      imgSrc: 'images/ops.png',
      company: 'Ontario Public Service - Ministry of Public and Business Service Delivery and Procurement',
      description: 'Co-led development of an AI-powered enterprise application. Contributed to RAG-based solutions and data pipelines.',
      skills: ['Python', 'C#', 'LangChain', 'Databricks', '.NET 9', 'JavaScript', 'SQL', 'Spark', 'Semantic Kernel']
    },  
    {
      content: 'January 2024 to April 2024',
      title: 'Data Governance Analyst (Co-op)',
      imgSrc: 'images/questrade.png',
      company: 'Questrade Financial Group - Questrade Technology Group',
      description: 'Implemented data governance policies and managed data quality initiatives. Led investigation of modern Open Banking API standards.',
      skills: ['Google Apps Script', 'JavaScript', 'Rest API', 'BigQuery', 'JQL']
    },    
    {
      content: 'May 2023 to August 2023',
      title: 'Software Developer (Co-op)',
      imgSrc: 'images/osfi_logo.svg',
      company: 'Office of the Superintendent of Financial Institutions (OSFI) - Technology Risk Division',
      description: 'Created internal backend tools to enhance workflow efficiency and automate risk assessment processes.',
      skills: ['Python', 'Power Query M', 'PowerBI', 'Rest API', 'Excel']
    },
    {
      content: 'April 2023 to September 2023',
      title: 'Software Developer (Freelance)',
      imgSrc: 'images/kjmedi.png',
      company: 'K J Medi Aesthetic Inc.',
      description: 'Designed and implemented custom software solutions for business operations.',
      skills: ['Angular', 'TypeScript', 'Node.js', 'HTML', 'CSS', 'Azure']
    },
];

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);

  // Lazy load the section when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="snap-section section relative overflow-hidden flex items-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container">
            <div className="mb-16 md:mb-20 text-center reveal-up scale-in">
                <h2 className="headline-2 mb-3 bg-gradient-to-r from-zinc-50 via-sky-200 to-zinc-50 bg-clip-text text-transparent">
                    Work Experience
                </h2>
                <p className="text-zinc-400 text-sm">Journey through my professional career</p>
            </div>

            {isVisible && (
              <div className="hidden md:block mb-16 px-4 relative">
                  <div className="absolute top-[11px] left-0 right-0 h-1 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 rounded-full"></div>

                  <div
                    className="absolute top-[11px] left-0 h-1 bg-gradient-to-r from-sky-400 to-sky-300 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${(activeIndex / (experiences.length - 1)) * 100}%` }}
                  ></div>

                  <div className="flex justify-between relative z-10">
                      {experiences.map((exp, index) => {
                        const isActive = index === activeIndex;
                        const isPast = index < activeIndex;

                        return (
                          <div
                              key={index}
                              className={`flex flex-col items-center cursor-pointer transition-all duration-500 group ${
                                  isActive ? 'scale-110' : 'hover:scale-105'
                              }`}
                              onClick={() => setActiveIndex(index)}
                          >
                              
                              <div className="relative">
                                  {isActive && (
                                    <div className="absolute inset-0 w-6 h-6 bg-sky-400/30 rounded-full blur-md animate-pulse"></div>
                                  )}

                                  <div className="relative bg-zinc-900 p-1 rounded-full">
                                      <div
                                          className={`w-5 h-5 rounded-full transition-all duration-500 ${
                                              isActive
                                                  ? 'bg-gradient-to-br from-sky-300 to-sky-500 shadow-lg shadow-sky-400/50'
                                                  : isPast
                                                  ? 'bg-sky-400/60 group-hover:bg-sky-400/80'
                                                  : 'bg-zinc-700 group-hover:bg-zinc-600'
                                          }`}
                                      ></div>
                                  </div>
                              </div>

                              <p className={`text-xs mt-4 font-medium transition-all duration-300 text-center max-w-[120px] ${
                                  isActive
                                      ? 'text-sky-400 font-semibold'
                                      : isPast
                                      ? 'text-zinc-400'
                                      : 'text-zinc-500 group-hover:text-zinc-400'
                              }`}>
                                  {exp.content}
                              </p>
                          </div>
                        );
                      })}
                  </div>
              </div>
            )}
            <div className="md:hidden space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : experiences.length - 1))}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 text-zinc-400 hover:bg-sky-400/10 hover:text-sky-400 hover:border-sky-400/30 transition-all active:scale-95"
                        aria-label="Previous experience"
                    >
                        ←
                    </button>
                    <div className="text-center">
                        <p className="text-sm text-sky-400 font-semibold">
                            {experiences[activeIndex].content}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                            {activeIndex + 1} of {experiences.length}
                        </p>
                    </div>
                    <button
                        onClick={() => setActiveIndex(prev => (prev < experiences.length - 1 ? prev + 1 : 0))}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 text-zinc-400 hover:bg-sky-400/10 hover:text-sky-400 hover:border-sky-400/30 transition-all active:scale-95"
                        aria-label="Next experience"
                    >
                        →
                    </button>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400/20 to-sky-300/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 backdrop-blur-xl rounded-2xl p-6 border border-zinc-700/50 shadow-xl">
                        <div className="flex items-start gap-4 mb-6">

                            <div className="relative group/logo flex-shrink-0">
                                <div className="absolute -inset-0.5 bg-gradient-to-br from-sky-400 to-sky-300 rounded-xl opacity-0 group-hover/logo:opacity-100 transition-opacity blur"></div>
                                <div className="relative w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center shadow-lg">
                                    <img
                                        src={`${BASE_URL}${experiences[activeIndex].imgSrc}`}
                                        alt={experiences[activeIndex].company}
                                        className="max-w-full max-h-full object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-white mb-1 leading-tight">{experiences[activeIndex].title}</h3>
                                <p className="text-sky-400 text-sm font-medium">{experiences[activeIndex].company}</p>
                            </div>
                        </div>

                        <p className="text-zinc-300 mb-6 text-sm leading-relaxed">{experiences[activeIndex].description}</p>

                        <div>
                            <p className="text-xs font-semibold text-zinc-400 mb-3 uppercase tracking-wider">Tech Stack</p>
                            <div className="flex flex-wrap gap-2">
                                {experiences[activeIndex].skills && experiences[activeIndex].skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="group/skill relative px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-400/10 text-sky-300 border border-sky-400/20 hover:bg-sky-400/20 hover:border-sky-400/40 transition-all cursor-default"
                                        style={{ animationDelay: `${i * 50}ms` }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-2">
                    {experiences.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                index === activeIndex
                                    ? 'bg-sky-400 w-8'
                                    : 'bg-zinc-700 w-1.5 hover:bg-zinc-600'
                            }`}
                            aria-label={`Experience ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {isVisible && (
              <div className="hidden md:block relative min-h-[550px]">
                  {experiences.map((experience, index) => {
                    if (Math.abs(index - activeIndex) > 1) return null;

                    const isActive = index === activeIndex;

                    return (
                      <div
                          key={index}
                          className={`absolute w-full transition-all duration-700 ${
                              isActive
                                ? 'opacity-100 z-10 scale-100'
                                : 'opacity-0 z-0 scale-95 pointer-events-none'
                          }`}
                      >
                          <div className="relative group">
                              
                              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400/0 via-sky-400/30 to-sky-400/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                              <div className="relative bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-2xl rounded-2xl p-10 border border-zinc-700/50 shadow-2xl overflow-hidden">
                                  
                                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-400/10 to-transparent rounded-full blur-3xl"></div>
                                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-sky-400/5 to-transparent rounded-full blur-3xl"></div>

                                  <div className="relative">
                                      
                                      <div className="flex items-center mb-8">
                                          
                                          <div className="relative group/logo mr-6 flex-shrink-0">
                                              <div className="absolute -inset-1 bg-gradient-to-br from-sky-400 to-sky-300 rounded-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 blur"></div>
                                              <div className="relative w-20 h-20 rounded-2xl bg-white p-3 flex items-center justify-center shadow-xl transform group-hover/logo:scale-105 transition-transform duration-300">
                                                  <img
                                                      src={`${BASE_URL}${experience.imgSrc}`}
                                                      alt={experience.company}
                                                      className="max-w-full max-h-full object-contain"
                                                      loading="lazy"
                                                      width="80"
                                                      height="80"
                                                  />
                                              </div>
                                          </div>

                                          <div className="flex-1">
                                              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-2">
                                                  {experience.title}
                                              </h3>
                                              <p className="text-sky-400 text-lg font-semibold">{experience.company}</p>
                                          </div>


                                          <div className="hidden lg:block px-4 py-2 rounded-xl bg-sky-400/10 border border-sky-400/20">
                                              <p className="text-sm text-sky-300 font-medium whitespace-nowrap">{experience.content}</p>
                                          </div>
                                      </div>


                                      <p className="text-zinc-300 mb-8 text-base leading-relaxed max-w-4xl">
                                          {experience.description}
                                      </p>


                                      <div>
                                          <p className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                                              <span className="w-1 h-4 bg-sky-400 rounded-full"></span>
                                              Technologies & Skills
                                          </p>
                                          <div className="flex flex-wrap gap-3">
                                              {experience.skills && experience.skills.map((skill, i) => (
                                                  <span
                                                      key={i}
                                                      className="group/skill relative px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-br from-sky-400/10 to-sky-400/5 text-sky-300 border border-sky-400/20 hover:bg-sky-400/20 hover:border-sky-400/40 hover:scale-105 hover:shadow-lg hover:shadow-sky-400/20 transition-all duration-300 cursor-default"
                                                      style={{
                                                        animationDelay: `${i * 75}ms`,
                                                        animation: isActive ? 'fadeInUp 0.5s ease-out forwards' : 'none',
                                                        opacity: isActive ? 1 : 0
                                                      }}
                                                      onMouseEnter={() => setHoveredSkill(skill)}
                                                      onMouseLeave={() => setHoveredSkill(null)}
                                                  >
                                                      {skill}
                                                      {hoveredSkill === skill && (
                                                        <span className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-sky-300/20 rounded-xl blur"></span>
                                                      )}
                                                  </span>
                                              ))}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                    );
                  })}
              </div>
            )}
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
    </section>
  )
}

export default Experience