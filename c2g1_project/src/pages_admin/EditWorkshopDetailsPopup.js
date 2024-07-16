import React, { useState } from 'react';
import '../styles/adminmanageworkshoppagepopup.css';
import 'boxicons/css/boxicons.min.css';
import useAxiosPatch from '../api/useAxiosPatch';
import { config } from '../config/config';
import { endpoints } from '../config/endpoints';

const EditWorkshopDetailsPopup = ({ onClose, trainerId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newTrainerPassword, setNewTrainerPassword] = useState("");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item === selectedItem ? null : item);
    };

    const handlePasswordChange = (event) => {
        setNewTrainerPassword(event.target.value);
    }

    const handleSuccess = () => {
        onClose();
    };

    const handleError = (error) => {
    };

    const handleSubmit = () => {
        setBody({
            trainer_role: selectedItem,
            password: newTrainerPassword
        });
        refetch();
    };

    const { data, loading, error, setBody, refetch } = useAxiosPatch(
        config.base_url + endpoints.admin.updateTrainer + trainerId,
        {},
        [],
        handleSuccess,
        handleError
      );

    return (
        <div className="ws-details-popup open-ws-details-popup">
            <h2>Edit Details</h2>
            <input
                className="new-ws-name-input"
                type="text"
                value={newTrainerPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new workshop name"
            />
            <input
                className="new-ws-id-input"
                type="text"
                value={newTrainerPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new workshop ID"
            />
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
                        {['Business Value Discovery', 'AI Platform', 'Infrastructure and Demo'].map((trainer, index) => (
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
            <textarea 
                className="change-workshop-details-input" 
                // value={WorkshopDetailsChange} 
                // onChange={handleWorkshopDetailsChange} 
                placeholder=" Enter new workshop details here"
            />
            <div className="popup-buttons">
                <button className="submit-button" type="button" onClick={handleSubmit}>Submit</button>
                <button className="cancel-button" type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditWorkshopDetailsPopup;
