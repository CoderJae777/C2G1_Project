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

  const verifyUser = useAxiosGet(config.base_url + endpoints.verify);

  const { data, loading, error, setBody, refetch } = useAxiosGet(
    config.base_url + endpoints.trainer.getTeammates,
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

  data.trainer_workshops &&
    data.trainer_workshops.map((request) => console.log(request.company));

  return verifyUser !== null && verifyUser.data.role === "trainer" ? (
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
              <table
                data-cy="trainer-info-table"
                className="trainer-info-table"
              >
                <thead>
                  <tr>
                  <th className="trainer-info-table-th">Request Name</th>
                    <th className="trainer-info-table-th">Name</th>
                    <th className="trainer-info-table-th">Role</th>
                    <th className="trainer-info-table-th">Trainer ID</th>
                    <th className="trainer-info-table-th action-column">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.trainer_workshops &&
                    data.trainer_workshops.map((request) =>
                      request.trainers
                        .filter((trainer) => trainer._id !== verifyUser.data.id)
                        .map((trainer, index) => (
                          <tr key={index}>
                            <td className="trainer-info-table-td">
                              {request.company + "_" + request.name}
                            </td>
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
                            </td>
                          </tr>
                        ))
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>Not logged in</div>
  );
};

export default TrainerViewTrainerPage;
