import { useUserContext } from "../../hooks/useUserContext";
import "./styles.scss";
import { useState, FC, ChangeEvent, FormEvent } from "react";

const Register: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { login } = useUserContext();

  const resetState = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // TODO - use axios
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords are not the same!");
      return;
    }
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
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
    <div className="registerWrapper">
      <h2 className="registerWrapper__header">Register</h2>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label className="registerForm__label" htmlFor="username">
          name
        </label>
        <input
          className="registerForm__input"
          name="username"
          id="username"
          value={username}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <label className="registerForm__label" htmlFor="email">
          e-mail
        </label>
        <input
          className="registerForm__input"
          type="email"
          name="email"
          id="email"
          value={email}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <label className="registerForm__label" htmlFor="password">
          password
        </label>
        <input
          className="registerForm__input"
          type="password"
          name="password"
          id="password"
          value={password}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <label className="registerForm__label" htmlFor="confirmPassword">
          confirm password
        </label>
        <input
          className="registerForm__input"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
        <button className="registerForm__button">Login</button>
      </form>
      <div className="registerWrapper__error">{error && error}</div>
    </div>
  );
};

export default Register;
