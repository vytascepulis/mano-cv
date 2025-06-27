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
    <div className="h-screen w-screen bg-violet-50 px-3 pt-5 lg:px-5">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="mx-auto flex max-w-[1200px] flex-col items-start">
        <a className="mx-auto md:mx-0" href={getDomainUrl()}>
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
