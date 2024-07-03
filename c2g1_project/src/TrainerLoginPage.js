import { useNavigate } from 'react-router-dom';
import stockimgtop from './images/stockimgtop.jpg';
import stockimgbottom from './images/stockimgbottom.jpg';
import dellacademylogo from './images/DellAcademy.png';
import SignUpPage from './SignUpPage';
import AdminLoginPage from './AdminLoginPage';
import { useState } from 'react';
import AdminHomePage from './AdminHomePage';
import { useEffect } from "react";
import ClientLoginPage from './ClientLoginPage';
import TrainerHomePage from './TrainerHomePage';
import { motion } from "framer-motion";
import Navbar from './NavBar';



// Running Json Server
// npx json-server --watch db.json --port 8000


const TrainerLoginPage = () => {

   const nav = useNavigate();
   const [username, usernameupdate] = useState("");
   const [password, passwordupdate] = useState("");
   const [move, setMove] = useState(false);

   const ProceedLogin = (e) => {
      e.preventDefault();
      if (validate()) {
         console.log('Sign in button registered');
         fetch("http://localhost:8000/user_data/" + username).then((res) => {
            return res.json();
         }).then((userData) => {
            console.log(userData);
            if (Object.keys(userData).length === 0) {
               alert('Please Enter valid username');
            } else {
               if (userData.password === password) {
                  nav('/TrainerHomePage');
               } else {
                  alert('Invalid Password');
               }
            }
         }).catch((error) => {
            alert('Login Failed: User Account does not exist');
         });
      }
   }

   const validate = () => {
      let result = true;
      if (username === "") {
         result = false;
         alert("Username cannot be empty")
      }
      if (password === "") {
         result = false;
         alert("Password cannot be empty")
      }
      return result;
   }

   // const handleSignIn = () => {
   //    nav("/AdminHomePage");
   // }
   const handleTrainerLoginPage = () => {
      nav("/TrainerLoginPage");
   }
   const handleClientLoginPage = () => {
      nav("/ClientLoginPage");
   }
   const handleAdminLoginPage = () => {
      nav("/AdminLoginPage");
   }
   const handleSignUp = () => {
      nav("/SignUpPage");
   }

   return (
      <><Navbar/>
         <div className="login_page">
            <motion.div animate={{ x: move ? 0 : 200 }} transition={{ type: "inertia", velocity: 40 }} className="login_pictures">
               <img src={stockimgtop} alt="Stock Image" />
            </motion.div>
            <motion.div animate={{ scale: 1 }} initial={{ scale: 0 }} transition={{ type: "spring", delay: 0.25 }} className="login_buttons">
               <img src={dellacademylogo} className="dell_logo" alt="logo"></img>
               <h5>I am a TRAINER </h5>
               <button className="client_login_button" onClick={handleClientLoginPage}>Client</button>
               <button className="admin_login_button" onClick={handleAdminLoginPage}>Admin</button>
               <button className="trainer_login_button_blue" onClick={handleTrainerLoginPage}>Trainer</button>
               <form onSubmit={ProceedLogin} className='login_form'>
                  <div className="card-body">
                     <div className="form-group">
                        <label><span className='errMsg'></span></label>
                        <input placeholder='Username' value={username} onChange={e => usernameupdate(e.target.value)} className="username"
                           type='text'
                        />
                     </div>
                     <div className="form-group">
                        <label><span className='errMsg'></span></label>
                        <input placeholder="Password" value={password} onChange={e => passwordupdate(e.target.value)} className="password"
                           type='password'
                        // this will print out ..... when typing

                        />
                     </div>
                  </div>
                  <div className='card_footer'>
                     <button type="submit" className="signin_button">Sign in</button>
                     <h5 className="signup" onClick={handleSignUp}>Need an account? Sign Up!</h5>
                     <h5 className='forget_pw'>Forget password</h5>
                  </div>
               </form>
            </motion.div>

         </div>
      </>
   );
}

export default TrainerLoginPage;