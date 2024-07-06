import "../css/style.css";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { homePageProps } from "../types/utils";
import { LogOut } from "../features/users/userSlice";
import { useAppDispatch } from "../app/store";

export default function Header({ isLogin }: homePageProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const SignIn = (): void => {
    navigate("/login");
  };

  return (
    <>
      <div className="header">
        <div className="left-header">
          <h1>My Todo</h1>
        </div>
        <div className="middle-header">
          <Link to="/">Home</Link>
          <Link to="https://github.com/92Mohammad" target="_blank">
            Git Hub
          </Link>
          <Link to="https://twitter.com/Mohammad895718" target="_blank">
            Twitter
          </Link>
        </div>
        <div className="right-header">
          <button className="Btn" onClick={() => isLogin ? dispatch(LogOut()) : SignIn()}>
            {isLogin ? "LogOut" : "Sign In"}
          </button>
          <IoMenu className="menu-btn" />
        </div>
      </div>
    </>
  );
}
