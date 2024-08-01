import React, { useState, useEffect, useRef } from 'react';
import '../styles/adminmanagetrainerspagepopup.css';
import 'boxicons/css/boxicons.min.css';
import useAxiosPatch from '../api/useAxiosPatch';
import { config } from '../config/config';
import { endpoints } from '../config/endpoints';

const EditTrainerDetailsPopup = ({ onClose, fullname, username, trainerId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newTrainerPassword, setNewTrainerPassword] = useState("");
    const popupRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item === selectedItem ? null : item);
        setIsOpen(!isOpen);
    };

    const handlePasswordChange = (event) => {
        setNewTrainerPassword(event.target.value);
    };

    const handleSuccess = () => {
        onClose();
    };

    const handleError = (error) => {
        console.error(error);
    };

    const handleSubmit = () => {
        setBody({
            trainer_role: selectedItem,
            password: newTrainerPassword
        });
        refetchPatch();
    };

    const { data, loading: patchLoading, error: patchError, setBody, refetch: refetchPatch } = useAxiosPatch(
        config.base_url + endpoints.admin.updateTrainer + trainerId,
        {},
        [],
        handleSuccess,
        handleError
    );

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

    return (
        <>
            <div className="popup-overlay popup-open"></div>
            <div ref={popupRef} data-cy="edit-trainer-details-popup" className="trainer-role-popup open-trainer-role-popup">
                <h2>Edit Details</h2>
                    <p>Trainer Name: {fullname}</p>
                    <p>Trainer ID: {username}</p>
                <div className="select-menu-container">
                    <div data-cy="select-trainer-role-button" className={`select-btn ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
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
                                    data-cy="trainer-role-option"
                                    key={index}
                                    className={`item ${selectedItem === trainer ? 'checked' : ''}`}
                                    onClick={() => handleItemClick(trainer)}
                                >
                                    <span className="checkbox">
                                        <div className="fa-solid fa-check check-icon">
                                            <box-icon name='check'></box-icon>
                                        </div>
                                    </span>
                                    <span className="item-text">{trainer}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <input
                    className="new-trainer-pw-input"
                    type="text"
                    value={newTrainerPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                />
                <div className="popup-buttons">
                    <button data-cy="edit-trainer-details-submit-button" className="submit-button" type="button" onClick={handleSubmit}>Submit</button>
                    <button data-cy="edit-trainer-details-cancel-button" className="cancel-button" type="button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </>
    );
};

export default EditTrainerDetailsPopup;
