import Head from "next/head";
import { getDomainUrl } from "@/utils/subdomain";
import logo from "@/assets/mano-cv-logo-dark.png";

const PlainPageLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="h-screen w-screen bg-violet-50 px-3 pt-3 lg:px-5 lg:pt-(--navbar-top)">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="mx-auto flex max-w-7xl flex-col items-start">
        <a href={getDomainUrl()}>
          <img
            src={logo.src}
            alt="mano-cv.lt logo"
            className="h-[25px] object-contain"
          />
        </a>
        {children}
      </div>
    </div>
  );
};

export default PlainPageLayout;
