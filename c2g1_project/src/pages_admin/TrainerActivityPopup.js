import React, { useState, useEffect, useRef } from "react";
import "../styles/adminmanagetrainerspagepopup.css";
import "boxicons/css/boxicons.min.css";
import useAxiosPatch from "../api/useAxiosPatch";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";

const TrainerActivityPopup = ({
  onClose,
  onActivityChange,
  index,
  trainerId,
  fullname,
  username,
  availability,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(availability);
  const popupRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(!isOpen);
  };

  const handleSuccess = () => {
    onClose();
  };

  const handleError = (error) => {};

  const activateTrainer = useAxiosPatch(
    config.base_url +
      endpoints.admin.availabilityTrainer +
      "Activate/" +
      trainerId,
    {},
    [],
    handleSuccess,
    handleError
  );

  const deactivateTrainer = useAxiosPatch(
    config.base_url +
      endpoints.admin.availabilityTrainer +
      "Deactivate/" +
      trainerId,
    {},
    [],
    handleSuccess,
    handleError
  );

  const handleSubmit = () => {
    onActivityChange(selectedItem, index);
    if (selectedItem === "Active") {
      activateTrainer.setBody({
        availability: "Active",
      });
      activateTrainer.refetch();
    } else {
      deactivateTrainer.setBody({
        availability: "Inactive",
      });
      deactivateTrainer.refetch();
    }
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
      <div ref={popupRef} data-cy="trainer-activity-popup" className="trainer-activity-popup open-trainer-activity-popup">
        <h2>Select Activity</h2>
        <p>Trainer Name: {fullname}</p>
        <p>Trainer ID: {username}</p>
        <div className="select-menu-container">
          <div
            data-cy="trainer-activity-select-button"
            className={`select-btn ${isOpen ? "open" : ""}`}
            onClick={toggleDropdown}
          >
            <span className="btn-text">
              {selectedItem ? selectedItem : "Select Activity"}
            </span>
            <span className="arrow-dwn">
              <div className="fa-solid fa-chevron-down">
                <box-icon name="chevron-down"></box-icon>
              </div>
            </span>
          </div>
          {isOpen && (
            <ul className="list-items">
              {["Active", "Inactive"].map((trainer, index) => (
                <li
                  data-cy="trainer-activity-option"
                  key={index}
                  className={`item ${selectedItem === trainer ? "checked" : ""}`}
                  onClick={() => handleItemClick(trainer)}
                >
                  <span className="checkbox">
                    <div className="fa-solid fa-check check-icon">
                      <box-icon name="check"></box-icon>
                    </div>
                  </span>
                  <span className="item-text">{trainer}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="popup-buttons">
          <button className="submit-button" type="button" onClick={handleSubmit}>
            Submit
          </button>
          <button data-cy="trainer-activity-cancel-button" className="cancel-button" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default TrainerActivityPopup;
