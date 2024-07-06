import React, { useState } from 'react';
import "./styles/adminhomepage.css";
import './styles//adminworkshoprequestpage.css';
import 'boxicons/css/boxicons.min.css';
import dellacademylogo from "./images/DellAcademy.png";
import userprofilepic from "./images/userprofilepic.png";
import TopLeftSideBar from "./components/TopLeftSideBar";
import DateAndTime from './DateAndTime';

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <TopLeftSideBar />
        </div>
    );
}

export default ProfilePage;