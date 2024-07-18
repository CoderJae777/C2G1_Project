import React from "react";
import PropTypes from "prop-types";
import "../styles/adminmanagetrainerspagepopup.css";
import "boxicons/css/boxicons.min.css";
import useAxiosDelete from "../api/useAxiosDelete";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";

const DeleteTrainerPopup = ({ onClose, trainerId }) => {
  const handleSuccess = () => {
    alert("Trainer deleted successfully.");
    onClose();
  };

  const handleError = () => {
    alert("Error deleting trainer, please contact the administrator.");
  };

  const { setUrl, refetch } = useAxiosDelete(handleSuccess, handleError);

  const handleDelete = () => {
    console.log("Deleting Trainer:", trainerId);
    setUrl(`${config.base_url}${endpoints.admin.deleteTrainer}/${trainerId}`);
    refetch();
  };

  return (
    <div data-cy="trainer-activity-popup" className="trainer-activity-popup open-trainer-activity-popup">
      <h2>Delete Trainer</h2>
      <p>Are you sure you want to delete this trainer?</p>
      <div className="popup-buttons">
        <button
          data-cy="confirm-delete-trainer-button"
          className="delete-button"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          data-cy="delete-trainer-cancel-button"
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

export default DeleteTrainerPopup;
