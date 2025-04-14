/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

/* Components */
import ProjectCard from "./ProjectCard";

const BASE_URL = import.meta.env.BASE_URL;

const works = [
    {
      imgSrc: 'images/braintrainr.png',
      title: 'BrainTrainr - AI Learning',
      tags: ['AI', 'LLM', 'Full-Stack'],
      projectLink: 'https://meta-llama-hackathon.vercel.app/'
    },
    {
      imgSrc: 'images/valisesquare.png',
      title: 'Valise - Travel App',
      tags: ['Android', 'Kotlin', 'MVVM'],
      projectLink: 'https://github.com/MatthewLi-UW/valise'
    },
    {
      imgSrc: 'images/raiinet.png',
      title: 'RAIInet - Ability Chess',
      tags: ['Linux', 'C++', 'MVC'],
      projectLink: ''
    },
    {
      imgSrc: 'images/countries.png',
      title: 'Top Headlines - Web App',
      tags: ['JavaScript', 'API'],
      projectLink: 'https://github.com/MatthewLi-UW/CountryNews'
    },
    {
      imgSrc: 'images/anilens.png',
      title: 'AniLens - Anime Recommender',
      tags: ['Python', 'Machine Learning'],
      projectLink: ''
    },
    {
      imgSrc: 'images/qlife.png',
      title: 'Qife - Website',
      tags: ['Angular', 'TypeScript', 'Azure'],
      projectLink: ''
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