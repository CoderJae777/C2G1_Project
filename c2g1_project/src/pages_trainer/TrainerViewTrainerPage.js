import React, { useState, useEffect } from "react";
import "../styles/adminhomepage.css";
import "../styles/adminmanagetrainerpage.css";
import "boxicons/css/boxicons.min.css";
import TopLeftSidebar from "../components/TrainerTopLeftSideBar";
import EditTrainerDetailsPopup from "../pages_admin/EditTrainerDetailsPopup";
import TrainerActivityPopup from "../pages_admin/TrainerActivityPopup";
import AddTrainerPopup from "../pages_admin/AddTrainerPopup";
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

  const { data, loading, error, seturl, setParams, refetch } = useAxiosGet(
    config.base_url + endpoints.admin.getTrainers,
    {},
    [],
    true
  );

  // Ensure trainer_data is defined and fallback to an empty array if necessary
  const trainer_data = data?.trainers || [];

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
    // Handle activity change
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

  return trainer_data.length > 0 ? (
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
            <h2>List of Trainers</h2>
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
                        <button className="trainer-info-table-button">
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
