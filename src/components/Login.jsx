import { useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import { useState } from "react";
import styles from "./Login.module.css";
import SignUp from "./SignUp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const { Login } = UserAuth();

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (validateForm()) {
      try {
        await Login(email, password);
        navigate("/gallery");
      } catch (e) {
        if (e.code === "auth/invalid-login-credentials") {
          setError("Invalid email address or password");
        } else {
          setError(e.message);
        }
        console.error(e);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card_switch}>
        <label className={styles.switch}>
          <input type="checkbox" className={styles.toggle} />
          <span className={styles.slider}></span>
          <span className={styles.card_side}></span>
          <div className={styles.flip_card__inner}>
            <div className={styles.flip_card__front}>
              <div className={styles.title}>Log in</div>
              <form onSubmit={handleLogin} className={styles.flip_card__form}>
                <div>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    name=""
                    id="Email"
                    placeholder="Email"
                    className={styles.flip_card__input}
                  />
                  <label htmlFor="Email" style={{display: "none"}}>Email</label>
                  <p className="error">{emailError}</p>
                </div>
                <div>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    name=""
                    id="password"
                    placeholder="Password"
                    className={styles.flip_card__input}
                  />
                  <label htmlFor="Password" style={{display: "none"}}>Password</label>
                  <p className="error">{passwordError}</p>
                </div>
                <div>
                  <input
                    type="submit"
                    value="Login"
                    className={styles.flip_card__btn}
                  />
                </div>
                <p className="error">{error}</p>
              </form>
            </div>
            <SignUp/>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Login;
