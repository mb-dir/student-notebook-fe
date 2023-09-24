import "./styles.scss";

import { FC } from "react";

type ConfirmPopupProps = {
  onConfirm: () => void;
  onReject: () => void;
};

const ConfirmPopup: FC<ConfirmPopupProps> = ({ onConfirm, onReject }) => {
  return (
    <div className="confirmPopup">
      <p>Are you sure you want to do this?</p>
      <button className="confirmPopup__confirm" onClick={onConfirm}>
        Yes
      </button>
      <button className="confirmPopup__reject" onClick={onReject}>
        No
      </button>
    </div>
  );
};

export default ConfirmPopup;
