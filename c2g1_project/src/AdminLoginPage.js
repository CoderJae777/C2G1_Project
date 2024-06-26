import ClientLoginPage from './ClientLoginPage';
import TrainerLoginPage from './TrainerLoginPage';
import { useNavigate } from 'react-router-dom';
import stockimgtop from './images/stockimgtop.jpg';
import stockimgbottom from './images/stockimgbottom.jpg';
import dellacademylogo from './images/DellAcademy.png';
import SignUpPage from './SignUpPage';
import { useState } from 'react';

// Running Json Server
// npx json-server --watch db.json --port 8000

const AdminLoginPage = () => {

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
      nav("/AdminHomePage");
   }
   const handleTrainerLoginPage = () => {
      nav("/TrainerLoginPage");
   }
   const handleClientLoginPage = () => {
      nav("/ClientLoginPage");
   }
   const handleSignUp = () => {
      nav("/SignUpPage");
   }

   return (
      <>

         <div class='top_of_login'>
            <div class='login_words'>
               <h1>Grow your skills with Dell Academy</h1>
               <h4>Sign up for Award Winning Workshops Today!</h4>
            </div>
            <div>
               <img src={dellacademylogo} alt="logo"></img>
            </div>
         </div>
         <div class="login_page">
            <div class="login_pictures">
               <img src={stockimgtop} alt="Stock Image" />
               <img src={stockimgbottom} alt="Stock Image" />
            </div>
            <div class="login_buttons">
               <h1>I am a/ an ... </h1>
               <button class="client_login_button" onClick={handleClientLoginPage}>Client</button>
               <button class="admin_login_button_blue">Admin</button>
               <button class="trainer_login_button" onClick={handleTrainerLoginPage}>Trainer</button>
               <form onSubmit={ProceedLogin} class='login_form'>
                  <div class="card">
                     <div class="card-header">
                     </div>
                     <div class="card-body">
                        <div class="form-group">
                           <label><span class='errMsg'></span></label>
                           <input value={username} onChange={e => usernameupdate(e.target.value)} class="username"
                              type='text'

                           />
                        </div>
                     </div>
                     <div class="form-group">
                        <label><span class='errMsg'></span></label>
                        <input value={password} onChange={e => passwordupdate(e.target.value)} class="password"
                           type='password'
                        // this will print out ..... when typing

                        />
                     </div>
                  </div>
                  <div class='card_footer'>
                     <button type="submit" onClick={handleSignIn} class="signin_button">Sign in</button>
                     <h5 class="signup" onClick={handleSignUp}>Need an account? Sign Up!</h5>
                     <h5 class='forget_pw'>Forget password</h5>
                  </div>
               </form>
            </div>

         </div>
      </>
   );
}

export default AdminLoginPage;