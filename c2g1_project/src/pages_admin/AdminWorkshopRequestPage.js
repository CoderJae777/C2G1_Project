import React, { useState } from "react";
import "../styles/adminhomepage.css";
import "../styles/adminworkshoprequestpage.css";
import "boxicons/css/boxicons.min.css";
import ApproveWorkshopRequestPopup from "./ApproveWorkshopRequestPopup";
import RejectWorkshopRequestPopup from "./RejectWorkshopRequestPopup";
import AllocateTrainerPopup from "./AllocateTrainerPopup";
import WorkshopRequestDetailsPopup from "./WorkshopRequestDetailsPopup";
import TopLeftSideBar from "../components/TopLeftSideBar";

const workshop_request_data = [
  {
    "workshopId": "005379",
    "workshopName": "Intro to Excel",
    "workshopType": "Infrastructure and demo",
    "company_name": "DancingLion",
    "client_type": "Executive",
    "startDate": "31/02/2025",
    "endDate": "31/02/2025",
    "dealSize": "$3500",
    "location": "Singapore",
    "venue": "Istana",
    "pax": "17",
    "message": "Count to fifty in the blink of an eye."
  },
  {
    "workshopId": "002513",
    "workshopName": "Biased Cognition",
    "workshopType": "Business value discovery",
    "company_name": "WindsOfUranus",
    "client_type": "Technical",
    "startDate": "18/05/2025",
    "endDate": "22/05/2025",
    "dealSize": "$47000",
    "location": "Singapore",
    "venue": "East Coast Park",
    "pax": "13",
    "message": "Don't use the saw, he got the wrong thing."
  },
  {
    "workshopId": "001478",
    "workshopName": "Intro to Computers",
    "workshopType": "Business value discovery",
    "company_name": "UngaBunga",
    "client_type": "Technical",
    "startDate": "18/05/2025",
    "endDate": "23/05/2025",
    "dealSize": "$47000",
    "location": "Singapore",
    "venue": "East Coast Park",
    "pax": "4",
    "message": "Inside my mind, there is a digital mind."
  },
  {
    "workshopId": "006085",
    "workshopName": "Creative AI",
    "workshopType": "AI platform",
    "company_name": "DramaticExit",
    "client_type": "Technical",
    "startDate": "22/11/2025",
    "endDate": "24/11/2025",
    "dealSize": "$678000",
    "location": "Singapore",
    "venue": "SUTD",
    "pax": "60",
    "message": "This table is not very good for glamping. HI HIH HI HIH HI HIH I HI HI HI HI HI HI HI H IHI HI H IH IH IH IH IH IH IH IH IH IH IH IH IH IH I HI HI HI H HI H."
  }
];

const AdminWorkshopRequestPage = () => {
  const [isApprovePopupOpen, setIsApprovePopupOpen] = useState(false);
  const [isAllocatePopupOpen, setIsAllocatePopupOpen] = useState(false);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

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

  const handleOpenDetailsPopup = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsDetailsPopupOpen(true);
  };

  const handleCloseDetailsPopup = () => {
    setIsDetailsPopupOpen(false);
    setSelectedWorkshop(null);
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
        {isDetailsPopupOpen && selectedWorkshop && (
          <WorkshopRequestDetailsPopup
            workshop={selectedWorkshop}
            onClose={handleCloseDetailsPopup}
          />
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
          <div className="workshop-request-list">
            <table className="workshop-request-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Workshop ID</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workshop_request_data.map((request, index) => (
                  <tr key={index} className="workshop-request-box">
                    <td>{request.workshopName}</td>
                    <td>{request.workshopId}</td>
                    <td>{request.workshopType}</td>
                    <td>
                      <div className="workshop-request-buttons">
                        <button
                          className="view-workshop-details-button"
                          onClick={() => handleOpenDetailsPopup(request)}
                        >
                          View Details
                        </button>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminWorkshopRequestPage;
