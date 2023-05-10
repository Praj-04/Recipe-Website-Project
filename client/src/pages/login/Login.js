import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";
import { GiCampCookingPot } from "react-icons/gi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      // console.log(response);
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      navigate("/");
    } catch (error) {
      window.confirm(error)
    }
  }

  return (
    <div className="Login">
      <div className="container">
      <div className="logo">
       <h1> <GiCampCookingPot style={{ color: " rgb(179, 28, 28)" }} onClick={() => navigate("/recipes")} className="hover-link"/>{" "}</h1>
      </div>

      <div className="login-box">
        <h2 className="heading">Login</h2>
        <form>
          {/* <label htmlFor="email">Email</label> */}
          <input
            type="email"
            id="email"
            className="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            id="password"
            className="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <p className="sub-heading">
          Do not have an account? <Link to="/signup">Sign Up</Link>{" "}
        </p>
      </div>
    </div>
    </div>
  );
}

export default Login;
