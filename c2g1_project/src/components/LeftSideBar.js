import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import userprofilepic from "../images/userprofilepic.png";
import "../styles/leftsidebar.css";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";
import useAxiosGet from "../api/useAxiosGet";
import * as FaIcons from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const LeftSidebar = ({}) => {
  const nav = useNavigate();

  // Store side bar status
  const [sidebarstatus, setsidebarstatus] = useState(false);

  // function to toggle sidebar status 
  const showsidebar = () => {
    setsidebarstatus (!sidebarstatus);
  };

  const { data, loading, error, setUrl, setParams, refetch } = useAxiosGet(
    "",
    {},
    [],
    false
  );

  const handleAdminWorkshopRequestPage = () => {
    nav("/AdminWorkshopRequestPage");
  };

  const handleAdminHomePage = () => {
    nav("/AdminHomePage");
  };

  const handleNavBarSignOut = () => {
    setUrl(config.base_url + endpoints.logout);
    refetch();
  };

  useEffect(() => {
    if (data !== null && data.status === true) {
      nav("/");
    }
  }, [data, nav]);

  return (
    <>
      <Link to="#" className="menu-bars">
        <FaIcons.FaBars onClick={showsidebar} />
      </Link>
      <nav className={sidebarstatus ? "nav-menu-active" : "nav-menu"}>
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
                  <button class="sidebarbutton" onClick={handleAdminHomePage}>
                    <i class="bx bx-home-alt"></i>
                    <span>Home</span>
                  </button>
                </a>
              </li>
              <li class="leftsidebar-list">
                <a href="#" class="nav-link">
                  <button class="sidebarbutton">
                    <FaIcons.FaBars /> Profile
                  </button>
                </a>
              </li>
              <li class="leftsidebar-list">
                <a href="#" class="nav-link">
                  <button
                    class="sidebarbutton"
                    onClick={handleAdminWorkshopRequestPage}
                  >
                    <i class="bx bx-book-open"></i>
                    <span>Workshops</span>
                  </button>
                </a>
              </li>
              <li class="leftsidebar-list">
                <a href="#" class="nav-link">
                  <button class="sidebarbutton">
                    <i class="bx bx-cog"></i>
                    <span>Settings</span>
                  </button>
                </a>
              </li>
              <li class="leftsidebar-list">
                <a href="#" class="nav-link">
                  <button class="sidebarbutton" onClick={handleNavBarSignOut}>
                    <i class="bx bx-exit"></i>
                    <span>Sign Out</span>
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default LeftSidebar;
