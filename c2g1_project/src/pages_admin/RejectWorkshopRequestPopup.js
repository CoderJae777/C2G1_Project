import React, { useState } from 'react';
import '../styles/adminworkshoprequestpagepopups.css';

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
        <div data-cy="reject-wsrq-popup" className="reject-workshop-request-popup open-reject-workshop-request-popup">
            <h2>Reject Workshop</h2>
            <p>Please provide a reason for rejecting the workshop request.</p>
            <textarea 
                className="reject-reason-input" 
                value={rejectReason} 
                onChange={handleReasonChange} 
                placeholder=" Enter reason here"
            />
            <div className="popup-buttons">
                <button className="submit-button" type="button" onClick={handleSubmit}>Submit</button>
                <button data-cy="reject-wsrq-cancel-button" className="cancel-button" type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default RejectWorkshopRequestPopup;