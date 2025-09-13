import GoogleButton from "../GoogleButton";
import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import { getLinkBySlug } from "@/staticData/links";

const LoginModalContent = () => {
  const termsAndConditions = getLinkBySlug("terms-and-conditions");
  const privacyPolicy = getLinkBySlug("privacy-policy");
  const cookiePolicy = getLinkBySlug("cookie-policy");

  return (
    <div className="flex flex-col items-center p-5 text-center md:px-6 md:py-10">
      <h1 className="text-dark mb-4 text-4xl font-extrabold md:mb-5 md:text-5xl">
        Pradėk vienu paspaudimu
      </h1>
      <p className="text-dark max-w-[400px]">
        Prisijunk su Google ir pradėk kurti savo asmeninį internetinį CV
      </p>
      <div className="mt-4 md:mt-6">
        <GoogleButton
          onClick={() => {
            signIn("google", { callbackUrl: "/auth" });
          }}
        />
        <p className="text-dark mt-5 max-w-[300px] text-xs font-light">
          Registruojantis sutinki su mūsų{" "}
          <Button
            className="inline-block py-0!"
            variant="link"
            href={termsAndConditions?.href}
            target="_blank"
          >
            naudojimosi taisyklėmis
          </Button>
          ,{" "}
          <Button
            className="inline-block py-0!"
            variant="link"
            href={privacyPolicy?.href}
            target="_blank"
          >
            privatumo politika
          </Button>{" "}
          bei{" "}
          <Button
            className="inline-block py-0!"
            variant="link"
            href={cookiePolicy?.href}
            target="_blank"
          >
            slapukų politika
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginModalContent;
