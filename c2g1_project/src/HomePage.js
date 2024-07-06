import ClientLoginPage from "./ClientLoginPage";
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
      <Navbar />
      {""}
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.25 }}
        className="homepage"
      >
        <div className="homepageinfo">
          <div>
            <About/>
          </div>
          <div>
            <Team />
          </div>
          <div>
            <Testimonials />
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={{ scale: 1 }}
        transition={{ delay: 1.25 }}
        initial={{ scale: 0 }}
        className="homepage-images"
      >
        <img src={stockimgtop} alt="Stock Image" />
      </motion.div>
    </>
  );
};

export default HomePage;
