import React, { useState } from 'react';
import './adminhomepage.css';
import './adminworkshoprequestpage.css';
import 'boxicons/css/boxicons.min.css';
import dellacademylogo from "./images/DellAcademy.png";
import userprofilepic from "./images/userprofilepic.png";
import Sidebar from './LeftSideBar';
import DateAndTime from './DateAndTime';

const AdminWorkshopRequestPage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenWorkShopRequestPopup = () => {
        setIsPopupOpen(true);
    }

    const handleCloseWorkShopRequestPopup = () => {
        setIsPopupOpen(false);
    }

    return (
        <div className="admin-workshop-request-page">
            {isPopupOpen && <ApproveWorkshopRequestPopup onClose={handleCloseWorkShopRequestPopup} />}
            <div className="left-panel">
                <div className="dell-logo">
                    <img src={dellacademylogo} alt="Dell Academy Logo" />
                </div>
                <Sidebar userprofilepic={userprofilepic} />
            </div>
            <div className="admin-workshop-request-page-right-panel">
                <div className="header-container">
                    <div className="admin-home-page-title">
                        <h4>Workshop Requests</h4>
                    </div>
                    <div className="workshop-request-datetime">
                        <DateAndTime />
                    </div>
                </div>
                <div className="workshop-request-column">
                    {['Workshop request 1', 'Workshop request 2', 'Workshop request 3', 'Workshop request 4'].map((request, index) => (
                        <div key={index} className="workshop-request-panel">
                            {request}
                            <div className="workshop-request-buttons">
                                <button className="accept-workshop-request-button" onClick={handleOpenWorkShopRequestPopup}>Approve</button>
                                <button className="allocate-trainer-to-workshop-button">Allocate Trainer</button>
                                <button className="reject-workshop-request-button">Reject</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ApproveWorkshopRequestPopup = ({ onClose }) => {
    return (
        <div className="approve-workshop-request-popup open-approve-workshop-request-popup">
            <h2>Congratulations!</h2>
            <p>You have successfully approved the workshop. Well done!</p>
            <button type="button" onClick={onClose}>OK</button>
        </div>
    );
};

export default AdminWorkshopRequestPage;