import React, { useState } from 'react';
import './styles/adminmanagetrainerspagepopup.css';
import 'boxicons/css/boxicons.min.css';

const AddTrainerPopup = ({ onClose }) => {
    const [trainerName, setTrainerName] = useState("");
    const [trainerRole, setTrainerRole] = useState("");
    const [trainerId, setTrainerId] = useState("");
    const [trainerEmail, setTrainerEmail] = useState("");
    const [trainerPassword, setTrainerPassword] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setTrainerRole(role);
        setIsOpen(false);
    };

    const handleNameChange = (event) => {
        setTrainerName(event.target.value);
    };

    const handleIdChange = (event) => {
        setTrainerId(event.target.value);
    };

    const handleEmailChange = (event) => {
        setTrainerEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setTrainerPassword(event.target.value);
    };

    const handleSubmit = () => {
        // Handle submission logic here
        console.log("Trainer Name:", trainerName);
        console.log("Trainer Role:", trainerRole);
        console.log("Trainer ID:", trainerId);
        console.log("Trainer Email:", trainerEmail);
        console.log("Trainer Password:", trainerPassword);
        onClose();
    };

    return (
        <div className="add-trainer-popup open-add-trainer-popup">
            <h2>Add Trainer</h2>
            <p>Please fill in the details for adding a new trainer.</p>
            <input
                className="trainer-name-input"
                type="text"
                value={trainerName}
                onChange={handleNameChange}
                placeholder="Enter trainer name"
            />
            <input
                className="trainer-id-input"
                type="text"
                value={trainerId}
                onChange={handleIdChange}
                placeholder="Enter trainer ID"
            />
            <input
                className="trainer-email-input"
                type="text"
                value={trainerEmail}
                onChange={handleEmailChange}
                placeholder="Enter trainer email"
            />
            <input
                className="trainer-pw-input"
                type="text"
                value={trainerPassword}
                onChange={handlePasswordChange}
                placeholder="Enter trainer password"
            />
            <div className="select-menu-container">
                <div className={`select-btn ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                    <span className="btn-text">{selectedRole ? selectedRole : 'Select Role'}</span>
                    <span className="arrow-dwn">
                        <div className="fa-solid fa-chevron-down">
                            <box-icon name='chevron-down'></box-icon>
                        </div>
                    </span>
                </div>
                {isOpen && (
                    <ul className="list-items">
                        {['Training Lead', 'Training Assistant'].map((role, index) => (
                            <li
                                key={index}
                                className={`item ${selectedRole === role ? 'checked' : ''}`}
                                onClick={() => handleRoleSelect(role)}
                            >
                                <span className="checkbox">
                                    <div className="fa-solid fa-check check-icon">
                                        <box-icon name='check' ></box-icon>
                                    </div>
                                </span>
                                <span className="item-text">{role}</span>
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

export default AddTrainerPopup;
