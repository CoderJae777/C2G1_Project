import React, { useState, useEffect } from 'react';
import '../styles/workshopandclientdetails.css';
import 'boxicons/css/boxicons.min.css';

const WorkshopAndClientDetails = ({ onClose, workshop }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <div className="details-popup">
    <header>
        <div className="icons">
            {/* <span id="prev" className="material-symbols-rounded" onClick={() => handlePrevNext("prev")}>chevron_left</span>
            <span id="next" className="material-symbols-rounded" onClick={() => handlePrevNext("next")}>chevron_right</span> */}
            <span className="close-button" onClick={onClose}>
                <div className="fa-solid fa-check check-icon">
                    <box-icon name='x'></box-icon>
                </div>
            </span>
            <div className="workshop-details">
                <p>ID: {workshop.id}</p>
                <p>Workshop Name: {workshop.workshop_name}</p>
                <p>Workshop Type: {workshop.workshop_type}</p>
                <p>Client Company: {workshop.client_company}</p>
                <p>Client Type: {workshop.client_type}</p>
                <p>Duration: {workshop.duration}</p>
                <p>Start Date: {workshop.start_date}</p>
                <p>Deal Size: {workshop.deal_size}</p>
                <p>Location: {workshop.location}</p>
                <p>Venue: {workshop.venue}</p>
                <p>Attendees: {workshop.attendees}</p>
                <p>Comments: {workshop.comments}</p>
            </div>
        </div>
    </header>
    </div>
    );
};

export default WorkshopAndClientDetails;
