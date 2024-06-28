import React from 'react';
import './clienthomepage.css';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import dellacademylogo from "./images/DellAcademy.png";
import userprofilepic from "./images/userprofilepic.png";
import stockimgtop from "./images/stockimgtop.jpg";
import Sidebar from './ClientLeftSideBar';
import DateAndTime from './DateAndTime';

const ClientHomePage = () => {
    
    return ( 
        <div class="client-home-page">
            <div class="left-panel">
                <div class="dell-logo">
                    <img src={dellacademylogo} alt="Dell Academy Logo" />
                </div>
                <Sidebar userprofilepic={userprofilepic} />
            </div>
            <div className="client-home-right-panel">
                <div className="header-container">
                    <div className='client-home-page-title'>
                        <h4>Hi Dil, welcome back!</h4>
                        <h4>Hereis some important information for you:</h4>
                        <h4>Submit Workshop Request</h4>
                    </div>
                    <div className="client-home-datetime">
                        <DateAndTime />
                    </div>
                </div>
                <div className="workshop-column">
                    <textarea
                        className="reject-reason-input"
                        placeholder="Enter reason here"
                    />
                    {[].map((request) => (
                        <div className="workshop-panel">
                            {request.name}
                            <img className="workshop-image" src={request.img} alt={request.imgdesc} />
                            <div className="workshop-desc">
                                {request.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>  
        </div>
     );
}
 
export default ClientHomePage;