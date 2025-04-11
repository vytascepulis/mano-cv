import { ReactElement } from "react";
import HomePageLayout from "@/components/layouts/HomePageLayout";
import HeroSection from "@/pages/home/HeroSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
