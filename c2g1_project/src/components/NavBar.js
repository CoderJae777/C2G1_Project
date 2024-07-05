import { useNavigate } from "react-router-dom";
import LoginPage from "../LoginPage";
import SignUpPage from "../SignUpPage";
import dellacademylogo_small from "../images/NavBarLogo.png";
import HomePage from "../HomePage";
import { motion } from "framer-motion";

const Navbar = () => {
  const nav = useNavigate();

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
    <motion.nav
      className="navbar"

    >
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
          Dell Academy
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
