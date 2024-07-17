import React, { useState } from 'react';
import '../styles/adminworkshoprequestpagepopups.css';
import 'boxicons/css/boxicons.min.css';

const trainers = ['Mike', 'Kowalski', 'Rico', 'June', 'A2'];

const ApproveWorkshopRequestPopup = ({ onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        const newSelectedItems = selectedItems.includes(item)
            ? selectedItems.filter(i => i !== item)
            : [...selectedItems, item];

        setSelectedItems(newSelectedItems);
    };

    return (
        <div data-cy="approve-wsrq-popup" className="approve-workshop-request-popup open-approve-workshop-request-popup">
            <h2>Approve Workshop</h2>
            <p>Assign trainer(s) to this workshop.</p>
            <div data-cy="select-trainer" className="select-menu-container">
                <div className={`select-btn ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                    <span data-cy="select-trainer-text" className="btn-text">{selectedItems.length > 0 ? `${selectedItems.length} Selected` : 'Select Trainer'}</span>
                    <span className="arrow-dwn">
                        <div className="fa-solid fa-chevron-down">
                            <box-icon name='chevron-down'></box-icon>
                        </div>
                    </span>
                </div>
                {isOpen && (
                    <ul data-cy="trainer-list" className="list-items">
                        {trainers.map((trainer, index) => (
                            <li
                                key={index}
                                className={`item ${selectedItems.includes(trainer) ? 'checked' : ''}`}
                                onClick={() => handleItemClick(trainer)}
                            >
                                <span className="checkbox">
                                    <div className="fa-solid fa-check check-icon">
                                        {selectedItems.includes(trainer) && <box-icon name='check'></box-icon>}
                                    </div>
                                </span>
                                <span className="item-text">{trainer}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="popup-buttons">
                <button 
                    data-cy="approve-wsrq-submit-button"
                    className="submit-button" 
                    type="button" 
                    onClick={onClose} 
                    disabled={selectedItems.length === 0}
                >
                    Submit
                </button>
                <button data-cy="approve-wsrq-cancel-button" className="cancel-button" type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ApproveWorkshopRequestPopup;
