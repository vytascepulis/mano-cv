import { ReactElement, useEffect } from "react";
import HomePageLayout from "@/components/layouts/HomePageLayout";
import HeroSection from "@/pages/home/HeroSection";
import { useMixpanel } from "@/contexts/MixpanelContext";
import Navbar from "@/components/Navbar";
import ExamplePage from "@/pages/home/ExamplePage";

export default function HomePage() {
  const { trackPageView } = useMixpanel();

  useEffect(() => {
    trackPageView({ name: "Home page" });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-linear-to-br from-slate-700 to-slate-950 pb-[150px]">
        <div className="mx-auto mb-[50px] max-w-7xl md:mb-[90px]">
          <div className="px-5 pt-[100px] md:pt-[120px] lg:pt-[200px]">
            <HeroSection />
          </div>
        </div>
        <ExamplePage />
      </div>
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
