import React, { useEffect, useState, useRef } from "react";
import "../styles/adminworkshoprequestpagepopups.css";
import ColourCalendar from "../components/ColourCalendar.js";
import { config } from "../config/config.js";
import { endpoints } from "../config/endpoints.js";
import useAxiosGet from "../api/useAxiosGet.jsx";

const ApproveRejectWRCalendarPopup = ({ approvedWorkshops, onClose }) => {
  const popupRef = useRef(null);
  const [filterText, setFilterText] = useState("");

  const {
    data: trainerdata,
    loading: trainerloading,
    error: trainererror,
    seturl: trainerseturl,
    setParams: trainersetParams,
    refetch: trainerrefetch,
  } = useAxiosGet(config.base_url + endpoints.admin.getTrainers, {}, [], true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, onClose]);

  const handleCalendarSelect = (date) => {
    if (date === filterText) {
      setFilterText("");
    } else {
      setFilterText(date);
    }
  };

  return (
    <>
      <div className="popup-overlay popup-open"></div>
      <div
        ref={popupRef}
        className="ar-wsrq-calendar-popup open-ar-wsrq-calendar-popup"
      >
        <h2>Approved Workshop Requests</h2>
        <ColourCalendar 
            workshopdata={approvedWorkshops.filter(workshop => workshop.start_date)} // Filter out invalid data
            ondateClick={handleCalendarSelect}
            trainerdata={trainerdata}
        />
      </div>
    </>
  );
};

export default ApproveRejectWRCalendarPopup;
