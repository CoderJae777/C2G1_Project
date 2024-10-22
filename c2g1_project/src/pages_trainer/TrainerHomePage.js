import React, { useEffect } from "react";
import useFetch from "../components/useFetch.js";
import useAxiosGet from "../api/useAxiosGet.jsx";
import "boxicons/css/boxicons.min.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { config } from "../config/config.js";
import { endpoints } from "../config/endpoints.js";
import TopLeftSideBar from "../components/TrainerTopLeftSideBar.js";
import TrainerScheduleCalendar from "../components/TrainerScheduleCalendar.js";
import "../styles/trainerhomepage.css";
import {
  Area,
  AreaChart,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  Line,
  LineChart,
} from "recharts";
import useAxiosPatch from "../api/useAxiosPatch.jsx";
import UtilHrsDetailsPopup from "./UtilHrsDetailsPopup.js";

const TrainerHomePage = () => {
  // const [trainergraphsTitle, setTrainerGraphsTitle] = useState(
  //   "View Trainer statistics"
  // );
  // const [workshopgraphsTitle, setWorkshopGraphsTitle] = useState(
  //   "Workshop Completed Over the Years"
  // );

  // const [key, setKey] = useState("workshops_completed_total");
  // const [key_ws, setKeyWS] = useState("completed");

  // const [domainMax, setDomainMax] = useState(0);

  // const viewworkshop = () => {
  //   setTrainerGraphsTitle("Workshops Completed This Month per Trainer");
  //   setKey("workshops_completed_this_month");
  //   setDomainMax(20);
  // };
  // const viewongoing = () => {
  //   setTrainerGraphsTitle("Ongoing Workshops per Trainer");
  //   setKey("ongoing_workshops");
  //   setDomainMax(10);
  // };
  // const viewexperience = () => {
  //   setTrainerGraphsTitle("Trainers' Experience");
  //   setKey("experience");
  //   setDomainMax(20);
  // };
  // const resetview = () => {
  //   setTrainerGraphsTitle("View Trainer Statistics");
  //   setKey("blank");
  //   setDomainMax(0);
  // };

  // const viewtotal = () => {
  //   setTrainerGraphsTitle("Total Workshops Completed per Trainer");
  //   setKey("workshops_completed_total");
  //   setDomainMax(100);
  // };

  const [workshop, setSelectedWorkshop] = useState("");
  const [hours1, setHours1] = useState(0);
  const [hours2, setHours2] = useState(0);
  const [hours3, setHours3] = useState(0);
  const [hours4, setHours4] = useState(0);
  const [utilisation1, setUtilisation1] = useState("");
  const [utilisation2, setUtilisation2] = useState("");
  const [utilisation3, setUtilisation3] = useState("");
  const [utilisation4, setUtilisation4] = useState("");
  const [selectedUtilHrsDetails, setSelectedUtilHrsDetails] = useState("");
  const [isUtilHrsDetailsPopupOpen, setIsUtilHrsDetailsPopupOpen] =
    useState(false);

  // CALLING DATA FROM JSON
  const { trainer_data, workshop_data, today_data } = useFetch();

  const { data, loading, error, setBody, refetch } = useAxiosGet(
    config.base_url + endpoints.verify
  );

  const allocatedWorkshops = useAxiosGet(
    config.base_url + endpoints.trainer.getAllocatedWorkshopRequests
  );

  const WorkshopUtilisations = useAxiosGet(
    config.base_url + endpoints.trainer.getAllocatedWorkshopRequests
  );

  const handleOpenUtilHrsDetailsPopup = (util) => {
    setSelectedUtilHrsDetails(util);
    setIsUtilHrsDetailsPopupOpen(true);
  };

  const handleCloseUtilHrsDetailsPopup = () => {
    setIsUtilHrsDetailsPopupOpen(false);
    setSelectedUtilHrsDetails(null);
  };

  const handleRefresh = () => {
    WorkshopUtilisations.refetch();
  };

  const onSuccess = () => {
    window.location.reload();
  };
  const onError = (e) => {
    alert(e.message);
  };

  const editUtilisation = useAxiosPatch("", {}, [], onSuccess, onError);

  const getWorkshopRequest = useAxiosGet("", {}, [], false);

  useEffect(() => {
    if (workshop === "Workshop") {
      setHours1(0);
      setHours2(0);
      setHours3(0);
      setHours4(0);
      setUtilisation1("");
      setUtilisation2("");
      setUtilisation3("");
      setUtilisation4("");
    } else {
      getWorkshopRequest.setUrl(
        config.base_url + endpoints.trainer.getSingleWorkshopRequest + workshop
      );
      getWorkshopRequest.refetch();
    }
  }, [workshop]);

  useEffect(() => {
    if (getWorkshopRequest.data && getWorkshopRequest.data.utilisation) {
      setHours1(getWorkshopRequest.data.utilisation[0].hours || 0);
      setHours2(getWorkshopRequest.data.utilisation[1].hours || 0);
      setHours3(getWorkshopRequest.data.utilisation[2].hours || 0);
      setHours4(getWorkshopRequest.data.utilisation[3].hours || 0);
      setUtilisation1(
        getWorkshopRequest.data.utilisation[0].utilisation_details || ""
      );
      setUtilisation2(
        getWorkshopRequest.data.utilisation[1].utilisation_details || ""
      );
      setUtilisation3(
        getWorkshopRequest.data.utilisation[2].utilisation_details || ""
      );
      setUtilisation4(
        getWorkshopRequest.data.utilisation[3].utilisation_details || ""
      );
    }
  }, [getWorkshopRequest.data]);

  const handleSubmit = () => {
    const data = [
      { hours: parseInt(hours1), utilisation_details: utilisation1 },
      { hours: parseInt(hours2), utilisation_details: utilisation2 },
      { hours: parseInt(hours3), utilisation_details: utilisation3 },
      { hours: parseInt(hours4), utilisation_details: utilisation4 },
    ];
    editUtilisation.setBody(data);
    editUtilisation.setUrl(
      config.base_url + endpoints.trainer.updateUtilisation + workshop
    );
    editUtilisation.refetch();
  };

  return data !== null && data.role === "trainer" ? (
    <motion.div
      className="trainer-home-page"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isUtilHrsDetailsPopupOpen && (
        <UtilHrsDetailsPopup
          util={selectedUtilHrsDetails}
          onClose={handleCloseUtilHrsDetailsPopup}
        />
      )}
      <div className="top-panel">
        <TopLeftSideBar />
      </div>
      <div className="trainer-left-column">
        <div className="trainer-home-page-title"></div>

        {/* Workshop summary starts here */}
        <div className="trainer-home-pg-top-left">
          <div className="view-util-hrs">
            {/* {" "}
          <div className="workshop-table-title">
            <h4>This is today's workshops' statistics: </h4>
          </div>
          {today_data && today_data[0] ? (
            <>
              <div className="workshopstoday">
                <h2 className="today_data">
                  {today_data[0].ongoingworkshopstoday}
                </h2>
                <h5>Ongoing workshops today</h5>
              </div>
              <div className="trainersworking">
                <h2 className="today_data">{today_data[0].trainertoday}</h2>
                <h5>Trainers conducting across all workshops</h5>
              </div>
              <div className="workshopattendees">
                <h2 className="today_data">
                  {today_data[0].participantstoday}
                </h2>
                <h5>Total Participants across all workshops</h5>
              </div>
              <div className="attendancepercentage">
                <h2 className="today_data">{today_data[0].attendance}</h2>
                <h5>Attended Today</h5>
              </div>
            </>
          ) : (
            <div>Calculating all data... This may take awhile...</div>
          )} */}
            <h4>Workshop Utilisation Hours</h4>
            {WorkshopUtilisations.data.trainer_workshops &&
              WorkshopUtilisations.data.trainer_workshops.length !== 0 && (
                <div className="utilisation-scrollable-list">
                  <ul>
                    {WorkshopUtilisations.data.trainer_workshops.map(
                      (util, index) => (
                        <div key={index}>
                          <button
                            className="util-hrs-detail-panel"
                            onClick={() => handleOpenUtilHrsDetailsPopup(util)}
                          >
                            <span>{util.request_id}</span>
                            <span>
                              {util.company}
                            </span>
                            <span>
                              {util.workshop_data.workshop_name}
                            </span>
                          </button>
                        </div>
                      )
                    )}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="trainer-right-column">
        <div className="admin-graphs">
          <h1>Update Work Hours</h1>
          <select
            role="combobox"
            data-testid="workshop-select"
            id="request-workshop-sel"
            value={workshop}
            onChange={(e) => {
              setSelectedWorkshop(e.target.value);
              document.getElementById("request-workshop-sel").size = "1";
            }}
            className="form_control"
            onFocus={() => {
              document.getElementById("request-workshop-sel").size = "1";
            }}
            onBlur={() => {
              document.getElementById("request-workshop-sel").size = "1";
            }}
          >
            <option value="Workshop">-- Workshop --</option>
            {allocatedWorkshops.data.trainer_workshops ? (
              allocatedWorkshops.data.trainer_workshops.map(
                (workshop, index) => (
                  <option key={workshop._id} value={workshop._id}>
                    {workshop.request_id + " " + workshop.workshop_data.workshop_name}
                  </option>
                )
              )
            ) : (
              <option value="">No workshops found</option>
            )}
          </select>
          <h3>
            {" "}
            Please key in the breakdown on utilization hours for each workshop
          </h3>
          <div className="work_hours_row">
            <div className="work_hours_num">
              <h5>Work Hours</h5>
              <input
                className="work_hours_num_input"
                placeholder="0"
                value={hours1}
                onChange={(e) => setHours1(e.target.value)}
              />
            </div>
            <div className="work_hours_desc">
              <h5>Utilisation Details</h5>
              <textarea
                data-testid="detail-input"
                value={utilisation1}
                className="work_hours_desc_area"
                onChange={(e) => setUtilisation1(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="work_hours_row">
            <div className="work_hours_num">
              <h5>Work Hours</h5>
              <input
                className="work_hours_num_input"
                value={hours2}
                placeholder="0"
                onChange={(e) => setHours2(e.target.value)}
              />
            </div>
            <div className="work_hours_desc">
              <h5>Utilisation Details</h5>
              <textarea
                value={utilisation2}
                data-testid="detail-input"
                className="work_hours_desc_area"
                onChange={(e) => setUtilisation2(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="work_hours_row">
            <div className="work_hours_num">
              <h5>Work Hours</h5>
              <input
                className="work_hours_num_input"
                value={hours3}
                placeholder="0"
                onChange={(e) => setHours3(e.target.value)}
              />
            </div>
            <div className="work_hours_desc">
              <h5>Utilisation Details</h5>
              <textarea
                value={utilisation3}
                data-testid="detail-input"
                className="work_hours_desc_area"
                onChange={(e) => setUtilisation3(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="work_hours_row">
            <div className="work_hours_num">
              <h5>Work Hours</h5>
              <input
                className="work_hours_num_input"
                value={hours4}
                placeholder="0"
                onChange={(e) => setHours4(e.target.value)}
              />
            </div>
            <div className="work_hours_desc">
              <h5>Utilisation Details</h5>
              <textarea
              
                value={utilisation4}
                data-testid="detail-input"
                className="work_hours_desc_area"
                onChange={(e) => setUtilisation4(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="sr-submit">
            <button
              type="submit"
              className="update-hrs-button"
              onClick={handleSubmit}
            >
              Submit Utilisation
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  ) : (
    <div>Not logged in</div>
  );
};

export default TrainerHomePage;
