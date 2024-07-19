import React, { useEffect, useState } from "react";
import "../styles/adminworkshoprequestpage.css";
import "boxicons/css/boxicons.min.css";
import ApproveWorkshopRequestPopup from "./ApproveWorkshopRequestPopup";
import RejectWorkshopRequestPopup from "./RejectWorkshopRequestPopup";
import WorkshopRequestDetailsPopup from "./WorkshopRequestDetailsPopup";
import TopLeftSideBar from "../components/TopLeftSideBar";
import useAxiosGet from "../api/useAxiosGet";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminWorkshopRequestPage = () => {
  const [isApprovePopupOpen, setIsApprovePopupOpen] = useState(false);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [hasNewRequests, setHasNewRequests] = useState(false);

  const { data, loading, error, setUrl, setParams, refetch } = useAxiosGet(
    config.base_url + endpoints.admin.getWorkshopRequests,
    {},
    [],
    true
  );

  useEffect(() => {
    console.log("Data fetched:", data);
    const lastFetchTime = localStorage.getItem("lastFetchTime");
    const currentTime = new Date().getTime();
    console.log("Last Fetch Time:", lastFetchTime);
    console.log("Current Time:", currentTime);

    if (data.length > 0) {
      const latestRequestTime = new Date(data[0].createdAt).getTime();
      console.log("Latest Request Time:", latestRequestTime);

      if (!lastFetchTime || latestRequestTime > parseInt(lastFetchTime)) {
        setHasNewRequests(true);
        toast.info("You have new workshop requests!");
      }

      localStorage.setItem("lastFetchTime", currentTime);
    }
  }, [data]);

  const handleOpenApprovePopup = (selectedWorkshop) => {
    setSelectedId(selectedWorkshop._id);
    setSelectedStartDate(selectedWorkshop.start_date);
    setSelectedEndDate(selectedWorkshop.end_date);
    setIsApprovePopupOpen(true);
    setHasNewRequests(false); // Reset notification when popup is opened
  };

  const handleCloseApprovePopup = () => {
    setIsApprovePopupOpen(false);
    refetch();
  };

  const handleOpenRejectPopup = (selectedWorkshop) => {
    setSelectedId(selectedWorkshop._id);
    setIsRejectPopupOpen(true);
    setHasNewRequests(false); // Reset notification when popup is opened
  };

  const handleCloseRejectPopup = () => {
    setIsRejectPopupOpen(false);
    refetch();
  };

  const handleOpenDetailsPopup = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsDetailsPopupOpen(true);
    setHasNewRequests(false); // Reset notification when popup is opened
  };

  const handleCloseDetailsPopup = () => {
    setIsDetailsPopupOpen(false);
    setSelectedWorkshop(null);
  };

  return (
    <>
      <ToastContainer />
      <div className="admin-workshop-request-page">
        {isApprovePopupOpen && (
          <ApproveWorkshopRequestPopup
            selectedId={selectedId}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            onClose={handleCloseApprovePopup}
          />
        )}
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
          <TopLeftSideBar hasNewRequests={hasNewRequests} />
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
