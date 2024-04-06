import { Button } from "./ui/button";

export const Newsletter = () => {
  const handleEmailButtonClick = () => {
    const emailAddress = 'info@bondhive.xyz';
    const emailSubject = encodeURIComponent('Interest in Collaboration');
    const emailBody = encodeURIComponent('Hello, I am interested in collaborating with you...');
    window.location.href = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Looking for
          </span>
          {" "} collaboration or integrate in your app?
        </h3>
        <div className="flex justify-center mt-16">
          <Button className="w-auto" onClick={handleEmailButtonClick}>Get In Touch</Button>
        </div>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
