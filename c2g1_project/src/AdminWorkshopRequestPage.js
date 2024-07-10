import React, { useState } from "react";
import "./styles/adminhomepage.css";
import "./styles/adminworkshoprequestpage.css";
import "boxicons/css/boxicons.min.css";
import ApproveWorkshopRequestPopup from "./ApproveWorkshopRequestPopup";
import RejectWorkshopRequestPopup from "./RejectWorkshopRequestPopup";
import AllocateTrainerPopup from "./AllocateTrainerPopup";
import TopLeftSideBar from "./components/TopLeftSideBar";

const workshop_request_data = [
  {
    workshop_request_ID: "005379",
    workshop_name: "Intro to Excel",
    workshop_type: "Infrastructure and demo",
    client_company: "DancingLion",
    client_type: "Executive",
    duration: "3 days",
    start_date: "31/02/2025",
    deal_size: "$3500",
    location: "Singapore",
    venue: "Istana",
    attendees: "17",
    comments: "Count to fifty in the blink of an eye."
  },
  {
    workshop_request_ID: "002513",
    workshop_name: "Biased Cognition",
    workshop_type: "Business value discovery",
    client_company: "WindsOfUranus",
    client_type: "Technical",
    duration: "4 days",
    start_date: "18/05/2025",
    deal_size: "$47000",
    location: "Singapore",
    venue: "East Coast Park",
    attendees: "13",
    comments: "Don't use the saw, he got the wrong thing."
  },
  {
    workshop_request_ID: "001478",
    workshop_name: "Intro to Computers",
    workshop_type: "Business value discovery",
    client_company: "UngaBunga",
    client_type: "Technical",
    duration: "4 days",
    start_date: "18/05/2025",
    deal_size: "$47000",
    location: "Singapore",
    venue: "East Coast Park",
    attendees: "4",
    comments: "Inside my mind, there is a digital mind."
  },
  {
    workshop_request_ID: "006085",
    workshop_name: "Creative AI",
    workshop_type: "AI platform",
    client_company: "DramaticExit",
    client_type: "Technical",
    duration: "2 days",
    start_date: "22/11/2025",
    deal_size: "$678000",
    location: "Singapore",
    venue: "SUTD",
    attendees: "60",
    comments: "This table is not very good for glamping. HI HIH HI HIH HI HIH I HI HI HI HI HI HI HI H IHI HI H IH IH IH IH IH IH IH IH IH IH IH IH IH IH I HI HI HI H HI H."
  }
];

const AdminWorkshopRequestPage = () => {
  const [isApprovePopupOpen, setIsApprovePopupOpen] = useState(false);
  const [isAllocatePopupOpen, setIsAllocatePopupOpen] = useState(false);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);

  const handleOpenApprovePopup = () => {
    setIsApprovePopupOpen(true);
  };

  const handleCloseApprovePopup = () => {
    setIsApprovePopupOpen(false);
  };

  const handleOpenAllocatePopup = () => {
    setIsAllocatePopupOpen(true);
  };

  const handleCloseAllocatePopup = () => {
    setIsAllocatePopupOpen(false);
  };

  const handleOpenRejectPopup = () => {
    setIsRejectPopupOpen(true);
  };

  const handleCloseRejectPopup = () => {
    setIsRejectPopupOpen(false);
  };

  return (
    <>
      <div className="admin-workshop-request-page">
        {isApprovePopupOpen && (
          <ApproveWorkshopRequestPopup onClose={handleCloseApprovePopup} />
        )}
        {isAllocatePopupOpen && (
          <AllocateTrainerPopup onClose={handleCloseAllocatePopup} />
        )}
        {isRejectPopupOpen && (
          <RejectWorkshopRequestPopup onClose={handleCloseRejectPopup} />
        )}
        <div className="top-panel">
          <TopLeftSideBar />
        </div>
        <div className="admin-workshop-request-page-right-panel">
          <div className="header-container">
            <div className="admin-workshop-request-page-title">
              <h2>Workshop Requests</h2>
            </div>
          </div>
          <div className="workshop-request-column">
            {workshop_request_data.map((request, index) => (
              <div key={index} className="workshop-request-panel">
                <div className="workshop-request-details">
                  <div className="workshop-request-table">
                    <div className="workshop-request-table-row">
                      <div className="workshop-request-table-cell"><strong>Workshop ID:</strong></div>
                      <div className="workshop-request-table-cell">{request.workshop_request_ID}</div>
                    </div>
                    <div className="workshop-request-table-row">
                      <div className="workshop-request-table-cell"><strong>Name:</strong></div>
                      <div className="workshop-request-table-cell">{request.workshop_name}</div>
                    </div>
                    <div className="workshop-request-table-row">
                      <div className="workshop-request-table-cell"><strong>Type:</strong></div>
                      <div className="workshop-request-table-cell">{request.workshop_type}</div>
                    </div>
                    <div className="workshop-request-table-row">
                      <div className="workshop-request-table-cell"><strong>Client Company:</strong></div>
                      <div className="workshop-request-table-cell">{request.client_company}</div>
                    </div>
                    <div className="workshop-request-table-row">
                      <div className="workshop-request-table-cell"><strong>Client Type:</strong></div>
                      <div className="workshop-request-table-cell">{request.client_type}</div>
                    </div>
                    <div className="workshop-request-table-row">
                      <div className="workshop-request-table-cell"><strong>Duration:</strong></div>
                      <div className="workshop-request-table-cell">{request.duration}</div>
                    </div>
                    <div className="workshop-request-table-row">
                      <div className="workshop-request-table-cell"><strong>Start Date:</strong></div>
                      <div className="workshop-request-table-cell">{request.start_date}</div>
                    </div>
                    <div className="workshop-request-table-row">
                      <div className="workshop-request-table-cell"><strong>Deal Size:</strong></div>
                      <div className="workshop-request-table-cell">{request.deal_size}</div>
                    </div>
                    <div className="workshop-request-table-row">
                      <div className="workshop-request-table-cell"><strong>Location:</strong></div>
                      <div className="workshop-request-table-cell">{request.location}</div>
                    </div>
                    <div className="workshop-request-table-row">
                      <div className="workshop-request-table-cell"><strong>Venue:</strong></div>
                      <div className="workshop-request-table-cell">{request.venue}</div>
                    </div>
                    <div className="workshop-request-table-row">
                      <div className="workshop-request-table-cell"><strong>Attendees:</strong></div>
                      <div className="workshop-request-table-cell">{request.attendees}</div>
                    </div>
                    <div className="workshop-request-table-row">
                      <div className="workshop-request-table-cell"><strong>Comments:</strong></div>
                      <div className="workshop-request-table-cell">{request.comments}</div>
                    </div>
                  </div>
                </div>
                <div className="workshop-request-buttons">
                  <button
                    className="accept-workshop-request-button"
                    onClick={handleOpenApprovePopup}
                  >
                    Approve
                  </button>
                  <button
                    className="allocate-trainer-to-workshop-button"
                    onClick={handleOpenAllocatePopup}
                  >
                    Allocate Trainer
                  </button>
                  <button
                    className="reject-workshop-request-button"
                    onClick={handleOpenRejectPopup}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminWorkshopRequestPage;
