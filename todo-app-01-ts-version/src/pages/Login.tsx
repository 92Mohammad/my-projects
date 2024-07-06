import "./landing.css";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { LogIn } from "../features/users/userSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";

interface UserLogin {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { success } = useSelector((state: RootState) => state.user);

  const [user, setUser] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const setUserFormValue = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as HTMLInputElement;
    setUser((prevValue: UserLogin) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleLoginForm = () => {
    console.log('login')
    console.log(user.email)
    if (user.email == "" || user.password == "") {
      return;
    }
    
    dispatch(LogIn({ email: user.email, password: user.password }));
  };

  useEffect(() => {
    if (success){
      navigate('../todoPage')
    }

  }, [dispatch, success])

  return (
    <>
      <Header isLogin={false} />
      <main className="login-up-page">
        <h1>Please Login</h1>
        <div id="form">
          <label id="e-label" htmlFor="email">
            {/*<span>{emailMessage && "*"}</span> {emailMessage}*/}
          </label>
          <input
            id="email"
            name="email"
            value={user.email}
            type="email"
            placeholder="Email"
            onChange={(e) => setUserFormValue(e)}
            // onFocus={(e) => dispatch(setMessages({inputType: e.target.type}))}
          />
          <label id="p-label" htmlFor="password">
            {/*<span>{passwordMessage && "*"}</span> {passwordMessage}*/}
          </label>
          <input
            id="password"
            name="password"
            value={user.password}
            type="password"
            placeholder="Password"
            onChange={(e) => setUserFormValue(e)}
            // onFocus={(e) => dispatch(setMessages({inputType : e.target.type}))}
          />

          <button className="sumbit-btn" onClick={() => handleLoginForm()}>
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
