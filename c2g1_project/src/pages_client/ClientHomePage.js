import React, { useState } from "react";
import "../styles/clienthomepage.css";
import { useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import ClientTopLeftSideBar from "../components/ClientTopLeftSideBar.js";
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker CSS
import emailjs from "@emailjs/browser";

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

    // Send the email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
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
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };
  return (
    <>
      <ClientTopLeftSideBar />

      {/* LAYER 1 */}
      <div className="client-home-page">
        {/* LAYER 2 LEFT */}
        <div className="client-home-page-left">
          {/* LAYER 3 TOP */}
          <div className="client-home-page-left-top">
            <div className="view-avail-ws">
              <h4>View Available Workshops</h4>
            </div>
          </div>
          {/* LAYER 3 BOTTOM */}
          <div className="client-home-page-left-bottom">
            <div className="view-req-st">
              <h4>view Request Status</h4>
            </div>
          </div>
        </div>
        {/* LAYER 2 RIGHT */}
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
      </div>
    </>
  );
};

export default ClientHomePage;
