import "../css/signup.css";
import { useState } from "react";
import Navbar from "../components/NavBar";
import { Link } from 'react-router-dom'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  function handleForm(e: React.FormEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }


  return (
    <>
      <Navbar isHome = {false}/>
      <div className="signup-page">
        <h1 className="sign-up">Please Sign Up</h1>
        <div className="signup-form">
          <label id="email-label" htmlFor="email"></label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleForm}
          />
          <label id="password-label" htmlFor="password"></label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Password..."
            value={formData.password}
            onChange={handleForm}
          />
          <input
            id = "confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password..."
            value={formData.confirmPassword}
            onChange={handleForm}
          />
          <button
            className="signup-btn"
            onClick={async () => {
              try {
                const response = await fetch('http://localhost:8000/signup', {
                  method: "POST",
                  headers:{
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formData)
                })
                if (response.status === 201){
                  window.location.href = "/login"
                }
              }
              catch(error){
                console.log(error.message)
              }
            }}
          >
            SignUp
          </button>
          <span className = "account-availability">Already have an account? <Link to = "/login">Login</Link></span>
        </div>
      </div>
    </>
  );
}
