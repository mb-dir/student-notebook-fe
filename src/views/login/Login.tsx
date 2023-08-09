import { FormEvent, ChangeEvent, useState } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import "./styles.scss";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { login } = useUserContext();

  const resetState = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // TODO - use axios
    e.preventDefault();
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.status === 200) {
      login(data);
      resetState();
    } else {
      setError(data.error);
    }
  };
  return (
    <div className="loginWrapper">
      <h2 className="loginWrapper__header">Login</h2>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="loginForm__label" htmlFor="email">
          e-mail
        </label>
        <input
          value={email}
          className="loginForm__input"
          type="email"
          name="email"
          id="email"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />

        <label className="loginForm__label" htmlFor="password">
          password
        </label>
        <input
          className="loginForm__input"
          value={password}
          type="password"
          name="password"
          id="password"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button className="loginForm__button">Login</button>
      </form>
      <div className="loginWrapper__error">{error && error}</div>
    </div>
  );
};

export default Login;
