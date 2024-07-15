import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import Navbar from "../components/NavBar.js";
import { Testimonials } from "../components/Testimonials.js";
import { useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm.js";
import AnimatedHead from "../components/AnimatedHeading.js";
import dellacademylogo_small from "../images/NavBarLogo.png";
import Carousel from "../components/Carousel.js";

import slideshowimg1 from "../images/slideshowimg1.jpg";
import slideshowimg2 from "../images/slideshowimg2.jpg";
import slideshowimg3 from "../images/slideshowimg3.jpg";
import slideshowimg4 from "../images/slideshowimg4.jpg";
import slideshowimg5 from "../images/slideshowimg5.jpg";
import slideshowimg6 from "../images/slideshowimg6.jpg";

const HomePage = () => {
  const { scrollYProgress } = useScroll();

  const [move, setMove] = useState(false);
  const nav = useNavigate();
  const handleSignUp = () => {
    nav("/LoginPage");
  };
  const handleworkshop = () => {
    nav("/OurWorkshopPage");
  };
  const images = [slideshowimg1, slideshowimg2, slideshowimg3];
  return (
    <>
      {" "}
      <Navbar />
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.25 }}
        whileInView={{ opacity: 1 }}
        className="homepage"
      >      <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />

        <div className="homepageinfo">
          <motion.div
            className="about"
            animate={{ scale: 1, opacity: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            transition={{ delay: 1 }}
            whileInView={{ scale: 1, opacity: 1 }}
          >
            <AnimatedHead />{" "}
            <div>
              <motion.img
                animate={{ scale: 1, opacity: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                transition={{ delay: 1 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="navbarlogo"
                src={dellacademylogo_small}
                alt="Navbar Logo"
              ></motion.img>
            </div>
          </motion.div>
          <motion.div
            className="about2"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1 }}
            whileInView={{ opacity: 1 }}
          >
            <h2 data-cy="h2-test" >Grow your skills with Dell Academy!</h2>{" "}
            <div>
              <motion.button
                transition={{ delay: 1.25 }}
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.4 }}
                whileInView={{ scale: 1 }}
                className="testibutton"
                onClick={handleSignUp}
                data-cy="bookws-button-test"
              >
                Book a workshop!
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
        whileInView={{ opacity: 1}}
        className="homepage-div-2"
      >
        <div className="homepageinfo">
          <motion.div
            className="testimonials"
            transition={{ delay: 1.25 }}
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
          >
            <Testimonials />
            {/* <motion.button
              transition={{ delay: 1.25 }}
              animate={{ scale: 1 }}
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="testibutton"
            >
              Learn more!
            </motion.button> */}
          </motion.div>
          <div></div>
        </div>
      </motion.div>
      <motion.div
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        initial={{ opacity: 0 }}
        className="homepage-div-3"
      >
        <motion.div
          className="homepage-div-3-title1"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3>Our Award Winning Workshops!</h3>
        </motion.div>
        <motion.div
          className="homepage-div-3-title2"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.25 }}
        >
          {" "}
          <div className="slideshow">
            <Carousel images={images} />
          </div>
          <motion.button
            transition={{ delay: 0.25 }}
            whileInView={{ scale: 1 }}
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="testibutton"
            onClick={handleworkshop}
            data-cy="ws-button-test"
          >
            See Workshops
          </motion.button>
        </motion.div>
      </motion.div>
      <motion.div
        whileInView={{ scale: 1 }}
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
        whileInView={{ scale: 1 }}
        initial={{ scale: 0 }}
        className="bottom-of-homepage"
        data-cy = "bottom-of-homepage"
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
