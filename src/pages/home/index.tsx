import HomePageLayout from "@/components/layouts/HomePageLayout";
import HeroSection from "@/pages/home/HeroSection";
import Navbar from "@/components/Navbar";
import ExamplePage from "@/pages/home/ExamplePage";
import Advantages from "@/pages/home/Advantages";
import GetStarted from "@/pages/home/GetStarted";
import Designs from "@/pages/home/Designs";
import Footer from "@/components/Footer";
import { usePosthogContext } from "@/contexts/PosthogContext";
import { useEffect } from "react";

export default function HomePage() {
  const { capturePageView } = usePosthogContext();

  useEffect(() => {
    capturePageView({ name: "Home page" });
  }, []);
  return (
    <HomePageLayout>
      <Navbar />
      <div className="rounded-b-xl bg-linear-to-br from-slate-700 to-slate-950 pb-[10px] shadow-xl md:rounded-b-none md:pb-[150px]">
        <div className="mx-auto mb-[50px] max-w-[1200px] md:mb-[90px]">
          <div className="px-5 pt-[100px] md:pt-[120px] lg:pt-[200px]">
            <HeroSection />
          </div>
        </div>
        <div className="px-2">
          <ExamplePage />
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[100px] px-5 pt-[100px] md:gap-[150px] md:pt-[150px] lg:gap-[300px] lg:pt-[300px]">
        <Advantages />
        <GetStarted />
        <Designs />
      </div>
      <Footer />
    </HomePageLayout>
  );
}
