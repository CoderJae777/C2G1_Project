import ClientLoginPage from './ClientLoginPage';
import TrainerLoginPage from './TrainerLoginPage';
import { useNavigate} from 'react-router-dom';
import stockimgtop from './stockimgtop.jpg';
import stockimgbottom from './stockimgbottom.jpg';
import dellacademylogo from './DellAcademy.png';


const LoginPage = () => {

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
               <button className="admin_login_button">Admin</button>
               <button className="trainer_login_button" onClick={handleTrainerLoginPage}>Trainer</button>
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
               <h5>Sign Up!</h5>
               <h5>Forget password</h5>
            </div>
         
         </div>
      </>
     );
}
 
export default LoginPage;