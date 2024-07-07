import React, { useState } from 'react';
import "./styles/adminhomepage.css";
import './styles/adminmanagetrainerpage.css';
import 'boxicons/css/boxicons.min.css';
import dellacademylogo from "./images/DellAcademy.png";
import userprofilepic from "./images/userprofilepic.png";
import TopLeftSidebar from "./components/TopLeftSideBar";
import DateAndTime from './DateAndTime';
import EditTrainerDetailsPopup from './EditTrainerDetailsPopup';
import TrainerAvailPopup from './TrainerAvailPopup';

const AdminManageTrainerPage = () => {
    const [isTrainerDetailsPopupOpen, setIsTrainerDetailsPopupOpen] = useState(false);
    const [isTrainerAvailPopupOpen, setIsTrainerAvailPopupOpen] = useState(false);

    const handleOpenTrainerDetailsPopup = () => {
        setIsTrainerDetailsPopupOpen(true);
    };

    const handleCloseTrainerDetailsPopup = () => {
        setIsTrainerDetailsPopupOpen(false);
    };

    const handleOpenTrainerAvailPopup = () => {
        setIsTrainerAvailPopupOpen(true);
    };

    const handleCloseTrainerAvailPopup = () => {
        setIsTrainerAvailPopupOpen(false);
    };

    return (
        <>
            {isTrainerDetailsPopupOpen && (
                <EditTrainerDetailsPopup onClose={handleCloseTrainerDetailsPopup} />
            )}
            {isTrainerAvailPopupOpen && (
                <TrainerAvailPopup onClose={handleCloseTrainerAvailPopup} />
            )}
            <div className="admin-manage-trainer-page">
                <div className="top-panel">
                    <TopLeftSidebar />
                </div>
                <div className="manage-trainer-column">
                    <div className="title-and-datetime">
                        <button className="add-trainer-button">Add Trainer</button>
                        <h3>Manage Trainers</h3>
                        <DateAndTime />
                    </div>
                    <div className='manage-trainer-panel'>
                        <table className="trainer-info-table">
                            <thead>
                                <tr>
                                    <th className="trainer-info-table-th">Name</th>
                                    <th className="trainer-info-table-th">Role</th>
                                    <th className="trainer-info-table-th">Trainer ID</th>
                                    <th className="trainer-info-table-th">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="trainer-info-table-td">Jake</td>
                                    <td className="trainer-info-table-td">Training Lead</td>
                                    <td className="trainer-info-table-td">1007328</td>
                                    <td className="trainer-info-table-td">
                                        <button className="trainer-info-table-button">View Schedule</button>
                                        <button
                                            className="trainer-info-table-button"
                                            onClick={handleOpenTrainerDetailsPopup}
                                        >
                                            Edit Details
                                        </button>
                                        <button 
                                            className="trainer-info-table-button"
                                            onClick={handleOpenTrainerAvailPopup}
                                        >
                                            Available</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="trainer-info-table-td">Sally</td>
                                    <td className="trainer-info-table-td">Training Assistant</td>
                                    <td className="trainer-info-table-td">1004893</td>
                                    <td className="trainer-info-table-td">
                                        <button className="trainer-info-table-button">View Schedule</button>
                                        <button
                                            className="trainer-info-table-button"
                                            onClick={handleOpenTrainerDetailsPopup}
                                        >
                                            Edit Details
                                        </button>
                                        <button 
                                            className="trainer-info-table-button"
                                            onClick={handleOpenTrainerAvailPopup}
                                        >
                                            Available</button>
                                    </td>
                                </tr>
                                {/* Add more trainer rows as needed */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminManageTrainerPage;
