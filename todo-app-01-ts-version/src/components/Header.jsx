import "../css/style.css";
import { IoMenu } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


export default function Header(props) {
  const navigate = useNavigate();
  const logOut = async() =>{
    try {
      const response = await fetch('http://localhost:8000/logout', {
          method: "POST",
          headers: {
              "authorization" : localStorage.getItem("token"),
          }
      })
      
      const data = await response.json()
      if (response.status === 200){
          localStorage.removeItem("token");
          window.location.href = '/'
      }
      console.log(data)
    }catch(error){
      console.log("Error occurred: ", error)

    }

  }
  const SignIn = () => {
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
            onClick = {props.isLogin ? logOut : SignIn }
          >
            {props.isLogin ? 'LogOut' : "Sign In" } 
          </button>
          <IoMenu className="menu-btn"/>
        </div>
      </div>
    </>
  );
}
