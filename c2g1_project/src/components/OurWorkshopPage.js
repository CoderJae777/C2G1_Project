import Navbar from "./NavBar";
import { motion } from "framer-motion";
import "../styles/workshoppage.css";
import ws1img from "../images/ws1img.png";
import ws2img from "../images/ws2img.png";
import ws3img from "../images/ws3img.png";
import ws4img from "../images/ws4img.png";
import ws5img from "../images/ws5img.png";
import ws6img from "../images/ws6img.png";
import ws7img from "../images/ws7img.png";
import ws8img from "../images/ws8img.png";
import Footer from "./Footer";

const OurWorkshopPage = () => {
  return (
    <>
      <Navbar />
      <motion.div className="workshoppage">
        <div className="workshoppage-1">
          <motion.div
            className="workshoppage-1-ws1"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="ws1img">
              <img src={ws1img}></img>
            </div>
            <h4>Introduction to Python</h4>
            <h5>WSID : 01</h5>
            <h6>Nothing to do with the snake</h6>
          </motion.div>
          <motion.div
            className="workshoppage-1-ws2"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="ws2img">
              <img src={ws2img}></img>
            </div>
            <h4>Introduction to Java 21</h4>
            <h5>WSID : 02</h5>
            <h6>No it is not about Indonesia</h6>
          </motion.div>
          <motion.div
            className="workshoppage-1-ws3"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="ws3img">
              <img src={ws3img}></img>
            </div>
            <h4>Introduction to AI</h4>
            <h5>WSID : 03</h5>
            <h6>Machine Learning on steroids</h6>
          </motion.div>
          <motion.div
            className="workshoppage-1-ws4"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="ws4img">
              <img src={ws4img}></img>
            </div>
            <h4>Introduction to C Hashtag</h4>
            <h5>WSID : 04</h5>
            <h6>
              Those telling its C sharp don't know what they are talking about
            </h6>
          </motion.div>
        </div>

        <div className="workshoppage-2">
          <motion.div
            className="workshoppage-2-ws1"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.3 }}
          >
            <div className="ws5img">
              <img src={ws5img}></img>
            </div>
            <h4>Introduction to AI</h4>
            <h5>WSID : 05</h5>
            <h6>Its more than just Chat GPT</h6>
          </motion.div>
          <motion.div
            className="workshoppage-2-ws2"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="ws6img">
              <img src={ws6img}></img>
            </div>
            <h4>Introduction to Excel</h4>
            <h5>WSID : 06</h5>
            <h6>If you cant code, learn this!</h6>
          </motion.div>
          <motion.div
            className="workshoppage-2-ws3"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.1 }}
          >
            <div className="ws7img">
              <img src={ws7img}></img>
            </div>
            <h4>Introduction to Word</h4>
            <h5>WSID : 07</h5>
            <h6>Because who uses Google docs?</h6>
          </motion.div>
          <motion.div
            className="workshoppage-2-ws4"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="ws8img">
              <img src={ws8img}></img>
            </div>
            <h4>Introduction to Linux</h4>
            <h5>WSID : 08</h5>
            <h6>No its not club penguin</h6>
          </motion.div>
        </div>
        <div className="workshoppage-3">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="workshoppage-4">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default OurWorkshopPage;
