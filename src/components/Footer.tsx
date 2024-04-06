import Logo from '../assets/logo.png';

export const Footer = () => {
  return (
    <footer id="footer">
      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a
            href="/"
            className="ml-2 font-bold text-xl flex items-center"
          >
            <img src={Logo} alt="Logo" className="logo" />
            Bondhive
          </a>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024 BondHive{" "}
        </h3>
      </section>
    </footer>
  );
};
