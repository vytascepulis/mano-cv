import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import style from "./style.module.css";
import Button from "@/components/ui/Button";
import { menuLinks } from "@/components/Navbar/constants";

const MobileMenu = () => {
  const refDialog = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    refDialog.current?.showModal();
    document.body.classList.add("disable-scroll");
  };

  const closeDialog = () => {
    refDialog.current?.close();
    document.body.classList.remove("disable-scroll");
  };

  return (
    <>
      <Button variant="link" onClick={openDialog}>
        <FontAwesomeIcon size="xl" icon={faBars} />
      </Button>
      <dialog
        ref={refDialog}
        className={twMerge(style.modal, "max-h-screen bg-violet-100")}
        onClick={closeDialog}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="h-screen w-[200px]"
        >
          <div className="p-4">
            <Button variant="link" onClick={closeDialog}>
              <FontAwesomeIcon size="2xl" icon={faXmark} />
            </Button>
          </div>

          <ul className="mt-5 flex flex-col gap-1">
            {menuLinks.map((link) => (
              <li key={link.section}>
                <a
                  href={`#${link.section}`}
                  onClick={closeDialog}
                  className={twMerge(
                    "block rounded-sm py-2 pl-7 font-extrabold transition-colors",
                    "text-dark hover:bg-violet-600/10",
                  )}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
};

export default MobileMenu;
