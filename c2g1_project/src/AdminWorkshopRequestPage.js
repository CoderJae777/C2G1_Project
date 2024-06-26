import React, { useState } from 'react';
import './adminhomepage.css';
import './adminworkshoprequestpage.css';
import 'boxicons/css/boxicons.min.css';
import dellacademylogo from "./images/DellAcademy.png";
import userprofilepic from "./images/userprofilepic.png";
import Sidebar from './LeftSideBar';
import DateAndTime from './DateAndTime';

const AdminWorkshopRequestPage = () => {
    const [isApprovePopupOpen, setIsApprovePopupOpen] = useState(false);
    const [isAllocatePopupOpen, setIsAllocatePopupOpen] = useState(false);
    const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);

    const handleOpenApprovePopup = () => {
        setIsApprovePopupOpen(true);
    };

    const handleCloseApprovePopup = () => {
        setIsApprovePopupOpen(false);
    };

    const handleOpenAllocatePopup = () => {
        setIsAllocatePopupOpen(true);
    };

    const handleCloseAllocatePopup = () => {
        setIsAllocatePopupOpen(false);
    };

    const handleOpenRejectPopup = () => {
        setIsRejectPopupOpen(true);
    };

    const handleCloseRejectPopup = () => {
        setIsRejectPopupOpen(false);
    };

    return (
        <div className="admin-workshop-request-page">
            {isApprovePopupOpen && <ApproveWorkshopRequestPopup onClose={handleCloseApprovePopup} />}
            {isAllocatePopupOpen && <AllocateTrainerPopup onClose={handleCloseAllocatePopup} />}
            {isRejectPopupOpen && <RejectWorkshopRequestPopup onClose={handleCloseRejectPopup} />}
            <div className="left-panel">
                <div className="dell-logo">
                    <img src={dellacademylogo} alt="Dell Academy Logo" />
                </div>
                <Sidebar userprofilepic={userprofilepic} />
            </div>
            <div className="admin-workshop-request-page-right-panel">
                <div className="header-container">
                    <div className="admin-workshop-request-page-title">
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
                                <button className="accept-workshop-request-button" onClick={handleOpenApprovePopup}>Approve</button>
                                <button className="allocate-trainer-to-workshop-button" onClick={handleOpenAllocatePopup}>Allocate Trainer</button>
                                <button className="reject-workshop-request-button" onClick={handleOpenRejectPopup}>Reject</button>
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
            <h2>Approve Workshop</h2>
            <p>You are about to approve this workshop.</p>
            <div className="popup-buttons">
                <button className="submit-button" type="button" onClick={onClose}>Submit</button>
                <button className="cancel-button" type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

const AllocateTrainerPopup = ({ onClose }) => {
    return (
        <div className="allocate-trainer-popup open-allocate-trainer-popup">
            <h2>Assign Trainer</h2>
            <p>Choose a trainer.</p>
            <div className="popup-buttons">
                <button className="submit-button" type="button" onClick={onClose}>Submit</button>
                <button className="cancel-button" type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

const RejectWorkshopRequestPopup = ({ onClose }) => {
    const [rejectReason, setRejectReason] = useState("");

    const handleReasonChange = (event) => {
        setRejectReason(event.target.value);
    };

    const handleSubmit = () => {
        console.log("Reject reason:", rejectReason);
        onClose();
    };

    return (
        <div className="reject-workshop-request-popup open-reject-workshop-request-popup">
            <h2>Reject Workshop</h2>
            <p>Please provide a reason for rejecting the workshop request.</p>
            <textarea 
                className="reject-reason-input" 
                value={rejectReason} 
                onChange={handleReasonChange} 
                placeholder="Enter reason here"
            />
            <div className="popup-buttons">
                <button className="submit-button" type="button" onClick={handleSubmit}>Submit</button>
                <button className="cancel-button" type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default AdminWorkshopRequestPage;