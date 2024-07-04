import TrainerLoginPage from "./TrainerLoginPage";
import { useNavigate } from "react-router-dom";
import stockimgtop from "./images/stockimgtop.jpg";
import stockimgbottom from "./images/stockimgbottom.jpg";
import dellacademylogo from "./images/DellAcademy.png";
import SignUpPage from "./SignUpPage";
import AdminLoginPage from "./AdminLoginPage";
import { useState } from "react";
import AdminHomePage from "./AdminHomePage";
import { useEffect } from "react";
import ClientHomePage from "./ClientHomePage";

import useAxiosPost from "./api/useAxiosPost.jsx";
import { config } from "./config/config.js";
import { endpoints } from "./config/endpoints.js";

// Running Json Server
// npx json-server --watch db.json --port 8000

const ClientLoginPage = () => {
  const nav = useNavigate();
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const handleSuccess = (data) => {
    nav("/AdminHomePage");
  };

  const handleError = (error) => {
    alert("Login failed, User Account does not exist.");
  };

  const { data, loading, error, setBody, refetch } = useAxiosPost(
    config.base_url + endpoints.login.client,
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
      <div className="top_of_login">
        <div></div>
      </div>
      <div className="login_page">
        <div className="login_pictures">
          <img src={stockimgtop} alt="Stock Image" />
        </div>
        <div className="login_buttons">
          <img src={dellacademylogo} className="dell_logo" alt="logo"></img>
          <h5>I am a/ an ... </h5>
          <button className="client_login_button_blue">Client</button>
          <button className="admin_login_button" onClick={handleAdminLoginPage}>
            Admin
          </button>
          <button
            className="trainer_login_button"
            onClick={handleTrainerLoginPage}
          >
            Trainer
          </button>
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
              <button type="submit" className="signin_button">
                Sign in
              </button>
              <h5 className="signup" onClick={handleSignUp}>
                Need an account? Sign Up!
              </h5>
              <h5 className="forget_pw">Forget password</h5>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClientLoginPage;
