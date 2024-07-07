import { useNavigate } from "react-router-dom";
import LoginPage from "../LoginPage";
import SignUpPage from "../SignUpPage";
import dellacademylogo_small from "../images/NavBarLogo.png";
import HomePage from "../HomePage";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";


const Navbar = () => {
  const nav = useNavigate();
  const [stickyClass, setStickyClass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 150 ? setStickyClass("sticky-nav") : setStickyClass("");
    }
  };

  const handleNavBarSignIn = () => {
    nav("/LoginPage");
  };
  const handleSignUp = () => {
    nav("/SignUpPage");
  };

  const handleHomePage = () => {
    nav("/");
  };

  return (
    <motion.nav className={`navbar ${stickyClass}`}>
      <div className="navbar_contents">
        <img
          onClick={handleHomePage}
          className="navbarlogo"
          src={dellacademylogo_small}
        ></img>
        {/* TBC --> links to an about us page */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleHomePage}
        >
          Home
        </motion.button>
        {/* TBC --> links to the workshops page */}
        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          Our Workshops
        </motion.button>
        {/* TBC --> links to a view all trainers page */}
        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          Our Trainers
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNavBarSignIn}
        >
          Log in
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSignUp}
        >
          Sign Up!
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
