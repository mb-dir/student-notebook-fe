import "./styles.scss";
import { FC } from "react";

const Register: FC = () => {
  return (
    <div className="registerWrapper">
      <h2 className="registerWrapper__header">Register</h2>
      <form className="registerForm">
        <label className="registerForm__label" htmlFor="username">
          name
        </label>
        <input className="registerForm__input" name="username" id="username" />
        <label className="registerForm__label" htmlFor="email">
          e-mail
        </label>
        <input
          className="registerForm__input"
          type="email"
          name="email"
          id="email"
        />
        <label className="registerForm__label" htmlFor="password">
          password
        </label>
        <input
          className="registerForm__input"
          type="password"
          name="password"
          id="password"
        />
        <label className="registerForm__label" htmlFor="confirmPassword">
          confirm password
        </label>
        <input
          className="registerForm__input"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
        />
      </form>
    </div>
  );
};

export default Register;
