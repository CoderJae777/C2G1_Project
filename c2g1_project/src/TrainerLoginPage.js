import {Link} from 'react-router-dom';
import ClientLoginPage from './ClientLoginPage';
import AdminLoginPage from './AdminLoginPage';
import TrainerHomePage from './TrainerHomePage';
import { useNavigate} from 'react-router-dom';
import stockimgtop from './stockimgtop.jpg';
import stockimgbottom from './stockimgbottom.jpg';
import dellacademylogo from './DellAcademy.png';

const TrainerLoginPage = () => {

    const nav = useNavigate();
    const handleSignIn = () => {
        nav("/TrainerHomePage");
    }
    const handleAdminLoginPage = () => {
      alert("Navigating to Admin Log In")
       nav("/AdminLoginPage");
    }
    const handleClientLoginPage = () => {
      alert("Navigating to Client Log In")
       nav("/ClientLoginPage");
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
                <button className="client_login_button" onClick={handleClientLoginPage}>Client</button>
                <button className="admin_login_button" onClick={handleAdminLoginPage}>Admin</button>
                <button className="trainer_login_button_blue">Trainer</button>
              </div>
            <div className='login_details'>
               <button className="signin_button" onClick={handleSignIn}>Sign in</button>
            </div>
           </div>
        </>
       );
  }
 
export default TrainerLoginPage;