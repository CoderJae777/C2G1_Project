import React, { useState } from 'react';
import './adminworkshoprequestpagepopups.css';
import 'boxicons/css/boxicons.min.css';

const AllocateTrainerPopup = ({ onClose }) => {
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
        <div className="allocate-trainer-popup open-allocate-trainer-popup">
            <h2>Assign Trainer</h2>
            <div className="select-menu-container">
                <div className={`select-btn ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                    <span className="btn-text">{selectedItems.length > 0 ? `${selectedItems.length} Selected` : 'Select Trainer'}</span>
                    <span className="arrow-dwn">
                        <div className="fa-solid fa-chevron-down">
                            <box-icon name='chevron-down'></box-icon>
                        </div>
                        
                    </span>
                </div>
                {isOpen && (
                    <ul className="list-items">
                        {['Mike', 'Kowalski', 'Rico', 'June', 'A2'].map((trainer, index) => (
                            <li
                                key={index}
                                className={`item ${selectedItems.includes(trainer) ? 'checked' : ''}`}
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
                <button className="submit-button" type="button" onClick={onClose}>Submit</button>
                <button className="cancel-button" type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default AllocateTrainerPopup;
