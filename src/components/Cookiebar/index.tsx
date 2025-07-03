import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/utils/cookies";
import Button from "@/components/ui/Button";

const Cookiebar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cconsent = getCookie("cconsent");

    if (!cconsent) {
      document.body.classList.add("disable-scroll");
      setShow(true);
    }

    return () => document.body.classList.remove("disable-scroll");
  }, []);

  const acceptCookies = () => {
    setShow(false);
    document.body.classList.remove("disable-scroll");
    setCookie("cconsent", "true", 48);
  };

  if (!show) return null;

  return (
    <>
      <div className="fixed top-0 left-0 z-40 h-screen w-screen bg-black/70"></div>
      <div className="bg-primary fixed bottom-0 left-0 z-50 w-full p-5">
        <div className="text-light mx-auto flex max-w-max flex-row items-center gap-6">
          <div>
            Naudojantis svetaine sutinki su{" "}
            <Button
              href="#"
              variant="link"
              color="light"
              className="inline-block py-0!"
            >
              naudojimosi taisyklėmis
            </Button>{" "}
            ir{" "}
            <Button
              href="#"
              variant="link"
              color="light"
              target="_blank"
              className="inline-block py-0!"
            >
              slapukų politika
            </Button>
          </div>
          <Button onClick={acceptCookies} variant="outline" color="light">
            Sutinku
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cookiebar;
