import React from "react";
import { useNavigate } from "react-router-dom";
import { GiCampCookingPot } from "react-icons/gi";
import './UserNavBar.scss'


function UserNavBar() {
  const navigate = useNavigate();

  return (
    <div className="UserNavBar">
      <div className="container">
        <div className="left-side">
        <h2 className="banner hover-link" onClick={() => navigate("/recipes")}>
          Recipe Hub{" "}
          <GiCampCookingPot style={{ color: " rgb(179, 28, 28)" }} />{" "}
        </h2>

        {/* <h2 className="banner hover-link" onClick={() => navigate("/")}>
          Recipe Hub{" "}
          <GiCampCookingPot style={{ color: " rgb(179, 28, 28)" }} />{" "}
        </h2> */}
        </div>

        <div className="right-side">
        <button
          className="style-btn hover-link"
          onClick={() => {navigate("/about");
          }}
        >
          About
        </button>

        

        {/* <input className="search-bar" type="text" placeholder="search..." /> */}
        </div>
      </div>
    </div>
  );
}

export default UserNavBar;
