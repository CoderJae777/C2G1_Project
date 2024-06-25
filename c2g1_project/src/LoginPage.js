import ClientLoginPage from './ClientLoginPage';
import TrainerLoginPage from './TrainerLoginPage';
import { useNavigate } from 'react-router-dom';
import stockimgtop from './images/stockimgtop.jpg';
import stockimgbottom from './images/stockimgbottom.jpg';
import dellacademylogo from './images/DellAcademy.png';
import SignUpPage from './SignUpPage';
import AdminLoginPage from './AdminLoginPage';
import { useState } from 'react';
import AdminHomePage from './AdminHomePage';
import { useEffect } from "react";
import axios from 'axios';



// Running Json Server
// npx json-server --watch db.json --port 8000


const LoginPage = () => {

   const nav = useNavigate();
   const [username, usernameupdate] = useState("");
   const [password, passwordupdate] = useState("");

   const [formData, setFormData] = useState({
      username:'',
      password:'',
   })
   const [errors, setErrors] = useState({});
   const [valid, setValid] = useState(true);

   const ProceedLogin = (e) => {
      e.preventDefault();
      let isvalid = true;
      let validationErrors = {}
      if(formData.username === "" || formData.username === null){
         isvalid = false;
         validationErrors.username = "Username required";
      }
      if(formData.password === "" || formData.password === null){
         isvalid = false;
         validationErrors.username = "Password required";
      }
      setErrors(validationErrors);
      setValid(isvalid);

      axios.get('http://localhost:8000/user_data')
      .then(result => {
         result.data.map(user=>{
            if(user.username === formData.username){
               if(user.password === formData.password){
                  alert("Login Successful!");
               } else {
                  isvalid = false;
                  validationErrors.password = "Wrong Password";
               }
            } else if(formData.username != ""){
               isvalid = false;
               validationErrors.username = "Wrong username";
            }
         })
         setErrors(validationErrors);
         setValid(isvalid);
      }).catch(err => console.log(err))
   }
        


   const validate = () => {
      let result = true;
      if (username === '' || username === null) {
         result = false;
         alert('Please Enter Username');
      }

      if (password === '' || password === null) {
         result = false;
         alert('Please Enter Password');
      }
      return result;
   }

   const handleSignIn = () => {
      nav("/AdminHomePage");
   }
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
                  <img src={stockimgtop} alt="Stock Image" />
                  <img src={stockimgbottom} alt="Stock Image" />
               </div>
            </div>
            <div className="login_buttons">
               <h1>I am a/ an ... </h1>
               <button className="client_login_button" onClick={handleClientLoginPage}>Client</button>
               <button className="admin_login_button_blue" onClick={handleAdminLoginPage}>Admin</button>
               <button className="trainer_login_button" onClick={handleTrainerLoginPage}>Trainer</button>
               <form onSubmit={ProceedLogin} className='login_form'>
                  <div className="card">
                     <div className="card-header">
                        <h2></h2>
                     </div>
                     <div className="card-body">
                        <div className="form-group">
                           <label>Username <span className='errMsg'></span></label>
                           <input value={username} onChange={e => usernameupdate(e.target.value)} className="username"
                              type='text'

                           />
                        </div>
                     </div>
                     <div className="form-group">
                        <label>Password <span className='errMsg'></span></label>
                        <input value={password} onChange={e => passwordupdate(e.target.value)} className="password"
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

export default LoginPage;