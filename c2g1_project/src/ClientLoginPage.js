import TrainerLoginPage from './TrainerLoginPage';
import ClientHomePage from './ClientHomePage'; 
import { useNavigate} from 'react-router-dom';

const ClientLoginPage = () => {
   const nav = useNavigate();
   const handleSignIn = () => {
      nav("/ClientHomePage");
   }
   const handleTrainerLoginPage = () => {
      nav("/TrainerLoginPage");
   }
   const handleAdminLoginPage = () => {
      nav("/AdminLoginPage");
   }

      return ( 
        <>            
           <h1 className="login_words">Grow your skills with Dell Academy</h1>
           <div className="login_page">
              <div className="login_pictures">
                 <p>Client sign in</p>
              </div>
              <div className="login_buttons">
                  <button className="client_login_button_blue">Client</button>
                  <button className="admin_login_button" onClick={handleAdminLoginPage}>Admin</button>
                  <button className="trainer_login_button" onClick={handleTrainerLoginPage}>Trainer</button>
                  <button className="signin" onClick={handleSignIn}>Sign in</button>
              </div>
           </div>
        </>
       );
  }
 
export default ClientLoginPage;