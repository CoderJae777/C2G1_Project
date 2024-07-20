import React from "react";
import dellacademylogo_small from "../images/NavBarLogo.png"; // Ensure you have the correct path
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <hr className="footer-divider" />
      <div className="footer-container">
        <div className="footer-right">
          <div className="footer-column">
            <h4>Our Offerings</h4>
            <ul>
              <li><a href="#">Artificial Intelligence</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Solutions</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Deals</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Account</h4>
            <ul>
              <li><a href="#">My Account</a></li>
              <li><a href="#">Order Status</a></li>
              <li><a href="#">Profile Settings</a></li>
              <li><a href="#">My Products</a></li>
              <li><a href="#">Dell Rewards Balance</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Support Home</a></li>
              <li><a href="#">Contact Technical Support</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Our Company</h4>
            <ul>
              <li><a href="#">Who We Are</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Dell Technologies Capital</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">Perspectives</a></li>
              <li><a href="#">Recycling</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Dell Rewards</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Email Sign-Up</a></li>
              <li><a href="#">Privacy Centre</a></li>
              <li><a href="#">Resource Library</a></li>
              <li><a href="#">Security & Trust Centre</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <a href="/terms-of-use">Terms of Use</a> | <a href="/privacy-policy">Privacy Policy</a>
        <p>Copyright © 2024 Dell Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
