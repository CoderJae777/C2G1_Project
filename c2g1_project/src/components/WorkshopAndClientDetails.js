import React, { useState, useEffect } from 'react';
import '../styles/workshopandclientdetails.css';
import 'boxicons/css/boxicons.min.css';


const WorkshopAndClientDetails = ({ onClose, workshops }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentWorkshopIndex, setCurrentWorkshopIndex] = useState(0);

    console.log(workshops);

    const handlePrevNext = (direction) => {
        let newIndex;
        if (direction === "prev") {
            newIndex = currentWorkshopIndex - 1;
            if (newIndex < 0) {
                newIndex = workshops.length - 1;
            }
        } else if (direction === "next") {
            newIndex = currentWorkshopIndex + 1;
            if (newIndex >= workshops.length) {
                newIndex = 0;
            }
        }
        setCurrentWorkshopIndex(newIndex);
    };

    const workshop = workshops[currentWorkshopIndex];

    return (
        <div className="details-popup">
            <p className="current-date">{`Workshop ${currentWorkshopIndex + 1} of ${workshops.length}`}</p>
            <header>
                <div className='title-row'>
                    <div className="icons">
                        <span id="prev" className="arrow-left" onClick={() => handlePrevNext("prev")}>
                            <div className="fa-solid fa-chevron-left">
                                <box-icon name='chevron-left'></box-icon>
                            </div>
                        </span>
                        <span id="next" className="arrow-right" onClick={() => handlePrevNext("next")}>
                            <div className="fa-solid fa-chevron-right">
                                <box-icon name='chevron-right'></box-icon>
                            </div>
                        </span>
                        <span className="close-button" onClick={onClose}>
                        <div className="fa-solid fa-x check-icon">
                            <box-icon name='x'></box-icon>
                        </div>
                    </span>
                    </div>
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
