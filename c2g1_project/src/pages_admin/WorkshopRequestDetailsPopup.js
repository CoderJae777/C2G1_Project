import React from 'react';
import '../styles/adminworkshoprequestpagepopups.css';

const WorkshopRequestDetailsPopup = ({ workshop, onClose }) => {
    return (
        <div className="approve-workshop-request-popup open-approve-workshop-request-popup">
            <h2>Workshop Request Details</h2>
            <div className="workshop-details-content">
                <table className="details-table">
                    <tbody>
                        <tr>
                            <td><strong>Workshop ID:</strong></td>
                            <td>{workshop.workshopId}</td>
                        </tr>
                        <tr>
                            <td><strong>Client Company:</strong></td>
                            <td>{workshop.company_name}</td>
                        </tr>
                        {/* <tr>
                            <td><strong>Client Type:</strong></td>
                            <td>{workshop.client_type}</td>
                        </tr> */}
                        {/* <tr>
                            <td><strong>Duration:</strong></td>
                            <td>{workshop.duration}</td>
                        </tr> */}
                        <tr>
                            <td><strong>Start Date:</strong></td>
                            <td>{workshop.startDate}</td>
                        </tr>
                        <tr>
                            <td><strong>End Date:</strong></td>
                            <td>{workshop.endDate}</td>
                        </tr>
                        <tr>
                            <td><strong>Deal Size:</strong></td>
                            <td>{workshop.dealSize}</td>
                        </tr>
                        <tr>
                            <td><strong>Location:</strong></td>
                            <td>{workshop.location}</td>
                        </tr>
                        <tr>
                            <td><strong>Venue:</strong></td>
                            <td>{workshop.venue}</td>
                        </tr>
                        <tr>
                            <td><strong>Attendees:</strong></td>
                            <td>{workshop.pax}</td>
                        </tr>
                        <tr>
                            <td><strong>Comment:</strong></td>
                            <td>{workshop.message}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="popup-buttons">
                <button className="close-ws-request-button" type="button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default WorkshopRequestDetailsPopup;
