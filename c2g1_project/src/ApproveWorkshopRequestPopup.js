import React from 'react';
import './adminworkshoprequestpagepopups.css';

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

export default ApproveWorkshopRequestPopup;