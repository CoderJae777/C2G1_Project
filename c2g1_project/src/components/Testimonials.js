import React from "react";
import { motion } from "framer-motion";

export const Testimonials = (props) => {
  return (
    <>
      <div>
        <motion.h1
          animate={{ scale: 0.75, opacity: 1 }}
          initial={{ opacity: 0, scale: 1 }}
          transition={{ delay: 1.75 }}
        >
          Hear what clients say!
        </motion.h1>
      </div>
      <div>
        <motion.button
          transition={{ delay: 0.25 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="testibutton"
        >
          Learn more!
        </motion.button>
      </div>
    </>
  );
};
