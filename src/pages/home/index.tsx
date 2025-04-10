import { ReactElement } from "react";
import { signOut } from "next-auth/react";
import HomePageLayout from "@/components/layouts/HomePageLayout";
import HeroSection from "@/pages/home/HeroSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      SEttings <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
