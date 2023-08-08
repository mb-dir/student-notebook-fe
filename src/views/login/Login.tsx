import "./styles.scss";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="loginWrapper">
      <h2 className="loginWrapper__header">Login</h2>
      <form className="loginForm">
        <label className="loginForm__label" htmlFor="email">
          e-mail
        </label>
        <input
          className="loginForm__input"
          type="email"
          name="email"
          id="email"
        />

        <label className="loginForm__label" htmlFor="password">
          password
        </label>
        <input
          className="loginForm__input"
          type="password"
          name="password"
          id="password"
        />
      </form>
      <button className="loginWrapper__button">Login</button>
    </div>
  );
};

export default Login;
