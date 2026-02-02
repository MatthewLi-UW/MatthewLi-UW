/**
 * @copyright 2024 Matthew Li
 * @license Apache-2.0
 */

/* Modules */
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const navItems = [
  { label: "Home", link: "#home", className: "nav-link" },
  { label: "About", link: "#about", className: "nav-link" },
  { label: "Skills", link: "#skills", className: "nav-link" },
  { label: "Experience", link: "#experience", className: "nav-link" },
  { label: "Projects", link: "#work", className: "nav-link" },
];

const Navbar = ({ navOpen }) => {
  const [activeLink, setActiveLink] = useState("#home");
  const activeBox = useRef(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const updateActiveOnScroll = () => {
      const scrollMarker = window.scrollY + 120;
      let current = "#home";

      navItems.forEach(({ link }) => {
        const section = document.querySelector(link);
        if (!section) return;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollMarker >= top && scrollMarker < bottom) {
          current = link;
        }
      });

      setActiveLink((prev) => (prev === current ? prev : current));
    };

    updateActiveOnScroll();
    window.addEventListener("scroll", updateActiveOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveOnScroll);
  }, []);

  useEffect(() => {
    const updateActiveBox = () => {
      const activeElement = linkRefs.current[activeLink];
      if (!activeElement || !activeBox.current) return;

      activeBox.current.style.top = `${activeElement.offsetTop}px`;
      activeBox.current.style.left = `${activeElement.offsetLeft}px`;
      activeBox.current.style.width = `${activeElement.offsetWidth}px`;
      activeBox.current.style.height = `${activeElement.offsetHeight}px`;
    };

    updateActiveBox();
    window.addEventListener("resize", updateActiveBox);
    return () => window.removeEventListener("resize", updateActiveBox);
  }, [activeLink, navOpen]);

  return (
    <nav className={"navbar " + (navOpen ? "active" : "")}>
      {navItems.map(({ label, link, className }) => (
        <a
          href={link}
          key={link}
          ref={(element) => {
            linkRefs.current[link] = element;
          }}
          className={`${className} ${activeLink === link ? "active" : ""}`}
          onClick={() => setActiveLink(link)}
        >
          {label}
        </a>
      ))}
      <div className="active-box" ref={activeBox}></div>
    </nav>
  );
};

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
};

export default Navbar;
