import "./landing.css";
import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import Header from "../components/Header";
import { userSignUp, setMessages } from "../features/users/userSlice";
import { useDispatch , useSelector} from "react-redux";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {emailMessage } = useSelector((state) => state.users);

  // console.log('Inside signUp page: ',  emailMessage);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMessage, setPasswordMessage] = useState("");

  function handleChange(event) {
    setPasswordMessage("");
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }


  const handleSignupForm = async() => {
    const canSave = formData.email !== "" && formData.password !== "" && formData.confirmPassword !== "";
    if (canSave){
      if (formData.password !== formData.confirmPassword){
        setPasswordMessage("!Incorrect password")
        return;
      }
      try {
        const newUser = {
          email: formData.email,
          password: formData.password
        }
        const response = await fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        }); 
        
        const data = await response.json();
        if (response.status === 201){
          navigate('/login')
        }
        else {
          dispatch(userSignUp(data));
        }
     
      }
      catch(error){
        console.log(error);
      } 
    }
  } 

  return (
    <>
    <Header/>
      <main className="sign-up-page">
        <h1>Please Sign Up</h1>
        <div id="form">
          <label id="e-label" htmlFor="email">
            <span>{emailMessage && "*"}</span> {emailMessage}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            onFocus={(e) => dispatch(setMessages({inputType : e.target.type}))}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
          <label id="p-label" htmlFor="password">
            <span>{passwordMessage && "*"}</span> {passwordMessage}
          </label>
          <input
            id="password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.confirmPassword}

          />
          <button
            className="sumbit-btn"
            onClick = {() => handleSignupForm()}
          >
            Sign up
          </button>
          <div className="signin-page-link">
            <span>Already have an account? </span>
            <Link to="/login">SignIn</Link>
          </div>
        </div>
      </main>
    </>
  );
}
