import React from 'react';
import './homepage.css';
import 'boxicons/css/boxicons.min.css';
import dellacademylogo from "./images/DellAcademy.png";
import Sidebar from './LeftSideBar';

const AdminHomePage = () => {
  return (
    <div>
      <div className="left-panel">
        <div className="dell-logo">
          <img src={dellacademylogo} alt="Dell Academy Logo" />
        </div>
        <Sidebar /> {/* Use the Sidebar component */}
      </div>
    </div>
  );
};

export default AdminHomePage;
