import React from 'react';
import './clienthomepage.css';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import dellacademylogo from "./images/DellAcademy.png";
import userprofilepic from "./images/userprofilepic.png";
import stockimgtop from "./images/stockimgtop.jpg";
import Sidebar from "./components/ClientTopLeftSideBar.js";
import DateAndTime from './DateAndTime';

const ClientWorkshopPage = () => {
    
    return ( 
        <div class="client-home-page">
            <div class="left-panel">
                <Sidebar userprofilepic={userprofilepic} />
            </div>
            <div className="client-home-right-panel">
                <div className="header-container">
                    <div className='client-home-page-title'>
                        <h4>Workshops</h4>
                    </div>
                    <div className="client-home-datetime">
                        <DateAndTime />
                    </div>
                </div>
                <div className="workshop-column">
                    {[{ name: 'Workshop 1', desc: 'descrip t1312312313123 141241tsfaasdd', img: dellacademylogo, imgdesc: 'Workshop 1 image' },
                        { name: 'Workshop 2', desc: 'description', img: userprofilepic, imgdesc: 'Workshop 2 image' },
                        { name: 'Workshop 3', desc: 'description', img: dellacademylogo, imgdesc: 'Workshop 3 image' },
                        { name: 'Workshop 4', desc: 'some kinda description that exceeds two lines', img: stockimgtop, imgdesc: 'Workshop 4 image' }].map((request) => (
                        <div className="workshop-panel">
                                {request.name}
                                <img className="workshop-image" src={request.img} alt={request.imgdesc}/>
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
 
export default ClientWorkshopPage;