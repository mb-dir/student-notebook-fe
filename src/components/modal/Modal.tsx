import "./styles.scss";

import { FC, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal__body">{children}</div>
    </div>
  );
};

export default Modal;
