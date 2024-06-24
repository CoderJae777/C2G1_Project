import {Link} from 'react-router-dom';
import ClientLoginPage from './ClientLoginPage';
import AdminLoginPage from './AdminLoginPage';
import TrainerHomePage from './TrainerHomePage';
import { useNavigate} from 'react-router-dom';
import stockimgtop from './stockimgtop.jpg';
import stockimgbottom from './stockimgbottom.jpg';
import dellacademylogo from './DellAcademy.png';
import SignUpPage from './SignUpPage';

const TrainerLoginPage = () => {

    const nav = useNavigate();
    const handleSignIn = () => {
        nav("/TrainerHomePage");
    }
    const handleAdminLoginPage = () => {
       nav("/AdminLoginPage");
    }
    const handleClientLoginPage = () => {
       nav("/ClientLoginPage");
    }
    const handleSignUp = () => {
      nav("/SignUpPage");
   }


    return ( 
        <>            
         <div className='top_of_login'>
         <div className='login_words'>
            <h1>Grow your skills with Dell Academy</h1>
            <h4>Sign up for Award Winning Workshops Today!</h4>
         </div>
         <div>
            <img src={dellacademylogo} alt="logo"></img>
         </div>
         </div>          
           <div className="login_page">
              <div className="login_pictures">
                  <div className="login_pictures">
                     <img src={stockimgtop} alt="Stock Image"/>
                     <img src={stockimgbottom} alt="Stock Image"/>
                  </div>
               </div>
               <div className="login_buttons">
                  <h1>I am a/ an ... </h1>
                  <button className="client_login_button" onClick={handleClientLoginPage}>Client</button>
                  <button className="admin_login_button" onClick={handleAdminLoginPage}>Admin</button>
                  <button className="trainer_login_button_blue">Trainer</button>
                  <h4>Username/ Staff ID</h4>
                  <input className = "username"
                     type='text'
                     required
                  />
                  <h4>Password</h4>
                  <input className = "password"
                     type='text'
                     required
                  />
                  <button className="signin_button" onClick={handleSignIn}>Sign in</button>
                  <h5 onClick={handleSignUp}>Sign Up!</h5>
                  <h5>Forget password</h5>
               </div>
            <div className='login_details'>
            </div>
           </div>
        </>
       );
  }
 
export default TrainerLoginPage;