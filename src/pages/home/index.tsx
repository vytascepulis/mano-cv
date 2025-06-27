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
      <div className="bg-linear-to-br from-slate-700 to-slate-950 pb-[120px] md:pb-[200px] lg:pb-[450px]">
        <div className="mx-auto max-w-7xl">
          <div className="px-5 pt-[100px] md:pt-[120px] lg:pt-[200px]">
            <HeroSection />
          </div>
        </div>
      </div>

      <ExamplePage />
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
