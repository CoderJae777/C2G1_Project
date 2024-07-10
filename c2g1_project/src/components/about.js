import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <div>
        <motion.h1
          animate={{ scale: 0.75, opacity: 1 }}
          initial={{ opacity: 0, scale: 1 }}
          transition={{ delay: 1 }}
        >
          Grow your skills with Dell Academy
        </motion.h1>
      </div>
    </>
  );
};

export default About;
