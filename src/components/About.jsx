/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

const aboutItems = [
    {
      label: 'Years of learning and applying software development skills.',
      number: 4
    },

    // {
    //   label: 'Projects done',
    //   number: 6
    // },

  ];

const About = () => {
  return (
    <section
    id="about"
    className="section">
        <div className="container">
            <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12 reveal-up">
                <p className="text-zinc-300 mb-4 md:mb-4 md:text-xl md:max-w-[60ch]">
                I’m Matthew, a CS & Business double-degree student at Waterloo, specializing in AI and finance.

                </p>
                <p className="text-zinc-300 mb-4 md:mb-8 md:text-xl md:max-w-[60ch]">
                Passionate about building AI-powered tools that solve real-world problems.
                </p>
                
                <div className="flex flex-wrap items-center gap-4 md:gap-12">
                    {
                        aboutItems.map(({label,number}, key) => (
                            <div key={key}>
                                <div className="flex items-center md:mb-2">
                                    <span className="text-2xl font-bold md:text-4xl">{number}</span>
                                    <span className= "text-sky-400 font-semibold md:text-3xl">+</span>
                                </div>
                                <p className="text-sm text-zinc-400">{label}</p>
                            </div>
                        ))
                    }
                    {/* <img 
                    src="/images/logoWHITE.png"
                    alt="Logo"
                    width={30}
                    height={30}
                    className="ml-auto md:w-[40px] md:h-[40px]"
                    /> */}
                </div>
            </div>
        </div>
    </section>
  )
}

export default About