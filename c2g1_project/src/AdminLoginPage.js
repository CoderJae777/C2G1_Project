import ClientLoginPage from './ClientLoginPage';
import TrainerLoginPage from './TrainerLoginPage';
import { useNavigate} from 'react-router-dom';

const AdminLoginPage = () => {

   const nav = useNavigate();
   const handleSignIn = () => {
       nav("/AdminHomePage");
   }
   const handleTrainerLoginPage = () => {
      nav("/TrainerLoginPage");
   }
   const handleClientLoginPage = () => {
      nav("/ClientLoginPage");
   }

    return ( 
      <>     
          
         <h1 className="login_words">Grow your skills with Dell Academy</h1>
         <div className="login_page">
            <div className="login_pictures">
                  <p>Admin Sign In Page</p>
               </div>
            <div className="login_buttons">
               <button className="client_login_button" onClick={handleClientLoginPage}>Client</button>
               <button className="admin_login_button_blue">Admin</button>
               <button className="trainer_login_button" onClick={handleTrainerLoginPage}>Trainer</button>
               <button className="signin" onClick={handleSignIn}>Sign in</button>
            </div>
         </div>
      </>
     );
}
 
export default AdminLoginPage;