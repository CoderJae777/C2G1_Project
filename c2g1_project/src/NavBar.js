import { useNavigate} from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import dellacademylogo_small from './images/NavBarLogo.png';



const Navbar = () => {

    const nav = useNavigate();

    const handleNavBarSignIn = () => {
       nav("/");
    }
    const handleSignUp = () => {
        nav("/SignUpPage");
     }
  

    return ( 
        <nav className="navbar">
            <div className="navbar_contents">
                <img onClick={handleNavBarSignIn} className='navbarlogo' src={dellacademylogo_small}></img>
                {/* TBC --> links to an about us page */}
                <button>Dell Academy</button>
                {/* TBC --> links to the workshops page */}
                <button>Our Workshops</button>
                {/* TBC --> links to a view all trainers page */}
                <button>Our Trainers</button>
                <button onClick={handleNavBarSignIn}>Log in</button>
                <button onClick={handleSignUp}>Sign Up!</button>
            </div>
        </nav>
     );
}
 
export default Navbar;