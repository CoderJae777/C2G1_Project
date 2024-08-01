import React, { useEffect, useState } from "react";
import "../styles/adminworkshoprequestpage.css";
import "boxicons/css/boxicons.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApproveRejectWRCalendarPopup from "./ApproveRejectWRCalendarPopup";
import ApproveWorkshopRequestPopup from "./ApproveWorkshopRequestPopup";
import RejectWorkshopRequestPopup from "./RejectWorkshopRequestPopup";
import WorkshopRequestDetailsPopup from "./WorkshopRequestDetailsPopup";
import useAxiosGet from "../api/useAxiosGet";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";
import AdminTopLeftSideBar from "../components/AdminTopLeftSideBar";

const AdminWorkshopRequestPage = () => {
  const [isCalendarPopupOpen, setIsCalendarPopupOpen] = useState(false);
  const [isApprovePopupOpen, setIsApprovePopupOpen] = useState(false);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const { data, loading, error, setUrl, setParams, refetch } = useAxiosGet(
    config.base_url + endpoints.admin.getWorkshopRequests,
    {},
    [],
    true
  );

  const nonSubmitted = useAxiosGet(
    config.base_url + endpoints.admin.getNonSubmittedWorkshopRequests,
    {},
    [],
    true
  );

  const verification = useAxiosGet(config.base_url + endpoints.verify);

  useEffect(() => {
    const lastFetchTime = localStorage.getItem("lastFetchTime");
    const currentTime = new Date().getTime();

    if (data.length > 0) {
      const latestRequestTime = new Date(data[0].createdAt).getTime();

      if (!lastFetchTime || latestRequestTime > parseInt(lastFetchTime)) {
      }

      localStorage.setItem("lastFetchTime", currentTime);
    }
  }, [data]);

  const [previousPendingCount, setPreviousPendingCount] = useState(() => {
    return parseInt(localStorage.getItem("previousPendingCount") || "0");
  });

  useEffect(() => {
    if (data && data.length > previousPendingCount) {
      toast.info(`You have ${data.length} new / total workshop requests`, {
        position: "top-right",
        autoClose: 5000,
      });
      setPreviousPendingCount(data.length);
      localStorage.setItem("previousPendingCount", data.length.toString());
    } else if (data.length < previousPendingCount) {
      setPreviousPendingCount(data.length);
      localStorage.setItem("previousPendingCount", data.length.toString());
    }
  }, [data, previousPendingCount]);

  const handleOpenCalendarPopup = () => {
    setIsCalendarPopupOpen(true);
  };

  const handleCloseCalendarPopup = () => {
    setIsCalendarPopupOpen(false);
  };

  const handleOpenApprovePopup = (selectedWorkshop) => {
    setSelectedId(selectedWorkshop._id);
    setRequestId(selectedWorkshop.request_id);
    setSelectedStartDate(selectedWorkshop.start_date);
    setSelectedEndDate(selectedWorkshop.end_date);
    setIsApprovePopupOpen(true);
  };

  const handleCloseApprovePopup = () => {
    setIsApprovePopupOpen(false);
    refetch();
    nonSubmitted.refetch();
  };

  const handleOpenRejectPopup = (selectedWorkshop) => {
    setSelectedId(selectedWorkshop._id);
    setRequestId(selectedWorkshop.request_id);
    setIsRejectPopupOpen(true);
  };

  const handleCloseRejectPopup = () => {
    setIsRejectPopupOpen(false);
    refetch();
    nonSubmitted.refetch();
  };

  const handleOpenDetailsPopup = (selectedWorkshop) => {
    setSelectedWorkshop(selectedWorkshop);
    setSelectedStartDate(selectedWorkshop.start_date);
    setSelectedEndDate(selectedWorkshop.end_date);
    setIsDetailsPopupOpen(true);
  };

  const handleCloseDetailsPopup = () => {
    setIsDetailsPopupOpen(false);
    setSelectedWorkshop(null);
    nonSubmitted.refetch();
  };

  const approvedWorkshops = nonSubmitted.data.filter((request) => request.status === "approved");

  return verification.data !== null && verification.data.role === "admin" ? (
    <div className="admin-workshop-request-page">
      <ToastContainer />
      {isApprovePopupOpen && (
        <ApproveWorkshopRequestPopup
          selectedId={selectedId}
          requestId={requestId}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          selectedWorkshop={selectedWorkshop}
          onClose={handleCloseApprovePopup}
        />
      )}
      {isRejectPopupOpen && (
        <RejectWorkshopRequestPopup
          selectedId={selectedId}
          requestId={requestId}
          onClose={handleCloseRejectPopup}
        />
      )}
      {isDetailsPopupOpen && selectedWorkshop && (
        <WorkshopRequestDetailsPopup
          workshop={selectedWorkshop}
          selectedId={selectedId}
          requestId={requestId}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          onClose={handleCloseDetailsPopup}
        />
      )}
      {isCalendarPopupOpen && (
        <ApproveRejectWRCalendarPopup
          approvedWorkshops={approvedWorkshops}
          onClose={handleCloseCalendarPopup}
        />
      )}
      <div className="top-panel">
        <AdminTopLeftSideBar hasNewRequests={true} />
      </div>
      <div className="admin-workshop-request-page-bottom-panel">
        <div className="bottom-panel-left-side">
          <div className="admin-workshop-request-page-title-left">
            <h2>Approved/Rejected Workshop Requests</h2>
            <button className="view-ar-ws-calendar-button" onClick={handleOpenCalendarPopup}>View Calendar</button>
          </div>
          <div className="manage-workshop-request-panel-outer">
            <div className="manage-workshop-request-panel">
              <table
                data-cy="ar-workshop-request-table"
                className="ar-workshop-request-table"
              >
                <thead>
                  <tr>
                    <th>Workshop Name</th>
                    <th>Workshop ID</th>
                    <th>Status</th>
                    <th className="action-column">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {nonSubmitted.data.map((request, index) => (
                    <tr key={index} className="workshop-request-box">
                      <td>{request.workshop_data.workshop_name}</td>
                      <td>{request.request_id}</td>
                      <td className={request.status === "approved" ? "status-approved" : request.status === "rejected" ? "status-rejected" : ""}>
                        {request.status}
                      </td>
                      <td>
                        <div className="workshop-request-buttons">
                          <button
                            data-cy="view-wsd-button"
                            className="view-workshop-details-button"
                            onClick={() => handleOpenDetailsPopup(request)}
                          >
                            View Details
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
        <div className="bottom-panel-right-side">
          <div className="admin-workshop-request-page-title-right">
            <h2>Pending Workshop Requests</h2>
            {/* <button className="view-p-ws-calendar-button" onClick={handleOpenCalendarPopup}>View Calendar</button> */}
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
                      <td>{request.workshop_data.workshop_name}</td>
                      <td>{request.request_id}</td>
                      <td>{request.workshop_data.workshop_type}</td>
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
    </div>
  ) : (
    <div>Unauthorized access</div>
  );
};

export default AdminWorkshopRequestPage;
