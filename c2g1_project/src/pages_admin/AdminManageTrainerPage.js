import React, { useState, useEffect } from "react";
import "../styles/adminhomepage.css";
import "../styles/adminmanagetrainerpage.css";
import "boxicons/css/boxicons.min.css";
import TopLeftSidebar from "../components/TopLeftSideBar";
import EditTrainerDetailsPopup from "./EditTrainerDetailsPopup";
import TrainerActivityPopup from "./TrainerActivityPopup";
import AddTrainerPopup from "./AddTrainerPopup";
import useFetch from "../components/useFetch";
import TrainerScheduleCalendar from "../components/TrainerScheduleCalendar";
import useAxiosGet from "../api/useAxiosGet";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";

const AdminManageTrainerPage = () => {
  const [isTrainerDetailsPopupOpen, setIsTrainerDetailsPopupOpen] =
    useState(false);
  const [isTrainerActivityPopupOpen, setIsTrainerActivityPopupOpen] =
    useState(false);
  const [isAddTrainerPopupOpen, setIsAddTrainerPopupOpen] = useState(false);
  const [isTrainerScheduleCalendarOpen, setIsTrainerScheduleCalendarOpen] =
    useState(false);
  const [popupIndex, setPopupIndex] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [availability, setAvailability] = useState(null);

  var trainer_data = [];
  const { data, loading, error, seturl, setParams, refetch } = useAxiosGet(
    config.base_url + endpoints.admin.getTrainers,
    {},
    [],
    true
  );
  try {
    trainer_data = data.trainers;
  } catch (error) {}

  const handleOpenTrainerDetailsPopup = (id) => {
    setSelectedId(id);
    setIsTrainerDetailsPopupOpen(true);
  };

  const handleCloseTrainerDetailsPopup = () => {
    refetch();
    setIsTrainerDetailsPopupOpen(false);
  };

  const handleOpenTrainerActivityPopup = (index, id, availability) => {
    setIsTrainerActivityPopupOpen(true);
    setPopupIndex(index);
    setAvailability(availability);
    setSelectedId(id);
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

  const handleOpenTrainerScheduleCalendar = () => {
    setIsTrainerScheduleCalendarOpen(true);
  };

  const handleCloseTrainerScheduleCalendar = () => {
    setIsTrainerScheduleCalendarOpen(false);
  };

  return (trainer_data !== null) | (trainer_data.trainers !== null) ? (
    <>
      {isTrainerDetailsPopupOpen && (
        <EditTrainerDetailsPopup
          trainerId={selectedId}
          onClose={handleCloseTrainerDetailsPopup}
        />
      )}
      {isTrainerActivityPopupOpen && (
        <TrainerActivityPopup
          onClose={handleCloseTrainerActivityPopup}
          onActivityChange={handleActivityChange}
          index={popupIndex}
          trainerId={selectedId}
          availability={availability}
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
              <table data-cy="trainer-info-table" className="trainer-info-table">
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
                      <td className="trainer-info-table-td">
                        {trainer.fullname}
                      </td>
                      <td className="trainer-info-table-td">
                        {trainer.trainer_role}
                      </td>
                      <td className="trainer-info-table-td">
                        {trainer.username}
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
                          onClick={() =>
                            handleOpenTrainerDetailsPopup(trainer._id)
                          }
                        >
                          Edit Details
                        </button>
                        <button
                        data-cy="trainer-activity-button"
                          className="trainer-info-table-button"
                          onClick={() =>
                            handleOpenTrainerActivityPopup(
                              index,
                              trainer._id,
                              trainer.availability
                            )
                          }
                        >
                          {trainer.availability}
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
