import "./landing.css";
import { React, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { userLogin , setMessages} from "../features/users/userSlice";

export default function LoginPage() {
  const naviagte = useNavigate();
  const dispatch  = useDispatch();
  const {emailMessage, passwordMessage } = useSelector(state => state.users);

  const emailRefElement = useRef();
  const passwordRefElement = useRef();
  const checkboxRefElement = useRef();
  

  const handleLoginForm = async() => {
    if (emailRefElement !== "" && passwordRefElement !== ""){
      try {
        const USER = {
          email:  emailRefElement.current.value,
          password: passwordRefElement.current.value,
        }
        const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(USER),
        });
        const data = await response.json();

        if (response.status === 200){
          localStorage.setItem("token", data.token);
          naviagte("/todoPage");
        }
        else {
          dispatch(userLogin(data))
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
      <main className="login-up-page">
        <h1>Please Login</h1>
        <div id="form">
          <label id="e-label" htmlFor="email">
            <span>{emailMessage && "*"}</span> {emailMessage}
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            ref = {emailRefElement}
            onFocus={(e) => dispatch(setMessages({inputType: e.target.type}))}
          />
          <label id="p-label" htmlFor="password">
            <span>{passwordMessage && "*"}</span> {passwordMessage}
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            ref = {passwordRefElement}
            onFocus={(e) => dispatch(setMessages({inputType : e.target.type}))}
          />

          <div id="checkbox-inptus">
            <input  
              id="checkbox"
              type="checkbox"
              name="isChecked"
              ref = {checkboxRefElement}
             
            />
            <label htmlFor="checkbox">all terms & conditions</label>
          </div>
          <button
            className="sumbit-btn"             
            onClick = {() => handleLoginForm()}
          >
            LogIn
          </button>
          <div className="signin-page-link">
            <span>Don't have an account? </span>
            <Link to="/signup">Create</Link>
          </div>
        </div>
      </main>
    </>
  );
}
