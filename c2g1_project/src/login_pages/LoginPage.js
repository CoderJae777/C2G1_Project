import { useNavigate } from "react-router-dom";
import dellacademylogo from "../images/DellAcademy.png";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/NavBar.js";

// Running Json Server
// npx json-server --watch db.json --port 8000
// npx json-server --watch trainer_db.json --port 8000

const LoginPage = () => {
  const nav = useNavigate();
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const [move, setMove] = useState(false);

  const ProceedLogin = (e) => {
    e.preventDefault();
    alert("Please pick your role");
    window.location.reload();
  };

  // const handleSignIn = () => {
  //    nav("/AdminHomePage");
  // }
  const handleTrainerLoginPage = () => {
    nav("/TrainerLoginPage");
  };
  const handleClientLoginPage = () => {
    nav("/ClientLoginPage");
  };
  const handleAdminLoginPage = () => {
    nav("/AdminLoginPage");
  };
  const handleSignUp = () => {
    nav("/SignUpPage");
  };

  return (
    <>
      <Navbar />
      <motion.div className="login_page">
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          initial={{ opacity: 0 }}
          className="login_buttons"
        >
          <img src={dellacademylogo} className="dell_logo" alt="logo"></img>
          <h5 className="role">Pick your role: </h5>{" "}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="client_login_button"
            onClick={handleClientLoginPage}
          >
            Client
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="admin_login_button"
            onClick={handleAdminLoginPage}
          >
            Admin
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="trainer_login_button"
            onClick={handleTrainerLoginPage}
          >
            Trainer
          </motion.button>
          <form onSubmit={ProceedLogin} className="login_form">
            <div className="card-body">
              <div className="form-group">
                <label>
                  <span className="errMsg"></span>
                </label>
                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => usernameupdate(e.target.value)}
                  className="username"
                  type="text"
                />
              </div>
              <div className="form-group">
                <label>
                  <span className="errMsg"></span>
                </label>
                <input
                  placeholder="Password"
                  value={password}
                  onChange={(e) => passwordupdate(e.target.value)}
                  className="password"
                  type="password"
                  // this will print out ..... when typing
                />
              </div>
            </div>
            <div className="card_footer">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="signin_button"
              >
                Sign in
              </motion.button>
              <h5 className="signup" onClick={handleSignUp}>
                Need an account? Sign Up!
              </h5>
              <h5 className="forget_pw">Forget password</h5>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default LoginPage;
