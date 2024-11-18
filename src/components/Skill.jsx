/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

/* Components */
import SkillCard from "./SkillCard";

const skillItemProficient = [

    {
      imgSrc: '/images/python.svg',
      label: 'Python',
      desc: ''
    },
    {
      imgSrc: '/images/cplusplus.svg',
      label: 'C++',
      desc: ''
    },

    {
      imgSrc: '/images/typescript.svg',
      label: 'TypeScript',
      desc: ''
    },
    {
      imgSrc: '/images/javascript.svg',
      label: 'JavaScript',
      desc: ''
    },
    {
      imgSrc: '/images/nodejs.svg',
      label: 'NodeJS',
      desc: ''
    },    
    {
      imgSrc: '/images/sql2.png',
      label: 'SQL',
      desc: ''
    },    
    {
      imgSrc: '/images/angular.svg',
      label: 'Angular',
      desc: ''
    },
    {
      imgSrc: '/images/html.svg',
      label: 'HTML',
      desc: ''
    },
    {
      imgSrc: '/images/css3.svg',
      label: 'CSS',
      desc: ''
    },    
    {
      imgSrc: '/images/git.svg',
      label: 'Git',
      desc: ''
    },
    {
      imgSrc: '/images/m.svg',
      label: 'Power Query M',
      desc: ''
    },
    {
      imgSrc: '/images/bash.svg',
      label: 'Bash',
      desc: ''
    },
    {
      imgSrc: '/images/apps-script.svg',
      label: 'Apps Script',
      desc: ''
    },
    {
      imgSrc: '/images/azure.svg',
      label: 'Azure',
      desc: ''
    },
    {
      imgSrc: '/images/powerbi.png',
      label: 'PowerBI',
      desc: ''
    },



  ];

  const skillItemFamiliar = [    
    {
      imgSrc: '/images/c.svg',
      label: 'C',
      desc: ''
    },
    {
      imgSrc: '/images/react.svg',
      label: 'React',
      desc: ''
    },    
    {
      imgSrc: '/images/java.png',
      label: 'Java',
      desc: ''
    },

    {
      imgSrc: '/images/kotlin.svg',
      label: 'Kotlin',
      desc: ''
    },
    {
      imgSrc: '/images/firebase.png',
      label: 'Firebase',
      desc: ''
    },
    {
      imgSrc: '/images/gitlab.svg',
      label: 'GitLab',
      desc: ''
    },
    {
      imgSrc: '/images/google-cloud.svg',
      label: 'Google Cloud',
      desc: ''
    },
    {
      imgSrc: '/images/pandas.png',
      label: 'Pandas',
      desc: ''
    },    
    {
      imgSrc: '/images/racket.svg',
      label: 'Racket',
      desc: ''
    },
    {
      imgSrc: '/images/figma.svg',
      label: 'Figma',
      desc: ''
    },

    {
      imgSrc: '/images/tailwindcss.svg',
      label: 'TailwindCSS',
      desc: ''
    },

    
  ];


const Skill = () => {
  return (
    <section className="section">
        <div className="container">

            <h2 className="headline-2 reveal-up">
                My Toolbelt
            </h2>

            <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] reveal-up">
            I have gained experience with a variety of tools throughout my education and career, 
            with proficiency levels varying based on usage and focus. 
            I continuously strive to deepen my expertise while remaining adaptable 
            and eager to learn new technologies as needed!
            </p>

            <h2 className="headline-3 mb-4 reveal-up">
                Core Skills ...
            </h2>

            <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
                {
                    skillItemProficient.map(({imgSrc, label, desc}, key) => (
                        <SkillCard 
                            imgSrc={`${import.meta.env.BASE_URL}${imgSrc}`}
                            label={label}
                            desc={desc}
                            classes="reveal-up"
                        />
                    ))
                }
            </div>

            <h2 className="headline-3 mb-4 mt-8 reveal-up">
                Additional Skills ...
            </h2>

            <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
                {
                    skillItemFamiliar.map(({imgSrc, label, desc}, key) => (
                        <SkillCard 
                            imgSrc={`${import.meta.env.BASE_URL}${imgSrc}`}
                            label={label}
                            desc={desc}
                            classes="reveal-up"
                        />
                    ))
                }
            </div>

        </div>
    </section>
  )
}

export default Skill