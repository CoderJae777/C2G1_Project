import React, { useState, useEffect, useRef } from "react";
import "../styles/adminworkshoprequestpagepopups.css";
import "boxicons/css/boxicons.min.css";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";
import useAxiosGet from "../api/useAxiosGet";
import useAxiosPatch from "../api/useAxiosPatch";

const ApproveWorkshopRequestPopup = ({
  selectedId,
  requestId,
  selectedStartDate,
  selectedEndDate,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const popupRef = useRef(null);

  const handleItemClick = (item) => {
    const newSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];

    setSelectedItems(newSelectedItems);
  };

  const availableTrainers = useAxiosGet(
    config.base_url + endpoints.admin.getAvailableTrainers,
    {
      startTime: selectedStartDate,
      endTime: selectedEndDate,
    },
    [],
    true
  );

  const workshopRequest = useAxiosGet(
    config.base_url + endpoints.admin.getWorkshopRequest + selectedId,
    {},
    [],
    true
  );

  const handleSubmit = () => {
    setBody({
      trainerIds: selectedItems,
    });
    refetch();
  };

  const handleSuccess = () => {
    onClose();
  };

  const handleError = (error) => {};

  const { data, loading, error, setBody, refetch } = useAxiosPatch(
    config.base_url + endpoints.admin.approveWorkshopRequest + selectedId,
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
      <div
        ref={popupRef}
        data-cy="approve-wsrq-popup"
        className="approve-workshop-request-popup open-approve-workshop-request-popup"
      >
        <h2>Approve Workshop</h2>
        {/* need to create an ID for specific workshop request */}
        <p>Workshop ID: {requestId ? requestId : "None"}</p> 
        <p>Assign trainer(s) to this workshop.</p>
        <div data-cy="select-trainer" className="select-menu-container">
          <div
            className={`select-btn ${isOpen ? "open" : ""}`}
            onClick={toggleDropdown}
          >
            <span data-cy="select-trainer-text" className="btn-text">
              {selectedItems.length > 0
                ? `${selectedItems.length} Selected`
                : "Select Trainer"}
            </span>
            <span className="arrow-dwn">
              <div className="fa-solid fa-chevron-down">
                <box-icon name="chevron-down"></box-icon>
              </div>
            </span>
          </div>
          {isOpen && (
            <ul data-cy="trainer-list" className="list-items">
              {availableTrainers.data.map((trainer, index) => (
                <li
                  key={index}
                  className={`item ${
                    selectedItems.includes(trainer._id) ? "checked" : ""
                  }`}
                  onClick={() => handleItemClick(trainer._id)}
                >
                  <span className="checkbox">
                    <div className="fa-solid fa-check check-icon">
                      {selectedItems.includes(trainer._id) && (
                        <box-icon name="check"></box-icon>
                      )}
                    </div>
                  </span>
                  <span className="item-text">{trainer.fullname}</span>
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
            onClick={handleSubmit}
            disabled={selectedItems.length === 0}
          >
            Submit
          </button>
          <button
            data-cy="approve-wsrq-cancel-button"
            className="cancel-button"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ApproveWorkshopRequestPopup;
