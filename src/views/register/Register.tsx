import { FC } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { userRegister } from "../../services/user";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./styles.scss";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: FC = () => {
  const { login } = useUserContext();
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({
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
  return (
    <div className="registerWrapper">
      <h2 className="registerWrapper__header">Register</h2>
      <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
        <label className="registerForm__label" htmlFor="username">
          name
        </label>
        <input
          className="registerForm__input"
          id="username"
          {...register("username")}
        />
        <label className="registerForm__label" htmlFor="email">
          e-mail
        </label>
        <input
          className="registerForm__input"
          type="email"
          id="email"
          {...register("email")}
        />
        <label className="registerForm__label" htmlFor="password">
          password
        </label>
        <input
          className="registerForm__input"
          type="password"
          id="password"
          {...register("password")}
        />
        <label className="registerForm__label" htmlFor="confirmPassword">
          confirm password
        </label>
        <input
          className="registerForm__input"
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
        />
        <button className="registerForm__button">Register</button>
      </form>
    </div>
  );
};

export default Register;
