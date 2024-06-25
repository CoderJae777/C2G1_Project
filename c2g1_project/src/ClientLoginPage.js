import TrainerLoginPage from './TrainerLoginPage';
import ClientHomePage from './ClientHomePage'; 
import { useNavigate} from 'react-router-dom';
import stockimgtop from './stockimgtop.jpg';
import stockimgbottom from './stockimgbottom.jpg';
import dellacademylogo from './DellAcademy.png';
import SignUpPage from './SignUpPage';
import { useState } from 'react';

const ClientLoginPage = () => {

   const[username, usernameupdate]=useState("");
   const[password, passwordupdate]=useState("");

   const ProceedLogin = (e) => {
      e.preventDefault();
      if(validate()){
         fetch("http://localhost:3000/"+username).then((res)=>{
            return res.json();
         }) .then((res)=>{
        
         })
      }

   }

   const validate=()=>{
      let result = true;
      if(username === '' || username ===null){
         result = false;
         alert('Please Enter the Correct Username');
      }

      if(password === '' || password ===null){
         result = false;
         alert('Please Enter the Correct Password');
      }
      return result;
   }

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
               <img src={stockimgtop} alt="Stock Image"/>
               <img src={stockimgbottom} alt="Stock Image"/>
            </div>
            <div className="login_buttons">
               <h1>I am a/ an ... </h1>
               <button className="client_login_button_blue">Client</button>
               <button className="admin_login_button" onClick={handleAdminLoginPage}>Admin</button>
               <button className="trainer_login_button" onClick={handleTrainerLoginPage}>Trainer</button>
               <form onSubmit={ProceedLogin} className='login_form'> 
                  <div className="card">
                     <div className="card-header">
                           <h2>Client Login</h2>
                     </div>
                     <div className="card-body">
                        <div className="form-group">
                           <label>Username <span className='errMsg'></span></label>
                           <input value={username} onChange={e=>usernameupdate(e.target.value)} className = "username"
                           type='text'

                           />
                        </div>
                     </div>
                        <div className="form-group">
                           <label>Password <span className='errMsg'></span></label>
                           <input value={password} onChange={e=>passwordupdate(e.target.value)}className = "password"
                           type='password'
                           // this will print out ..... when typing
                       
                           />
                        </div>
                     </div>
                     <div className='card_footer'>
                     <button type="submit" className="signin_button">Sign in</button>
                        <h5 onClick={handleSignUp}>Sign Up!</h5>
                        <h5>Forget password</h5>
                     </div>
               </form>
            </div>
      
         </div>
      </>
     );
  }
 
export default ClientLoginPage;