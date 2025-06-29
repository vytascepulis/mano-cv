import { ReactElement } from "react";
import HomePageLayout from "@/components/layouts/HomePageLayout";
import HeroSection from "@/pages/home/HeroSection";
import Navbar from "@/components/Navbar";
import ExamplePage from "@/pages/home/ExamplePage";
import Advantages from "@/pages/home/Advantages";

export default function HomePage() {
  return (
    <>
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
      <div className="mx-auto h-[3000px] max-w-[1200px] px-5 pt-[100px] md:pt-[100px]">
        <Advantages />
      </div>
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
