import React, { useState } from "react";
import "../styles/clienthomepage.css";
import "boxicons/css/boxicons.min.css";
import ClientTopLeftSideBar from "../components/ClientTopLeftSideBar.js";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import ClientWorkshopStatusDetailsPopup from "./ClientWorkshopStatusDetailsPopup";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import useAxiosGet from "../api/useAxiosGet.jsx";
import { config } from "../config/config.js";
import { endpoints } from "../config/endpoints.js";
import useAxiosPost from "../api/useAxiosPost.jsx";

const ClientHomePage = () => {
  const [
    isClientWorkshopStatusDetailsPopupOpen,
    setIsClientWorkshopStatusDetailsPopupOpen,
  ] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [pax, setPax] = useState("");
  const [dealPotential, setDealPotential] = useState("");
  const [country, setCountry] = useState("");
  const [workshopId, setWorkshopId] = useState("");
  const [workshopName, setWorkshopName] = useState("");
  const [companyRole, setCompanyRole] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [venue, setVenue] = useState("");
  const [workshopType, setWorkshopType] = useState("");
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const [selectedWorkshopStatus, setSelectedWorkshopStatus] = useState("");

  const [showSummary, setShowSummary] = useState(false); // State for showing summary modal

  const verification = useAxiosGet(config.base_url + endpoints.verify);

  const pendingWorkshops = useAxiosGet(
    config.base_url + endpoints.client.getPendingWorkshopRequests,
    {},
    [],
    true
  );

  // const wsnotiffobject = useAxiosGet(
  //   config.base_url + endpoints.notif.getAllAdminNotificiation,
  //   //    "localhost:5001/notif/getAllAdminNotification",
  //   {},
  //   [],
  //   false
  // );

  const handleOpenClientWorkshopStatusDetailsPopup = (request) => {
    setSelectedWorkshopStatus(request);
    setIsClientWorkshopStatusDetailsPopupOpen(true);
  };

  const handleCloseClientWorkshopStatusDetailsPopup = () => {
    setIsClientWorkshopStatusDetailsPopupOpen(false);
    setSelectedWorkshopStatus(null);
  };

  const handleRefresh = () => {
    pendingWorkshops.refetch();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show summary modal
    setShowSummary(true);
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setPhone("");
    setCompany("");
    setDealPotential("");
    setPax("");
    setCountry("");
    setWorkshopId("");
    setWorkshopName("");
    setCompanyRole("");
    setStartDate(null);
    setEndDate(null);
    setVenue("");
    setWorkshopType("");
  };

  const handleConfirmRequest = () => {
    setShowSummary(false);

    createWorkshop.setBody({
      company_role: companyRole,
      company: company,
      name: name,
      email: email,
      phone_number: phone,
      pax: pax,
      deal_potential: dealPotential,
      country: country,
      venue: venue,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      request_message: message,
      workshop_data_id: workshopId,
      client_id: verification.data.id,
    });
    createWorkshop.refetch();

    const serviceId = "service_ks4czg2";
    const templateId = "template_s99g3id";
    const publicKey = "1T7xmpr5tqQhyh-GS";
    const templateParams = {
      from_name: name,
      from_email: email,
      to_email: email,
      to_name: "DellAcademy",
      message: message,
      phone: phone,
      company_name: company,
      pax: pax,
      dealSize: dealPotential,
      country: country,
      workshopId: workshopId,
      workshopName: workshopName,
      role: companyRole,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
      venue: venue,
      workshopType: workshopType,
    };

    /////////////////////////////////////////////////////////////////
    // Commented out to not spam the email
    /////////////////////////////////////////////////////////////////

    // emailjs
    //   .send(serviceId, templateId, templateParams, publicKey)
    //   .then((response) => {
    //     console.log("Email sent successfully!", response);
    //   })
    //   .catch((error) => {
    //     console.error("Error sending email:", error);
    //   });
    setShowSummary(false);
  };

  const handleEditRequest = () => {
    // Close summary modal and allow user to continue editing
    setShowSummary(false);
  };

  const { data, loading, error, setUrl, setParams, refetch } = useAxiosGet(
    config.base_url + endpoints.client.getAvailableWorkshopData,
    {},
    [],
    true
  );

  // This function checks if a workshop is selected.
  // If so, it retrieves the corresponding workshop details from the workshops object
  // and updates the state variables workshopId, workshopName, and workshopType.
  const populateForm = () => {
    if (selectedWorkshop) {
      const selected = data[selectedWorkshop];
      setWorkshopId(selected.workshop_ID);
      setWorkshopName(selected.workshop_name);
      setWorkshopType(selected.workshop_type);
    }
    alert("Your selected workshops will be populated");
  };

  const onSuccess = (response) => {
    setShowSummary(false);
    clearForm();
    alert("Workshop request created successfully");
    pendingWorkshops.refetch();
  };

  const onError = (error) => {
    alert(
      "Error creating workshop request. Please try again. You may have keyed in an invalid email."
    );
  };

  const createWorkshop = useAxiosPost(
    config.base_url + endpoints.client.createWorkshop,
    {},
    [],
    onSuccess,
    onError
  );

  const maxDate = new Date(2025, 11, 31); // December 31, 2025

  return verification.data !== null && verification.data.role === "client" ? (
    <>
      <ClientTopLeftSideBar />
      {isClientWorkshopStatusDetailsPopupOpen && (
        <ClientWorkshopStatusDetailsPopup
          request={selectedWorkshopStatus}
          onClose={handleCloseClientWorkshopStatusDetailsPopup}
        />
      )}
      {/* Summary Modal */}
      {showSummary && (
        <div className="summary-modal">
          <div className="summary-content">
            <h2>Summary of Workshop Request</h2>
            <p>
              <strong>Workshop ID:</strong> {workshopId}
            </p>
            <p>
              <strong>Workshop Name:</strong> {workshopName}
            </p>
            <p>
              <strong>Role at Company:</strong> {companyRole}
            </p>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Phone Number:</strong> {phone}
            </p>
            <p>
              <strong>Company Name:</strong> {company}
            </p>
            <p>
              <strong>Number of Pax:</strong> {pax}
            </p>
            <p>
              <strong>Deal Size Potential:</strong> {dealPotential}
            </p>
            <p>
              <strong>Country:</strong> {country}
            </p>
            <p>
              <strong>Start Date:</strong> {startDate?.toLocaleDateString()}
            </p>
            <p>
              <strong>End Date:</strong> {endDate?.toLocaleDateString()}
            </p>
            <p>
              <strong>Venue:</strong> {venue}
            </p>
            <p>
              <strong>Workshop Type:</strong> {workshopType}
            </p>
            <p>
              <strong>Message:</strong> {message}
            </p>
            <div className="summary-buttons">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleConfirmRequest}
              >
                Confirm Request
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleEditRequest}
              >
                Edit Request
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <motion.div
        className="client-home-page"
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        transition={{ delay: 0.5 }}
      >
        {/* Left Side */}
        <div className="client-home-page-left">
          {/* Top Section */}
          <div className="client-home-page-left-top">
            <div className="view-avail-ws">
              <h4 className="ws_req_form_heading">View Available Workshops</h4>
              <div>
                <select
                  placeholder="Click to view workshops"
                  value={selectedWorkshop}
                  onChange={(e) => setSelectedWorkshop(e.target.value)}
                  className="view-avail-ws-select"
                >
                  <option value="" disabled>
                    Click to view workshops
                  </option>
                  {data.map((workshop, index) => (
                    <option key={index} value={index}>
                      {`${workshop.workshop_ID} ${workshop.workshop_name}`}
                    </option>
                  ))}
                </select>
                {selectedWorkshop && (
                  <div className="view-avail-ws-details">
                    <p>
                      <strong>Workshop ID:</strong>{" "}
                      {data[selectedWorkshop].workshop_ID}
                    </p>
                    <p>
                      <strong>Workshop Name:</strong>{" "}
                      {data[selectedWorkshop].workshop_name}
                    </p>
                    <p>
                      <strong>Workshop Type:</strong>{" "}
                      {data[selectedWorkshop].workshop_type}
                    </p>
                  </div>
                )}{" "}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="popwsreqbut"
                  onClick={populateForm}
                >
                  Populate
                </motion.button>{" "}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="refresh_button"
                  onClick={handleRefresh}
                >
                  Refresh
                </motion.button>
              </div>
            </div>
          </div>
          {/* Bottom Section */}
          <div className="client-home-page-left-bottom">
            <div className="view-req-st">
              <h4 className="ws_req_form_heading">View Request Status</h4>
              {pendingWorkshops.data.workshop_requests &&
                pendingWorkshops.data.workshop_requests.length !== 0 && (
                  <div className="scrollable-list">
                    <ul>
                      {pendingWorkshops.data.workshop_requests.map(
                        (request, index) => (
                          <div key={index}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.9 }}
                              className={`workshop-detail-panel ${
                                request.status === "submitted"
                                  ? "submitted"
                                  : request.status === "approved"
                                  ? "approved"
                                  : request.status === "rejected"
                                  ? "rejected"
                                  : ""
                              }`}
                              onClick={() =>
                                handleOpenClientWorkshopStatusDetailsPopup(
                                  request
                                )
                              }
                            >
                              <span>{request.request_id}</span>
                              <span>Status: {request.status}</span>
                            </motion.button>
                          </div>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="client-home-page-right">
          <form onSubmit={handleSubmit} className="ws_req_form_group">
            <h2 className="ws_req_form_heading">Submit Workshop Request</h2>
            <div className="ws_req_form_workshop_id">
              <input
                required
                type="text"
                placeholder="Select from dropdown to auto-populate Workshop ID"
                value={workshopId}
                onChange={(e) => setWorkshopId(e.target.value)}
                className="ws_req_form_control"
                readOnly
                title="Select from the dropdown to auto-populate this field Workshop ID"
              />
            </div>
            <div className="ws_req_form_workshop_name">
              <input
                required
                type="text"
                placeholder="Select from dropdown to auto-populate Workshop Name"
                value={workshopName}
                onChange={(e) => setWorkshopName(e.target.value)}
                className="ws_req_form_control"
                readOnly
                title="Select from the dropdown to auto-populate this field Workshop Name"
              />
            </div>
            <div className="ws_req_form_role">
              <input
                required
                type="text"
                placeholder="Role at Company"
                value={companyRole}
                onChange={(e) => setCompanyRole(e.target.value)}
                className="ws_req_form_control"
                title="Enter your role at the company"
              />
            </div>
            <div className="ws_req_form_name">
              <input
                required
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="ws_req_form_control"
                title="Enter your name"
              />
            </div>
            <div className="ws_req_form_email">
              <input
                required
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ws_req_form_control"
                title="Enter your email address"
              />
            </div>
            <div className="ws_req_form_phone">
              <input
                required
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="ws_req_form_control"
                title="Enter your phone number"
                min="0"
              />
            </div>
            <div className="ws_req_form_company">
              <input
                required
                type="text"
                placeholder="Your Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="ws_req_form_control"
                title="Enter your company name"
              />
            </div>
            <div className="ws_req_form_pax">
              <select
                required
                value={pax}
                onChange={(e) => setPax(e.target.value)}
                className="ws_req_form_control"
                title="Select the number of participants"
              >
                <option value="" disabled>
                  Select Number of Pax
                </option>
                <option value="<10">&lt;10</option>
                <option value="10-20">10 - 20</option>
                <option value="21-50">21 - 50</option>
                <option value=">50">&gt;50</option>
              </select>
            </div>
            <div className="ws_req_form_deal_size">
              <input
                required
                type="number"
                placeholder="Deal Size Potential in USD"
                value={dealPotential}
                onChange={(e) => setDealPotential(e.target.value)}
                className="ws_req_form_control"
                title="Enter the potential deal size in USD"
                min="0"
              />
            </div>
            <div className="ws_req_form_country">
              <input
                required
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="ws_req_form_control"
                title="Enter your country"
              />
            </div>
            <div className="ws_req_form_venue">
              <input
                required
                type="text"
                placeholder="Venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="ws_req_form_control"
                title="Enter the venue for the workshop"
              />
            </div>
            <div className="ws_req_form_workshop_type">
              <input
                required
                type="text"
                placeholder="Select from dropdown to auto-populate Workshop Type"
                value={workshopType}
                onChange={(e) => setWorkshopType(e.target.value)}
                className="ws_req_form_control"
                readOnly
                title="Select from the dropdown to auto-populate this field Workshop Type"
              />
            </div>
            <div className="ws_req_form_start_date">
              <DatePicker
                required
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Workshop Start Date"
                className="ws_req_form_control"
                minDate={new Date()}
                maxDate={maxDate}
                title="Select the workshop start date"
              />
            </div>
            <div className="ws_req_form_end_date">
              <DatePicker
                required
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Workshop End Date"
                className="ws_req_form_control"
                minDate={startDate || new Date()} // Ensure end date cannot be before start date
                maxDate={
                  startDate
                    ? new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000)
                    // days * hours * minutes * seconds * milliseconds = 30 days LOL
                    : maxDate
                } // Set max end date to 30 days after start date
                title="Select the workshop end date"
                disabled={!startDate} // Disable end date picker until start date is selected
              />
            </div>
            <div className="ws_req_form_message">
              <textarea
                cols="30"
                rows="10"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="ws_req_form_control"
                title="Enter any additional information"
              ></textarea>
            </div>
            <div className="ws_req_form_button">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="ws_req_submit_button"
              >
                Submit Request
              </motion.button>
              <motion.button
                type="button"
                className="clear-button-design"
                onClick={clearForm}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                Clear
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  ) : (
    <div>Not logged in</div>
  );
};

export default ClientHomePage;
