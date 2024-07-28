import React, { useState, useEffect, useRef } from 'react';
import '../styles/trainerhomepagepopups.css';

const UtilHrsDetailsPopup = ({ onClose, util }) => {
    const [utilHrsDetails, setUtilHrsDetails] = useState(util);
    const popupRef = useRef(null);

    useEffect(() => {
        setUtilHrsDetails(util);
    }, [util]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupRef, onClose]);

    return (
        <div ref={popupRef} data-cy="trwsuhd-popup" className="tr-ws-util-hrs-details-popup open-tr-ws-util-hrs-details-popup">
            <h2>Utilisation Hours Details</h2>
            <div className="ws-util-hrs-details-content">
                <table className="details-table">
                    <tbody>
                        <tr>
                            <td><strong>Workshop ID:</strong></td>
                            <td>{utilHrsDetails._id}</td>
                        </tr>
                        {utilHrsDetails.utilisation.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td><strong>Utilisation Hours {index + 1}:</strong></td>
                                    <td>{item.hours}</td>
                                </tr>
                                <tr>
                                    <td><strong>Utilisation Details {index + 1}:</strong></td>
                                    <td>{item.utilisation_details}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="popup-buttons">
                <button data-cy="trwsuhd-close-button" className="close-util-hrs-details-button" type="button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default UtilHrsDetailsPopup;
