/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

/* Components */
import ProjectCard from "./ProjectCard";

const BASE_URL = import.meta.env.BASE_URL;

const works = [
    {
      imgSrc: 'images/valise.png',
      title: 'Valise - Travel App',
      tags: ['Android', 'Kotlin', 'MVVM'],
      projectLink: ''
    },
    {
      imgSrc: 'images/raiinet.png',
      title: 'RAIInet - Ability Chess',
      tags: ['Linux', 'C++', 'MVC'],
      projectLink: 'https://pixstock-official.vercel.app/'
    },
    {
      imgSrc: 'images/project-3.jpg',
      title: 'Top Headlines - Web App',
      tags: ['JavaScript', 'API'],
      projectLink: ''
    },
    {
      imgSrc: 'images/project-4.jpg',
      title: 'Real state website',
      tags: ['Web-design', 'Development'],
      projectLink: 'https://github.com/codewithsadee-org/wealthome'
    },
    {
      imgSrc: 'images/project-5.jpg',
      title: 'eCommerce website',
      tags: ['eCommerce', 'Development'],
      projectLink: 'https://github.com/codewithsadee/anon-ecommerce-website'
    },
    {
      imgSrc: 'images/project-6.jpg',
      title: 'vCard Personal portfolio',
      tags: ['Web-design', 'Development'],
      projectLink: 'https://github.com/codewithsadee/vcard-personal-portfolio'
    },
  ];

const Work = () => {
  return (
    <section id="work" className="section">

        <div className="container">

            <h2 className="headline-2 mb-8 reveal-up">Some projects that I've worked on</h2>
            <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
                {works.map(({ imgSrc, title, tags, projectLink }, key) => (
                    <ProjectCard 
                    key={key}
                    imgSrc={`${BASE_URL}${imgSrc}`}
                    title={title}
                    tags={tags}
                    projectLink={projectLink}
                    classes="reveal-up"
                    />
                ))}
            </div>

        </div>

    </section>
  )
}

export default Work