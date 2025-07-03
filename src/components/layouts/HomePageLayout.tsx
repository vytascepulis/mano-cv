import Head from "next/head";
import Cookiebar from "@/components/Cookiebar";

interface Props {
  children: React.ReactNode;
}

const HomePageLayout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>mano-cv.lt - susikurk savo CV svetainę</title>
      </Head>
      <div className="relative min-h-screen bg-slate-100">
        <div className="relative z-10">{children}</div>
      </div>
      <Cookiebar />
    </>
  );
};

export default HomePageLayout;
