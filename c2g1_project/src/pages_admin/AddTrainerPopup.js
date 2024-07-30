import React, { useState, useEffect, useRef } from "react";
import "../styles/adminmanagetrainerspagepopup.css";
import "boxicons/css/boxicons.min.css";
import useAxiosPost from "../api/useAxiosPost";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";

const AddTrainerPopup = ({ onClose }) => {
  const [trainerName, setTrainerName] = useState("");
  const [trainerRole, setTrainerRole] = useState("");
  const [trainerId, setTrainerId] = useState("");
  const [trainerEmail, setTrainerEmail] = useState("");
  const [trainerPassword, setTrainerPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const popupRef = useRef(null);

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

  const handleSuccess = (data) => {
    onClose();
  };

  const handleError = (error) => {
    alert("Error creating trainer, please contact the administrator.");
  };

  const { data, loading, error, setBody, refetch } = useAxiosPost(
    config.base_url + endpoints.admin.addTrainer,
    {},
    [],
    handleSuccess,
    handleError
  );

  const handleSubmit = (e) => {
    // Handle submission logic here
    setBody({
      username: trainerId,
      password: trainerPassword,
      email: trainerEmail,
      fullname: trainerName,
      trainer_role: trainerRole,
    });
    refetch();
  };

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
      <div ref={popupRef} data-cy="add-trainer-popup" className="add-trainer-popup open-add-trainer-popup">
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
          <div
            className={`select-btn ${isOpen ? "open" : ""}`}
            onClick={toggleDropdown}
          >
            <span className="btn-text">
              {selectedRole ? selectedRole : "Select Role"}
            </span>
            <span className="arrow-dwn">
              <div className="fa-solid fa-chevron-down">
                <box-icon name="chevron-down"></box-icon>
              </div>
            </span>
          </div>
          {isOpen && (
            <ul className="list-items">
              {["Training Lead", "Training Assistant"].map((role, index) => (
                <li
                  key={index}
                  className={`item ${selectedRole === role ? "checked" : ""}`}
                  onClick={() => handleRoleSelect(role)}
                >
                  <span className="checkbox">
                    <div className="fa-solid fa-check check-icon">
                      <box-icon name="check"></box-icon>
                    </div>
                  </span>
                  <span className="item-text">{role}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="popup-buttons">
          <button className="submit-button" type="button" onClick={handleSubmit}>
            Submit
          </button>
          <button data-cy="add-trainer-cancel-button" className="cancel-button" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTrainerPopup;
