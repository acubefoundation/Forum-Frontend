import "./Header.css";
import React, { useContext } from "react";
import "./Header.css";
import logo from "../images/evangadi-logo-home.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
function Header({ logout }) {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  const goToSignIn = (e) => {
    e.preventDefault();
    if (userData.user) {
      logout();
    }
    navigate("/login");
  };

  function drop() {
    var x = document.getElementById("myLinks");
    if (x.classList.contains("show")) {
      x.classList.remove("show");
    } else {
      x.classList.add("show");
    }
  }

  return (
    <div className="header">
      <div className="innerContainer">
        <div className="header-logo">
          <Link to="/" className="">
            <img src={logo} alt="Evangadi logo" />
          </Link>
          {/* <button onClick={drop} className="">
            ☰
          </button> */}

          {/* <div className="d-flex  innerContainer2 justify-content-between d-none  d-md-block">
            <Link to="/SignUp">Home</Link>
            <Link to="/">How it Works</Link>
            <button onClick={goToSignIn} className="btn_header">
              {userData.user ? "LogOut" : "SIGN IN"}
            </button>
          </div> */}
        </div>
      

      <div
        className="myLinks"
        id=""
      >
        <div className="myLinks-hov">
          
          <Link to="/">Home</Link>
        </div>
        <div className="myLinks-hov">
          <Link to="/">How it Works</Link>
        </div>
        <div onClick={goToSignIn} className="btn_header">
         <Link to='/'> {userData.user ? "LogOut" : "SIGN IN"} </Link>
        </div>
        
      </div>
      </div>
    </div>
  );
}

export default Header;