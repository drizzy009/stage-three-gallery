import { useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import { useState } from "react";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();

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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (validateForm()) {
      try {
        await createUser(email, password); // Use your createUser function here.
        navigate("/gallery"); // Navigate to another page after successful registration.
      } catch (e) {
        setError(e.message);
        console.error(e);
      }
    }
  };

  return (
    <div className={styles.flip_card__back}>
      <div className={styles.title}>Sign up</div>
      <form className={styles.flip_card__form} onSubmit={handleSignUp}>
        <input
          type="email"
          className={styles.flip_card__input}
          onChange={(e) => setEmail(e.target.value)}
          name=""
          id="Email"
          placeholder="Email"
        />
        <label htmlFor="Email" style={{ display: "none" }}>
          Email
        </label>
        <p className="error">{emailError}</p>

        <input
          type="password"
          className={styles.flip_card__input}
          onChange={(e) => setPassword(e.target.value)}
          name=""
          id="password"
          placeholder="Password"
        />
        <label htmlFor="Password" style={{ display: "none" }}>
          Password
        </label>
        <p className="error">{passwordError}</p>

        <input
          type="submit"
          className={styles.flip_card__btn}
          value="Sign Up"
        />

        <p className="error">{error}</p>
      </form>
    </div>
  );
};

export default SignUp;
