import { useEffect, FC } from "react";
import { useUserContext } from "../../hooks/useUserContext";

const Logout: FC = () => {
  const { logout } = useUserContext();
  useEffect(() => {
    logout();
  }, [logout]);
  // Toast here
  return <></>;
};

export default Logout;
