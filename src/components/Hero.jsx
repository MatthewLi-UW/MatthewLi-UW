/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

/* Components */
import { ButtonPrimary, ButtonOutline } from "./Button"

const Hero = () => {
  return (
    <section 
    id="home"
    className="pt-28 lg:pt-36"
    >
        <div className="container lg:grid lg:grid-cols-2 items-center lg:gap-10">

            <div>
                <div className="flex items-center gap-3">

                    <div className="flex items-center gap-1.5 text-zinc-400 text-sm tracking-wide">
                        <span className="relative w-2 h-2 rounded-full bg-emerald-400">
                            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"></span>
                        </span>

                        Seeking Internship for Fall 2026
                    </div>
                </div>
                <h2 className="headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[25ch] mt-5 mb-8 lg:mb-10">
                Fourth-year @ University of Waterloo, pursuing a double degree in Computer Science and Business
                </h2>
                <a
                  href="https://stakky.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mb-6 rounded-xl bg-zinc-800/80 ring-1 ring-zinc-50/10 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700/80 transition-colors"
                >
                  <span className="material-symbols-rounded text-sky-300 text-[18px]">rocket_launch</span>
                  Building Stakky - stakky.dev
                </a>
                <div className="flex items-center gap-3">
                    <ButtonPrimary 
                        label="Visit Stakky"
                        href="https://stakky.dev"
                        target="_blank"
                        icon="arrow_outward"
                    />

                    <ButtonOutline 
                        label="Scroll down"
                        href="#about"
                        icon="arrow_downward"
                    />
                </div>
                <a
                  href="mailto:mf5li@uwaterloo.ca"
                  className="inline-flex items-center gap-2 mt-4 text-zinc-300 hover:text-zinc-100 transition-colors"
                >
                  <span className="material-symbols-rounded text-[18px] text-sky-300">mail</span>
                  mf5li@uwaterloo.ca
                </a>
            </div>

            <div className="hidden lg:block">
                <figure className="w-full max-w-[480px] ml-auto bg-gradient-to-t from-sky-400 via-25% via-sky-400/40
                to-65% rounded-[60px] overflow-hidden">
                    <img 
                    src={import.meta.env.BASE_URL + "/images/portraitback.jpg"}
                    width={656}
                    height={800}
                    alt="Matthew Li" 
                    className="w-full" />
                </figure>
            </div>
        </div>
    </section>
  )
}

export default Hero
