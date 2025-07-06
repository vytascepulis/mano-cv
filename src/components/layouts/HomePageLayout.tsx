import Head from "next/head";

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
    </>
  );
};

export default HomePageLayout;
