import React, { useState } from "react";
import "../styles/wsreqform.css";
import DatePicker from "react-datepicker";


const SubmitWSReqForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [attendees, setAttendees] = useState("0");
  const [wsname, setWsname] = useState("null");
  const [comments, setComments] = useState("null");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
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
    setComments("null");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="ws_req_form_group">
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
      <div className="ws_req_form_group">
        <label className="label" htmlFor="name">
          Username *
        </label>
        <input
          className="ws_req_form_control"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="ws_req_form_group">
        <label className="label" htmlFor="email">
          Email *
        </label>
        <input
          className="ws_req_form_control"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="ws_req_form_group">
        <label className="label" htmlFor="phone">
          Phone
        </label>
        <input
          className="ws_req_form_control"
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="ws_req_form_group">
        <label className="label" htmlFor="company">
          Company
        </label>
        <input
          className="ws_req_form_control"
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
      </div>
      <div className="ws_req_form_group">
        <label className="label" htmlFor="company">
          Number of Attendees
        </label>
        <input
          className="ws_req_form_control"
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
      </div>
      <div className="ws_req_form_group">
        <label className="label" htmlFor="message">
          Message *
        </label>
        <textarea
          className="ws_req_form_control"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <div className="ws_req_form_group">
        <button type="submit" className="ws_req_signin_button">
          Send Message
        </button>
      </div>
    </form>
  );
};

export default SubmitWSReqForm;

{
  /* <div className="sr-datepicker">
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
            </div> */
}
