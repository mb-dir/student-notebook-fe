import { FC } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { userLogin } from "../../services/user";
import { SubmitHandler, useForm } from "react-hook-form";
import "./styles.scss";

interface IFormInput {
  email: string;
  password: string;
}

const Login: FC = () => {
  const { login } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    try {
      const data = await userLogin({ email, password });
      login(data);
    } catch (error: any) {
      console.log(error);
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
          {...register("email", { required: true })}
          className="loginForm__input"
          type="email"
          id="email"
        />

        <label className="loginForm__label" htmlFor="password">
          password
        </label>
        <input
          {...register("password", { required: true })}
          className="loginForm__input"
          type="password"
          id="password"
        />
        <button className="loginForm__button">Login</button>
      </form>
      <div className="loginWrapper__error">
        <p>{errors.email && "Email is required"}</p>
        <p>{errors.password && "Password is required"}</p>
      </div>
    </div>
  );
};

export default Login;
