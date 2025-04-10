import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import style from "./style.module.css";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, handleClose, children }: Props) => {
  const refDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      refDialog.current?.showModal();
      document.body.classList.add("disable-scroll");
    } else {
      refDialog.current?.close();
      document.body.classList.remove("disable-scroll");
    }
  }, [isOpen]);

  return (
    <dialog
      ref={refDialog}
      className={twMerge(
        style.modal,
        "mx-auto mt-40 w-[700px] rounded-lg bg-violet-100",
      )}
      onClick={handleClose}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="p-5"
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 cursor-pointer"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
