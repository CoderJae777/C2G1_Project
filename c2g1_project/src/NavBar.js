import { useNavigate} from 'react-router-dom';
import LoginPage from './LoginPage';


const Navbar = () => {

    const nav = useNavigate();

    const handleNavBarSignIn = () => {
       nav("/");
    }

    return ( 
        <nav className="navbar">
            <div className="navbar_contents">
                {/* TBC --> links to an about us page */}
                <button>Dell Academy</button>
                {/* TBC --> links to the workshops page */}
                <button>Our Workshops</button>
                {/* TBC --> links to a view all trainers page */}
                <button>Our Trainers</button>
                <button onClick={handleNavBarSignIn}>Log in/out!</button>
            </div>
        </nav>
     );
}
 
export default Navbar;