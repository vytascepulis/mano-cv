import GoogleButton from "@/components/ui/GoogleButton";
import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";

const LoginModalContent = () => {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <h1 className="text-dark mb-5 text-5xl font-extrabold">
        Pradėk vienu paspaudimu
      </h1>
      <p className="text-dark max-w-[400px]">
        Prisijunk su Google ir pradėk kurti savo asmeninį internetinį CV
      </p>
      <div className="mt-10">
        <GoogleButton
          onClick={() => signIn("google", { callbackUrl: "/auth" })}
        />
        <p className="text-dark mt-1 text-xs font-light">
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
