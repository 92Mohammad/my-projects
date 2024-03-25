import "../css/signup.css";
import { useState } from "react";
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";
export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  function handleForm(e) {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }
  console.log(formData);

  return (
    <>
      <Navbar />
      <div className="login-page">
        <h1 className="login">Please LogIn</h1>
        <div className="login-form">
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
          <button
            className="login-btn"
            onClick={async () => {
              try {
                alert("btn clicked");
                const response = await fetch("http://localhost:8000/login",  {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ 
                    email: formData.email,
                    password: formData.password
                   }),
                });
                const data = await response.json();
                console.log(data)
                if (response.status === 201){
                  localStorage.setItem("jwtToken", data.jwtToken);
                  window.location.href = '/notes'
                }
              } catch (error) {
                console.log(error.message);
              }
            }}
          >
            Login
          </button>
          <span className="account-availability">
            Account does not exist? <Link to="/signup">Register</Link>
          </span>
        </div>
      </div>
    </>
  );
}
