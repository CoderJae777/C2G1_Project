import { Link } from 'react-router-dom';
import ClientLoginPage from './ClientLoginPage';
import AdminLoginPage from './AdminLoginPage';
import TrainerHomePage from './TrainerHomePage';
import { useNavigate } from 'react-router-dom';
import stockimgtop from './images/stockimgtop.jpg';
import stockimgbottom from './images/stockimgbottom.jpg';
import dellacademylogo from './images/DellAcademy.png';
import SignUpPage from './SignUpPage';
import { useState } from 'react';

const TrainerLoginPage = () => {

   const [username, usernameupdate] = useState("Username");
   const [password, passwordupdate] = useState("Password");

   const ProceedLogin = (e) => {
      e.preventDefault();
      if (validate()) {
         fetch("http://localhost:3000/" + username).then((res) => {
            return res.json();
         }).then((res) => {

         })
      }

   }

   const validate = () => {
      let result = true;
      if (username === '' || username === null) {
         result = false;
         alert('Please Enter the Correct Username');
      }

      if (password === '' || password === null) {
         result = false;
         alert('Please Enter the Correct Password');
      }
      return result;
   }

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
            <div className='logo'>
               <img src={dellacademylogo} alt="logo"></img>
            </div>
         </div>
         <div className="login_page">
            <div className="login_pictures">
               <img src={stockimgtop} alt="Stock Image" />
               <img src={stockimgbottom} alt="Stock Image" />
            </div>
            <div className="login_buttons">
               <h1>I am a/ an ... </h1>
               <button className="client_login_button" onClick={handleClientLoginPage}>Client</button>
               <button className="admin_login_button" onClick={handleAdminLoginPage}>Admin</button>
               <button className="trainer_login_button_blue">Trainer</button>
               <form onSubmit={ProceedLogin} className='login_form'>
                  <div className="card">
                     <div className="card-header">
                     </div>
                     <div className="card-body">
                        <div className="form-group">
                           <label><span className='errMsg'></span></label>
                           <input value={username} onChange={e => usernameupdate(e.target.value)} className="username"
                              type='text'

                           />
                        </div>
                     </div>
                     <div className="form-group">
                        <label><span className='errMsg'></span></label>
                        <input value={password} onChange={e => passwordupdate(e.target.value)} className="password"
                           type='password'
                        // this will print out ..... when typing

                        />
                     </div>
                  </div>
                  <div className='card_footer'>
                     <button type="submit" onClick={handleSignIn} className="signin_button">Sign in</button>
                     <h5 className="signup" onClick={handleSignUp}>Need an account? Sign Up!</h5>
                     <h5 className='forget_pw'>Forget password</h5>
                  </div>
               </form>
            </div>

         </div>
      </>
   );
}

export default TrainerLoginPage;