import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import userprofilepic from "./images/userprofilepic.png";
import './styles/clienthomepage.css';

const ClientLeftSidebar = ({ userprofilepic }) => {
  const nav = useNavigate();

  const handleClientWorkshopPage = () => {
    nav("/ClientWorkshopPage");
  }

  const handleClientHomePage = () => {
    nav("/ClientHomePage");
  }

  const handleNavBarSignIn = () => {
    nav("/");
  }

  return (
    <div class="leftsidebar">
      <div class="column">
        <img src={userprofilepic} alt="User Profile Pic" />
        <div>
          <p class="usernamedisplay">Dil Doe</p>
          <p class="userroledisplay">Client</p>
        </div>
      </div>
      <div class="leftsidebar-content">
        <ul class="leftsidebar-lists">
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">
              {/* <span class="link" onClick={handleClientHomePage}>Home</span> */}
                          <button class="sidebarbutton" onClick={handleClientHomePage}><i class="bx bx-home-alt"></i>Home</button>
            </a>
          </li>
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">

              <button class="sidebarbutton"><i class="bx bx-user"></i>Profile</button>
            </a>
          </li>
          <li class="leftsidebar-list">
            <a href="#" class="nav-link">

                          <button class="sidebarbutton" onClick={handleClientWorkshopPage}>
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

export default ClientLeftSidebar;
