import { useNavigate, useLocation } from "react-router-dom";
import dellacademylogo_small from "../images/NavBarLogo.png";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const navbarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollToContact) {
      const contactTitle = document.querySelector(".homepage-div-5");
      if (contactTitle) {
        contactTitle.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleNavBarSignIn = () => {
    nav("/LoginPage");
  };
  const handleSignUp = () => {
    nav("/SignUpPage");
  };
  const handleHomePage = () => {
    nav("/");
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };
  const handleWorkshop = () => {
    nav("/OurWorkshopPage");
  };

  const handleContactUs = () => {
    nav("/", { state: { scrollToContact: true } });
  };

  const handleTrainerPage = () => {
    nav("/OurTrainerPage");
  };

  return (
    <motion.nav
      className={`navbar ${isSticky ? "sticky-nav" : ""}`}
      ref={navbarRef}
    >
      <div className="navbar_contents">
        <motion.button
          className="navbarbutton"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleHomePage}
        >
          Home
        </motion.button>
        <motion.button
          className="navbarbutton"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWorkshop}
          data-cy="ourwspage-button"
        >
          Our Workshops
        </motion.button>
        <motion.button
          className="navbarbutton"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleTrainerPage}
          data-cy="ourtrpage-button"
        >
          Our Trainers
        </motion.button>
        <motion.button
          className="navbarbutton"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleContactUs}
        >
          Contact Us
        </motion.button>
        <motion.button
          className="navbarbutton"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSignUp}
          data-cy="signuppg-button"
        >
          Sign Up!
        </motion.button>
        <motion.button
          className="loginbutton"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNavBarSignIn}
          data-cy="loginpg-button"
        >
          Log in!
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
