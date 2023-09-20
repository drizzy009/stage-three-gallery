import { useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import { useState } from "react";

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
        navigate('/gallery'); // Navigate to another page after successful registration.
      } catch (e) {
        setError(e.message);
        console.error(e);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
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
          <input type="submit" value="Sign Up" />
        </div>
        <p className="error">{error}</p>
      </form>
    </div>
  );
};

export default SignUp;
