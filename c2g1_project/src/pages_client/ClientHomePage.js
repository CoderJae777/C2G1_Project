import React, { useState } from "react";
import "../styles/clienthomepage.css";
import "boxicons/css/boxicons.min.css";
import ClientTopLeftSideBar from "../components/ClientTopLeftSideBar.js";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import useAxiosGet from "../api/useAxiosGet.jsx";
import { config } from "../config/config.js";
import { endpoints } from "../config/endpoints.js";
import useAxiosPost from "../api/useAxiosPost.jsx";

const ClientHomePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [pax, setPax] = useState("");
  const [dealSize, setDealSize] = useState("");
  const [country, setCountry] = useState("");
  const [workshopId, setWorkshopId] = useState("");
  const [workshopName, setWorkshopName] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [venue, setVenue] = useState("");
  const [workshopType, setWorkshopType] = useState("");

  const [showSummary, setShowSummary] = useState(false); // State for showing summary modal

  const { data, loading, error, setBody, refetch } = useAxiosGet(
    config.base_url + endpoints.verify
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // EmailJS service ID, template ID, and Public Key
    const serviceId = "service_ks4czg2";
    const templateId = "template_s99g3id";
    const publicKey = "1T7xmpr5tqQhyh-GS";

    // Create a new object that contains dynamic template params
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "DellAcademy",
      message: message,
      phone: phone,
      company_name: company_name,
      pax: pax,
      dealSize: dealSize,
      country: country,
      workshopId: workshopId,
      workshopName: workshopName,
      role: role,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
      venue: venue,
      workshopType: workshopType,
    };

    // Show summary modal
    setShowSummary(true);
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setPhone("");
    setCompanyName("");
    setDealSize("");
    setPax("");
    setCountry("");
    setWorkshopId("");
    setWorkshopName("");
    setRole("");
    setStartDate(null);
    setEndDate(null);
    setVenue("");
    setWorkshopType("");
  };

  const handleConfirmRequest = () => {
    createWorkshop.setBody({
      workshop_ID: workshopId,
      workshop_name: workshopName,
      start_date: startDate.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      end_date: endDate.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      availability: true,
      description: message,
      deal_potential: dealSize,
      pax: pax,
      venue: venue,
      country: country,
      workshop_type: workshopType,
      client_ID: data.id,
    });
    createWorkshop.refetch();
    // Send the email using EmailJS or any other necessary final actions
    const serviceId = "service_ks4czg2";
    const templateId = "template_s99g3id";
    const publicKey = "1T7xmpr5tqQhyh-GS";
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "DellAcademy",
      message: message,
      phone: phone,
      company_name: company_name,
      pax: pax,
      dealSize: dealSize,
      country: country,
      workshopId: workshopId,
      workshopName: workshopName,
      role: role,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
      venue: venue,
      workshopType: workshopType,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
        alert("Your Request has been sent.");
        // Clear form fields
        clearForm();
        // Close summary modal
        setShowSummary(false);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleEditRequest = () => {
    // Close summary modal and allow user to continue editing
    setShowSummary(false);
  };

  const [selectedWorkshop, setSelectedWorkshop] = useState("");

  ///////////////////////////////////////////
  // Hardcoded Data for now
  ///////////////////////////////////////////
  const workshops = {
    "Option 1": {
      workshopId: "WS01",
      workshopName: "Introduction to Python",
    },
    "Option 2": {
      workshopId: "WS02",
      workshopName: "Introduction to C",
    },
    "Option 3": {
      workshopId: "WS03",
      workshopName: "Introduction to Java",
    },
  };
  // This function checks if a workshop is selected.
  // If so, it retrieves the corresponding workshop details from the workshops object
  // and updates the state variables workshopId and workshopName.
  const populateForm = () => {
    if (selectedWorkshop) {
      const selected = workshops[selectedWorkshop];
      setWorkshopId(selected.workshopId);
      setWorkshopName(selected.workshopName);
    }
    alert(
      "The available workshop selected will be populated in the request form"
    );
  };

  const createWorkshop = useAxiosPost(
    config.base_url + endpoints.client.createWorkshop,
    {},
    []
  );

  const maxDate = new Date(2025, 11, 31); // December 31, 2025

  return data !== null && data.role === "client" ? (
    <>
      <ClientTopLeftSideBar />

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
              <strong>Role at Company:</strong> {role}
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
              <strong>Company Name:</strong> {company_name}
            </p>
            <p>
              <strong>Number of Pax:</strong> {pax}
            </p>
            <p>
              <strong>Deal Size Potential:</strong> {dealSize}
            </p>
            <p>
              <strong>Country:</strong> {country}
            </p>
            <p>
              <strong>Start Date:</strong> {startDate.toLocaleDateString()}
            </p>
            <p>
              <strong>End Date:</strong> {endDate.toLocaleDateString()}
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
                  <option value="Option 1">WS01 Introduction to Python</option>
                  <option value="Option 2">WS02 Introduction to C</option>
                  <option value="Option 3">WS03 Introduction to Java</option>
                </select>
                <p>Workshop Details to be printed here</p>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="popwsreqbut"
                  onClick={populateForm}
                >
                  Populate
                </motion.button>
              </div>
            </div>
          </div>
          {/* Bottom Section */}
          <div className="client-home-page-left-bottom">
            <div className="view-req-st">
              <h4 className="ws_req_form_heading">View Request Status</h4>
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
                placeholder="Workshop ID"
                value={workshopId}
                onChange={(e) => setWorkshopId(e.target.value)}
                className="ws_req_form_control"
              />
            </div>
            <div className="ws_req_form_workshop_name">
              <input
                required
                type="text"
                placeholder="Workshop Name"
                value={workshopName}
                onChange={(e) => setWorkshopName(e.target.value)}
                className="ws_req_form_control"
              />
            </div>
            <div className="ws_req_form_role">
              <input
                required
                type="text"
                placeholder="Role at Company"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="ws_req_form_control"
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
              />
            </div>
            <div className="ws_req_form_phone">
              <input
                required
                type="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="ws_req_form_control"
              />
            </div>
            <div className="ws_req_form_company">
              <input
                required
                type="text"
                placeholder="Your Company"
                value={company_name}
                onChange={(e) => setCompanyName(e.target.value)}
                className="ws_req_form_control"
              />
            </div>
            <div className="ws_req_form_pax">
              <input
                required
                type="number"
                placeholder="Number of Pax"
                value={pax}
                onChange={(e) => setPax(e.target.value)}
                className="ws_req_form_control"
              />
            </div>
            <div className="ws_req_form_deal_size">
              <input
                required
                type="text"
                placeholder="Deal Size Potential"
                value={dealSize}
                onChange={(e) => setDealSize(e.target.value)}
                className="ws_req_form_control"
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
              />
            </div>
            <div className="ws_req_form_workshop_type">
              <select
                required
                value={workshopType}
                onChange={(e) => setWorkshopType(e.target.value)}
                className="ws_req_form_control"
              >
                <option value="" disabled placeholder="Select Workshop Type">
                  Select Workshop Type
                </option>
                <option value="Business Value Discovery">
                  Business Value Discovery
                </option>
                <option value="AI Platform">AI Platform</option>
                <option value="Infrastructure and Demo">
                  Infrastructure and Demo
                </option>
              </select>
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
                minDate={new Date()}
                maxDate={maxDate}
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
