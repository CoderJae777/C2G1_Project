import ClientLoginPage from "./ClientLoginPage";
import TrainerLoginPage from "./TrainerLoginPage";
import { useNavigate } from "react-router-dom";
import stockimgtop from "./images/stockimgtop.jpg";
import stockimgbottom from "./images/stockimgbottom.jpg";
import homepageimg from "./images/homepageimg.jpg";
import homepageimg2 from "./images/homepageimg2.jpg";
import dellacademylogo from "./images/DellAcademy.png";
import SignUpPage from "./SignUpPage";
import AdminLoginPage from "./AdminLoginPage";
import { useState } from "react";
import AdminHomePage from "./AdminHomePage";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/NavBar.js";
import homepageimg1 from "./images/homepage_img_1.png";
import { Team } from "./components/Team.js";
import { Testimonials } from "./components/Testimonials.js";
import About from "./components/about.js";

const HomePage = () => {
  const [move, setMove] = useState(false);
  return (
    <>
      {""}
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
        className="homepage"
      >
        <Navbar />
        <div className="homepageinfo">
          <div className="about">
            <About />
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 1 }}
        className="homepage-div-2"
      >
        <div className="homepageinfo">
          <div className="testimonials">
            <Testimonials />
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ scale: 1 }}
        transition={{ delay: 1.5 }}
        initial={{ scale: 0 }}
        className="homepage-div-3"
      >
        <h2>Why Dell Academy?</h2>
      </motion.div>

      <motion.div
        animate={{ scale: 1 }}
        transition={{ delay: 1.5 }}
        initial={{ scale: 0 }}
        className="homepage-div-4"
      >
        <h5>What we offer: </h5>
      </motion.div>

      <motion.div
        animate={{ scale: 1 }}
        transition={{ delay: 1.5 }}
        initial={{ scale: 0 }}
        className="homepage-div-5"
      >
        <div className="info1">
          <p>stuff</p>
        </div>
        <div className="info2">
          <p>stuff</p>
        </div>
        <div className="info3">
          <p>stuff</p>
        </div>
        <div className="info4">
          <p>stuff</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        className="bottom-of-homepage"
      >
        <div className="title">
          <h3>Contact Us</h3>
        </div>
      </motion.div>
    </>
  );
};

export default HomePage;
