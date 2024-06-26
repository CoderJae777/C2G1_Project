import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import userprofilepic from "./images/userprofilepic.png";
import './adminhomepage.css';

const LeftSidebar = ({ userprofilepic }) => {
  const nav = useNavigate();
  const handleAdminWorkshopRequestPage = () => {
    nav("/AdminWorkshopRequestPage");
  }

  return (
    <div class="leftsidebar">
      <div class="column">
        <img src={userprofilepic} alt="User Profile Pic" />
        <div>
          <p class="usernamedisplay">Dil Doe</p>
          <p class="userroledisplay">Admin</p>
        </div>
      </div>
      <div class="leftsidebar-content">
        <ul class="leftsidebar-lists">
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">
              <i class="bx bx-home-alt"></i>
              <span class="link">Home</span>
            </a>
          </li>
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">
              <i class="bx bx-user"></i>
              <span class="link">Profile</span>
            </a>
          </li>
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">
              <i class="bx bx-book-open"></i>
              <span class="link" onClick={handleAdminWorkshopRequestPage}>Workshops</span>
            </a>
          </li>
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">
              <i class="bx bx-cog"></i>
              <span class="link">Settings</span>
            </a>
          </li>
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">
              <i class="bx bx-exit"></i>
              <span class="link">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
