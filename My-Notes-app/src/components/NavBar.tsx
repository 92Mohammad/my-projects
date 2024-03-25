import '../css/navbar.css'
import { Link } from 'react-router-dom'
export default function NavBar(props){

    return (
        <>
            <nav>
                <h1 className='website-logo'>My Notes</h1>
                <div className = {props.isHome ? "nav-items-home": "nav-items" }>                    
                    <Link to = "/">Home</Link>
                    <Link to= "/about">About</Link>
                    <Link to= "/work">Work</Link>
                    <Link to= "/login">LogIn</Link> 
                </div>
            </nav>
        </>
    )
}