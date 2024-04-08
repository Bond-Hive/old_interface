import { FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer id="footer">

      <section className="container py-20 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center font-bold text-xl">
            <Image src="/logo.png" alt="Bondhive Logo" className="logo" width={50} height={50} />
            Bondhive
          </a>
        </Link>
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
