import { ReactElement, useEffect } from "react";
import HomePageLayout from "@/components/layouts/HomePageLayout";
import HeroSection from "@/pages/home/HeroSection";
import { useMixpanel } from "@/contexts/MixpanelContext";

export default function HomePage() {
  const { trackPageView } = useMixpanel();

  useEffect(() => {
    trackPageView({ name: "Home page" });
  }, []);

  throw new Error("Frontend crash test for Sentry");

  return (
    <>
      <HeroSection />
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
