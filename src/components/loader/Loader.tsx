import "./style.scss";

import { FC, useEffect, useState } from "react";

const Loader: FC = () => {
  const [loadingText, setLoadingText] = useState("Loading.");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prevText => {
        switch (prevText) {
          case "Loading.":
            return "Loading..";
          case "Loading..":
            return "Loading...";
          default:
            return "Loading.";
        }
      });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className="loader">{loadingText}</div>;
};

export default Loader;
