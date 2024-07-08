import React, { useState, useEffect } from "react";
import "./styles/adminhomepage.css";
import "./styles/adminmanagetrainerpage.css";
import "boxicons/css/boxicons.min.css";
import TopLeftSidebar from "./components/TopLeftSideBar";
import EditTrainerDetailsPopup from "./EditTrainerDetailsPopup";
import TrainerAvailPopup from "./TrainerAvailPopup";
import AddTrainerPopup from "./AddTrainerPopup";
import useFetch from "./components/useFetch";

const AdminManageTrainerPage = () => {
  const [isTrainerDetailsPopupOpen, setIsTrainerDetailsPopupOpen] =
    useState(false);
  const [isTrainerAvailPopupOpen, setIsTrainerAvailPopupOpen] = useState(false);
  const [isAddTrainerPopupOpen, setIsAddTrainerPopupOpen] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);

  const { trainer_data } = useFetch();

  const handleOpenTrainerDetailsPopup = () => {
    setIsTrainerDetailsPopupOpen(true);
  };

  const handleCloseTrainerDetailsPopup = () => {
    setIsTrainerDetailsPopupOpen(false);
  };

  const handleOpenTrainerAvailPopup = (index) => {
    setIsTrainerAvailPopupOpen(true);
    setPopupIndex(index);
  };

  const handleCloseTrainerAvailPopup = () => {
    setIsTrainerAvailPopupOpen(false);
  };

  const handleAvailabilityChange = (selectedAvailability, index) => {
    const updatedTrainers = [...trainer_data];
    updatedTrainers[index].isAvailable = selectedAvailability === "Available";
    // Assuming you would update the state with the new trainers data.
    // You might need a separate state to manage the availability if you don't want to mutate fetched data directly.
    // setTrainers(updatedTrainers);
  };

  const handleOpenAddTrainerPopup = () => {
    setIsAddTrainerPopupOpen(true);
  };

  const handleCloseAddTrainerPopup = () => {
    setIsAddTrainerPopupOpen(false);
  };

  return trainer_data !== null ? (
    <>
      {isTrainerDetailsPopupOpen && (
        <EditTrainerDetailsPopup onClose={handleCloseTrainerDetailsPopup} />
      )}
      {isTrainerAvailPopupOpen && (
        <TrainerAvailPopup
          onClose={handleCloseTrainerAvailPopup}
          onAvailabilityChange={handleAvailabilityChange}
          index={popupIndex}
        />
      )}
      {isAddTrainerPopupOpen && (
        <AddTrainerPopup onClose={handleCloseAddTrainerPopup} />
      )}
      <div className="admin-manage-trainer-page">
        <div className="top-panel">
          <TopLeftSidebar />
        </div>
        <div className="manage-trainer-column">
          <div className="manage-trainer-title">
            <button
              className="add-trainer-button"
              onClick={handleOpenAddTrainerPopup}
            >
              Add Trainer
            </button>
            <h2>Manage Trainers</h2>
          </div>
          <div className="manage-trainer-panel-outer">
            <div className="manage-trainer-panel">
              <table className="trainer-info-table">
                <thead>
                  <tr>
                    <th className="trainer-info-table-th">Name</th>
                    <th className="trainer-info-table-th">Role</th>
                    <th className="trainer-info-table-th">Trainer ID</th>
                    <th className="trainer-info-table-th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trainer_data.map((trainer, index) => (
                    <tr key={index}>
                      <td className="trainer-info-table-td">{trainer.name}</td>
                      <td className="trainer-info-table-td">
                        {trainer.trainer_role}
                      </td>
                      <td className="trainer-info-table-td">
                        {trainer.trainer_ID}
                      </td>
                      <td className="trainer-info-table-td">
                        <button className="trainer-info-table-button">
                          View Schedule
                        </button>
                        <button
                          className="trainer-info-table-button"
                          onClick={handleOpenTrainerDetailsPopup}
                        >
                          Edit Details
                        </button>
                        <button
                          className="trainer-info-table-button"
                          onClick={() => handleOpenTrainerAvailPopup(index)}
                        >
                          {trainer.isAvailable ? "Available" : "Unavailable"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>Calculating all data... This may take awhile...</div>
  );
};

export default AdminManageTrainerPage;
