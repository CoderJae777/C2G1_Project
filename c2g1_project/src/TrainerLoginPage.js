import {Link} from 'react-router-dom';
import ClientLoginPage from './ClientLoginPage';
import AdminLoginPage from './AdminLoginPage';
import TrainerHomePage from './TrainerHomePage';
import { useNavigate} from 'react-router-dom';

const TrainerLoginPage = () => {

    const nav = useNavigate();
    const handleSignIn = () => {
        nav("/TrainerHomePage");
    }
    const handleAdminLoginPage = () => {
       nav("/TrainerLoginPage");
    }
    const handleClientLoginPage = () => {
       nav("/ClientLoginPage");
    }


    return ( 
        <>            
           <h1 id="login_words">Grow your skills with Dell Academy</h1>
           <div className="login_page">
              <div className="login_pictures">
                 <p>Trainer sign in page</p>
              </div>
              <div className="login_buttons">
                <button className="client_login_button" onClick={handleClientLoginPage}>Client</button>
                <button className="admin_login_button" onClick={handleAdminLoginPage}>Admin</button>
                <button className="trainer_login_button_blue">Trainer</button>
                <button className="signin" onClick={handleSignIn}>Sign in</button>
              </div>
           </div>
        </>
       );
  }
 
export default TrainerLoginPage;