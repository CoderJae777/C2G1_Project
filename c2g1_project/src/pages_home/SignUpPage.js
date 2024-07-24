import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxiosPost from "../api/useAxiosPost";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";
import Navbar from "../components/NavBar";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const SignUpPage = () => {
  const nav = useNavigate();

  let error_message = "Please enter the value for the following:\n";

  const IsValidate = () => {
    let isproceed = true;
    if (username == null || username == "") {
      isproceed = false;
      error_message += "\nUsername \n";
    }
    if (password == null || password == "") {
      isproceed = false;
      error_message += "Password \n";
    }
    if (fullname == null || fullname == "") {
      isproceed = false;
      error_message += "Fullname \n";
    }
    if (email == null || email == "") {
      isproceed = false;
      error_message += "Email \n";
    }
    if (country == "") {
      isproceed = false;
      error_message += "Country \n";
    }
    if (!isproceed) {
      alert(error_message);
    }
    return isproceed;
  };

  const handleBack = () => {
    nav("/");
  };

  const [username, usernamechange] = useState("");
  const [password, passwordchange] = useState("");
  const [fullname, fullnamechange] = useState("");
  const [email, emailchange] = useState("");
  const [country, countrychange] = useState("");

  const handleSuccess = (data) => {
    nav("/ClientLoginPage");
  };

  const handleError = (error) => {
    alert("Sign up failed, please contact the administrator.");
  };

  const { data, loading, error, setBody, refetch } = useAxiosPost(
    config.base_url + endpoints.signup,
    {},
    [],
    handleSuccess,
    handleError
  );

  const handlesubmit = (e) => {
    e.preventDefault();
    if (IsValidate()) {
      e.preventDefault();
      setBody({ username, password, email, fullname, country });
      refetch();
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <motion.div className="signuppage">
          <motion.form
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="container"
            onSubmit={handlesubmit}
          >
            <div className="card">
              <div className="card-header">
                <h3>Create an account today!</h3>
                <h5>All fields are required</h5>
              </div>
              <div className="card-body">
                <div className="form_group">
                  <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => usernamechange(e.target.value)}
                    className="form_control"
                  />
                </div>

                <div className="form_group">
                  <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => passwordchange(e.target.value)}
                    className="form_control"
                  />
                </div>

                <div className="form_group">
                  <input
                    placeholder="Fullname"
                    value={fullname}
                    onChange={(e) => fullnamechange(e.target.value)}
                    className="form_control"
                  />
                </div>

                <div className="form_group">
                  <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => emailchange(e.target.value)}
                    className="form_control"
                  />
                </div>

                <div className="form_group">
                  <select
                    value={country}
                    onChange={(e) => countrychange(e.target.value)}
                    className="form_control"
                  >
                    <option value="Default">-- Country --</option>
                    <option value="Singapore">Singapore</option>
                    <option value="USA">USA</option>
                    <option value="Malaysia">Malaysia</option>
                  </select>
                </div>
              </div>
              <div className="card-footer">
                <div className="signup-button-div">
                  <button type="submit" className="signup_submit_button">
                    Register
                  </button>
                </div>
                <div className="signup-button-div">
                  {" "}
                  <button
                    type="button"
                    className="signup_back_button"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </motion.form>
        </motion.div>
        <Footer />
      </div>
    </>
  );
};

export default SignUpPage;
