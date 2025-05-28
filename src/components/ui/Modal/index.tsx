import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import style from "./style.module.css";
import ReactModal from "react-modal";
import { Outfit } from "next/font/google";
import { useEffect } from "react";

export interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

interface Props extends ModalProps {
  children: React.ReactNode;
  className?: string;
}

ReactModal.setAppElement("#__next");
const outfit = Outfit({ subsets: ["latin"] });

const Modal = ({ isOpen, handleClose, children, className }: Props) => {
  useEffect(() => {
    document.body.classList.toggle("disable-scroll", isOpen);
    return () => document.body.classList.remove("disable-scroll");
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      closeTimeoutMS={200}
      className={{
        base: twMerge(
          className,
          style.modal,
          outfit.className,
          "mx-auto mt-5 rounded-lg bg-violet-100 px-3 py-2 sm:mt-40",
        ),
        afterOpen: style["modal--after-open"],
        beforeClose: style["modal--before-close"],
      }}
      overlayClassName={{
        base: twMerge(style["modal-overlay"]),
        afterOpen: style["modal-overlay--after-open"],
        beforeClose: style["modal-overlay--before-close"],
      }}
    >
      <button
        onClick={handleClose}
        className="absolute top-0 right-0 cursor-pointer p-3"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      {children}
    </ReactModal>
  );
};

export default Modal;
