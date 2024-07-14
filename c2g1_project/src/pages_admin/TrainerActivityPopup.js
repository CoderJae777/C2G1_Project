import React, { useState } from 'react';
import '../styles/adminmanagetrainerspagepopup.css';
import 'boxicons/css/boxicons.min.css';

const TrainerActivityPopup = ({ onClose, onActivityChange, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleSubmit = () => {
        onActivityChange(selectedItem, index);
        onClose();
    };

    return (
        <div className="trainer-activity-popup open-trainer-activity-popup">
            <h2>Select Activity</h2>
            <div className="select-menu-container">
                <div className={`select-btn ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                    <span className="btn-text">{selectedItem ? selectedItem : 'Select Activity'}</span>
                    <span className="arrow-dwn">
                        <div className="fa-solid fa-chevron-down">
                            <box-icon name='chevron-down'></box-icon>
                        </div>
                    </span>
                </div>
                {isOpen && (
                    <ul className="list-items">
                        {['Active', 'Inactive'].map((trainer, index) => (
                            <li
                                key={index}
                                className={`item ${selectedItem === trainer ? 'checked' : ''}`}
                                onClick={() => handleItemClick(trainer)}
                            >
                                <span className="checkbox">
                                    <div className="fa-solid fa-check check-icon">
                                        <box-icon name='check' ></box-icon>
                                    </div>
                                </span>
                                <span className="item-text">{trainer}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="popup-buttons">
                <button className="submit-button" type="button" onClick={handleSubmit}>Submit</button>
                <button className="cancel-button" type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default TrainerActivityPopup;
