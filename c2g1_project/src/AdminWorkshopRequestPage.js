import React from 'react';
import './adminhomepage.css';
import './adminworkshoprequestpage.css';
import 'boxicons/css/boxicons.min.css';
import dellacademylogo from "./images/DellAcademy.png";
import userprofilepic from "./images/userprofilepic.png";
import Sidebar from './LeftSideBar';
import DateAndTime from './DateAndTime';

const AdminWorkshopRequestPage = () => {

 
    return (
        <div class="admin-workshop-request-page">
            <div class="left-panel">
                <div class="dell-logo">
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
                                <button className="manage-trainers-button">Approve</button>
                                <button className="manage-trainers-button">Allocate Trainer</button>
                                <button className="manage-trainers-button">Reject</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminWorkshopRequestPage;