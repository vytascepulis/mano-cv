import Head from "next/head";
import { getDomainUrl } from "@/utils/subdomain";
import logo from "@/assets/mano-cv-logo-dark.png";
import Footer from "@/components/Footer";

const PlainPageLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex h-screen w-screen flex-col justify-between bg-violet-50">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start px-3 pt-5 lg:px-5">
          <a className="mx-auto md:mx-0" href={getDomainUrl()}>
            <img
              src={logo.src}
              alt="mano-cv.lt logo"
              className="h-[25px] object-contain"
            />
          </a>
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PlainPageLayout;
