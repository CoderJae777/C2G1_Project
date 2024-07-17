import React, { useState, useEffect } from 'react';
import '../styles/adminworkshoprequestpagepopups.css';

const WorkshopRequestDetailsPopup = ({ workshop, onClose }) => {
    const [workshopDetails, setWorkshopDetails] = useState(workshop);

    useEffect(() => {
        setWorkshopDetails(workshop);
    }, [workshop]);

    return (
        <div data-cy="wsrqd-popup" className="workshop-request-details-popup open-workshop-request-details-popup">
            <h2>Workshop Request Details</h2>
            <div className="workshop-details-content">
                <table className="details-table">
                    <tbody>
                        {/* <tr>
                            <td><strong>Workshop ID:</strong></td>
                            <td>{workshopDetails.workshopId}</td>
                        </tr> */}
                        <tr>
                            <td><strong>Client Company:</strong></td>
                            <td>{workshopDetails.company}</td>
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
                            <td><strong>Comment:</strong></td>
                            <td>{workshopDetails.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="popup-buttons">
                <button data-cy="wsrqd-close-button" className="close-ws-request-button" type="button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default WorkshopRequestDetailsPopup;
