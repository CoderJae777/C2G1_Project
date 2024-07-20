import Navbar from "../components/NavBar";
import { motion } from "framer-motion";
import "../styles/workshoppage.css";
import trainerimg1 from "../images/trainerimg1.jpg";
import trainerimg2 from "../images/trainerimg2.jpg";
import trainerimg3 from "../images/trainerimg3.jpg";
import trainerimg4 from "../images/trainerimg4.jpg";
import trainerimg5 from "../images/trainerimg5.jpg";
import trainerimg6 from "../images/trainerimg6.jpg";
import trainerimg7 from "../images/trainerimg7.jpg";
import trainerimg8 from "../images/trainerimg8.jpg";
import Footer from "../components/Footer";

const OurTrainerPage = () => {
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
              <img src={trainerimg1}></img>
            </div>
            <h4>John Doe</h4>
            <h5>Experience: 10 years</h5>
            <h6>"Python is a versatile language that you can master."</h6>
          </motion.div>
          <motion.div
            className="workshoppage-1-ws2"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="ws2img">
              <img src={trainerimg2}></img>
            </div>
            <h4>Sam Smith</h4>
            <h5>Experience: 18 years</h5>
            <h6>"Java 21 is cutting-edge, and I'm excited to teach it."</h6>
          </motion.div>
          <motion.div
            className="workshoppage-1-ws3"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="ws3img">
              <img src={trainerimg3}></img>
            </div>
            <h4>Michael Brown</h4>
            <h5>Experience: 12 years</h5>
            <h6>"AI is the future, and I'm here to help you understand it."</h6>
          </motion.div>
          <motion.div
            className="workshoppage-1-ws4"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="ws4img">
              <img src={trainerimg4}></img>
            </div>
            <h4>Emily Davis</h4>
            <h5>Experience: 15 years</h5>
            <h6>"C# is powerful, and I'm excited to dive into it with you."</h6>
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
              <img src={trainerimg5}></img>
            </div>
            <h4>Christina Johnson</h4>
            <h5>Experience: 19 years</h5>
            <h6>"AI is not just about Chat GPT; it's about innovation."</h6>
          </motion.div>
          <motion.div
            className="workshoppage-2-ws2"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="ws6img">
              <img src={trainerimg6}></img>
            </div>
            <h4>Patricia Wilson</h4>
            <h5>Experience: 7 years</h5>
            <h6>"Excel is an essential tool for any non-coder."</h6>
          </motion.div>
          <motion.div
            className="workshoppage-2-ws3"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.1 }}
          >
            <div className="ws7img">
              <img src={trainerimg7}></img>
            </div>
            <h4>Dong Ling Lee</h4>
            <h5>Experience: 11 years</h5>
            <h6>"Master Word and boost your productivity."</h6>
          </motion.div>
          <motion.div
            className="workshoppage-2-ws4"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="ws8img">
              <img src={trainerimg8}></img>
            </div>
            <h4>Linda Martinez</h4>
            <h5>Experience: 13 years</h5>
            <h6>"Linux is powerful, and I'll guide you through it."</h6>
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

export default OurTrainerPage;
