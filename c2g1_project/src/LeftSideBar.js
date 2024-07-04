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
              <button class="sidebarbutton" onClick={handleAdminHomePage}><i class="bx bx-home-alt"></i>Home</button>
            </a>
          </li>
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">

              <button class="sidebarbutton"><i class="bx bx-user"></i>Profile</button>
            </a>
          </li>
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">

              <button class="sidebarbutton" onClick={handleAdminWorkshopRequestPage}>
                <i class="bx bx-book-open">

                </i>Workshops</button>
            </a>
          </li>
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">

              <button class="sidebarbutton"><i class="bx bx-cog"></i>Settings</button>
            </a>
          </li>
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">
              <button class="sidebarbutton" onClick={handleNavBarSignIn}><i class="bx bx-exit"></i>Sign Out</button>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
