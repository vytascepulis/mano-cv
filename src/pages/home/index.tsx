import { ReactElement } from "react";
import HomePageLayout from "@/components/layouts/HomePageLayout";
import HeroSection from "@/pages/home/HeroSection";
// import { useMixpanel } from "@/contexts/MixpanelContext";

export default function HomePage() {
  // const { trackPageView } = useMixpanel();
  //
  // useEffect(() => {
  //   trackPageView({ name: "Home page" });
  // }, []);

  return (
    <>
      <HeroSection />
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
