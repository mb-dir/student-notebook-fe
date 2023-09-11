import "./styles.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { FC } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../../hooks/useUserContext";
import { userLogin } from "../../services/user";

type FormInput = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const { login } = useUserContext();
  const { register, handleSubmit } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async ({ email, password }) => {
    try {
      const data = await userLogin({ email, password });
      login(data);
      toast.success("Login successful");
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="loginWrapper">
      <h2 className="loginWrapper__header">Login</h2>
      <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <label className="loginForm__label" htmlFor="email">
          e-mail
        </label>
        <input
          {...register("email")}
          className="loginForm__input"
          type="email"
          id="email"
        />

        <label className="loginForm__label" htmlFor="password">
          password
        </label>
        <input
          {...register("password")}
          className="loginForm__input"
          type="password"
          id="password"
        />
        <button className="loginForm__button">Login</button>
      </form>
    </div>
  );
};

export default Login;
