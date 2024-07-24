import React, { useState, useEffect } from "react";
import "../styles/adminhomepage.css";
import "../styles/adminmanagetrainerpage.css";
import "boxicons/css/boxicons.min.css";
import TopLeftSidebar from "../components/TopLeftSideBar";
import EditTrainerDetailsPopup from "./EditTrainerDetailsPopup";
import TrainerActivityPopup from "./TrainerActivityPopup";
import AddTrainerPopup from "./AddTrainerPopup";
import TrainerScheduleCalendar from "../components/TrainerScheduleCalendar";
import DeleteTrainerPopup from "./DeleteTrainerPopup";
import useAxiosGet from "../api/useAxiosGet";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";

const AdminManageTrainerPage = () => {
  const [isTrainerDetailsPopupOpen, setIsTrainerDetailsPopupOpen] = useState(false);
  const [isTrainerActivityPopupOpen, setIsTrainerActivityPopupOpen] = useState(false);
  const [isAddTrainerPopupOpen, setIsAddTrainerPopupOpen] = useState(false);
  const [isTrainerScheduleCalendarOpen, setIsTrainerScheduleCalendarOpen] = useState(false);
  const [isDeleteTrainerPopupOpen, setIsDeleteTrainerPopupOpen] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [availability, setAvailability] = useState(null);

  const { data, loading, error, seturl, setParams, refetch } = useAxiosGet(
    config.base_url + endpoints.admin.getTrainers,
    {},
    [],
    true
  );

  const handleOpenTrainerDetailsPopup = (id, fullname, username) => {
    setSelectedId(id);
    setIsTrainerDetailsPopupOpen(true);
    setFullname(fullname);
    setUsername(username);
  };

  const handleCloseTrainerDetailsPopup = () => {
    refetch();
    setIsTrainerDetailsPopupOpen(false);
  };

  const handleOpenTrainerActivityPopup = (index, id, fullname, username, availability) => {
    setIsTrainerActivityPopupOpen(true);
    setPopupIndex(index);
    setAvailability(availability);
    setSelectedId(id);
    setFullname(fullname);
    setUsername(username);
  };

  const handleCloseTrainerActivityPopup = () => {
    refetch();
    setIsTrainerActivityPopupOpen(false);
  };

  const handleActivityChange = (selectedActivity, index) => {
    // const updatedTrainers = [...trainer_data.trainers];
    // updatedTrainers[index].activity = selectedActivity;
    // Assuming you would update the state with the new trainers data.
    // You might need a separate state to manage the activity if you don't want to mutate fetched data directly.
    // setTrainers(updatedTrainers);
  };

  const handleOpenAddTrainerPopup = () => {
    setIsAddTrainerPopupOpen(true);
  };

  const handleCloseAddTrainerPopup = () => {
    refetch();
    setIsAddTrainerPopupOpen(false);
  };

  const handleOpenTrainerScheduleCalendar = (id, fullname) => {
    setSelectedId(id);
    setFullname(fullname);
    setIsTrainerScheduleCalendarOpen(true);
  };

  const handleCloseTrainerScheduleCalendar = () => {
    setIsTrainerScheduleCalendarOpen(false);
  };

  const handleOpenDeleteTrainerPopup = (id, fullname, username) => {
    setSelectedId(id);
    setFullname(fullname);
    setUsername(username);
    setIsDeleteTrainerPopupOpen(true);
  };

  const handleCloseDeleteTrainerPopup = () => {
    refetch();
    setIsDeleteTrainerPopupOpen(false);
  };

  const renderTrainerRows = () => {
    const rows = [];
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const trainer = data[i];
        rows.push(
          <tr key={i}>
            <td className="trainer-info-table-td">{trainer.fullname}</td>
            <td className="trainer-info-table-td">{trainer.trainer_role}</td>
            <td className="trainer-info-table-td">{trainer.username}</td>
            <td className="trainer-info-table-td action-column">
              <button
                className="trainer-info-table-button"
                onClick={() => handleOpenTrainerScheduleCalendar(trainer._id, trainer.fullname)}
              >
                View Schedule
              </button>
              <button
                className="trainer-info-table-button"
                onClick={() => handleOpenTrainerDetailsPopup(trainer._id, trainer.fullname, trainer.username)}
              >
                Edit Details
              </button>
              <button
                data-cy="trainer-activity-button"
                className="trainer-info-table-button"
                onClick={() =>
                  handleOpenTrainerActivityPopup(
                    i,
                    trainer._id,
                    trainer.fullname,
                    trainer.username,
                    trainer.availability
                  )
                }
              >
                {trainer.availability}
              </button>
              <button
                data-cy="delete-trainer-button"
                className="delete-trainer-button"
                onClick={() => handleOpenDeleteTrainerPopup(trainer._id, trainer.fullname, trainer.username)}
              >
                Delete Trainer
              </button>
            </td>
          </tr>
        );
      }
    }
    return rows;
  };

  return (
    <>
      {isAddTrainerPopupOpen && (
        <AddTrainerPopup onClose={handleCloseAddTrainerPopup} />
      )}
      {isTrainerScheduleCalendarOpen && (
        <TrainerScheduleCalendar 
          trainerId={selectedId}
          fullname={fullname} 
          onClose={handleCloseTrainerScheduleCalendar} 
        />
      )}
      {isTrainerDetailsPopupOpen && (
        <EditTrainerDetailsPopup
          trainerId={selectedId}
          fullname={fullname}
          username={username}
          onClose={handleCloseTrainerDetailsPopup}
        />
      )}
      {isTrainerActivityPopupOpen && (
        <TrainerActivityPopup
          onClose={handleCloseTrainerActivityPopup}
          onActivityChange={handleActivityChange}
          index={popupIndex}
          trainerId={selectedId}
          fullname={fullname}
          username={username}
          availability={availability}
        />
      )}
      {isDeleteTrainerPopupOpen && (
        <DeleteTrainerPopup onClose={handleCloseDeleteTrainerPopup}
        trainerId={selectedId}
        fullname={fullname}
        username={username}
        />
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
              <table data-cy="trainer-info-table" className="trainer-info-table">
                <thead>
                  <tr>
                    <th className="trainer-info-table-th">Name</th>
                    <th className="trainer-info-table-th">Role</th>
                    <th className="trainer-info-table-th">Trainer ID</th>
                    <th className="trainer-info-table-th action-column">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTrainerRows()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminManageTrainerPage;
