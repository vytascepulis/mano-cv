import { getDomainUrl } from "@/utils/subdomain";
import logo from "@/assets/mano-cv-logo-dark.png";
import UserBtn from "@/components/Navbar/UserBtn";
import ControlBar from "@/pages/subdomains/[slug]/nustatymai/ControlBar";
import BlockedBar from "@/pages/subdomains/[slug]/nustatymai/BlockedBar";
import Head from "next/head";
import Footer from "@/components/Footer";

interface Props {
  children: React.ReactNode;
}

const SettingsPageLayout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>mano-cv.lt - nustatymai</title>
      </Head>
      <div className="min-h-screen bg-violet-50">
        <div className="mx-auto max-w-7xl">
          <div className="px-5 pt-[10px] lg:pt-[20px]">
            <nav className={`flex justify-between`}>
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
          <BlockedBar />
          <ControlBar />
          <div className="px-5">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SettingsPageLayout;
