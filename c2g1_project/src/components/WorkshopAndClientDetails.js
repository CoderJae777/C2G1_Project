import React, { useState, useEffect } from 'react';
import '../styles/workshopandclientdetails.css';
import 'boxicons/css/boxicons.min.css';

const WorkshopAndClientDetails = ({ onClose, workshop }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <div className="details-popup">
    <header>
        <div className="title">
            <h2>Workshop Details</h2>
        </div>
        <div className="icons">
            {/* <span id="prev" className="material-symbols-rounded" onClick={() => handlePrevNext("prev")}>chevron_left</span>
            <span id="next" className="material-symbols-rounded" onClick={() => handlePrevNext("next")}>chevron_right</span> */}
            <span className="close-button" onClick={onClose}>
                <div className="fa-solid fa-x check-icon">
                    <box-icon name='x'></box-icon>
                </div>
            </span>
        </div>
    </header>
        <div>
            <div className="workshop-detail">ID: {workshop.workshop_data.workshop_ID}</div>
            <div className="workshop-detail">Workshop Name: {workshop.workshop_data.workshop_name}</div>
            <div className="workshop-detail">Workshop Type: {workshop.workshop_data.workshop_type}</div>
            <div className="workshop-detail">Client Company: {workshop.company}</div>
            <div className="workshop-detail">Client Type: {workshop.company_role}</div>
            <div className="workshop-detail">Duration: {workshop.duration}</div>
            <div className="workshop-detail">Start Date: {workshop.start_date}</div>
            <div className="workshop-detail">Deal Size: {workshop.deal_potential}</div>
            <div className="workshop-detail">Country: {workshop.country}</div>
            <div className="workshop-detail">Venue: {workshop.venue}</div>
            <div className="workshop-detail">Attendees: {workshop.pax}</div>
            <div className="workshop-detail">Comments: {workshop.request_message}</div>
        </div>
    </div>
    );
};

export default WorkshopAndClientDetails;
