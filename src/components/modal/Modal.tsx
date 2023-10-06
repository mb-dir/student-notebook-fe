import "./styles.scss";

import { FC, ReactNode, useEffect, useRef } from "react";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target === modalRef.current) onClose();
    };

    const modalElement = modalRef.current;

    if (modalElement) {
      modalElement.addEventListener("click", handleOutsideClick);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("click", handleOutsideClick);
      }
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal__body" ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
