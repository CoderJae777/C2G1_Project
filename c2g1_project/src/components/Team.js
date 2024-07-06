import React from "react";
import { motion } from "framer-motion";

export const Team = (props) => {
  return (
    <motion.h1
      animate={{ scale: 0.75, opacity: 1 }}
      initial={{ opacity: 0, scale: 1 }}
      transition={{ delay: 1.5}}
    >
      Meet the Team
    </motion.h1>
  );
};
