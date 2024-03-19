import "./landing.css";
import React, { useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { userLogin , setMessages} from "features/users/userSlice";
import { RootState } from "store";


interface UserLogin {
  email: string,
  password: string,
}
export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch  = useDispatch();
  const {emailMessage, passwordMessage } = useSelector((state: RootState) => state.users);

  const [user, setUser] = useState<UserLogin>({
    email: "",
    password: "",
  })

  const setUserFormValue = (e: React.FormEvent<HTMLInputElement>): void => {
    const {name, value } = e.target as HTMLInputElement;
    setUser((prevValue: UserLogin) => {
      return {
        ...prevValue,
        [name]: value
      }
    })
  }
  const handleLoginForm = async() => {
    if (user.email !== "" && user.password !== ""){
      try {
        const USER: UserLogin = {
          email:  user.email,
          password: user.password,
        }
        const url: string = "http://localhost:8000/login";

        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(USER),
        });
        const data: any = await response.json();

        if (response.status === 200){
          localStorage.setItem("token", data.token);
          navigate("/todoPage");
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
      <Header isLogin={false}/>
      <main className="login-up-page">
        <h1>Please Login</h1>
        <div id="form">
          <label id="e-label" htmlFor="email">
            <span>{emailMessage && "*"}</span> {emailMessage}
          </label>
          <input
            id="email"
            name = "email"
            value = {user.email}
            type="email"
            placeholder="Email"
            onChange={(e) => setUserFormValue(e)}
            onFocus={(e) => dispatch(setMessages({inputType: e.target.type}))}
          />
          <label id="p-label" htmlFor="password">
            <span>{passwordMessage && "*"}</span> {passwordMessage}
          </label>
          <input
            id="password"
            name = "password"
            value = {user.password}
            type="password"
            placeholder="Password"
            onFocus={(e) => dispatch(setMessages({inputType : e.target.type}))}
          />

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
