import React from 'react';
import './homepage.css';
import 'boxicons/css/boxicons.min.css';
import dellacademylogo from "./images/DellAcademy.png";
import userprofilepic from "./images/userprofilepic.png";
import Sidebar from './LeftSideBar';
// import SortableTable from './AdminHomePageTrainerTable';

const AdminHomePage = () => {
    return (
        <div className="admin-home-page">
            <div className="left-panel">
                <div className="dell-logo">
                    <img src={dellacademylogo} alt="Dell Academy Logo" />
                </div>
                <Sidebar userprofilepic={userprofilepic} />
            </div>
            <div className="content-panel">
                <div className='login_words'>
                    <h1>Hi Dil, welcome back!</h1>
                    <h4>Here is some important information for you:</h4>
                </div>
                <div className="workshop-table">
                    {/* Placeholder for future table component */}
                    {/* <SortableTable /> */}
                    <p>Workshop Table will be displayed here.</p>
                </div>
                <div className="trainer-table">
                    {/* Placeholder for future table component */}
                    {/* <SortableTable /> */}
                    <p>Trainer Table will be displayed here.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
