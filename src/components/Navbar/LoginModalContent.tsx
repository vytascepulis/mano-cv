import GoogleButton from "@/components/ui/GoogleButton";
import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";

const LoginModalContent = () => {
  return (
    <div className="flex flex-col items-center py-2 text-center md:py-10">
      <h1 className="text-dark mb-4 text-4xl font-extrabold md:mb-5 md:text-5xl">
        Pradėk vienu paspaudimu
      </h1>
      <p className="text-dark max-w-[400px]">
        Prisijunk su Google ir pradėk kurti savo asmeninį internetinį CV
      </p>
      <div className="mt-4 md:mt-10">
        <GoogleButton
          onClick={() => signIn("google", { callbackUrl: "/auth" })}
        />
        <p className="text-dark mt-2 text-xs font-light md:mt-1">
          Registruodamasis sutinki su mūsų{" "}
          <Button variant="link" href="/">
            slapukų politika
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginModalContent;
