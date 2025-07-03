import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/utils/cookies";
import Button from "@/components/ui/Button";
import { getLinkBySlug } from "@/staticData/links";

const Cookiebar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cconsent = getCookie("cconsent");

    if (!cconsent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    setShow(false);
    setCookie("cconsent", "true", 14);
  };

  if (!show) return null;

  return (
    <>
      <div className="bg-primary fixed bottom-0 left-0 z-50 w-full p-5">
        <div className="text-light mx-auto flex max-w-max flex-row items-center gap-6">
          <div>
            Naudojantis svetaine sutinki su{" "}
            <Button
              href={getLinkBySlug("terms-and-conditions")?.href}
              variant="link"
              color="light"
              className="inline-block py-0!"
            >
              naudojimosi taisyklėmis
            </Button>{" "}
            ir{" "}
            <Button
              href={getLinkBySlug("cookie-policy")?.href}
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
