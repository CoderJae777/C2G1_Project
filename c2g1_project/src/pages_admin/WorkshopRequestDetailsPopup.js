import React, { useState, useEffect, useRef } from 'react';
import useAxiosGet from '../api/useAxiosGet';
import '../styles/adminworkshoprequestpagepopups.css';
import { config } from '../config/config';
import { endpoints } from '../config/endpoints';

const WorkshopRequestDetailsPopup = ({ workshop, onClose }) => {
    const [workshopDetails, setWorkshopDetails] = useState(workshop);
    const [trainerUsernames, setTrainerUsernames] = useState({});
    const popupRef = useRef(null);

    const { data, loading, error, setUrl, setParams, refetch } = useAxiosGet();

    useEffect(() => {
        setWorkshopDetails(workshop);
    }, [workshop]);

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

    useEffect(() => {
        if (workshopDetails.status === 'approved' && workshopDetails.trainers.length > 0) {
            setUrl(config.base_url + endpoints.admin.getTrainers);
            refetch();
        }
    }, [workshopDetails, setUrl, refetch]);

    useEffect(() => {
        if (data) {
            const trainers = data.reduce((acc, trainer) => {
                acc[trainer._id] = trainer.username;
                return acc;
            }, {});
            setTrainerUsernames(trainers);
        }
    }, [data]);

    return (
        <div ref={popupRef} data-cy="wsrqd-popup" className="workshop-request-details-popup open-workshop-request-details-popup">
            <h2>Workshop Request Details</h2>
            <div className="workshop-details-content">
                <table className="details-table">
                    <tbody>
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
                        {workshopDetails.status === 'approved' && (
                            <tr>
                                <td><strong>Trainers Allocated:</strong></td>
                                <td>
                                    {workshopDetails.trainers.length > 0 ? (
                                        <ul className="trainer-list-ar-ws-popup">
                                            {workshopDetails.trainers.map((trainerId, index) => (
                                                <li key={index}>
                                                    {trainerUsernames[trainerId.username] || trainerId.username}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        'No trainers allocated'
                                    )}
                                </td>
                            </tr>
                        )}
                        {workshopDetails.status === 'rejected' && (
                            <tr>
                                <td><strong>Reject Reason:</strong></td>
                                <td>{workshopDetails.reject_reason}</td>
                            </tr>
                        )}
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
