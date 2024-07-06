import React, { useState } from 'react';
import "../styles/topleftsidebar.css";
import 'boxicons/css/boxicons.min.css';

const TopLeftSideBar = () => {
  const [navOpen, setNavOpen] = useState(false);

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
          <span className="logo-name">Javascript Projects</span>
        </div>
        <div className="sidebar">
          <div className="logo">
            <i className='bx bx-menu menu-icon' onClick={toggleNav}></i>
            <span className="logo-name">Javascript Projects</span>
          </div>
          <div className="sidebar-content">
            <ul className="lists">
              <li className="list">
                <a href="#" className="nav-link">
                  <i className='bx bx-home-alt icon'></i>
                  <span className="link">Dashboard</span>
                </a>
              </li>
              <li className="list">
                <a href="#" className="nav-link">
                  <i className='bx bx-bar-chart-alt-2 icon'></i>
                  <span className="link">Revenue</span>
                </a>
              </li>
              <li className="list">
                <a href="#" className="nav-link">
                  <i className='bx bx-bell icon'></i>
                  <span className="link">Notifications</span>
                </a>
              </li>
              <li className="list">
                <a href="#" className="nav-link">
                  <i className='bx bx-chat icon'></i>
                  <span className="link">Messages</span>
                </a>
              </li>
              <li className="list">
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
              </li>
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
                  <span className="link">Logout</span>
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
