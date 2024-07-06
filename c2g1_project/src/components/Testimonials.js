import React from "react";
import { motion } from "framer-motion";

export const Testimonials = (props) => {
  return (
    <motion.h1
      animate={{ scale: 0.75, opacity: 1 }}
      initial={{ opacity: 0, scale: 1 }}
      transition={{ delay: 1.75}}

    >
    Hear what clients say!
    </motion.h1>
  );
};
