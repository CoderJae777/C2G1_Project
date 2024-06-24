import TrainerLoginPage from './TrainerLoginPage';
import ClientHomePage from './ClientHomePage'; 
import { useNavigate} from 'react-router-dom';
import stockimgtop from './stockimgtop.jpg';
import stockimgbottom from './stockimgbottom.jpg';
import dellacademylogo from './DellAcademy.png';


const ClientLoginPage = () => {
   const nav = useNavigate();
   const handleSignIn = () => {
      nav("/ClientHomePage");
   }
   const handleTrainerLoginPage = () => {
      alert("Navigating to Trainer Log In")
      nav("/TrainerLoginPage");
   }
   const handleAdminLoginPage = () => {
      alert("Navigating to Admin Log In")
      nav("/AdminLoginPage");
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
               <img src={stockimgtop} alt="Stock Image"/>
               <img src={stockimgbottom} alt="Stock Image"/>
            </div>
            <div className="login_buttons">
               <button className="client_login_button_blue">Client</button>
               <button className="admin_login_button" onClick={handleAdminLoginPage}>Admin</button>
               <button className="trainer_login_button" onClick={handleTrainerLoginPage}>Trainer</button>
            </div>
            <div className='login_details'>
             <button className="signin_button" onClick={handleSignIn}>Sign in</button>
            </div>
         </div>
        </>
       )
  }
 
export default ClientLoginPage;