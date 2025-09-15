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
      content: 'May 2025 Onwards',
      title: 'ML Backend Engineer (Part-time)',
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
      title: 'Tools Developer (Co-op)',
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
      className="section bg-zinc-900">
        <div className="container">
            <h2 className="headline-2 mb-12 md:mb-16 reveal-up">
                Work Experience
            </h2>
            
            {/* Enhanced Timeline */}
            {isVisible && (
              <div className="hidden md:block mb-12 px-4 relative">
                  {/* Continuous timeline line - Adjusted to center with dots */}
                  <div className="absolute top-[9px] left-0 right-0 h-0.5 bg-zinc-700"></div>
                  
                  {/* Timeline points */}
                  <div className="flex justify-between relative z-10">
                      {experiences.map((exp, index) => (
                          <div 
                              key={index} 
                              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                                  index === activeIndex ? 'scale-110' : ''
                              }`}
                              onClick={() => setActiveIndex(index)}
                          >
                              {/* Timeline dot with solid background */}
                              <div className="bg-zinc-900 p-0.5 rounded-full">
                                  <div 
                                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                                          index === activeIndex 
                                              ? 'bg-accent border-accent ring-2 ring-accent/30' 
                                              : 'bg-zinc-600 border-zinc-500 hover:bg-zinc-500'
                                      }`}
                                  ></div>
                              </div>
                              
                              {/* Date label */}
                              <p className={`text-xs mt-3 font-medium transition-all duration-300 ${
                                  index === activeIndex 
                                      ? 'text-accent' 
                                      : 'text-zinc-500 opacity-70'
                              }`}>
                                  {exp.content}
                              </p>
                          </div>
                      ))}
                  </div>
              </div>
            )}
            
            {/* Mobile experience cards - Using same styling as desktop */}
            <div className="md:hidden space-y-8 px-4">
                {/* Current active experience card */}
                <div className="mb-4 flex justify-between items-center">
                    <button 
                        onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : experiences.length - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        aria-label="Previous experience"
                    >
                        ←
                    </button>
                    <p className="text-sm text-accent font-medium">
                        {experiences[activeIndex].content}
                    </p>
                    <button 
                        onClick={() => setActiveIndex(prev => (prev < experiences.length - 1 ? prev + 1 : 0))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        aria-label="Next experience"
                    >
                        →
                    </button>
                </div>
                
                {/* Card with the same styling as desktop */}
                <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700/50">
                    {/* Improved header layout */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-5 gap-4">
                        {/* Logo container with better dimensions */}
                        <div className="w-16 h-16 rounded-lg bg-white p-1.5 flex items-center justify-center flex-shrink-0">
                            <img 
                                src={`${BASE_URL}${experiences[activeIndex].imgSrc}`} 
                                alt={experiences[activeIndex].company} 
                                className="max-w-full max-h-full object-contain"
                                loading="lazy"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">{experiences[activeIndex].title}</h3>
                            <p className="text-accent text-sm">{experiences[activeIndex].company}</p>
                        </div>
                    </div>
                    
                    <p className="text-zinc-300 mb-5 text-sm">{experiences[activeIndex].description}</p>
                    
                    <div className="mb-3">
                        <p className="text-xs text-zinc-400 mb-2">Technologies & Skills:</p>
                        <div className="flex flex-wrap gap-2">
                            {experiences[activeIndex].skills && experiences[activeIndex].skills.map((skill, i) => (
                                <span key={i} className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Mini timeline indicator dots */}
                <div className="flex justify-center gap-2 mt-4">
                    {experiences.map((_, index) => (
                        <button 
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === activeIndex ? 'bg-accent scale-125' : 'bg-zinc-600'
                            }`}
                            aria-label={`Experience ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
            
            {/* Desktop experience showcase - Performance optimized */}
            {isVisible && (
              <div className="hidden md:block relative h-[500px]">
                  {/* Only render the currently active card and adjacent cards */}
                  {experiences.map((experience, index) => {
                    // Only render cards that are active, or immediately adjacent
                    if (Math.abs(index - activeIndex) > 1) return null;
                    
                    return (
                      <div 
                          key={index}
                          className={`absolute w-full transition-opacity duration-300 ${
                              index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                          }`}
                      >
                          <div className="bg-zinc-800 rounded-xl p-8 border border-zinc-700/50">
                              <div className="flex items-center mb-6">
                                  <div className="w-16 h-16 mr-6 overflow-hidden rounded-lg bg-white p-2 flex items-center justify-center">
                                      <img 
                                          src={`${BASE_URL}${experience.imgSrc}`} 
                                          alt={experience.company} 
                                          className="max-w-full max-h-full object-contain"
                                          loading="lazy"
                                          width="64"
                                          height="64"
                                      />
                                  </div>
                                  <div>
                                      <h3 className="text-2xl font-bold text-white mb-1">{experience.title}</h3>
                                      <p className="text-accent">{experience.company}</p>
                                  </div>
                              </div>
                              
                              <p className="text-zinc-300 mb-6">{experience.description}</p>
                              
                              <div className="mb-4">
                                  <p className="text-sm text-zinc-400 mb-3">Technologies & Skills:</p>
                                  <div className="flex flex-wrap gap-2">
                                      {experience.skills && experience.skills.map((skill, i) => (
                                          <span key={i} className="bg-accent/10 text-accent text-xs px-3 py-1 rounded-full">
                                              {skill}
                                          </span>
                                      ))}
                                  </div>
                              </div>
                              
                              <div className="mt-8 text-right">
                                  <span className="text-sm text-zinc-400">{experience.content}</span>
                              </div>
                          </div>
                      </div>
                    );
                  })}
                  
              </div>
            )}
        </div>
    </section>
  )
}

export default Experience