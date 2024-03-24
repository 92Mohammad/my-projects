import "./landing.css";
import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import Header from "../components/Header";
// import { userSignUp, setMessages } from "/features/users/userSlice";
// import { useDispatch , useSelector} from "react-redux";
// import { RootState } from "store";

interface UserSignUp {
  email: string,
  password: string,
  confirmPassword: string,

}

export default function SignUp() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const {emailMessage } = useSelector((state: RootState) => state.users);


  const initialState: UserSignUp = {
    email: "",
    password: "",
    confirmPassword: "",
  }
  const [formData, setFormData] = useState<UserSignUp>(initialState);


  const [passwordMessage, setPasswordMessage] = useState<string>("");

  function handleChange(event: React.FormEvent<HTMLInputElement>):void {
    setPasswordMessage("");

    const { name, value} = event.target as HTMLInputElement;
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
        const response = await fetch("http://localhost:8000/auth/signup", {
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
          // dispatch(userSignUp(data));
        }
      }
      catch(error){
        console.log(error);
      } 
    }
  } 

  return (
    <>
    <Header isLogin={false}/>
      <main className="sign-up-page">
        <h1>Please Sign Up</h1>
        <div id="form">
          <label id="e-label" htmlFor="email">
            {/*<span>{emailMessage && "*"}</span> {emailMessage}*/}
          </label>
          <input
              required={true}
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
            value={formData.email}
            // onFocus={(e) => dispatch(setMessages({inputType : e.target.type}))}
          />
          <input
              required = {true}
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
            value={formData.password}
          />
          <label id="p-label" htmlFor="password">
            <span>{passwordMessage && "*"}</span> {passwordMessage}
          </label>
          <input
              required ={true}
            id="password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => handleChange(e)}
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
