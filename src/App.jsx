/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

/* Components */
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skill from "./components/Skill";
import Work from "./components/Work";
import Experience from "./components/Experience";
import BackgroundFX from "./components/BackgroundFX";

/* Node modules */
import { ReactLenis } from 'lenis/react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import Footer from "./components/Footer";

/* Register gsap */
gsap.registerPlugin(useGSAP, ScrollTrigger);

const App = () => {

  useGSAP(() => {
    const elements = gsap.utils.toArray('.reveal-up');

    elements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: '-200 bottom',
          end: 'bottom 80%',
          scrub: true,
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      })
    })
  })

  
  return (
    <ReactLenis root>
      <BackgroundFX />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Skill />
          <Experience />
          <Work />
          <Footer />
        </main>
      </div>
    </ReactLenis>
  )

}

export default App;
