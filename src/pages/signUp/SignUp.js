import React, { useContext,  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import "./SignUp.css";
//to import icons 
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
const SignUp = () => {
  const [form, setForm] = useState({});
  const [userData, setUserData] = useContext(UserContext); 
  const [type, setType] = useState("password");
  const Navigate = useNavigate();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



const handleSubmit = async (e)=> {
        e.preventDefault();
        try{
                    await axios.post(`https://lazy-battledress-fawn.cyclic.cloud/api/users`, form)
               
        const loginUser = await axios.post(`https://lazy-battledress-fawn.cyclic.cloud/api/users/login`, {
            email: form.email,
            password: form.password
        });
        setUserData(
            {
                token: loginUser.data.token,
                user: loginUser.data.user
               
            }
        )
 const expirationTime = new Date().getTime() + 60 * 60 * 1000;

        localStorage.setItem("auth-token", loginUser.data.token);
        localStorage.setItem("auth-token-expiration", expirationTime);          Navigate('/')
        }catch (err) {
            console.log('the problem is that>>>', err.res.data.msg)
            alert('the problem is that>>>', err.res.msg)        
        }

    }

  // to change type attribute from 'password' to 'text' and vice versa
  const [icon, setIcon] = useState(eyeOff);
  //
  
  const HandleIconChange = () => {
    // event listen for Password function
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
      <div className="container ">
        <div className="signupContainer">
          <h3 className="">Join the network</h3>
          <p className=" ">
            Already have an account?
            <Link to="/login" className="">
              Sign in
            </Link>
          </p>
        
          <form onSubmit={handleSubmit}>
              <div className="form-input form">
                <input
              className="pad-right login-input"
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Email"
            />
            <div className="name-container">
              <input
                className=" name-input"
                name="firstName"
                onChange={handleChange}
                type="text"
                placeholder="First Name"
              />

              <input
                className="name-input pad-left"
                name="lastName"
                onChange={handleChange}
                type="text"
                placeholder="Last Name"
              />
            </div>

            <input
              className="pad-right login-input"
              name="userName"
              onChange={handleChange}
              type="text"
              placeholder="User Name"
            />

            <input
              className="pad-right login-input"
              onChange={handleChange}
              name="password"
              type={type}
              placeholder="Password"
            />
            <span className="field-icon ">
              <Icon icon={icon} size={20} onClick={HandleIconChange} />
            </span>
              </div>
            <button className="btn_join">Agree and Join</button>
          </form>
         
          <p className="">
            I agree to the<Link to="" className="">privacy policy</Link>and<Link to="" className="">terms of serivice.</Link>
          </p>
          
          <Link to="/login" className="">
            Already have an account?
          </Link>
        </div>
        <div className="about-container">
          <span className="forTitle">About</span>
          <h1>Evangadi Networks Q&A</h1>
          <p>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.!</p>
          <p>Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</p>
          <button className="btn_how">HOW IT WORKS</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;