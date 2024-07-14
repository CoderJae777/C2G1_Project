import React from "react";
import { motion } from "framer-motion";
import Carousel from "./Carousel";
import slideshowimg1 from "../images/slideshowimg1.jpg";
import slideshowimg2 from "../images/slideshowimg2.jpg";
import slideshowimg3 from "../images/slideshowimg3.jpg";
import slideshowimg4 from "../images/slideshowimg4.jpg";
import slideshowimg5 from "../images/slideshowimg5.jpg";
import slideshowimg6 from "../images/slideshowimg6.jpg";
export const Testimonials = (props) => {
   const images = [slideshowimg4, slideshowimg5, slideshowimg6];


  return (
    <>
      <div>
        <motion.h1
          animate={{ scale: 0.75, opacity: 1 }}
          initial={{ opacity: 0, scale: 1 }}
          transition={{ delay: 1 }}
        >
          Hear what clients say!
        </motion.h1>{" "}
        <div className="slideshow">
          <Carousel images={images} />
        </div>
      </div>
    </>
  );
};
