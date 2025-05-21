import { getDomainUrl } from "@/utils/subdomain";
import logo from "@/assets/mano-cv-logo.png";
import UserBtn from "@/components/Navbar/UserBtn";
import ControlBar from "@/pages/subdomains/[slug]/nustatymai/ControlBar";
import { useSettings } from "@/contexts/SettingsContext";
import BlockedBar from "@/pages/subdomains/[slug]/nustatymai/BlockedBar";

interface Props {
  children: React.ReactNode;
}

const SettingsPageLayout = ({ children }: Props) => {
  const { render } = useSettings();

  return (
    <div className="min-h-screen bg-violet-50">
      <div className="mx-auto max-w-7xl">
        <div className="px-5 pt-0 lg:pt-(--navbar-top)">
          <nav className={`flex h-(--navbar-height) justify-between`}>
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
            <UserBtn key={render} hiddenIds={["settings"]} />
          </nav>
        </div>
        <BlockedBar />
        <ControlBar />
        <div className="px-5">{children}</div>
      </div>
    </div>
  );
};

export default SettingsPageLayout;
