import { FaTwitter } from 'react-icons/fa';
import Logo from '../assets/logo.png';

export const Footer = () => {
  return (
    <footer id="footer">
      <section className="container py-20 flex justify-between items-center">
        <a href="/" className="flex items-center">
          <img src={Logo} alt="Bondhive Logo" className="logo" />
          Bondhive
        </a>
        <a href="https://twitter.com/bondhive" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={30} />
        </a>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          © 2024 BondHive
        </h3>
      </section>
    </footer>
  );
};
