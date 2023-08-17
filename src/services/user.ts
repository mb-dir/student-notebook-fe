import axiosInstance from "../axiosInstance";
import { User } from "../context/userContext";

type registerData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type loginData = {
  email: string;
  password: string;
};

export const userRegister = async (registerData: registerData) => {
  const { data } = await axiosInstance.post<User>(
    "/user/register",
    registerData
  );

  return data;
};

export const userLogin = async (loginData: loginData) => {
  const { data } = await axiosInstance.post<User>("/user/login", loginData);
  return data;
};
