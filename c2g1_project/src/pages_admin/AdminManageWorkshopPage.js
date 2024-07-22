import React, { useState } from "react";
// import "../styles/clienthomepage.css";
import "../styles/adminmanageworkshoppage.css";
import "boxicons/css/boxicons.min.css";
import TopLeftSideBar from "../components/TopLeftSideBar.js";
import workshopData from "../old_dbs/all_workshops_db.json";
import EditWorkshopDetailsPopup from "./EditWorkshopDetailsPopup";
import useAxiosGet from "../api/useAxiosGet.jsx";
import { config } from "../config/config.js";
import { endpoints } from "../config/endpoints.js";

const AdminManageWorkshopPage = () => {
  const [isEditWorkshopDetailsPopupOpen, setIsEditWorkshopDetailsPopupOpen] =
    useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpenEditWorkshopDetailsPopup = (id) => {
    setSelectedId(id);
    setIsEditWorkshopDetailsPopupOpen(true);
  };

  const { data, loading, error, setUrl, setParams, refetch } = useAxiosGet(
    config.base_url + endpoints.admin.getWorkshopData,
    {},
    [],
  );

  const handleCloseEditWorkshopDetailsPopup = () => {
    setIsEditWorkshopDetailsPopupOpen(false);
    refetch();
  };

  return (
    <>
      <TopLeftSideBar />
      <div className="workshoppage">
        {isEditWorkshopDetailsPopupOpen && (
          <EditWorkshopDetailsPopup
            selectedId={selectedId}
            onClose={handleCloseEditWorkshopDetailsPopup}
          />
        )}
        <div className="workshoppage-1">
          {data.map((workshop) => (
            <div key={workshop.workshop_ID} className="workshop-card">
              <div className="wscard">
                <div className="wsimg">
                  {/* Replace with actual image if available, or use a placeholder */}
                  {/* <img src={`path/to/images/ws${workshop.workshop_ID}.png`} alt={workshop.workshop_name} /> */}
                </div>
                <h4>{workshop.workshop_name}</h4>
                <h5>WSID: {workshop.workshop_ID}</h5>
                <h6>{workshop.workshop_details}</h6>
                <button
                  className="edit-workshop-details-button"
                  onClick={() =>
                    handleOpenEditWorkshopDetailsPopup(workshop._id)
                  }
                >
                  Edit Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminManageWorkshopPage;
