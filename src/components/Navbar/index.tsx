import { getDomainUrl } from "@/utils/subdomain";
import logo from "./mano-cv-logo.png";
import LoginBtn from "@/components/Navbar/LoginBtn";
import { twMerge } from "tailwind-merge";

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
    <nav
      className={`sticky top-(--navbar-top) flex h-(--navbar-height) w-full items-center rounded-lg border border-violet-200 bg-violet-100/95 px-4 shadow-md`}
    >
      <a href={getDomainUrl()}>
        <img
          src={logo.src}
          alt="mano-cv.lt logo"
          className="h-[25px] object-contain"
        />
      </a>
      <ul className="ml-20 flex gap-x-4">
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
  );
};

export default Navbar;
