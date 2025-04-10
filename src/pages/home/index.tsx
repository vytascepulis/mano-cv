import { ReactElement } from "react";
import { signOut, useSession } from "next-auth/react";
import HomePageLayout from "@/components/layouts/HomePageLayout";
import HeroSection from "@/pages/home/HeroSection";
import Button from "@/components/ui/Button";

export default function HomePage() {
  const { status } = useSession();
  return (
    <>
      <HeroSection />
      {status === "authenticated" && (
        <Button onClick={() => signOut()}>Sign out</Button>
      )}
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
