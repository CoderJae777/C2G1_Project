import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/NavBar.js";
import { Testimonials } from "../components/Testimonials.js";
import About from "../components/about.js";
import { useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm.js";


const HomePage = () => {
  const [move, setMove] = useState(false);
  const nav = useNavigate();
  const handleSignUp = () => {
    nav("/SignUpPage");
  };
  const handleworkshop = () => {
    nav("/OurWorkshopPage")
  }
  return (
    <>
      {""}
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.25 }}
        className="homepage"
      >
        <Navbar />
        <div className="homepageinfo">
          <div className="about">
            <About />
          </div>

          <motion.div
            className="about2"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <h2>Come join our Award Winning Workshops!</h2>
            <div>
              <motion.button
                transition={{ delay: 1.25 }}
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.4 }}
                className="testibutton"
                onClick={handleSignUp}
              >
                Sign up today!
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
        className="homepage-div-2"
      >
        <div className="homepageinfo">
          <div className="testimonials">
            <Testimonials />
            <motion.button
              transition={{ delay: 1.25 }}
              animate={{ scale: 1 }}
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="testibutton"
            >
              Learn more!
            </motion.button>
          </div>
          <div></div>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        initial={{ opacity: 0 }}
        className="homepage-div-3"
      >
        <motion.div
          className="homepage-div-3-title1"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <h3>What we offer : </h3>
        </motion.div>
        <motion.div
          className="homepage-div-3-title2"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1.25 }}
        >
          <motion.button
            transition={{ delay: 1.25 }}
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="testibutton"
            onClick={handleworkshop}
          >
            Our Workshops
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ scale: 1 }}
        transition={{ delay: 0 }}
        initial={{ scale: 0 }}
        className="homepage-div-5"
      >
        <div className="homepage-div-5-title">
          <h3>Why Dell Academy?</h3>
        </div>
        <motion.div
          className="info1"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="infoimg"></div>
          <div className="infotext">
            <h5>Comprehensive Workshops</h5>
          </div>
        </motion.div>
        <motion.div
          className="info2"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="infoimg"></div>
          <div className="infotext">
            <h5>Professional Trainers</h5>
          </div>
        </motion.div>
        <motion.div
          className="info3"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="infoimg"></div>
          <div className="infotext">
            <h5>Efficient Booking</h5>
          </div>
        </motion.div>
        <motion.div
          className="info4"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="infoimg"></div>
          <div className="infotext">
            <h5>Verified Results</h5>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        className="bottom-of-homepage"
      >
        <div className="contactustitle">
          <h3>Contact Us</h3>
        </div>
        <div className="contactform">
            <ContactForm />
        </div>
      </motion.div>
    </>
  );
};

export default HomePage;
