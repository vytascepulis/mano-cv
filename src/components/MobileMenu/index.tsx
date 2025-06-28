import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/Button";
import { menuLinks } from "@/components/Navbar/constants";
import { twMerge } from "tailwind-merge";
import style from "./style.module.css";
import { Outfit } from "next/font/google";
import { useGlobalContext } from "@/contexts/GlobalContext";

ReactModal.setAppElement("#__next"); // Your root element ID
const outfit = Outfit({ subsets: ["latin"] });

const MobileMenu = () => {
  const { scrollToSection } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.body.classList.toggle("disable-scroll", isOpen);
    return () => document.body.classList.remove("disable-scroll");
  }, [isOpen]);

  return (
    <>
      <Button
        className="ml-[-16px] p-4!"
        variant="link"
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon size="xl" icon={faBars} />
      </Button>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={true}
        closeTimeoutMS={300}
        className={{
          base: twMerge(
            style.modal,
            outfit.className,
            "absolute top-0 bottom-0 left-0 w-[200px] bg-violet-100",
          ),
          afterOpen: style["modal--after-open"],
          beforeClose: style["modal--before-close"],
        }}
        overlayClassName={{
          base: style["modal-overlay"],
          afterOpen: style["modal-overlay--after-open"],
          beforeClose: style["modal-overlay--before-close"],
        }}
      >
        <div className="p-4">
          <Button
            className="mt-[-16px] ml-[-16px] p-4!"
            variant="link"
            onClick={handleClose}
          >
            <FontAwesomeIcon size="2xl" icon={faXmark} />
          </Button>
        </div>

        <ul className="mt-5 flex flex-col gap-1">
          {menuLinks.map((link) => (
            <li key={link.section}>
              <a
                onClick={() => {
                  scrollToSection(link.section);
                  handleClose();
                }}
                className="text-dark block cursor-pointer rounded-sm py-2 pl-7 font-extrabold transition-colors hover:bg-violet-600/10"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </ReactModal>
    </>
  );
};

export default MobileMenu;
