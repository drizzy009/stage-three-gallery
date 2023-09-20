import { useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { Login } = UserAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await Login(email, password);
      navigate('/gallery')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <input type="email" onChange={(e) => setEmail(e.target.value)} name="" id="Email" />
          <label htmlFor="Email">Email</label>
        </div>
        <div>
          <input type="password" onChange={(e) => setPassword(e.target.value)} name="" id="password" />
          <label htmlFor="Password">Password</label>
        </div>
        <div>
            <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
