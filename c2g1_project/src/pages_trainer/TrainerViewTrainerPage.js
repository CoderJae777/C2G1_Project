import React, { useState } from "react";
import "../styles/adminhomepage.css";
import "../styles/adminmanagetrainerpage.css";
import "boxicons/css/boxicons.min.css";
import TopLeftSidebar from "../components/TrainerTopLeftSideBar";
import TrainerScheduleCalendar from "../components/ColourCalendarPopup";
import WorkshopAndClientDetails from "../components/WorkshopAndClientDetails";
import useAxiosGet from "../api/useAxiosGet";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";

const TrainerViewTrainerPage = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [isTrainerScheduleCalendarOpen, setIsTrainerScheduleCalendarOpen] =
    useState(false);
  const [selectedWorkshops, setSelectedWorkshops] = useState([]);
  const [isWorkshopAndClientDetailsOpen, setIsWorkshopAndClientDetailsOpen] = useState(false);

  const {
    data: workshopdata,
    loading: workshoploading,
    error: workshoperror,
    seturl: workshopseturl,
    setParams: workshopsetParams,
    refetch: workshoprefetch
  } = useAxiosGet(
    config.base_url + endpoints.admin.getApprovedWorkshops,
    {},
    [],
    true  
  );

  const verifyUser = useAxiosGet(config.base_url + endpoints.verify);

  const { data, loading, error, setBody, refetch } = useAxiosGet(
    config.base_url + endpoints.trainer.getTeammates,
    {},
    [],
    true
  );

  const handleOpenTrainerScheduleCalendar = (id, fullname) => {
    setSelectedId(id);
    setFullname(fullname);
    setIsTrainerScheduleCalendarOpen(true);
  };

  const handleCloseTrainerScheduleCalendar = () => {
    setIsTrainerScheduleCalendarOpen(false);
  };

  const handleOpenWorkshopAndClientDetails = (workshop) => {
    if (Array.isArray(workshop) && workshop.length > 0){
      setSelectedWorkshops(workshop);
      setIsWorkshopAndClientDetailsOpen(true);
    }
  };

  const handleCloseWorkshopAndClientDetails = () => {
    setIsWorkshopAndClientDetailsOpen(false);
  };

  // Function to combine all trainers into one array
  const combineTrainers = (workshops) => {
    return workshops.flatMap(workshop => workshop.trainers);
  };

  // Initialize allTrainers only if data.trainer_workshops is defined and is an array
  const allTrainers = data && Array.isArray(data.trainer_workshops) ? combineTrainers(data.trainer_workshops) : [];

  console.log("All trainers:");
  console.log(allTrainers);

  return verifyUser && verifyUser.data && verifyUser.data.role === "trainer" ? (
    <>
      {isWorkshopAndClientDetailsOpen && selectedWorkshops.length > 0 && (
        <WorkshopAndClientDetails onClose={handleCloseWorkshopAndClientDetails} workshops={selectedWorkshops} />
      )}
      {isTrainerScheduleCalendarOpen && (
        <TrainerScheduleCalendar 
          trainerId={selectedId}
          fullname={fullname} 
          onClose={handleCloseTrainerScheduleCalendar}
          ondateClick={handleOpenWorkshopAndClientDetails}
          trainerdata={allTrainers}
          workshopdata={workshopdata}
        />
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
                              {request.request_id}
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
                                onClick={() => handleOpenTrainerScheduleCalendar(trainer._id, trainer.fullname)}
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
