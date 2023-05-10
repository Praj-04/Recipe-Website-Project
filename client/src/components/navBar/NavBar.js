import React, { useRef, useState } from "react";
import "./NavBar.scss";
import { GiCampCookingPot } from "react-icons/gi";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


function NavBar() {
  const navigate = useNavigate();
 const dispatch = useDispatch();


function handleLogOut(event){
event.preventDefault();
navigate("/login")
}

  return (
    <div className="Navbar">
      
      <div className="container">
        
        <h2 className="banner hover-link" onClick={() => navigate("/")}>
        My Recipe Hub{" "}
          <GiCampCookingPot style={{ color: " rgb(179, 28, 28)" }} />{" "}
        </h2>

        {/* <h2 className="banner hover-link" onClick={() => navigate("/recipes")}>
        Recipe Hub{" "}
          <GiCampCookingPot style={{ color: " rgb(179, 28, 28)" }} />{" "}
        </h2> */}

        <div className="right-side">
        <button
          className="new-recipe hover-link"
          onClick={() => {
           
            navigate("/recipes");
          }}
        >
          Recipe Hub{" "}
          <GiCampCookingPot style={{ color: "#FFFFFF" }} />{" "}
        </button>
        <button
          className="new-recipe hover-link"
          onClick={() => {
           
            navigate("/create");
          }}
        >
          New Recipe ?
        </button>

        
          {/* <input className="search-bar" type="text" placeholder="search..." /> */}
          <div
            className="log-out hover-link"
            onClick={(event)=> handleLogOut(event)}
          >
            {" "}
            <AiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
