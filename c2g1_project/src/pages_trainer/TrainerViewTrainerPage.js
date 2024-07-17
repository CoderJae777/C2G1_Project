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

const ListOfTrainers = [
  {
      "blank": "",
      "trainer_ID": "T01",
      "name": "Jack",
      "gender": "male",
      "experience": 5,
      "trainer_role": "Training Lead",
      "availability": "Available",
      "activity": "Active",
      "workshops_completed_this_month": 3,
      "ongoing_workshops": 3,
      "workshops_completed_total": 50
  },
  {
      "blank": "",
      "trainer_ID": "T02",
      "name": "Emily",
      "gender": "female",
      "experience": 8,
      "trainer_role": "Training Assistant",
      "availability": "Available",
      "activity": "Inactive",
      "workshops_completed_this_month": 1,
      "ongoing_workshops": 2,
      "workshops_completed_total": 49
  },
  {
      "blank": "",
      "trainer_ID": "T04",
      "name": "Sophia",
      "gender": "female",
      "experience": 3,
      "trainer_role": "Training Lead",
      "availability": "Unavailable",
      "activity": "Inactive",
      "workshops_completed_this_month": 0,
      "ongoing_workshops": 5,
      "workshops_completed_total": 72
  },
  {
      "blank": "",
      "trainer_ID": "T05",
      "name": "Michael",
      "gender": "male",
      "experience": 6,
      "trainer_role": "Training Assistant",
      "availability": "Available",
      "activity": "Active",
      "workshops_completed_this_month": 2,
      "ongoing_workshops": 2,
      "workshops_completed_total": 36
  }
]

const AdminManageTrainerPage = () => {
  // const [isTrainerDetailsPopupOpen, setIsTrainerDetailsPopupOpen] =
  //   useState(false);
  // const [isTrainerActivityPopupOpen, setIsTrainerActivityPopupOpen] =
  //   useState(false);
  // const [isAddTrainerPopupOpen, setIsAddTrainerPopupOpen] = useState(false);
  const [isTrainerScheduleCalendarOpen, setIsTrainerScheduleCalendarOpen] =
    useState(false);
  // const [popupIndex, setPopupIndex] = useState(null);
  // const [selectedId, setSelectedId] = useState(null);
  // const [availability, setAvailability] = useState(null);

  // var trainer_data = [];
  // const { data, loading, error, seturl, setParams, refetch } = useAxiosGet(
  //   config.base_url + endpoints.admin.getTrainers,
  //   {},
  //   [],
  //   true
  // );
  // try {
  //   trainer_data = data.trainers;
  // } catch (error) {}

  // const handleOpenTrainerDetailsPopup = (id) => {
  //   setSelectedId(id);
  //   setIsTrainerDetailsPopupOpen(true);
  // };

  // const handleCloseTrainerDetailsPopup = () => {
  //   refetch();
  //   setIsTrainerDetailsPopupOpen(false);
  // };

  // const handleOpenTrainerActivityPopup = (index, id, availability) => {
  //   setIsTrainerActivityPopupOpen(true);
  //   setPopupIndex(index);
  //   setAvailability(availability);
  //   setSelectedId(id);
  // };

  // const handleCloseTrainerActivityPopup = () => {
  //   refetch();
  //   setIsTrainerActivityPopupOpen(false);
  // };

  // const handleActivityChange = (selectedActivity, index) => {
  //   const updatedTrainers = [...trainer_data.trainers];
  //   updatedTrainers[index].activity = selectedActivity;
  //   Assuming you would update the state with the new trainers data.
  //   You might need a separate state to manage the activity if you don't want to mutate fetched data directly.
  //   setTrainers(updatedTrainers);
  // };

  // const handleOpenAddTrainerPopup = () => {
  //   setIsAddTrainerPopupOpen(true);
  // };

  // const handleCloseAddTrainerPopup = () => {
  //   refetch();
  //   setIsAddTrainerPopupOpen(false);
  // };

  const handleOpenTrainerScheduleCalendar = () => {
    setIsTrainerScheduleCalendarOpen(true);
  };

  const handleCloseTrainerScheduleCalendar = () => {
    setIsTrainerScheduleCalendarOpen(false);
  };

  return ListOfTrainers.length > 0 ? (

    <>
      {/* {isTrainerDetailsPopupOpen && (
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
      )} */}
      {/* {isAddTrainerPopupOpen && (
        <AddTrainerPopup onClose={handleCloseAddTrainerPopup} />
      )} */}
      <div className="admin-manage-trainer-page">
        {isTrainerScheduleCalendarOpen && (
          <TrainerScheduleCalendar onClose={handleCloseTrainerScheduleCalendar} />
        )}
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
                    <th className="trainer-info-table-th">Availability</th>
                    <th className="trainer-info-table-th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ListOfTrainers.map((trainer, index) => (
                    <tr key={index}>
                      <td className="trainer-info-table-td">
                        {trainer.name}
                      </td>
                      <td className="trainer-info-table-td">
                        {trainer.trainer_ID}
                      </td>
                      <td className="trainer-info-table-td">
                        {trainer.trainer_role}
                      </td>
                      <td className="trainer-info-table-td">
                        {trainer.availability}
                      </td>
                      <td className="trainer-info-table-td">
                        <button
                          className="trainer-info-table-button"
                          onClick={handleOpenTrainerScheduleCalendar}
                        >
                          View Schedule
                        </button>
                        {/* <button
                          className="trainer-info-table-button"
                        >
                          {trainer.availability}
                        </button> */}
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
  ) :
  (
    <div>Calculating all data... This may take awhile...</div>
  );
};

export default AdminManageTrainerPage;
