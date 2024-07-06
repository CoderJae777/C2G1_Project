import React, { useState } from "react";
import "./styles/adminhomepage.css";
import "./styles//adminworkshoprequestpage.css";
import "boxicons/css/boxicons.min.css";
import dellacademylogo from "./images/DellAcademy.png";
import userprofilepic from "./images/userprofilepic.png";
import DateAndTime from "./DateAndTime";
import ApproveWorkshopRequestPopup from "./ApproveWorkshopRequestPopup";
import RejectWorkshopRequestPopup from "./RejectWorkshopRequestPopup";
import AllocateTrainerPopup from "./AllocateTrainerPopup";
import TopLeftSideBar from "./components/TopLeftSideBar";
import Navbar from "./components/NavBar";

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
        <div className="left-panel">
          <TopLeftSideBar />
          {/* <h2>WorkShop Requests</h2> */}
        </div>
        <div className="admin-workshop-request-page-right-panel">
          <div className="header-container">
            <div className="admin-workshop-request-page-title">
              <h4>Workshop Requests</h4>
            </div>
            <div className="workshop-request-datetime">
              <DateAndTime />
            </div>
          </div>
          <div className="workshop-request-column">
            {[
              "Workshop request 1",
              "Workshop request 2",
              "Workshop request 3",
              "Workshop request 4",
            ].map((request, index) => (
              <div key={index} className="workshop-request-panel">
                {request}
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
