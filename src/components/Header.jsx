/**
 * @copyright 2025 Matthew Li
 * @license Apache-2.0
 */

/* Node modules */
import { useState } from "react"

/* Components */
import Navbar from "./Navbar"

const Header = () => {

    const [navOpen, setNavOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 
        bg-gradient-to-b from-zinc-900 to-zinc-900/0">
          <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center
          md:grid md:px-6 md:grid-cols-[1fr,3fr,1fr]">
            <h1> 
              <a className="logo">
                <img src={import.meta.env.BASE_URL + "/images/logoWHITE.png"} 
                width={40}
                height={40}
                alt="Matthew Li" 
                />
              </a>
            </h1>
    
            <div className="relative md:justify-self-center">
              <button 
              className="menu-btn md:hidden"
              onClick={() => setNavOpen((prev) => !prev)}
              >
                <span className="material-symbols-rounded">
                  {navOpen ? 'close' : 'menu'}
                </span>
              </button>

              <Navbar navOpen={navOpen}/>
            </div>

            <div className="flex items-center gap-4 md:justify-self-end max-md:hidden">

              <a href="#contact" className="btn btn-secondary">
                Contact Me
              </a>

              <a href="https://github.com/MatthewLi-UW" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
            </div>
        
          </div>
        </header>
      )
}

export default Header