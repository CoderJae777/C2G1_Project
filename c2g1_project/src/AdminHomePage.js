import './homepage.css';
import dellacademylogo from './images/DellAcademy.png';
import userprofilepic from './images/userprofilepic.png';

const AdminHomePage = () => {
    return ( 
        <div>
            <div className="delllogo"></div>
            <div>
                <img src={dellacademylogo} alt="Dell Academy Logo" />
            </div>
            <div class="leftsidebar">
                <div class="userprofilepic">
                    <img class="userprofilepic" src={userprofilepic} alt="User Profile Pic" />
                </div>    
                <h1 class="username">Dil Doe</h1>
            </div>
        </div>
    );
}
 
export default AdminHomePage;