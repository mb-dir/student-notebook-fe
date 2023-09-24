import "./styles.scss";

import { FC } from "react";

type ConfirmPopupProps = {
  onConfirm?: () => void;
  OnReject?: () => void;
};

const ConfirmPopup: FC<ConfirmPopupProps> = ({ onConfirm, OnReject }) => {
  return (
    <div className="confirmPopup">
      <p>Are you sure you want to do this?</p>
      <button className="confirmPopup__confirm">Yes</button>
      <button className="confirmPopup__reject">No</button>
    </div>
  );
};

export default ConfirmPopup;
