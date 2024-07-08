import React, { useState } from "react";
import "./styles/clienthomepage.css";
import { useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import ClientTopLeftSideBar from "./components/ClientTopLeftSideBar.js";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker CSS

const ClientHomePage = () => {
  const [year, yearchange] = useState("");
  const [month, monthchange] = useState("");
  const [day, daychange] = useState("");
  const [workshop, workshopchange] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [attendees, setAttendees] = useState("0");
  const [wsname, setWsname] = useState("null");
  const [comments, setComments] = useState("null");

  // This is to ensure all booking are within today and last day of 2024
  const minDate = new Date();
  const maxDate = new Date("2024-12-31");

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleresetreq = () => {
    setEndDate(null);
    setStartDate(null);
    setAttendees("0");
    setWsname("null");
    setComments("null")
  }

  return (
    <>
      <div className="left-panel">
        <ClientTopLeftSideBar />
      </div>
      <motion.div
        className="client-home-page"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="client-home-page-left">
          <div className="find-ws">
            <h3>Available Workshops</h3>
            <select
              id="request-workshop-sel"
              value={workshop}
              onChange={(e) => {
                workshopchange(e.target.value);
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
              <option value="Workshop A">Workshop A</option>
              <option value="Workshop B"> Workshop B</option>
            </select>
            <h3>Workshop details : </h3>
            <h4>Status</h4>
            <h4>{workshop}</h4>
            <h4>Workshop Capacity</h4>
            <h4>Workshop Venue</h4>
            <h4>Number of Trainers Provided</h4>
            <h4>Price</h4>
          </div>
        </div>
        <div className="client-home-page-right">
          <div className="view-request">
            <h3>View Workshop Requests</h3>
          </div>
        </div>
        <div className="client-home-page-footer">
          <div className="submit-requests">
            <div className="sr-title">
              <h3>Submit Workshop Requests</h3>
            </div>
            <div className="sr-datepicker">
              <div className="startdate">
                <h4>Workshop start date and time </h4>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  dateFormat="dd/MM/yyyy hh:mm"
                  minDate={minDate}
                  maxDate={maxDate}
                  showTimeSelect
                  timeIntervals={30}
                  timeFormat="hh:mm"
                />{" "}
              </div>
              <div className="enddate">
                {" "}
                <h4>Workshop end date and time </h4>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="dd/MM/yyyy hh:mm"
                  minDate={minDate}
                  maxDate={maxDate}
                  showTimeSelect
                  timeIntervals={30}
                  timeFormat="hh:mm"
                />
              </div>
            </div>
            <div className="sr-workshop-deets">
              <div>
                <label> Number of attendees</label>
                <textarea
                  className="workshop_request_field"
                  value={attendees}
                  onChange={(e) => setAttendees(e.target.value)}
                />
              </div>
              <div>
                <label>Workshop name/ ID</label>
                <textarea
                  className="workshop_request_field"
                  value={wsname}
                  onChange={(e) => setWsname(e.target.value)}
                />
              </div>
            </div>
            <div className="sr-comments">
              <div>
                <label>Comments / Resources Required</label>
                <textarea
                  className="reject-reason-input"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
            </div>
            <div className="sr-summary">
              <div className="fields">
                <h4>Checkout Summary</h4>
                <h4 className="green-text">Start Date:</h4>
                <h4 className="red-text">End Date:</h4>
                <h4>Number of attendees:</h4>
                <h4>Workshop ID/ Name:</h4>
                <h4>Additional Requests:</h4>
              </div>
              <div className="output">
                <h4>-----</h4>
                <h4 className="green-text">
                  {startDate ? startDate.toLocaleString() : "N/A"}
                </h4>
                <h4 className="red-text">
                  {endDate ? endDate.toLocaleString() : "N/A"}
                </h4>
                <h4>{attendees}</h4>
                <h4>{wsname}</h4>
                <h4>{comments}</h4>
              </div>
            </div>
            <div className="sr-submit">
              <button type="submit" className="submit-req-button">
                Submit Request
              </button>
              <button type="submit" className="clear-req-button" onClick={handleresetreq}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ClientHomePage;
