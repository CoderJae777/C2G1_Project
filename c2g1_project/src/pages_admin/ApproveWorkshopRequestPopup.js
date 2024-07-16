import React from 'react';
import '../styles/adminworkshoprequestpagepopups.css';

const ApproveWorkshopRequestPopup = ({ onClose }) => {
    return (
        <div data-cy="approve-wsrq-popup" className="approve-workshop-request-popup open-approve-workshop-request-popup">
            <h2>Approve Workshop</h2>
            <p>You are about to approve this workshop.</p>
            <div className="popup-buttons">
                <button className="submit-button" type="button" onClick={onClose}>Submit</button>
                <button data-cy="approve-wsrq-cancel-button" className="cancel-button" type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ApproveWorkshopRequestPopup;