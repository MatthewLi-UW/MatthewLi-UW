/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

/* Components */
import { ButtonPrimary } from "./Button";


const sitemap = [
    {
      label: 'Home',
      href: '#home'
    },
    {
      label: 'About',
      href: '#about'
    },
    {
      label: 'Experience',
      href: '#experience'
    },
    {
      label: 'Projects',
      href: '#work'
    },
    {
      label: 'Contact me',
      href: '#contact'
    }
  ];
  
  const socials = [
    {
      label: 'GitHub',
      href: 'https://github.com/MatthewLi-UW'
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/matthew-li-mfl/'
    },
  ];

const Footer = () => {
  return (
    <footer className="section">
        <div className="container">

            <div className="lg:grid lg:grid-cols-2">
                <div className="mb-10">
                    <h2 className="headline-1 mb-8 lg:max-w-[12ch] reveal-up">
                        Thank you for reading this far
                    </h2>

                    <ButtonPrimary 
                    href="mailto:matthewlischoolemail@gmail.com"
                    label="Email"
                    icon="chevron_right"
                    classes="reveal-up">
                    </ButtonPrimary>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:pl-20">

                    <div>
                        <p className="mb-2 reveal-up">Navigate</p>
                        <ul>
                            {sitemap.map(({label, href}, key) => (
                                <li key={key}>
                                    <a href={href} 
                                    className="block test-sm text-zinc-400 py-1 transition-colors
                                    hover:text-zinc-200 reveal-up">
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="mb-2 reveal-up">Links</p>
                        <ul>
                            {socials.map(({label, href}, key) => (
                                <li key={key}>
                                    <a 
                                    href={href} 
                                    target="_blank"
                                    className="block test-sm text-zinc-400 py-1 transition-colors
                                    hover:text-zinc-200 reveal-up">
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

            <div className="flex items-center justify-between pt-10 mb-8">
                <a
                 href="/"
                 className="logo reveal-up">
                    <img 
                    src={import.meta.env.BASE_URL + "/images/logoWHITE.png"}
                    width={40}
                    height={40}
                    alt="Logo"
                    />
                </a>
                <p className="text-zinc-500 text-sm reveal-up">
                    &copy; 2024 <span className="text-zinc-200">Matthew Li</span>
                </p>
            </div>

        </div>
    </footer>
  )
}

export default Footer