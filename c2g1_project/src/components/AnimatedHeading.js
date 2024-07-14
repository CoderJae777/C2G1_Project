import React from "react";
import '../styles/Heading.css'


const AnimatedHeading = () => {
  return (
    <h2 class="banner-heading animated fade-header">
      <div class="heading_animated animated-heading-start">Always</div>
      <div class="heading_animated  slider">
        <div class="heading_animated  slide">Exploring</div>
        <div class="heading_animated  slide">Dreaming</div>
        <div class="heading_animated  slide">Learning</div>
        <div class="heading_animated  slide">Inspiring</div>
      </div>
      {/* <div class="animated-heading-end">together</div> */}
    </h2>
  );
};

export default AnimatedHeading;
