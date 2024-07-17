import React, { useState } from "react";
import "../styles/adminworkshoprequestpagepopups.css";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";
import useAxiosPatch from "../api/useAxiosPatch";

const RejectWorkshopRequestPopup = ({ selectedId, onClose }) => {
  const [rejectReason, setRejectReason] = useState("");

  const handleReasonChange = (event) => {
    setRejectReason(event.target.value);
  };

  const handleSubmit = () => {
    setBody({
      rejectReason: rejectReason,
    });
    refetch();
  };

  const handleSuccess = () => {
    onClose();
  };

  const handleError = (error) => {};

  const { data, loading, error, setBody, refetch } = useAxiosPatch(
    config.base_url + endpoints.admin.rejectWorkshopRequest + selectedId,
    {},
    [],
    handleSuccess,
    handleError
  );

  return (
    <div
      data-cy="reject-wsrq-popup"
      className="reject-workshop-request-popup open-reject-workshop-request-popup"
    >
      <h2>Reject Workshop</h2>
      <p>Please provide a reason for rejecting the workshop request.</p>
      <textarea
        className="reject-reason-input"
        value={rejectReason}
        onChange={handleReasonChange}
        placeholder=" Enter reason here"
      />
      <div className="popup-buttons">
        <button className="submit-button" type="button" onClick={handleSubmit}>
          Submit
        </button>
        <button
          data-cy="reject-wsrq-cancel-button"
          className="cancel-button"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RejectWorkshopRequestPopup;
