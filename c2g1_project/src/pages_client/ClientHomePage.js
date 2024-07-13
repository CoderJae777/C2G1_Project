import React, { useState } from "react";
import "../styles/clienthomepage.css";
import { useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import ClientTopLeftSideBar from "../components/ClientTopLeftSideBar.js";
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker CSS
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const ClientHomePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [pax, setPax] = useState("");
  const [dealSize, setDealSize] = useState("");
  const [location, setLocation] = useState("");
  const [workshopId, setWorkshopId] = useState("");
  const [workshopName, setWorkshopName] = useState("");
  const [role, setRole] = useState("");

  const [showSummary, setShowSummary] = useState(false); // State for showing summary modal

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
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
      location: location,
      workshopId: workshopId,
      workshopName: workshopName,
      role: role,
    };

    // Show summary modal
    setShowSummary(true);

    // You can optionally remove the actual sending code from handleSubmit
    // and move it to a function that confirms the submission upon user confirmation.
    // This is to simulate the behavior you requested where the user confirms before submitting.
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setPhone("");
    setCompanyName("");
    setDealSize("");
    setPax("");
    setLocation("");
    setWorkshopId("");
    setWorkshopName("");
    setRole("");
  };

  const handleConfirmRequest = () => {
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
      location: location,
      workshopId: workshopId,
      workshopName: workshopName,
      role: role,
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

  return (
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
              <strong>Location:</strong> {location}
            </p>
            <p>
              <strong>Message:</strong> {message}
            </p>
            <div className="summary-buttons">
              <button onClick={handleConfirmRequest}>Confirm Request</button>
              <button onClick={handleEditRequest}>Edit Request</button>
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
                type="text"
                placeholder="Workshop ID"
                value={workshopId}
                onChange={(e) => setWorkshopId(e.target.value)}
                className="ws_req_form_control"
              />
            </div>
            <div className="ws_req_form_workshop_name">
              <input
                type="text"
                placeholder="Workshop Name"
                value={workshopName}
                onChange={(e) => setWorkshopName(e.target.value)}
                className="ws_req_form_control"
              />
            </div>
            <div className="ws_req_form_role">
              <input
                type="text"
                placeholder="Role at Company"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="ws_req_form_control"
              />
            </div>
            <div className="ws_req_form_name">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="ws_req_form_control"
              />
            </div>
            <div className="ws_req_form_email">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ws_req_form_control"
              />
            </div>
            <div className="ws_req_form_phone">
              <input
                type="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="ws_req_form_control"
              />
            </div>
            <div className="ws_req_form_company">
              <input
                type="text"
                placeholder="Your Company"
                value={company_name}
                onChange={(e) => setCompanyName(e.target.value)}
                className="ws_req_form_control"
              />
            </div>
            <div className="ws_req_form_pax">
              <input
                type="number"
                placeholder="Number of Pax"
                value={pax}
                onChange={(e) => setPax(e.target.value)}
                className="ws_req_form_control"
              />
            </div>
            <div className="ws_req_form_deal_size">
              <input
                type="text"
                placeholder="Deal Size Potential"
                value={dealSize}
                onChange={(e) => setDealSize(e.target.value)}
                className="ws_req_form_control"
              />
            </div>
            <div className="ws_req_form_location">
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="ws_req_form_control"
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
              <button type="submit" className="ws_req_submit_button">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default ClientHomePage;
