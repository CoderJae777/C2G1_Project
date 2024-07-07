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
import AddTrainerPopup from './AddTrainerPopup';

const AdminManageTrainerPage = () => {
    const [isTrainerDetailsPopupOpen, setIsTrainerDetailsPopupOpen] = useState(false);
    const [isTrainerAvailPopupOpen, setIsTrainerAvailPopupOpen] = useState(false);
    const [isAddTrainerPopupOpen, setIsAddTrainerPopupOpen] = useState(false);
    const [trainers, setTrainers] = useState([
        { name: 'Jake', role: 'Training Lead', trainerId: '1007328', isAvailable: true },
        { name: 'Sally', role: 'Training Assistant', trainerId: '1004893', isAvailable: true }
        // Add more trainers as needed
    ]);
    const [popupIndex, setPopupIndex] = useState(null); // Define popupIndex state

    const handleOpenTrainerDetailsPopup = () => {
        setIsTrainerDetailsPopupOpen(true);
    };

    const handleCloseTrainerDetailsPopup = () => {
        setIsTrainerDetailsPopupOpen(false);
    };

    const handleOpenTrainerAvailPopup = (index) => {
        setIsTrainerAvailPopupOpen(true);
        setPopupIndex(index);
    };

    const handleCloseTrainerAvailPopup = () => {
        setIsTrainerAvailPopupOpen(false);
    };

    const handleAvailabilityChange = (selectedAvailability, index) => {
        const updatedTrainers = [...trainers];
        updatedTrainers[index].isAvailable = selectedAvailability === 'Available';
        setTrainers(updatedTrainers);
    };

    const handleOpenAddTrainerPopup = (index) => {
        setIsAddTrainerPopupOpen(true);
    };

    const handleCloseAddTrainerPopup = () => {
        setIsAddTrainerPopupOpen(false);
    };

    return (
        <>
            {isTrainerDetailsPopupOpen && (
                <EditTrainerDetailsPopup onClose={handleCloseTrainerDetailsPopup} />
            )}
            {isTrainerAvailPopupOpen && (
                <TrainerAvailPopup
                    onClose={handleCloseTrainerAvailPopup}
                    onAvailabilityChange={handleAvailabilityChange}
                    index={popupIndex}
                />
            )}
            {isAddTrainerPopupOpen && (
                <AddTrainerPopup onClose={handleCloseAddTrainerPopup} />
            )}
            <div className="admin-manage-trainer-page">
                <div className="top-panel">
                    <TopLeftSidebar />
                </div>
                <div className="manage-trainer-column">
                    <div className="title-and-datetime">
                        <button className="add-trainer-button" onClick={handleOpenAddTrainerPopup}>Add Trainer</button>
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
                                {trainers.map((trainer, index) => (
                                    <tr key={index}>
                                        <td className="trainer-info-table-td">{trainer.name}</td>
                                        <td className="trainer-info-table-td">{trainer.role}</td>
                                        <td className="trainer-info-table-td">{trainer.trainerId}</td>
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
                                                onClick={() => handleOpenTrainerAvailPopup(index)}
                                            >
                                                {trainer.isAvailable ? 'Available' : 'Unavailable'}
                                            </button>
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

export default AdminManageTrainerPage;
