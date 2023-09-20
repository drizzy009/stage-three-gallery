import { useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import { useState } from "react";

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
        navigate('/gallery')
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
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name=""
            id="Email"
          />
          <label htmlFor="Email">Email</label>
          <p className="error">{emailError}</p>
        </div>
        <div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name=""
            id="password"
          />
          <label htmlFor="Password">Password</label>
          <p className="error">{passwordError}</p>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
        <p className="error">{error}</p>
      </form>
    </div>
  );
};

export default Login;
