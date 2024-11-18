/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

/* Components */
import ExperienceCard from "./ExperienceCard";

const experiences = [
    {
      content: 'January 2025 to April 2025',
      title: 'Full-Stack Developer (Co-op)',
      imgSrc: '/images/ops.png',
      company: 'Ontario Public Service - Ministry of Public and Business Service Delivery and Procurement'
    },  

    {
      content: 'January 2024 to April 2024',
      title: 'Data Governance Analyst (Co-op)',
      imgSrc: '/images/questrade.png',
      company: 'Questrade Financial Group - Questrade Technology Group'
    },    

    {
      content: 'May 2023 to August 2023',
      title: 'Technology Risk Student (Co-op)',
      imgSrc: '/images/osfi_logo.svg',
      company: 'Office of the Superintendent of Financial Institutions (OSFI) - Technology Risk Division'
    },

    {
      content: 'May 2023 to August 2023',
      title: 'Software Developer (Freelance)',
      imgSrc: '/images/kjmedi.png',
      company: 'K J Medi Aesthetic Inc.'
    },
  ];

const Experience = () => {
  return (
    <section 
    id="experience"
    className="section overflow-hidden">
        <div className="container">
            <h2 className="headline-2 mb-8 reveal-up">
                Work Experience
            </h2>
            <div className="">
                {experiences.map(({content, title, imgSrc, company}, key) => (
                    <ExperienceCard 
                    key={key}
                    title={title}
                    imgSrc={`${imgSrc}`}
                    company={company}
                    content={content}/>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Experience