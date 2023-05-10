import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import { axiosClient } from "../../utils/axiosClient";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });
      // console.log(response);

      if(response.status == 'ok'){
        window.confirm(response.result)
        navigate('/login')
       }
      //else{
      //   console.log(response);
      //   window.confirm(response.message)
      // }
     
    } catch (error) {
      window.confirm(error)
    }
  }

  return (
    <div className="Signup">
      <div className="signup-box">
        <h2 className="heading">Signup</h2>
        <form>
          <input
            type="name"
            id="name"
            className="name"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />

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
            Sign Up
          </button>
        </form>
        <p className="sub-heading">
          Already have an account? <Link to="/login"> Log In </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Signup;
