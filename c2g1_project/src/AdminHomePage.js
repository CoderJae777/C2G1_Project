import React from 'react';
import './adminhomepage.css';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import dellacademylogo from "./images/DellAcademy.png";
import userprofilepic from "./images/userprofilepic.png";
import Sidebar from './LeftSideBar';
import DateAndTime from './DateAndTime';
import TrainerTable from './AdminHomePageTrainerTable';

const AdminHomePage = () => {
    const nav = useNavigate();
    const handleAdminWorkshopRequestPage = () => {
        nav("/AdminWorkshopRequestPage");
    }

    return (
        <div class="admin-home-page">
            <div class="left-panel">
                <div class="dell-logo">
                    <img src={dellacademylogo} alt="Dell Academy Logo" />
                </div>
                <Sidebar userprofilepic={userprofilepic} />
            </div>
            <div class="middle-column">
                <div class='admin-home-page-title'>
                    <h1>Hi Dil, welcome back!</h1>
                    <h4>Here is some important information for you:</h4>
                </div>
                <div class="workshop-table">
                    <button class="workshop-request-button" onClick={handleAdminWorkshopRequestPage}>Workshop Requests</button>
                    <div class="workshop-table-content">
                        <ul class="workshop-table-lists">
                            <li class="workshop-table-list">
                                <a href="#" class="wt-link">
                                {/* <i class="bx bx-home-alt"></i> */}
                                <span class="link">[ Pending Workshop Request ] Intro to Power Bi</span>
                                </a>
                            </li>
                            <li class="workshop-table-list">
                                <a href="#" class="wt-link">
                                {/* <i class="bx bx-user"></i> */}
                                <span class="link">[ Pending Workshop Request ] Intro to Computers</span>
                                </a>
                            </li>
                            <li class="workshop-table-list">
                                <a href="#" class="wt-link">
                                {/* <i class="bx bx-book-open"></i> */}
                                <span class="link">[ Pending Workshop Request ] Intro to Excel</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="trainer-table">
                    <button class="manage-trainers-button">Manage Trainers</button>
                    <TrainerTable />
                </div>
            </div>
            <div class="right-column">
                <div class="admin-home-datetime">
                    <DateAndTime />
                </div>
                <div class="admin-graphs">
                    {/* Placeholder for future table component */}
                    {/* <SortableTable /> */}
                    <p>Graphs will be displayed here.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
