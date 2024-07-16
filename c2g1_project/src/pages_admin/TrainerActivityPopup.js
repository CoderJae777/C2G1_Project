import React, { useState } from "react";
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
  availability,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(availability);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
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

  return (
    <div className="trainer-activity-popup open-trainer-activity-popup">
      <h2>Select Activity</h2>
      <div className="select-menu-container">
        <div
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
        <button className="cancel-button" type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TrainerActivityPopup;
