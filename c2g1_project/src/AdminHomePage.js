import "./homepage.css";
import 'boxicons/css/boxicons.min.css';
import dellacademylogo from "./images/DellAcademy.png";
import userprofilepic from "./images/userprofilepic.png";

const AdminHomePage = () => {
    return (
      <div>
        <div class="left-panel">
          <div class="dell-logo">
            <img src={dellacademylogo} alt="Dell Academy Logo" />
          </div>
          <div class="leftsidebar">
            <div class="column">
              <img src={userprofilepic} alt="User Profile Pic" />
              <div>
                <p class="usernamedisplay">Dil Doe</p>
                <p class="userroledisplay">Admin</p>
              </div>
            </div>
            <div class="leftsidebar-content">
              <ul class="leftsidebar-lists">
                <li class="leftsidebar-list">
                  <a href="#" class="nav-link">
                    <i class="bx bx-home-alt"></i>
                    <span class="link">Home</span>
                  </a>
                </li>
                <li class="leftsidebar-list">
                  <a href="#" class="nav-link">
                    <i class="bx bx-user"></i>
                    <span class="link">Profile</span>
                  </a>
                </li>
                <li class="leftsidebar-list">
                  <a href="#" class="nav-link">
                    <i class="bx bx-book-open"></i>
                    <span class="link">My Workshops</span>
                  </a>
                </li>
                <li class="leftsidebar-list">
                  <a href="#" class="nav-link">
                    <i class="bx bx-cog"></i>
                    <span class="link">Settings</span>
                  </a>
                </li>
                <li class="leftsidebar-list">
                  <a href="#" class="nav-link">
                    <i class="bx bx-exit"></i>
                    <span class="link">Sign Out</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default AdminHomePage;
