import React, { useState, useEffect, useRef } from 'react';
import '../styles/workshopandclientdetails.css';
import 'boxicons/css/boxicons.min.css';

const WorkshopAndClientDetails = ({ workshop, onClose }) => {
    console.log("test")
    console.log(workshop)
    const [workshopDetails, setWorkshopDetails] = useState(workshop);
    const popupRef = useRef(null);

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
        document.body.classList.add('popup-open');
        return () => {
            document.body.classList.remove('popup-open');
        };
    }, []);

    const getWorkshopDataDetails = (workshop) => {
        if (workshop.workshop_data_details){
            return workshop.workshop_data_details;
        }
        else{
            return workshop.workshop_data;
        }
    }

    return (
        <>
            <div className="popup-overlay popup-open"></div>
            <div ref={popupRef} className="details-popup open-details-popup">
                <header>
                    <div className='title-row'>
                        <div className="icons">
                            <span className="close-button" onClick={onClose}>
                                <div className="fa-solid fa-x check-icon">
                                    <box-icon name='x'></box-icon>
                                </div>
                            </span>
                        </div>
                    </div>
                </header>
                <div className="workshop-details-content">
                    <table className="details-table">
                        <tbody>
                            <tr className="spaced-row">
                                <td><strong>Request ID:</strong></td>
                                <td>{workshopDetails.request_id}</td>
                            </tr>
                            <tr className="spaced-row">
                                <td><strong>Workshop Name:</strong></td>
                                <td>{getWorkshopDataDetails(workshop).workshop_name}</td>
                            </tr>
                            <tr className="spaced-row">
                                <td><strong>Client Company:</strong></td>
                                <td>{workshopDetails.company}</td>
                            </tr>
                            <tr className="spaced-row">
                                <td><strong>Client Name:</strong></td>
                                <td>{workshopDetails.name}</td>
                            </tr>
                            <tr className="spaced-row">
                                <td><strong>Client Type:</strong></td>
                                <td>{workshopDetails.company_role}</td>
                            </tr>
                            <tr className="spaced-row">
                                <td><strong>Client Email:</strong></td>
                                <td>{workshopDetails.email}</td>
                            </tr>
                            <tr className="spaced-row">
                                <td><strong>Client Phone Number:</strong></td>
                                <td>{workshopDetails.phone_number}</td>
                            </tr>
                            <tr className="spaced-row">
                                <td><strong>Start Date:</strong></td>
                                <td>{workshopDetails.start_date}</td>
                            </tr>
                            <tr className="spaced-row">
                                <td><strong>End Date:</strong></td>
                                <td>{workshopDetails.end_date}</td>
                            </tr>
                            <tr className="spaced-row">
                                <td><strong>Deal Size:</strong></td>
                                <td>{workshopDetails.deal_potential}</td>
                            </tr>
                            <tr className="spaced-row">
                                <td><strong>Country:</strong></td>
                                <td>{workshopDetails.country}</td>
                            </tr>
                            <tr className="spaced-row">
                                <td><strong>Venue:</strong></td>
                                <td>{workshopDetails.venue}</td>
                            </tr>
                            <tr className="spaced-row">
                                <td><strong>Attendees:</strong></td>
                                <td>{workshopDetails.pax}</td>
                            </tr>
                            <tr className="spaced-row">
                                <td><strong>Comments:</strong></td>
                                <td>{workshopDetails.request_message}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default WorkshopAndClientDetails;

