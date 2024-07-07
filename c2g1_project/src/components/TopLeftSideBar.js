import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/topleftsidebar.css";
import "boxicons/css/boxicons.min.css";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";
import useAxiosGet from "../api/useAxiosGet";
import DateAndTime from "../DateAndTime";

const TopLeftSideBar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const nav = useNavigate();

  const { data, loading, error, setUrl, setParams, refetch } = useAxiosGet(
    "",
    {},
    [],
    false
  );

  const handleAdminWorkshopRequestPage = (e) => {
    e.preventDefault();
    nav("/AdminWorkshopRequestPage");
  };

  const handleAdminManageTrainerPage = (e) => {
    e.preventDefault();
    nav("/AdminManageTrainerPage");
  };

  const handleAdminHomePage = (e) => {
    e.preventDefault();
    nav("/AdminHomePage");
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
      <nav className={navOpen ? "open" : ""}>
        <div className="logo">
          <div className="hamburger">
            <i className="bx bx-menu menu-icon" onClick={toggleNav}></i>
            <span className="logo-name">Menu</span>
          </div>
          <div className="welcome">
            <span className="logo-name">Hi Dil, Welcome Back!</span>
          </div>
          <div className="date">
            <span className="logo-name">
              <DateAndTime />
            </span>
          </div>
        </div>
        <div className="sidebar">
          <div className="logo">
            <i className="bx bx-menu menu-icon" onClick={toggleNav}></i>
            <span className="logo-name">Menu</span>
          </div>
          <div className="sidebar-content">
            <ul className="lists">
              <li className="list">
                <a href="#" className="nav-link" onClick={handleAdminHomePage}>
                  <i className="bx bx-home-alt icon"></i>
                  <span className="link">Home</span>
                </a>
              </li>
              <li className="list">
                <a href="#" className="nav-link">
                  <i className="bx bx-bar-chart-alt-2 icon"></i>
                  <span className="link">Profile</span>
                </a>
              </li>
              <li className="list">
                <a
                  href="#"
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
                  className="nav-link"
                  onClick={handleAdminManageTrainerPage}
                >
                  <i className="bx bx-group icon"></i>
                  <span className="link">Manage Trainers</span>
                </a>
              </li>
            </ul>
            <div className="bottom-content">
              <li className="list">
                <a href="#" className="nav-link">
                  <i className="bx bx-cog icon"></i>
                  <span className="link">Settings</span>
                </a>
              </li>
              <li className="list">
                <a href="#" className="nav-link" onClick={handleNavBarSignOut}>
                  <i className="bx bx-log-out icon"></i>
                  <span className="link">Logout</span>
                </a>
              </li>
            </div>
          </div>
        </div>
      </nav>
      <section
        className={navOpen ? "overlay" : ""}
        onClick={closeNav}
      ></section>
    </>
  );
};

export default TopLeftSideBar;
