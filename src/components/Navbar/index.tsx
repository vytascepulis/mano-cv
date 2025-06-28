import { getDomainUrl } from "@/utils/subdomain";
import logo from "@/assets/mano-cv-logo-dark.png";
import LoginBtn from "@/components/Navbar/LoginBtn";
import { twMerge } from "tailwind-merge";
import { menuLinks } from "@/components/Navbar/constants";
import MobileMenu from "@/components/MobileMenu";
import { useGlobalContext } from "@/contexts/GlobalContext";

const Navbar = () => {
  const { scrollToSection } = useGlobalContext();
  return (
    <div className="fixed top-0 z-50 w-full border-b border-slate-300 bg-violet-100 px-6 shadow-md">
      <nav
        className={`mx-auto grid max-w-[1200px] grid-cols-[1fr_2fr_1fr] content-center items-center`}
      >
        <div className="self-center lg:hidden">
          <MobileMenu />
        </div>
        <a
          href={getDomainUrl()}
          className="shrink-0 place-self-center lg:self-center lg:justify-self-start"
        >
          <img
            src={logo.src}
            alt="mano-cv.lt logo"
            className="h-[25px] object-contain"
          />
        </a>
        <ul className="hidden place-self-center py-5 lg:flex lg:gap-x-1">
          {menuLinks.map((link) => (
            <li key={link.section}>
              <a
                onClick={() => scrollToSection(link.section)}
                className={twMerge(
                  "cursor-pointer rounded-sm px-3 py-2 font-extrabold transition-colors",
                  "text-dark hover:text-light hover:bg-violet-600",
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
