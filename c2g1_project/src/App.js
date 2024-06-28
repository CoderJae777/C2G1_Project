import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' ;
import AdminLoginPage from './AdminLoginPage';
import ClientLoginPage from './ClientLoginPage';
import TrainerLoginPage from './TrainerLoginPage';
import AdminHomePage from './AdminHomePage';
import ClientHomePage from './ClientHomePage';
import TrainerHomePage from './TrainerHomePage';
import AdminWorkshopRequestPage from './AdminWorkshopRequestPage';
import AdminManageTrainerPage from './AdminManageTrainerPage';
import Navbar from './NavBar';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import { ToastContainer } from "react-toastify";
import ClientWorkshopPage from "./ClientWorkshopPage"


function App() {
  return (
    <Router>
      <div className='NavBar'>
        < Navbar />
      </div>
      <div className="App">
      <ToastContainer theme="colored">
      </ToastContainer>
        <Routes>
          <Route exact path = "/" element={<LoginPage/>}/>
          <Route exact path = "/AdminLoginPage" element={<AdminLoginPage/>}/>
          <Route exact path="/ClientLoginPage" element={<ClientLoginPage/>}/>
          <Route exact path="/TrainerLoginPage" element={<TrainerLoginPage/>}/>
          <Route exact path="/SignUpPage" element={<SignUpPage/>}/>
          <Route exact path ="/AdminHomePage" element={<AdminHomePage/>}/>
          <Route exact path ="/ClientHomePage" element={<ClientHomePage/>}/>
          <Route exact path ="/TrainerHomePage" element={<TrainerHomePage/>}/>
          <Route exact path ="/AdminWorkshopRequestPage" element={<AdminWorkshopRequestPage/>}/>
          <Route exact path="/AdminManageTrainerPage" element={<AdminManageTrainerPage />} />
          <Route exact path="/ClientWorkshopPage" element={<ClientWorkshopPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
