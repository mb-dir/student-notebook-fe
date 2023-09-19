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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

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
          {...register("email", {
            required: "Email field is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "You must provide valid email",
            },
          })}
          className={`loginForm__input ${
            !!errors.email ? "loginForm__input--error" : ""
          }`}
          type="email"
          id="email"
        />
        <p className="loginForm__error">{errors.email?.message}</p>

        <label className="loginForm__label" htmlFor="password">
          password
        </label>
        <input
          {...register("password", {
            required: "Password field is required",
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/,
              message: "You must provide strong password",
            },
          })}
          className={`loginForm__input ${
            !!errors.password ? "loginForm__input--error" : ""
          }`}
          type="password"
          id="password"
        />
        <p className="loginForm__error">{errors.password?.message}</p>
        <button className="loginForm__button">Login</button>
      </form>
    </div>
  );
};

export default Login;
