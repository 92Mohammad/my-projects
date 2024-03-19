import { Link } from 'react-router-dom'
import Header from "../components/Header";
import image from "../images/background-image.jpg"
import "./home.css";

export type homePageProps = {
    isLogin: boolean
}
export default function Homepage({isLogin}: homePageProps) {

  return (
    <>
      <Header isLogin={isLogin} />
      <main className="home-page">
        <img src={image} alt="background image" />
        <h1>Turn "I should" into "I did" with the power of a todo list.</h1>
        <h3>
          Todo lists are powerful tools that can help you enhance your
          productivity, reduce stress, and bring a sense of order to your day.
        </h3>
        <Link to = "/signup">Start Your Day</Link>
      </main>
    </>
  );
}
