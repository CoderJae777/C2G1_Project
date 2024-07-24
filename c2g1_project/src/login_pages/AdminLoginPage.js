import { useNavigate } from "react-router-dom";
import adminimg from "../images/adminimg.png";
import { useState } from "react";
import { motion } from "framer-motion";
import useAxiosPost from "../api/useAxiosPost.jsx";
import { config } from "../config/config.js";
import { endpoints } from "../config/endpoints.js";
import Navbar from "../components/NavBar.js";
import Footer from "../components/Footer.js";

const AdminLoginPage = () => {
  const nav = useNavigate();
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const handleSuccess = (data) => {
    nav("/AdminHomePage");
  };

  const handleError = (error) => {
    alert(error.response.data.message);
  };

  const { data, loading, error, setBody, refetch } = useAxiosPost(
    config.base_url + endpoints.login.admin,
    {},
    [],
    handleSuccess,
    handleError
  );

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      setBody({ username, password });
      refetch();
    }
  };

  const validate = () => {
    let result = true;
    if (username === "") {
      result = false;
      alert("Username cannot be empty");
    }
    if (password === "") {
      result = false;
      alert("Password cannot be empty");
    }
    return result;
  };

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
        <motion.div className="login_card">
          <img src={adminimg} className="admin-img" alt="adminimg"></img>
          <h5 className="role">Pick your role: </h5>
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
            className="admin_login_button_blue"
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
                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => usernameupdate(e.target.value)}
                  className="username"
                  type="text"
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Password"
                  value={password}
                  onChange={(e) => passwordupdate(e.target.value)}
                  className="password"
                  type="password"
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
      <Footer />
    </>
  );
};

export default AdminLoginPage;
