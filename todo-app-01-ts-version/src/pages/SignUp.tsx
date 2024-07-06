import "./landing.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { UserSignUp } from "../features/users/userSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";

interface UserSignUp {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { emailMessage, success } = useSelector(
    (state: RootState) => state.user
  );
  const initialState: UserSignUp = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState<UserSignUp>(initialState);

  const [passwordMessage, setPasswordMessage] = useState<string>("");

  function handleChange(event: React.FormEvent<HTMLInputElement>): void {
    setPasswordMessage("");

    const { name, value } = event.target as HTMLInputElement;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [dispatch, success]);

  const handleSignupForm = async () => {
    const canSave =
      formData.email !== "" &&
      formData.password !== "" &&
      formData.confirmPassword !== "";
    if (canSave) {
      if (formData.password !== formData.confirmPassword) {
        setPasswordMessage("!Incorrect password");
        return;
      }
      dispatch(
        UserSignUp({ email: formData.email, password: formData.password })
      );
    }
  };

  return (
    <>
      <Header isLogin={false} />
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
            required={true}
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
            required={true}
            id="password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => handleChange(e)}
            value={formData.confirmPassword}
          />
          <button className="sumbit-btn" onClick={() => handleSignupForm()}>
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
