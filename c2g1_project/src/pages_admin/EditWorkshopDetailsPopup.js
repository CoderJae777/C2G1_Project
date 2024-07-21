import React, { useState } from "react";
import "../styles/adminmanageworkshoppagepopup.css";
import "boxicons/css/boxicons.min.css";
import useAxiosPatch from "../api/useAxiosPatch";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";

const EditWorkshopDetailsPopup = ({ onClose, selectedId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [newWorkshopName, setNewWorkshopName] = useState(null);
  const [newWorkshopID, setNewWorkshopID] = useState(null);
  const [newWorkshopDetails, setNewWorkshopDetails] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };

  const handleItemClick2 = (item) => {
    setSelectedItem2(item === selectedItem ? null : item);
  };

  const handleWorkshopNameChange = (event) => {
    setNewWorkshopName(event.target.value);
  };

  const handleWorkshopIDChange = (event) => {
    setNewWorkshopID(event.target.value);
  };

  const handleWorkshopDetailsChange = (event) => {
    setNewWorkshopDetails(event.target.value);
  };

  const onSuccess = () => {
    onClose();
  };

  const onError = () => {};

  const { data, loading, error, setBody, setUrl, refetch } = useAxiosPatch(
    config.base_url + endpoints.admin.updateWorkshopData + selectedId,
    {},
    [],
    onSuccess,
    onError
  );

  const handleSubmit = () => {
    setBody({
      workshop_ID: newWorkshopID,
      workshop_name: newWorkshopName,
      workshop_type: selectedItem,
      workshop_details: newWorkshopDetails,
      availability: selectedItem2,
    });
    refetch();
  };

  console.log(selectedItem);
  console.log(selectedItem2);
  console.log(newWorkshopName);
  console.log(newWorkshopID);
  console.log(newWorkshopDetails);

  return (
    <div className="ws-details-popup open-ws-details-popup">
      <h2>Edit Details</h2>
      <input
        className="new-ws-name-input"
        type="text"
        value={newWorkshopName}
        onChange={handleWorkshopNameChange}
        placeholder="Enter new workshop name"
      />
      <input
        className="new-ws-id-input"
        type="text"
        value={newWorkshopID}
        onChange={handleWorkshopIDChange}
        placeholder="Enter new workshop ID"
      />
      <div className="select-menu-container">
        <div
          className={`select-btn ${isOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
          <span className="btn-text">
            {selectedItem ? selectedItem : "Select Type"}
          </span>
          <span className="arrow-dwn-type">
            <div className="fa-solid fa-chevron-down">
              <box-icon name="chevron-down"></box-icon>
            </div>
          </span>
        </div>
        {isOpen && (
          <ul className="list-items">
            {[
              "Business Value Discovery",
              "AI Platform",
              "Infrastructure and Demo",
            ].map((wstypes, index) => (
              <li
                key={index}
                className={`item ${selectedItem === wstypes ? "checked" : ""}`}
                onClick={() => handleItemClick(wstypes)}
              >
                <span className="checkbox">
                  <div className="fa-solid fa-check check-icon">
                    <box-icon name="check"></box-icon>
                  </div>
                </span>
                <span className="item-text">{wstypes}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="select-menu-container">
        <div
          className={`select-btn ${isOpen2 ? "open" : ""}`}
          onClick={toggleDropdown2}
        >
          <span className="btn-text">
            {selectedItem2 ? selectedItem2 : "Select Availability"}
          </span>
          <span className="arrow-dwn-avail">
            <div className="fa-solid fa-chevron-down">
              <box-icon name="chevron-down"></box-icon>
            </div>
          </span>
        </div>
        {isOpen2 && (
          <ul className="list-items">
            {["Available", "Unavailable"].map((wsavail, index) => (
              <li
                key={index}
                className={`item ${selectedItem2 === wsavail ? "checked" : ""}`}
                onClick={() => handleItemClick2(wsavail)}
              >
                <span className="checkbox">
                  <div className="fa-solid fa-check check-icon">
                    <box-icon name="check"></box-icon>
                  </div>
                </span>
                <span className="item-text">{wsavail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <textarea
        className="change-workshop-details-input"
        placeholder=" Enter new workshop details here"
        onChange={handleWorkshopDetailsChange}
      />
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

export default EditWorkshopDetailsPopup;
