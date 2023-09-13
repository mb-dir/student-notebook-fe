import "./styles.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { FC } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../../hooks/useUserContext";
import { userRegister } from "../../services/user";

type FormInput = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: FC = () => {
  const { login } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
    try {
      const data = await userRegister({
        username,
        email,
        password,
        confirmPassword,
      });
      login(data);
      toast.success("Register successful");
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  console.log(errors);

  return (
    <div className="registerWrapper">
      <h2 className="registerWrapper__header">Register</h2>
      <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
        <label className="registerForm__label" htmlFor="username">
          name
        </label>
        <input
          className={`registerForm__input ${
            !!errors.email ? "registerForm__input--error" : ""
          }`}
          id="username"
          {...register("username", { required: "Username field is required" })}
        />
        <p className="registerForm__error">{errors.username?.message}</p>

        <label className="registerForm__label" htmlFor="email">
          e-mail
        </label>
        <input
          className={`registerForm__input ${
            !!errors.email ? "registerForm__input--error" : ""
          }`}
          type="email"
          id="email"
          {...register("email", {
            required: "Email field is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "You must provide valid email",
            },
          })}
        />
        <p className="registerForm__error">{errors.email?.message}</p>

        <label className="registerForm__label" htmlFor="password">
          password
        </label>
        <input
          className={`registerForm__input ${
            !!errors.email ? "registerForm__input--error" : ""
          }`}
          type="password"
          id="password"
          {...register("password", {
            required: "Password field is required",
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/,
              message: "You must provide strong password",
            },
          })}
        />
        <p className="registerForm__error">{errors.password?.message}</p>

        <label className="registerForm__label" htmlFor="confirmPassword">
          confirm password
        </label>
        <input
          className={`registerForm__input ${
            !!errors.email ? "registerForm__input--error" : ""
          }`}
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Confirm password field is required",

            validate: (value, formValues) => {
              return value !== formValues.password
                ? "Passwords must be the same"
                : true;
            },
          })}
        />
        <p className="registerForm__error">{errors.confirmPassword?.message}</p>
        <button className="registerForm__button">Register</button>
      </form>
    </div>
  );
};

export default Register;
