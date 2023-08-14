import { useEffect } from "react";
import { useUserContext } from "../../hooks/useUserContext";

type Props = {};

const Logout = (props: Props) => {
  const { logout } = useUserContext();
  useEffect(() => {
    logout();
  }, [logout]);
  return <></>;
};

export default Logout;
