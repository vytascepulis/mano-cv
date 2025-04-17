import { getDomainUrl } from "@/utils/subdomain";
import logo from "@/assets/mano-cv-logo.png";
import UserBtn from "@/components/Navbar/UserBtn";

interface Props {
  children: React.ReactNode;
}

const SettingsPageLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-violet-50">
      <div className="mx-auto max-w-7xl">
        <div className="pt-0 lg:px-5 lg:pt-(--navbar-top)">
          <nav className={`flex h-(--navbar-height) justify-between px-4`}>
            <a
              href={getDomainUrl()}
              className="place-self-center lg:self-center lg:justify-self-start"
              target="_blank"
            >
              <img
                src={logo.src}
                alt="mano-cv.lt logo"
                className="h-[25px] object-contain"
              />
            </a>
            <UserBtn hiddenIds={["settings"]} />
          </nav>
        </div>
        <div className="px-5 pt-2 lg:pt-5">{children}</div>
      </div>
    </div>
  );
};

export default SettingsPageLayout;
