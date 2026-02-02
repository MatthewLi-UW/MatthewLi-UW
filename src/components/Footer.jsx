/**
 * @copyright 2026 Matthew Li
 * @license Apache-2.0
 */

const Footer = () => {
  return (
    <footer id="contact" className="section">
      <div className="container">
        <div className="flex items-center justify-between pt-10 mb-8">
          <a className="logo reveal-up">
            <img src={import.meta.env.BASE_URL + "/images/logoWHITE.png"} width={40} height={40} alt="Logo" />
          </a>
          <p className="text-zinc-500 text-sm reveal-up">
            &copy; 2026 <span className="text-zinc-200">Matthew Li</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
