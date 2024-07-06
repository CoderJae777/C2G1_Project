import React, { useState } from 'react';
import './clienthomepage.css';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import dellacademylogo from "./images/DellAcademy.png";
import userprofilepic from "./images/userprofilepic.png";
import stockimgtop from "./images/stockimgtop.jpg";
import Sidebar from './ClientLeftSideBar';
import DateAndTime from './DateAndTime';

const ClientHomePage = () => {
    const [year, yearchange] = useState("");
    const [month, monthchange] = useState(""); 
    const [day, daychange] = useState("");
    
    return ( 
        <div class="client-home-page">
            <div class="left-panel">
                <div class="dell-logo">
                    <img src={dellacademylogo} alt="Dell Academy Logo" />
                </div>
                <Sidebar userprofilepic={userprofilepic} />
            </div>
            <div className="client-home-page-right-panel">
                <div className="header-container">
                    <div className='client-home-page-title'>
                        <h4>Submit Workshop Request</h4>
                    </div>
                    <div className="client-home-datetime">
                        <DateAndTime />
                    </div>
                </div>  
                <div className="form_group">
                    <select
                        id='request-year-sel'
                        value={year}
                        onChange={(e) => { yearchange(e.target.value); document.getElementById('request-year-sel').size = '1'; }}
                        className="form_control"
                        onFocus={() => { document.getElementById('request-year-sel').size = '1'; }}
                        onBlur={() => { document.getElementById('request-year-sel').size = '1'; }}
                    >
                        <option value="Year">-- Year --</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                    <select
                        id='request-month-sel'
                        value={month}
                        onChange={(e) => { monthchange(e.target.value); document.getElementById('request-month-sel').size = '1'; }}
                        className="form_control"
                        onFocus={() => { document.getElementById('request-month-sel').size = '1'; }}
                        onBlur={() => { document.getElementById('request-month-sel').size = '1'; }}
                    >
                        <option value="Month">-- Month --</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                    <select
                        id = 'request-day-sel'
                        value={day}
                        onChange={(e) => { daychange(e.target.value); document.getElementById('request-day-sel').size = '1'; }}
                        className="form_control"
                        onFocus={() => { document.getElementById('request-day-sel').size = '1'; }}
                        onBlur={() => { document.getElementById('request-day-sel').size = '1'; }}
                    >
                        <option value="Day">-- Day --</option>
                        {[...Array(31).keys()].map((request) => (
                            <option value={(request+1).toString()}>{(request+1).toString()}</option>
                        ))}
                    </select>
                    <select
                        id='request-workshop-sel'
                        value={year}
                        onChange={(e) => { yearchange(e.target.value); document.getElementById('request-workshop-sel').size = '1'; }}
                        className="form_control"
                        onFocus={() => { document.getElementById('request-workshop-sel').size = '1'; }}
                        onBlur={() => { document.getElementById('request-workshop-sel').size = '1'; }}
                    >
                        <option value="Workshop">-- Workshop --</option>
                        <option value="Workshop A">Workshop A</option>
                        <option value="Workshop B">Workshop B</option>
                    </select>
                </div>
                <div className="workshop-column">
                    <text> Number of attendees</text>
                    <textarea
                        className="reject-reason-input"
                    />
                </div>
            </div>
        </div>
     );
}
 
export default ClientHomePage;