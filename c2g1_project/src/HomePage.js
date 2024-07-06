import homepageinfoimg1 from "./images/homepageinfoimg1.png";
import homepageinfoimg2 from "./images/homepageinfoimg2.png";
import homepageinfoimg3 from "./images/homepageinfoimg3.png";
import homepageinfoimg4 from "./images/homepageinfoimg4.png";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/NavBar.js";
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
        transition={{ delay: 0.75 }}
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
        transition={{ delay: 1 }}
        initial={{ scale: 0 }}
        className="homepage-div-3"
      >
        <motion.div
          className="homepage-div-3-title1"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 2 }}
        >
          <h2>Why Dell Academy?</h2>
        </motion.div>
        <motion.div
          className="homepage-div-3-title2"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 2.25 }}
        >
          <h3>What we offer: </h3>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ scale: 1 }}
        transition={{ delay: 1.5 }}
        initial={{ scale: 0 }}
        className="homepage-div-5"
      >
        <div className="info1">
          <img
            src={homepageinfoimg1}
            className="homepageinfoimg"
            alt="homepageinfoimg"
          ></img>
        </div>
        <div className="info2">
          <img
            src={homepageinfoimg2}
            className="homepageinfoimg"
            alt="homepageinfoimg"
          ></img>
        </div>
        <div className="info3">
          <img
            src={homepageinfoimg3}
            className="homepageinfoimg"
            alt="homepageinfoimg"
          ></img>
        </div>
        <div className="info4">
          <img
            src={homepageinfoimg4}
            className="homepageinfoimg"
            alt="homepageinfoimg"
          ></img>
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
