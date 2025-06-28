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
      <div className="bg-light relative min-h-screen">
        <div className="relative z-10">{children}</div>
      </div>
    </>
  );
};

export default HomePageLayout;
