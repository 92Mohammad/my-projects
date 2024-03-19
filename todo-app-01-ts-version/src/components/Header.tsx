import "../css/style.css";
import React from 'react'
import { IoMenu } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { homePageProps } from "pages/HomePage";
interface headerProps{
  method: string,
  headers: {
    authorization: string
  },
}


export default function Header({isLogin}: homePageProps ) {
  const navigate = useNavigate();
  const logOut = async(): Promise<void> =>{
    const payload: headerProps = {
      method: "POST",
      headers: {
        authorization : localStorage.getItem("token")!,
      }
    }

    try {

      const response = await fetch('http://localhost:8000/logout', payload)
      
      const data = await response.json()
      if (response.status === 200){
          localStorage.removeItem("token");
          window.location.href = '/'
      }
      console.log(data)
    }catch(error: any){
      console.log("Error occurred: ", error.message)
    }

  }
  const SignIn = ():void  => {
    navigate('/login')
  }

  return (
    <>
      <div className="header">
        <div className="left-header">
          <h1>My Todo</h1>
        </div>
        <div className="middle-header">
          <Link to = "/">Home</Link>
          <Link to = "https://github.com/92Mohammad" target="_blank" >Git Hub</Link>
          <Link to = "https://twitter.com/Mohammad895718" target="_blank" >Twitter</Link>
        </div>
        <div className="right-header">
          <button
            className="Btn"
            onClick = {isLogin ? logOut : SignIn }
          >
            {isLogin ? 'LogOut' : "Sign In" }
          </button>
          <IoMenu className="menu-btn"/>
        </div>
      </div>
    </>
  );
}
