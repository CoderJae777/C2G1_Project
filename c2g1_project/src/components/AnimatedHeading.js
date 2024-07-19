import React from "react";
import '../styles/Heading.css';

const AnimatedHeading = () => {
  return (
    <h2 className="banner-heading animated fade-header">
      <div className="heading_animated animated-heading-start">Always</div>
      <div className="heading_animated slider">
        <div className="heading_animated slide">Exploring</div>
        <div className="heading_animated slide">Dreaming</div>
        <div className="heading_animated slide">Learning</div>
        <div className="heading_animated slide">Inspiring</div>
      </div>
      {/* <div className="animated-heading-end">together</div> */}
    </h2>
  );
};

export default AnimatedHeading;
