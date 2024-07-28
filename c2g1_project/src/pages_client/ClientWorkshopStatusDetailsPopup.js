import React, { useState, useEffect, useRef } from 'react';
import '../styles/clienthomepagepopups.css';

const WorkshopRequestDetailsPopup = ({ onClose, request }) => {
    const [workshopDetails, setWorkshopDetails] = useState(request);
    const popupRef = useRef(null);

    useEffect(() => {
        setWorkshopDetails(request);
    }, [request]);

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

      console.log(workshopDetails)

    return (
        <div ref={popupRef} data-cy="clwsrqd-popup" className="cl-workshop-request-details-popup open-cl-workshop-request-details-popup">
            <h2>Workshop Request Details</h2>
            <div className="workshop-details-content">
                <table className="details-table">
                    <tbody>
                        <tr>
                            <td><strong>Workshop ID:</strong></td>
                            <td>{workshopDetails._id}</td>
                        </tr>
                        <tr>
                            <td><strong>Client Company:</strong></td>
                            <td>{workshopDetails.company}</td>
                        </tr>
                        <tr>
                            <td><strong>Client Name:</strong></td>
                            <td>{workshopDetails.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Client Role:</strong></td>
                            <td>{workshopDetails.company_role}</td>
                        </tr>
                        <tr>
                            <td><strong>Client Email:</strong></td>
                            <td>{workshopDetails.email}</td>
                        </tr>
                        <tr>
                            <td><strong>Client Phone Number:</strong></td>
                            <td>{workshopDetails.phone_number}</td>
                        </tr>
                        {/* <tr>
                            <td><strong>Client Type:</strong></td>
                            <td>{workshopDetails.client_type}</td>
                        </tr> */}
                        {/* <tr>
                            <td><strong>Duration:</strong></td>
                            <td>{workshopDetails.duration}</td>
                        </tr> */}
                        <tr>
                            <td><strong>Start Date:</strong></td>
                            <td>{workshopDetails.start_date}</td>
                        </tr>
                        <tr>
                            <td><strong>End Date:</strong></td>
                            <td>{workshopDetails.end_date}</td>
                        </tr>
                        <tr>
                            <td><strong>Deal Size:</strong></td>
                            <td>{workshopDetails.deal_potential}</td>
                        </tr>
                        <tr>
                            <td><strong>Country:</strong></td>
                            <td>{workshopDetails.country}</td>
                        </tr>
                        <tr>
                            <td><strong>Venue:</strong></td>
                            <td>{workshopDetails.venue}</td>
                        </tr>
                        <tr>
                            <td><strong>Attendees:</strong></td>
                            <td>{workshopDetails.pax}</td>
                        </tr>
                        <tr>
                            <td><strong>Message:</strong></td>
                            <td>{workshopDetails.request_message}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="popup-buttons">
                <button data-cy="clwsrqd-close-button" className="close-ws-status-details-button" type="button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default WorkshopRequestDetailsPopup;
