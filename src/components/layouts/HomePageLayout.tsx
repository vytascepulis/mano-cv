import Navbar from "../Navbar";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
}

const HomePageLayout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Mano-cv.lt - susikurk savo CV svetainę</title>
      </Head>
      <div className="bg-light min-h-screen">
        <div className="absolute z-10 min-h-screen min-w-screen bg-gray-900 shadow-md md:min-h-2/3"></div>
        <div className="relative z-20 mx-auto max-w-7xl">
          <Navbar />
          <div className="px-5 pt-(--content-after-navbar-mobile-padding) lg:pt-(--content-after-navbar-padding)">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageLayout;
