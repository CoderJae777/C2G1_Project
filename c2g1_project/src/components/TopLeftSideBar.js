import React, { useState, useEffect } from 'react';
import "../styles/topleftsidebar.css";
import 'boxicons/css/boxicons.min.css';
import dellacademylogo from "../images/NavBarLogo.png";

// Backend
import { useNavigate } from "react-router-dom";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";
import useAxiosGet from "../api/useAxiosGet";

const TopLeftSideBar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const nav = useNavigate();

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

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  return (
    <>
      <nav className={navOpen ? 'open' : ''}>
        <div className="logo">
          <i className='bx bx-menu menu-icon' onClick={toggleNav}></i>
          {/* <img src={dellacademylogo} alt="Dell Academy Logo" />

          <span className="logo-name">Dell Academy</span> */}
        </div>
        <div className="sidebar">
          <div className="logo">
            <i className='bx bx-menu menu-icon' onClick={toggleNav}></i>
            <span className="logo-name">Menu</span>
          </div>
          <div className="sidebar-content">
            <ul className="lists">
              <li className="list">
                <a href="#" className="nav-link">
                  <i className='bx bx-home-alt icon'></i>
                  <span className="link" onClick={handleAdminHomePage}>Dashboard</span>
                </a>
              </li>
              <li className="list">
                <a href="#" className="nav-link">
                  <i className='bx bx-bar-chart-alt-2 icon'></i>
                  <span className="link" >Trainers</span>
                </a>
              </li>
              <li className="list">
                <a href="#" className="nav-link">
                  <i className='bx bx-bell icon'></i>
                  <span className="link" onClick={handleAdminWorkshopRequestPage}>View Requests</span>
                </a>
              </li>
              <li className="list">
                <a href="#" className="nav-link">
                  <i className='bx bx-chat icon'></i>
                  <span className="link">Workshops</span>
                </a>
              </li>
              {/* <li className="list">
                <a href="#" className="nav-link">
                  <i className='bx bx-pie-chart-alt-2 icon'></i>
                  <span className="link">Analytics</span>
                </a>
              </li>
              <li className="list">
                <a href="#" className="nav-link">
                  <i className='bx bx-heart icon'></i>
                  <span className="link">Likes</span>
                </a>
              </li>
              <li className="list">
                <a href="#" className="nav-link">
                  <i className='bx bx-folder icon'></i>
                  <span className="link">Files</span>
                </a>
              </li> */}
            </ul>
            <div className="bottom-content">
              <li className="list">
                <a href="#" className="nav-link">
                  <i className='bx bx-cog icon'></i>
                  <span className="link">Settings</span>
                </a>
              </li>
              <li className="list">
                <a href="#" className="nav-link">
                  <i className='bx bx-log-out icon'></i>
                  <span className="link" onClick={handleNavBarSignOut}>Logout</span>
                </a>
              </li>
            </div>
          </div>
        </div>
      </nav>
      <section className={navOpen ? 'overlay' : ''} onClick={closeNav}></section>
    </>
  );
};

export default TopLeftSideBar;
