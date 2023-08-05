import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import './Login.css'

// icons 
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const Login = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post(`http://localhost:4500/api/users/login`,
        {
          email: form.email,
          password: form.password,
        }
      );
      
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
 const expirationTime = new Date().getTime() + 60 * 60 * 1000;

        localStorage.setItem("auth-token", loginRes.data.token);
        localStorage.setItem("auth-token-expiration", expirationTime);
              navigate("/");
    } catch (err) {
      console.log("problem", err);
      alert(err.response.data.msg);
    }
  };
  // console.log(userData.user.id)

  useEffect(() => {
    if (userData.user) navigate("/");
  }, [userData.user, navigate]);

  const [type, setType] = useState("password");

  // to change type attribute from 'password' to 'text' and vice versa
  const [icon, setIcon] = useState(eyeOff);
  // to change the icon when clicked
  const HandleIconChange = () => {
    // event listenforPassworder function
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  return (
    <div className="container-fluid ">
      <div className="container">
        <div className="login_container">
          <h3 className="">Login to your account</h3>
          <p className="create-acc">
            Don't have an account?<Link to='/signup' className="a3">Create a new account</Link>
          </p>
          <form onSubmit={handleSubmit}>
            <input className="login-input" type="email" name="email" onChange={handleChange} placeholder="Your Email" />
            <div className="input-container">
  <input
    className="login-input"
    type={type}
    name="password"
    onChange={handleChange}
    placeholder="Your Password"
  />
  <span onClick={HandleIconChange} className="showHide2">
    <Icon className="field-icon" icon={icon} size={20} />
  </span>
</div>
         <div className="align-center">
            <button className="btn_login">submit</button>
         </div>
          </form>
          <Link to='/signup' className="a3">
            Create an account?
          </Link>
        </div>
        <div className="about-container">
          <span className="forTitle">About</span>
          <h1>Evangadi Networks Q&A</h1>
          <p>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.!</p>
          <p>Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</p>
          <button className="btn_login">HOW IT WORKS</button>
        </div>
      </div>
    </div>

  );
};

export default Login;