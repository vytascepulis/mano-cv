import logo from "@/assets/mano-cv-logo-light.png";
import { getDomainUrl } from "@/utils/subdomain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Button from "@/components/ui/Button";
import { additionalLinks, ILink, legalLinks } from "@/staticData/links";

const Link = ({ link }: { link: ILink }) => (
  <Button variant="link" color="light" href={link.href} target="_blank">
    {link.title}
  </Button>
);

const Footer = () => {
  return (
    <div className="text-light mt-[70px] bg-linear-to-br from-slate-950 to-slate-700 md:mt-[200px]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-[30px] px-5 py-[40px] sm:flex-row sm:gap-0 md:py-[70px]">
        <div className="flex flex-col gap-2 sm:gap-4">
          <a href={getDomainUrl()} className="max-w-max">
            <img
              src={logo.src}
              className="max-w-[150px]"
              alt="mano-cv.lt logo"
            />
          </a>
          <div className="flex flex-row items-center gap-2 text-[28px]">
            <a
              href="https://www.linkedin.com/company/mano-cv-lt"
              target="_blank"
              className="flex py-1"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://www.instagram.com/mano_cv.lt"
              target="_blank"
              className="flex py-1"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1">
          {legalLinks.map((link) => (
            <Link key={link.href} link={link} />
          ))}
        </div>
        <div className="flex flex-col items-start gap-1">
          {additionalLinks.map((link) => (
            <Link key={link.href} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
