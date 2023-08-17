import { FC } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { userRegister } from "../../services/user";
import { SubmitHandler, useForm } from "react-hook-form";
import "./styles.scss";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  passwords: string;
}

const Register: FC = () => {
  const { login } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
    try {
      if (password !== confirmPassword) {
        setError("passwords", {
          message: "Passwords are not the same",
        });
      }
      const data = await userRegister({
        username,
        email,
        password,
      });
      login(data);
    } catch (error: any) {
      console.log(error);
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
          {...register("username", { required: true })}
        />
        <label className="registerForm__label" htmlFor="email">
          e-mail
        </label>
        <input
          className="registerForm__input"
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
        <label className="registerForm__label" htmlFor="password">
          password
        </label>
        <input
          className="registerForm__input"
          type="password"
          id="password"
          {...register("password", { required: true })}
        />
        <label className="registerForm__label" htmlFor="confirmPassword">
          confirm password
        </label>
        <input
          className="registerForm__input"
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", { required: true })}
        />
        <button className="registerForm__button">Register</button>
      </form>
      <div className="registerWrapper__error">
        <p>{errors.username && "Username is required"}</p>
        <p>{errors.email && "Email is required"}</p>
        <p>{errors.password && "Password is required"}</p>
        <p>{errors.confirmPassword && "You need to confirm your password"}</p>
        <p>{errors.passwords && errors.passwords.message}</p>
      </div>
    </div>
  );
};

export default Register;
