import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import userprofilepic from "../images/userprofilepic.png";
import '../styles/leftsidebar.css';

const LeftSidebar = ({ userprofilepic }) => {
  const nav = useNavigate();

  const handleAdminWorkshopRequestPage = () => {
    nav("/AdminWorkshopRequestPage");
  }

  const handleAdminHomePage = () => {
    nav("/AdminHomePage");
  }

  const handleNavBarSignIn = () => {
    nav("/");
  }

  return (
    <div class="leftsidebar">
      <div class="column">
        <img src={userprofilepic} alt="User Profile Pic" />
        <div>
          <h5 class="usernamedisplay">Dil Doe</h5>
          <h6 class="userroledisplay">Admin</h6>
        </div>
      </div>
      <div class="leftsidebar-content">
        <ul class="leftsidebar-lists">
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">
              {/* <span class="link" onClick={handleAdminHomePage}>Home</span> */}
              <button class="sidebarbutton" onClick={handleAdminHomePage}><i class="bx bx-home-alt"></i><span>Home</span></button>
            </a>
          </li>
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">
              <button class="sidebarbutton"><i class="bx bx-user"></i><span>Profile</span></button>
            </a>
          </li>
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">
              <button class="sidebarbutton" onClick={handleAdminWorkshopRequestPage}><i class="bx bx-book-open"></i><span>Workshops</span></button>
            </a>
          </li>
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">
              <button class="sidebarbutton"><i class="bx bx-cog"></i ><span>Settings</span></button>
            </a>
          </li>
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">
              <button class="sidebarbutton" onClick={handleNavBarSignIn}><i class="bx bx-exit"></i><span>Sign Out</span></button>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
