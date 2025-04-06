import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  if (!session) {
    return (
      <>
        <Button onClick={() => console.log("click")}>Click me</Button>
        <button onClick={() => signIn("google", { callbackUrl: "/auth" })}>
          Sign in
        </button>
      </>
    );
  }

  return (
    <>
      SEttings <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
