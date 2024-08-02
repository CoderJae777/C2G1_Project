import React, { useState, useEffect, useRef } from "react";
import useAxiosGet from "../api/useAxiosGet";
import "../styles/adminworkshoprequestpagepopups.css";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";
import useAxiosPatch from "../api/useAxiosPatch";

const WorkshopRequestDetailsPopup = ({
  workshop,
  selectedStartDate,
  selectedEndDate,
  onClose,
}) => {
  const [workshopDetails, setWorkshopDetails] = useState(workshop);
  const [trainerUsernames, setTrainerUsernames] = useState({});
  const popupRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(
    workshop.trainers.map((trainer) => trainer._id)
  );
  const { data, loading, error, setUrl, setParams, refetch } = useAxiosGet();

  const handleSuccess = (response) => {
    onClose();
  };
  const handleError = (error) => {
    onClose();
  };

  const updateTrainers = useAxiosPatch(
    config.base_url + endpoints.admin.reallocateTrainers + workshopDetails._id,
    {},
    [],
    handleSuccess,
    handleError
  );

  const handleSubmit = () => {
    updateTrainers.setBody({
      trainerIds: selectedItems,
    });
    updateTrainers.refetch();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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

  useEffect(() => {
    setWorkshopDetails(workshop);
  }, [workshop]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, onClose]);

  useEffect(() => {
    if (
      workshopDetails.status === "approved" &&
      workshopDetails.trainers.length > 0
    ) {
      setUrl(config.base_url + endpoints.admin.getTrainers);
      refetch();
    }
  }, [workshopDetails, setUrl, refetch]);

  useEffect(() => {
    if (data) {
      const trainers = data.reduce((acc, trainer) => {
        acc[trainer._id] = trainer.username;
        return acc;
      }, {});
      setTrainerUsernames(trainers);
    }
  }, [data]);

  useEffect(() => {
    document.body.classList.add("popup-open");
    return () => {
      document.body.classList.remove("popup-open");
    };
  }, []);

  return (
    <>
      <div className="popup-overlay popup-open"></div>
      <div
        ref={popupRef}
        data-cy="wsrqd-popup"
        className="workshop-request-details-popup open-workshop-request-details-popup"
      >
        <h2>Workshop Request Details</h2>
        <div className="workshop-details-content">
          <table className="details-table">
            <tbody>
              <tr className="spaced-row">
                <td>
                  <strong>Client Company:</strong>
                </td>
                <td>{workshopDetails.company}</td>
              </tr>
              <tr className="spaced-row">
                <td>
                  <strong>Client Name:</strong>
                </td>
                <td>{workshopDetails.name}</td>
              </tr>
              <tr className="spaced-row">
                <td>
                  <strong>Client Role:</strong>
                </td>
                <td>{workshopDetails.company_role}</td>
              </tr>
              <tr className="spaced-row">
                <td>
                  <strong>Client Email:</strong>
                </td>
                <td>{workshopDetails.email}</td>
              </tr>
              <tr className="spaced-row">
                <td>
                  <strong>Client Phone Number:</strong>
                </td>
                <td>{workshopDetails.phone_number}</td>
              </tr>
              <tr className="spaced-row">
                <td>
                  <strong>Start Date:</strong>
                </td>
                <td>{workshopDetails.start_date}</td>
              </tr>
              <tr className="spaced-row">
                <td>
                  <strong>End Date:</strong>
                </td>
                <td>{workshopDetails.end_date}</td>
              </tr>
              <tr className="spaced-row">
                <td>
                  <strong>Deal Size:</strong>
                </td>
                <td>{workshopDetails.deal_potential}</td>
              </tr>
              <tr className="spaced-row">
                <td>
                  <strong>Country:</strong>
                </td>
                <td>{workshopDetails.country}</td>
              </tr>
              <tr className="spaced-row">
                <td>
                  <strong>Venue:</strong>
                </td>
                <td>{workshopDetails.venue}</td>
              </tr>
              <tr className="spaced-row">
                <td>
                  <strong>Attendees:</strong>
                </td>
                <td>{workshopDetails.pax}</td>
              </tr>
              <tr className="spaced-row">
                <td>
                  <strong>Message:</strong>
                </td>
                <td>{workshopDetails.request_message}</td>
              </tr>
              {workshopDetails.status === "approved" && (
                <tr className="spaced-row">
                  <td>
                    <strong>Trainers Allocated:</strong>
                  </td>
                  <td>
                    {workshopDetails.trainers.length > 0 ? (
                      <ul className="trainer-list-ar-ws-popup">
                        {workshopDetails.trainers.map((trainerId, index) => (
                          <li key={index}>
                            {trainerUsernames[trainerId.username] ||
                              trainerId.username}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No trainers allocated"
                    )}
                  </td>
                </tr>
              )}
              {workshopDetails.status === "rejected" && (
                <tr className="spaced-row">
                  <td>
                    <strong>Reject Reason:</strong>
                  </td>
                  <td>{workshopDetails.reject_reason}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {workshopDetails.status === "approved" && (
          <div data-cy="select-trainer" className="select-menu-container">
            <div
              data-cy="select-trainer-btn"
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
                {workshop.trainers.map((trainer, index) => (
                  <li
                    data-cy="trainer-item"
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
        )}
        <div className="popup-buttons">
          {workshopDetails.status === "approved" && (
            <button
              data-cy="wsrq-submit-button"
              className="submit-button"
              type="button"
              onClick={handleSubmit}
              disabled={selectedItems.length === 0}
            >
              Submit
            </button>
          )}
          {(workshopDetails.status === "approved" || workshopDetails.status === "pending") && (
            <button
              data-cy="wsrq-cancel-button"
              className="cancel-button"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkshopRequestDetailsPopup;
