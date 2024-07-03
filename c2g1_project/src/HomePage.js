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
import Navbar from "./NavBar";

const HomePage = () => {
  const [move, setMove] = useState(false);
  return (
    <>
      <Navbar />
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        transition={{ delay: 0.25 }}
        className="homepage"
      >
        <img src={stockimgtop} alt="Stock Image" />
      </motion.div>
    </>
  );
};

export default HomePage;
