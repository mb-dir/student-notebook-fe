import "./styles.scss";

import { FC, ReactNode } from "react";

type NoContentProps = {
  children: ReactNode;
};

const NoContent: FC<NoContentProps> = ({ children }) => {
  return (
    <div className="noContent">
      <div className="noContent__body">{children}</div>
    </div>
  );
};

export default NoContent;
