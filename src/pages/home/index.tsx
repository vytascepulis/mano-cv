import { ReactElement, useEffect } from "react";
import HomePageLayout from "@/components/layouts/HomePageLayout";
import HeroSection from "@/pages/home/HeroSection";
import { useMixpanel } from "@/contexts/MixpanelContext";

export default function HomePage() {
  const { trackPageView } = useMixpanel();

  useEffect(() => {
    trackPageView({ name: "Home page" });
  }, []);

  const breakFrontend = () => {
    throw new Error("Frontend crash test for Sentry");
  };

  return (
    <>
      <button onClick={breakFrontend}>break</button>
      <HeroSection />
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
