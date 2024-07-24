import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/topleftsidebar.css";
import "boxicons/css/boxicons.min.css";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";
import useAxiosGet from "../api/useAxiosGet";
import DateAndTime from "./DateAndTime";

const TopLeftSideBar = ({ hasNewRequests }) => {
  const [navOpen, setNavOpen] = useState(false);
  const nav = useNavigate();

  const { data, loading, error, setUrl, setParams, refetch } = useAxiosGet(
    "",
    {},
    [],
    false
  );

  const handleAdminHomePage = (e) => {
    e.preventDefault();
    nav("/AdminHomePage");
  };

  const handleProfilePage = () => {
    nav("/ProfilePage");
  };

  const handleAdminWorkshopRequestPage = (e) => {
    e.preventDefault();
    nav("/AdminWorkshopRequestPage");
  };

  const handleAdminManageTrainerPage = (e) => {
    e.preventDefault();
    nav("/AdminManageTrainerPage");
  };

  const handleAdminManageWorkshopPage = (e) => {
    e.preventDefault();
    nav("/AdminManageWorkshopPage");
  };

  const handleNavBarSignOut = (e) => {
    e.preventDefault();
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
      <nav data-cy="nav" className={navOpen ? "open" : ""}>
        <div className="logo">
          <div className="hamburger">
            <i
              data-cy="open-tlsb"
              className="bx bx-menu menu-icon"
              onClick={toggleNav}
            ></i>
            <span className="logo-name">Menu</span>
          </div>
          <div className="welcome">
            <span data-cy="welcome" className="logo-name">
              Hi, Welcome Back!
            </span>
          </div>
          <div className="date">
            <span className="logo-name">
              <DateAndTime />
            </span>
          </div>
        </div>
        <div data-cy="sidebar" className="sidebar">
          <div className="logo">
            <i
              data-cy="toggle-nav"
              className="bx bx-menu menu-icon"
              onClick={toggleNav}
            ></i>
            <span className="logo-name">Menu</span>
          </div>
          <div className="sidebar-content">
            <ul className="lists">
              <li className="list">
                <a
                  href="#"
                  data-cy="nav-btn"
                  className="nav-link"
                  onClick={handleAdminHomePage}
                >
                  <i className="bx bx-home-alt icon"></i>
                  <span className="link">Home</span>
                </a>
              </li>
              <li className="list">
                <a
                  href="#"
                  data-cy="nav-btn"
                  className="nav-link"
                  onClick={handleProfilePage}
                >
                  <i className="bx bx-bar-chart-alt-2 icon"></i>
                  <span className="link">Profile</span>
                </a>
              </li>
              <li className="list">
                <a
                  href="#"
                  data-cy="nav-btn"
                  className="nav-link"
                  onClick={handleAdminWorkshopRequestPage}
                >
                  <i className="bx bx-clipboard icon"></i>
                  <span className="link">Workshop Requests</span>
                </a>
              </li>
              <li className="list">
                <a
                  href="#"
                  data-cy="nav-btn"
                  className="nav-link"
                  onClick={handleAdminManageTrainerPage}
                >
                  <i className="bx bx-group icon"></i>
                  <span className="link">Manage Trainers</span>
                </a>
              </li>
              <li className="list">
                <a
                  href="#"
                  data-cy="nav-btn"
                  className="nav-link"
                  onClick={handleAdminManageWorkshopPage}
                >
                  <i className="bx bx-spreadsheet icon"></i>
                  <span className="link">Manage Workshops</span>
                </a>
              </li>
            </ul>
            <div className="bottom-content">
              <li className="list">
                <a href="#" data-cy="nav-btn" className="nav-link">
                  <i className="bx bx-cog icon"></i>
                  <span className="link">Settings</span>
                </a>
              </li>
              <li className="list">
                <a
                  href="#"
                  data-cy="nav-btn"
                  className="nav-link"
                  onClick={handleNavBarSignOut}
                >
                  <i className="bx bx-log-out icon"></i>
                  <span className="link">Logout</span>
                </a>
              </li>
            </div>
          </div>
        </div>
      </nav>
      <section className={navOpen ? "overlay" : ""} onClick={closeNav}></section>
    </>
  );
};

export default TopLeftSideBar;
