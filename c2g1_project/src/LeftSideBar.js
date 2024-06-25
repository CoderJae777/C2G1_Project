import React from 'react';
import 'boxicons/css/boxicons.min.css';
import userprofilepic from "./images/userprofilepic.png";
import './homepage.css';

const Sidebar = () => {
  return (
    <div className="leftsidebar">
      <div className="column">
        <img src={userprofilepic} alt="User Profile Pic" />
        <div>
          <p className="usernamedisplay">Dil Doe</p>
          <p className="userroledisplay">Admin</p>
        </div>
      </div>
      <div className="leftsidebar-content">
        <ul className="leftsidebar-lists">
          <li className="leftsidebar-list">
            <a href="#" className="nav-link">
              <i className="bx bx-home-alt"></i>
              <span className="link">Home</span>
            </a>
          </li>
          <li className="leftsidebar-list">
            <a href="#" className="nav-link">
              <i className="bx bx-user"></i>
              <span className="link">Profile</span>
            </a>
          </li>
          <li className="leftsidebar-list">
            <a href="#" className="nav-link">
              <i className="bx bx-book-open"></i>
              <span className="link">My Workshops</span>
            </a>
          </li>
          <li className="leftsidebar-list">
            <a href="#" className="nav-link">
              <i className="bx bx-cog"></i>
              <span className="link">Settings</span>
            </a>
          </li>
          <li className="leftsidebar-list">
            <a href="#" className="nav-link">
              <i className="bx bx-exit"></i>
              <span className="link">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
