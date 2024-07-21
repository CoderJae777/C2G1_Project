import React, { useState, useEffect } from "react";
import "../styles/adminhomepage.css";
import "../styles/adminmanagetrainerpage.css";
import "boxicons/css/boxicons.min.css";
import TopLeftSidebar from "../components/TrainerTopLeftSideBar";
import TrainerScheduleCalendar from "../components/TrainerScheduleCalendar";
import useAxiosGet from "../api/useAxiosGet";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";

const TrainerViewTrainerPage = () => {
  const [isTrainerScheduleCalendarOpen, setIsTrainerScheduleCalendarOpen] =
    useState(false);

  const { data, loading, error, setBody, refetch } = useAxiosGet(
    config.base_url + endpoints.admin.getTrainers,
    {},
    [],
    true
  );

  const handleOpenTrainerScheduleCalendar = () => {
    setIsTrainerScheduleCalendarOpen(true);
  };

  const handleCloseTrainerScheduleCalendar = () => {
    setIsTrainerScheduleCalendarOpen(false);
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
                onClick={handleOpenTrainerScheduleCalendar}
              >
                View Schedule
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
      {isTrainerScheduleCalendarOpen && (
        <TrainerScheduleCalendar onClose={handleCloseTrainerScheduleCalendar} />
      )}
      <div className="admin-manage-trainer-page">
        <div className="top-panel">
          <TopLeftSidebar />
        </div>
        <div className="manage-trainer-column">
          <div className="manage-trainer-title">
            <h2>Trainers</h2>
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

export default TrainerViewTrainerPage;
