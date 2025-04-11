import { getDomainUrl } from "@/utils/subdomain";
import logo from "./mano-cv-logo.png";
import LoginBtn from "@/components/Navbar/LoginBtn";
import { twMerge } from "tailwind-merge";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const links = [
  {
    text: "Privalumai",
    section: "privalumai",
  },
  {
    text: "Paslaugos",
    section: "paslaugos",
  },
  {
    text: "Šablonai",
    section: "sablonai",
  },
];

const Navbar = () => {
  return (
    <div className="sticky top-0 lg:top-(--navbar-top) lg:px-5">
      <nav
        className={`grid h-(--navbar-height) grid-cols-[1fr_2fr_1fr] content-center border border-violet-200 bg-violet-100/95 px-4 shadow-md lg:rounded-lg`}
      >
        <div className="self-center lg:hidden">
          <Button variant="link">
            <FontAwesomeIcon size="xl" icon={faBars} />
          </Button>
        </div>
        <a
          href={getDomainUrl()}
          className="place-self-center lg:self-center lg:justify-self-start"
        >
          <img
            src={logo.src}
            alt="mano-cv.lt logo"
            className="h-[25px] object-contain"
          />
        </a>
        <ul className="hidden place-self-center lg:flex lg:gap-x-1">
          {links.map((link) => (
            <li key={link.section}>
              <a
                href={`#${link.section}`}
                className={twMerge(
                  "rounded-sm px-3 py-2 font-extrabold transition-colors",
                  "text-dark hover:bg-violet-600/10",
                )}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
        <LoginBtn />
      </nav>
    </div>
  );
};

export default Navbar;
