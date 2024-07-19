import React, { useState } from "react";
// import "../styles/adminhomepage.css";
import "../styles/adminworkshoprequestpage.css";
import "boxicons/css/boxicons.min.css";
import ApproveWorkshopRequestPopup from "./ApproveWorkshopRequestPopup";
import RejectWorkshopRequestPopup from "./RejectWorkshopRequestPopup";
import WorkshopRequestDetailsPopup from "./WorkshopRequestDetailsPopup";
import TopLeftSideBar from "../components/TopLeftSideBar";
import useAxiosGet from "../api/useAxiosGet";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";

const AdminWorkshopRequestPage = () => {
  const [isApprovePopupOpen, setIsApprovePopupOpen] = useState(false);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const { data, loading, error, setUrl, setParams, refetch } = useAxiosGet(
    config.base_url + endpoints.admin.getWorkshopRequests,
    {},
    [],
    true
  );

  const handleOpenApprovePopup = (selectedWorkshop) => {
    setSelectedId(selectedWorkshop._id);
    setSelectedStartDate(selectedWorkshop.start_date);
    setSelectedEndDate(selectedWorkshop.end_date);
    setIsApprovePopupOpen(true);
  };

  const handleCloseApprovePopup = () => {
    setIsApprovePopupOpen(false);
    refetch();
  };

  const handleOpenRejectPopup = (selectedWorkshop) => {
    setSelectedId(selectedWorkshop._id);
    setIsRejectPopupOpen(true);
  };

  const handleCloseRejectPopup = () => {
    setIsRejectPopupOpen(false);
    refetch();
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
          <ApproveWorkshopRequestPopup
            selectedId={selectedId}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            onClose={handleCloseApprovePopup}
          />
        )}
        {/* {isAllocatePopupOpen && (
          <AllocateTrainerPopup onClose={handleCloseAllocatePopup} />
        )} */}
        {isRejectPopupOpen && (
          <RejectWorkshopRequestPopup
            selectedId={selectedId}
            onClose={handleCloseRejectPopup}
          />
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
        <div className="admin-workshop-request-page-bottom-panel">
          <div className="admin-workshop-request-page-title">
            <h2>Workshop Requests</h2>
          </div>
          <div className="manage-workshop-request-panel-outer">
            <div className="manage-workshop-request-panel">
              <table
                data-cy="workshop-request-table"
                className="workshop-request-table"
              >
                <thead>
                  <tr>
                    <th>Workshop Name</th>
                    <th>Workshop ID</th>
                    <th>Type</th>
                    <th className="action-column">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((request, index) => (
                    <tr key={index} className="workshop-request-box">
                      <td>{request.workshop_name}</td>
                      <td>{request.workshop_ID}</td>
                      <td>{request.workshop_type}</td>
                      <td>
                        <div className="workshop-request-buttons">
                          <button
                            data-cy="view-wsd-button"
                            className="view-workshop-details-button"
                            onClick={() => handleOpenDetailsPopup(request)}
                          >
                            View Details
                          </button>
                          <button
                            data-cy="approve-wsrq-button"
                            className="approve-workshop-request-button"
                            onClick={() => handleOpenApprovePopup(request)}
                          >
                            Approve
                          </button>
                          {/* <button
                            data-cy="allocate-trainer-button"
                            className="allocate-trainer-to-workshop-button"
                            onClick={handleOpenAllocatePopup}
                          >
                            Allocate Trainer
                          </button> */}
                          <button
                            data-cy="reject-wsrq-button"
                            className="reject-workshop-request-button"
                            onClick={() => handleOpenRejectPopup(request)}
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
      </div>
    </>
  );
};

export default AdminWorkshopRequestPage;
