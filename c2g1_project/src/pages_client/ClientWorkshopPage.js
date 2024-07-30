import React from "react";
import "../styles/clienthomepage.css";
import "../styles/workshoppage.css";
import "boxicons/css/boxicons.min.css";
import { motion } from "framer-motion";
import ws1img from "../images/ws1img.png";
import ws2img from "../images/ws2img.png";
import ws3img from "../images/ws3img.png";
import ws4img from "../images/ws4img.png";
import ws5img from "../images/ws5img.png";
import ws6img from "../images/ws6img.png";
import ws7img from "../images/ws7img.png";
import ws8img from "../images/ws8img.png";
import ClientTopLeftSideBar from "../components/ClientTopLeftSideBar.js";
import { config } from "../config/config.js";
import { endpoints } from "../config/endpoints.js";
import useAxiosGet from "../api/useAxiosGet.jsx";

const ClientWorkshopPage = () => {
  const verification = useAxiosGet(config.base_url + endpoints.verify);

  return verification.data !== null && verification.data.role === "client" ? (
    <>
      <ClientTopLeftSideBar />
      <motion.div
        className="workshoppage"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
      >
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
            <img src={ws5img}></img>
          </motion.div>
          <motion.div
            className="workshoppage-2-ws2"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.2 }}
          >
            <img src={ws6img}></img>
          </motion.div>
          <motion.div
            className="workshoppage-2-ws3"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.1 }}
          >
            <img src={ws7img}></img>
          </motion.div>
          <motion.div
            className="workshoppage-2-ws4"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <img src={ws8img}></img>
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
    </>
  ) : (
    <div>Not logged in</div>
  );
};

export default ClientWorkshopPage;
