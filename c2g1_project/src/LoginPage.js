import {Link} from 'react-router-dom';
import ClientLoginPage from './ClientLoginPage';
import AdminLoginPage from './AdminLoginPage';
import TrainerLoginPage from './TrainerLoginPage';
import AdminHomePage from './AdminHomePage';
import { useNavigate} from 'react-router-dom';

const LoginPage = () => {

    const nav = useNavigate();
    const handleSignIn = () => {
        nav("/AdminHomePage");
    }

    return ( 
        <>            
           <h1 className="login_words">Grow your skills with Dell Academy</h1>
           <div className="login_page">
              <div class="login_pictures">
                 <p>Log In Page</p>
              </div>
              <div className="login_buttons">
                 <Link to ={"/ClientLoginPage"}>
                    <button className="client_login_button">Client</button>
                 </Link>
                 <Link to ="/AdminLoginPage">
                    <button className="admin_login_button">Admin</button>
                 </Link>
                 <Link to ="/TrainerLoginPage">
                    <button className="trainer_login_button">Trainer</button>
                 </Link>
            
                <button className="signin" onClick={handleSignIn}>Sign in</button>
            
              </div>
           </div>
        </>
       );
  }
 
export default LoginPage;