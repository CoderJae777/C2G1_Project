import React from "react";
import { motion } from "framer-motion";

export const Testimonials = (props) => {
  return (
    <motion.h1
      animate={{ scale: 0.75, opacity: 1 }}
      initial={{ opacity: 0, scale: 1 }}
      transition={{ delay: 0.1 }}

    >
      What our clients say
    </motion.h1>
  );
};
