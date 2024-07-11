import React, { useState, useEffect } from "react";
import "./styles/adminhomepage.css";
import "./styles/adminmanagetrainerpage.css";
import "boxicons/css/boxicons.min.css";
import TopLeftSidebar from "./components/TopLeftSideBar";
import EditTrainerDetailsPopup from "./EditTrainerDetailsPopup";
import TrainerActivityPopup from "./TrainerActivityPopup";
import AddTrainerPopup from "./AddTrainerPopup";
import useFetch from "./components/useFetch";
import TrainerScheduleCalendar from "./components/TrainerScheduleCalendar";

const AdminManageTrainerPage = () => {
  const [isTrainerDetailsPopupOpen, setIsTrainerDetailsPopupOpen] =
    useState(false);
  const [isTrainerActivityPopupOpen, setIsTrainerActivityPopupOpen] = useState(false);
  const [isAddTrainerPopupOpen, setIsAddTrainerPopupOpen] = useState(false);
  const [isTrainerScheduleCalendarOpen, setIsTrainerScheduleCalendarOpen] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);

  const { trainer_data } = useFetch();

  const handleOpenTrainerDetailsPopup = () => {
    setIsTrainerDetailsPopupOpen(true);
  };

  const handleCloseTrainerDetailsPopup = () => {
    setIsTrainerDetailsPopupOpen(false);
  };

  const handleOpenTrainerActivityPopup = (index) => {
    setIsTrainerActivityPopupOpen(true);
    setPopupIndex(index);
  };

  const handleCloseTrainerActivityPopup = () => {
    setIsTrainerActivityPopupOpen(false);
  };

  const handleActivityChange = (selectedActivity, index) => {
    const updatedTrainers = [...trainer_data];
    updatedTrainers[index].activity = selectedActivity;
    // Assuming you would update the state with the new trainers data.
    // You might need a separate state to manage the activity if you don't want to mutate fetched data directly.
    // setTrainers(updatedTrainers);
  };

  const handleOpenAddTrainerPopup = () => {
    setIsAddTrainerPopupOpen(true);
  };

  const handleCloseAddTrainerPopup = () => {
    setIsAddTrainerPopupOpen(false);
  };

  const handleOpenTrainerScheduleCalendar = () => {
    setIsTrainerScheduleCalendarOpen(true);
  };

  const handleCloseTrainerScheduleCalendar = () => {
    setIsTrainerScheduleCalendarOpen(false);
  };

  return trainer_data !== null ? (
    <>
      {isTrainerDetailsPopupOpen && (
        <EditTrainerDetailsPopup onClose={handleCloseTrainerDetailsPopup} />
      )}
      {isTrainerActivityPopupOpen && (
        <TrainerActivityPopup
          onClose={handleCloseTrainerActivityPopup}
          onActivityChange={handleActivityChange}
          index={popupIndex}
        />
      )}
      {isAddTrainerPopupOpen && (
        <AddTrainerPopup onClose={handleCloseAddTrainerPopup} />
      )}
      {isTrainerScheduleCalendarOpen && (
        <TrainerScheduleCalendar onClose={handleCloseTrainerScheduleCalendar} />
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
                        <button 
                          className="trainer-info-table-button"
                          onClick={handleOpenTrainerScheduleCalendar}
                        >
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
                          onClick={() => handleOpenTrainerActivityPopup(index)}
                        >
                          {trainer.activity}
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
