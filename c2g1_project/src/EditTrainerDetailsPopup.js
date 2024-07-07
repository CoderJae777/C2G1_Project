import React, { useState } from 'react';
import './styles/adminmanagetrainerspagepopup.css';
import 'boxicons/css/boxicons.min.css';

const EditTrainerDetailsPopup = ({ onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item === selectedItem ? null : item);
    };

    return (
        <div className="trainer-role-popup open-trainer-role-popup">
            <h2>Select Role</h2>
            <div className="select-menu-container">
                <div className={`select-btn ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                    <span className="btn-text">{selectedItem ? selectedItem : 'Select Role'}</span>
                    <span className="arrow-dwn">
                        <div className="fa-solid fa-chevron-down">
                            <box-icon name='chevron-down'></box-icon>
                        </div>
                    </span>
                </div>
                {isOpen && (
                    <ul className="list-items">
                        {['Training Lead', 'Training Assistant'].map((trainer, index) => (
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
                <button className="submit-button" type="button" onClick={onClose}>Submit</button>
                <button className="cancel-button" type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditTrainerDetailsPopup;
